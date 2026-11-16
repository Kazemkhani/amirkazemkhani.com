from playwright.sync_api import sync_playwright
from pathlib import Path
import sys
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
out=Path(sys.argv[2] if len(sys.argv)>2 else '/tmp/portfolio-motion-qa');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch()
 page=b.new_page(viewport={'width':1280,'height':720})
 page.goto(BASE,wait_until='domcontentloaded');page.locator('h1').wait_for();page.wait_for_timeout(1800)
 assert 'AMIR HOSSEIN KAZEMKHANI' not in page.locator('.universe-hero').inner_text()
 assert page.get_by_role('heading',name='AI founder. Hands-on CTO.').count()==1
 page.screenshot(path=str(out/'opening-1280.png'))
 page.set_viewport_size({'width':390,'height':844});page.evaluate('scrollTo(0,0)');page.wait_for_timeout(500);page.screenshot(path=str(out/'opening-390.png'))
 page.set_viewport_size({'width':1280,'height':720});page.locator('#marsad').scroll_into_view_if_needed();page.wait_for_timeout(500)
 layers=page.locator('#marsad .chapter-brand-sculpture');a=layers.screenshot();page.wait_for_timeout(300);assert a!=layers.screenshot()
 page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Pause motion',exact=True).click();page.locator('#marsad').scroll_into_view_if_needed();page.wait_for_timeout(500);a=layers.screenshot();page.wait_for_timeout(300);assert a==layers.screenshot()
 page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Play motion',exact=True).click()
 print('PASS headings: accessible name; no duplicate hero name; real mark animates and global pause freezes it',flush=True)
 page.locator('.nova-broadcast').scroll_into_view_if_needed();frameel=page.get_by_test_id('falcons-episode-iframe');frameel.wait_for(timeout=10000)
 frame=frameel.element_handle().content_frame()
 for _ in range(45):
  if frame.evaluate('()=>document.querySelector("video")?.currentTime > 3562'):break
  page.wait_for_timeout(1000)
 state=frame.locator('video').evaluate('(v)=>({currentTime:v.currentTime,paused:v.paused,muted:v.muted})');assert not state['paused'] and state['muted'];print('PASS actual YouTube playback:',state,flush=True)
 page.screenshot(path=str(out/'broadcast-playing-1280.png'))
 page.get_by_test_id('falcons-unmute').click();page.wait_for_timeout(600);assert frame.locator('video').evaluate('(v)=>!v.muted');print('PASS explicit unmute',flush=True)
 page.locator('#gold').scroll_into_view_if_needed();page.wait_for_timeout(500);assert page.get_by_test_id('falcons-episode-iframe').count()==0
 page.close()
 page=b.new_page(viewport={'width':390,'height':844},reduced_motion='reduce');page.goto(BASE,wait_until='domcontentloaded');page.locator('.nova-broadcast').scroll_into_view_if_needed();page.wait_for_timeout(1000);assert page.get_by_test_id('falcons-episode-iframe').count()==0
 page.screenshot(path=str(out/'broadcast-reduced-390.png'));page.get_by_test_id('falcons-play').click();page.get_by_test_id('falcons-episode-iframe').wait_for();page.locator('#gold').scroll_into_view_if_needed();page.wait_for_timeout(500);assert page.get_by_test_id('falcons-episode-iframe').count()==0
 print('PASS video lifecycle: no reduced-motion autoplay; explicit playback works; leaving section releases player',flush=True)
 b.close()
