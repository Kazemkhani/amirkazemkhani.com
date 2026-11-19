"""Browser release gate for the real portfolio journeys, against preview or production."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import sys,json,os
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
LOCAL=bool(os.environ.get('PORTFOLIO_LOCAL_ONLY'))
OUT=Path(sys.argv[2] if len(sys.argv)>2 else '/tmp/portfolio-v2-qa');OUT.mkdir(parents=True,exist_ok=True)
IDS=['bayyina','marsad','enec','nova','ruya','samt','morning','gold','cyberlife']
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=(["--host-resolver-rules="+os.environ["PORTFOLIO_RESOLVER_RULES"]] if os.environ.get("PORTFOLIO_RESOLVER_RULES") else []))
 for width,height,reduced in [(1280,720,False),(390,844,False),(768,1024,False),(1024,768,False),(320,568,False),(390,844,True)]:
  page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce' if reduced else 'no-preference')
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('response',lambda r:errors.append(f'HTTP {r.status}: {r.url}') if r.url.startswith(BASE+'/') and r.status>=400 else None)
  page.goto(BASE,wait_until='domcontentloaded',timeout=60000);page.locator('h1').wait_for()
  page.wait_for_function('document.fonts.status === "loaded"');page.locator('.universe-canvas.loaded canvas').wait_for(timeout=30000);page.wait_for_timeout(900)
  label=f'{width}x{height}'+('-reduced' if reduced else '')
  assert 'AI founder.' in page.locator('h1').inner_text().replace('\u00a0',' ')
  assert page.locator('.world-dock button').count()==9
  assert page.locator('.archive-list>a').count()==6
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {label}'
  page.screenshot(path=str(OUT/f'hero-{label}.png'))
  page.get_by_role('button',name='Next project',exact=True).click()
  assert page.locator('.active-world .selected-project').get_attribute('aria-label')=='Explore Marsad'
  page.get_by_role('button',name='Previous project',exact=True).click()
  for name in IDS:
   section=page.locator('#'+name);section.evaluate('(e)=>window.scrollTo(0,e.offsetTop+(innerWidth>700?80:0))');page.wait_for_timeout(350)
   assert section.locator('h2').is_visible()
   if width>700:
    assert section.locator('.chapter-bottom').bounding_box()['y'] >= section.locator('.chapter-copy').bounding_box()['y']+section.locator('.chapter-copy').bounding_box()['height']-2, f'overlap {name} {label}'
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {name} {label}'
   for img in ([] if name in ['bayyina','marsad','enec'] else section.locator('.chapter-visual img').all()):
    img.evaluate('(e)=>e.loading="eager"');img.evaluate('(e)=>e.decode()')
   if name in ['bayyina','marsad','enec'] and not reduced:
    section.locator('video').wait_for();section.locator('video').evaluate('(v)=>{v.play().catch(()=>{})}');page.wait_for_function('(id)=>document.querySelector(`#${id} video`)?.currentTime > .1',arg=name,timeout=30000)
   if reduced and section.locator('video').count(): assert section.locator('video').evaluate('(v)=>v.paused')
   if width in [1280,390]:page.screenshot(path=str(OUT/f'{name}-{label}.png'))
  if width==390 and not reduced:
   page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Open menu',exact=True).click();page.get_by_role('navigation',name='Mobile navigation').get_by_role('link',name='All the work').click();assert page.locator('#mobile-navigation').count()==0
  if width in [1280,390] and not reduced:
   for name in (['bayyina','marsad','samt'] if LOCAL else ['bayyina','marsad','enec','samt']):
    page.locator('#'+name).get_by_role('button',name='Watch the film',exact=True).click()
    v=page.locator('.experience-dialog video');v.wait_for();v.evaluate('(v)=>{v.play().catch(()=>{})}')
    page.wait_for_function('document.querySelector(".experience-dialog video")?.currentTime > .3',timeout=45000)
    duration=v.evaluate('(v)=>v.duration');assert duration>20
    page.get_by_role('button',name='Close film').click();assert page.locator('.experience-dialog').count()==0
    page.wait_for_function('document.activeElement.textContent.trim() === "Watch the film"')
    print(f'PASS {label}: {name} original film plays ({duration:.1f}s), close restores focus',flush=True)
   for name in ([] if LOCAL else ['bayyina','marsad','enec','ruya']):
    page.locator('#'+name+' .take-control').click();frame=page.frame_locator('#'+name+' iframe');frame.locator('body').wait_for(timeout=60000)
    assert len(frame.locator('body').inner_text(timeout=45000))>100
    page.wait_for_timeout(4000);page.screenshot(path=str(OUT/f'embed-{name}-{label}.png'))
    page.get_by_role('button',name='Back to the portfolio',exact=True).click();assert page.locator('iframe').count()==0
    print(f'PASS {label}: {name} real embedded product loads and closes',flush=True)
  assert not errors,errors
  print(f'PASS {label}: all 15 projects, 3D gallery, loaded media, no overflow or page errors',flush=True);page.close()
 page=browser.new_page(viewport={'width':1280,'height':720})
 page.goto(BASE);page.locator('#bayyina .enter-button').click();page.locator('.portal-transition').wait_for();page.get_by_role('button',name='Stay here').click();page.wait_for_timeout(1700);assert page.url.rstrip('/')==BASE.rstrip('/')
 if not LOCAL:
  page.locator('#bayyina .enter-button').click();page.locator('.portal-transition').wait_for();page.wait_for_timeout(350);page.screenshot(path=str(OUT/'portal-transition.png'));page.wait_for_url('https://bayyina.amirkazemkhani.com/',timeout=60000)
  page.go_back(wait_until='domcontentloaded');page.locator('h1').wait_for();assert page.locator('.portal-transition').count()==0
  print('PASS portal: cancellable fracture/wormhole, actual destination and browser-back reset',flush=True)
 page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Pause motion',exact=True).click();page.wait_for_timeout(350)
 canvas=page.locator('.universe-canvas canvas');before=canvas.screenshot();page.wait_for_timeout(300);assert before==canvas.screenshot()
 page.get_by_role('button',name='Play motion',exact=True).click();page.wait_for_timeout(350);assert before!=canvas.screenshot()
 print('PASS motion: global pause freezes the 3D render and resume restarts it',flush=True)
 for w,h in [(1280,720),(390,844)]:
  page.set_viewport_size({'width':w,'height':h})
  for route in ['/articles','/work-with-me','/privacy','/terms','/articles/dubai-police-hackathon','/work/','/keel/']:
   page.goto(BASE+route,wait_until='domcontentloaded');page.locator('h1').first.wait_for(timeout=30000)
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),route
  page.goto(BASE);page.locator('.archive-list a').nth(1).click();page.wait_for_url('**/work/#earlier');assert page.locator('#earlier').count()==1
 print('PASS retained routes and archive document navigation at desktop and phone sizes',flush=True)
 page.close()
 page=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce')
 page.add_init_script("HTMLCanvasElement.prototype.getContext=new Proxy(HTMLCanvasElement.prototype.getContext,{apply(fn,scope,args){return String(args[0]).includes('webgl')?null:Reflect.apply(fn,scope,args)}})")
 page.goto(BASE);page.locator('h1').wait_for();page.wait_for_timeout(1200);assert page.locator('.universe-fallback').is_visible()
 page.add_style_tag(content='html{font-size:125%}');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 page.screenshot(path=str(OUT/'fallback-large-text-phone.png'))
 print('PASS fallback: product image survives unavailable WebGL; larger text fits phone',flush=True)
 browser.close()
print('ALL LOCAL PORTFOLIO CHECKS PASS (external journeys excluded)' if LOCAL else 'ALL PORTFOLIO CHECKS PASS',flush=True)
