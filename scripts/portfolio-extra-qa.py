from pathlib import Path
from playwright.sync_api import sync_playwright
import sys
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
out=Path('/tmp/portfolio-qa')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':1280,'height':720})
 errors=[];page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 page.goto(base,wait_until='domcontentloaded');page.locator('.portal-scene.is-loaded').wait_for(timeout=30000);page.get_by_role('button',name='Pause motion').click();page.wait_for_timeout(200)
 first=page.locator('canvas').first.screenshot();page.wait_for_timeout(500);second=page.locator('canvas').first.screenshot();assert first==second
 page.get_by_role('button',name='Play motion').click();page.wait_for_timeout(500);third=page.locator('canvas').first.screenshot();assert third!=first
 print('PASS motion: pause holds the rendered frame; play resumes animation',flush=True)
 page.locator('#bayyina .product-window').click();page.keyboard.press('Escape');page.wait_for_function('document.querySelector("#bayyina .product-window") === document.activeElement')
 page.locator('#bayyina .world-enter').click();page.keyboard.press('Escape');page.wait_for_timeout(1200);assert page.url==base+'/' and page.locator('.portal-transition').count()==0
 print('PASS focus: Escape closes and restores trigger; portal cancellation prevents navigation',flush=True)
 page.set_viewport_size({'width':390,'height':844});page.goto(base,wait_until='domcontentloaded');page.add_style_tag(content='html{font-size:20px!important}')
 for selector in ['#hero','#bayyina','#enec','#contact']:
  page.locator(selector).scroll_into_view_if_needed();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 page.screenshot(path=str(out/'large-text-390x844.png'))
 print('PASS larger text: no horizontal overflow at 390x844',flush=True)
 print('Console errors:',errors,flush=True);assert not errors
 b.close()
 b=p.chromium.launch(args=['--disable-webgl']);page=b.new_page(viewport={'width':1280,'height':720});page.goto(base,wait_until='domcontentloaded');page.locator('h1').wait_for()
 assert page.locator('.sculpture-fallback').is_visible();assert page.locator('.sculpture-fallback').evaluate('(e)=>e.naturalWidth>0');page.screenshot(path=str(out/'no-webgl-1280x720.png'));b.close()
 print('PASS no-WebGL: rendered sculpture fallback remains visible',flush=True)
print('ALL ADDITIONAL CHECKS PASS',flush=True)
