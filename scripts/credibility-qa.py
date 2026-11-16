from playwright.sync_api import sync_playwright
from pathlib import Path
import sys
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
OUT=Path(sys.argv[2] if len(sys.argv)>2 else '/tmp/credibility-qa');OUT.mkdir(exist_ok=True,parents=True)
with sync_playwright() as p:
 b=p.chromium.launch()
 for w,h in [(1280,720),(390,844),(768,1024),(1024,768),(320,568),(1440,900)]:
  page=b.new_page(viewport={'width':w,'height':h},reduced_motion='reduce')
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(BASE,wait_until='domcontentloaded');page.locator('h1').wait_for();page.wait_for_function('document.fonts.status==="loaded"')
  assert 'AI founder.' in page.locator('h1').inner_text()
  assert page.locator('.hero-identity').count()==0
  assert page.locator('.world-dock .product-logo').count()==8
  assert page.locator('.hero-award img').count()==2
  for img in page.locator('.hero-award img').all():img.evaluate('(e)=>e.decode()')
  assert page.locator('.dock-number').count()==0
  assert page.locator('.nova-broadcast').count()==1
  assert page.locator('.credential-strip .project-credential').count()==11
  assert 'The ventures. The evidence.' not in page.locator('body').inner_text()
  assert 'ENEC' not in page.locator('body').inner_text()
  assert page.locator('.hero-evidence').bounding_box()['y']+page.locator('.hero-evidence').bounding_box()['height']<=h, 'Key figures below initial viewport'
  assert all(t in page.locator('.hero-evidence').inner_text() for t in ['AED 2M','US$12,800','1st place'])
  assert page.locator('.world-dock button').count()==8 and page.locator('.archive-list>a').count()==7
  for i,id in enumerate(['bayyina','marsad','enec','nova','ruya','samt','morning','gold']):
   page.locator('.world-dock button').nth(i).click()
   assert page.locator('.active-world .selected-project .product-logo').count()==1
   cred=page.locator('.active-world .project-credential');assert cred.is_visible()
   for img in cred.locator('img').all():img.evaluate('(e)=>e.decode()')
   if w in [1280,390] and i in [0,1,2,3,5]:page.screenshot(path=str(OUT/f'hero-{id}-{w}.png'))
  for img in page.locator('.world-dock img').all():img.evaluate('(e)=>e.decode()')
  page.locator('.credential-strip').scroll_into_view_if_needed()
  for img in page.locator('.credential-strip img').all():img.evaluate('(e)=>e.decode()')
  if w in [1280,390]:page.screenshot(path=str(OUT/f'credentials-{w}.png'))
  page.locator('#recognition').scroll_into_view_if_needed()
  if w in [1280,390]:page.screenshot(path=str(OUT/f'awards-{w}.png'))
  for id in ['bayyina','marsad','enec','nova','ruya','samt','morning','gold']:
   sec=page.locator('#'+id);sec.evaluate('(e)=>scrollTo(0,e.offsetTop)');page.wait_for_timeout(100)
   assert sec.locator('.project-credential').is_visible();assert sec.locator('.project-role').is_visible()
   for img in sec.locator('.project-credential img').all():img.evaluate('(e)=>e.decode()')
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {id} {w}'
   if w>700:
    a=sec.locator('.chapter-copy').bounding_box();z=sec.locator('.chapter-bottom').bounding_box();assert a['y']+a['height']<=z['y']+2,f'overlap {id} {w}'
   if w in [1280,390]:page.screenshot(path=str(OUT/f'chapter-{id}-{w}.png'))
  assert all(t in page.locator('#samt .chapter-record').inner_text() for t in ['AED 25,000','AED 18,000'])
  assert 'NSTI' in page.locator('#enec .project-credential').inner_text()
  assert 'hackathon' in page.locator('#marsad .project-credential').inner_text().lower()
  assert not errors,errors
  print(f'PASS {w}x{h}: founder credentials above fold, 15 projects, all official logos loaded, roles and evidence visible, no ENEC copy, no overflow or chapter overlaps',flush=True)
  page.close()
 b.close()
print('ALL CREDIBILITY CHECKS PASS',flush=True)
