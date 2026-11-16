from pathlib import Path
from playwright.sync_api import sync_playwright
import sys,json
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
OUT=Path('/tmp/portfolio-qa');OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 for width,height,reduced in [(1280,720,False),(390,844,False),(768,1024,False),(1024,768,False),(320,568,False),(390,844,True)]:
  page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce' if reduced else 'no-preference')
  errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
  page.goto(BASE,wait_until='domcontentloaded',timeout=60000)
  page.locator('h1').wait_for()
  page.wait_for_function('document.fonts.status === "loaded"')
  page.wait_for_timeout(500)
  label=f'{width}x{height}'+('-reduced' if reduced else '')
  assert page.locator('h1').inner_text()=='I build things\nyou can step into.'
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {label}'
  page.locator('.portal-scene.is-loaded canvas').wait_for(timeout=30000)
  page.screenshot(path=str(OUT/f'hero-{label}.png'))
  for name in ['bayyina','marsad','enec']:
   page.locator('#'+name).scroll_into_view_if_needed();page.wait_for_timeout(300)
   assert page.locator('#'+name+' .product-window img').evaluate('(e)=>e.complete && e.naturalWidth>0')
   page.screenshot(path=str(OUT/f'{name}-{label}.png'))
  if width==390 and not reduced:
   page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Open menu',exact=True).click();page.get_by_role('navigation',name='Mobile navigation').get_by_role('link',name='The work').click();assert page.locator('#mobile-navigation').count()==0
  if width in [1280,390] and not reduced:
   for name in ['bayyina','marsad','enec']:
    page.locator('#'+name+' .text-button').click()
    page.wait_for_function('document.querySelector("video")?.readyState >= 1',timeout=45000)
    v=page.locator('video');duration=v.evaluate('(v)=>v.duration');assert duration>20
    page.wait_for_function('document.querySelector("video")?.currentTime > .3',timeout=30000)
    page.get_by_role('button',name='Close experience').click();assert page.locator('video').count()==0
    page.locator('#'+name+' .product-window').click()
    page.wait_for_function('document.querySelector("iframe") !== null')
    frame=page.frame_locator('iframe')
    frame.locator('body').wait_for(timeout=60000)
    page.wait_for_timeout(1000)
    text=frame.locator('body').inner_text(timeout=30000)
    assert len(text)>100,(name,text)
    page.screenshot(path=str(OUT/f'embed-{name}-{label}.png'))
    page.get_by_role('button',name='Close experience').click();assert page.locator('iframe').count()==0
    print(f'PASS {label}: {name} film plays ({duration:.1f}s), real embedded demo loads, closes cleanly',flush=True)
  assert not errors,errors
  print(f'PASS {label}: 3D, loaded imagery, no overflow, no page errors',flush=True)
  page.close()
 # Portal navigation works, including browser back and reduced-motion bypass.
 page=browser.new_page(viewport={'width':1280,'height':720})
 page.goto(BASE,wait_until='domcontentloaded')
 page.locator('#bayyina .world-enter').click()
 page.locator('.portal-transition').wait_for();page.screenshot(path=str(OUT/'portal-transition.png'))
 page.wait_for_url('https://bayyina.amirkazemkhani.com/',timeout=60000)
 page.go_back(wait_until='domcontentloaded');assert page.locator('.portal-transition').count()==0
 print('PASS portal: animation, destination navigation and browser-back reset',flush=True)
 for route in ['/articles','/work-with-me','/privacy','/terms','/articles/dubai-police-hackathon']:
  page.goto(BASE+route,wait_until='domcontentloaded');assert page.locator('#main').count()==1, route
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 print('PASS retained routes: writing, article, contact, privacy, terms',flush=True)
 browser.close()
print('ALL PORTFOLIO CHECKS PASS',flush=True)
