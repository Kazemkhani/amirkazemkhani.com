"""Verify contact links and persistent controls without sending any messages."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import sys

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4183'
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else '/tmp/contact-qa')
OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(1280,720), (390,844), (320,568), (768,1024), (1024,768)]:
        page = browser.new_page(viewport={'width':width,'height':height}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(BASE, wait_until='domcontentloaded')
        page.locator('h1').wait_for()
        dock = page.get_by_role('navigation', name='Contact Amir', exact=True)
        expect(dock).to_be_visible()
        whatsapp = dock.get_by_role('link', name='WhatsApp me', exact=True)
        email = dock.get_by_role('link', name='Email me', exact=True)
        assert whatsapp.get_attribute('href') == 'https://wa.me/qr/THFRKE4E4OKSL1?s=r'
        assert whatsapp.get_attribute('target') == '_blank'
        assert 'noopener' in whatsapp.get_attribute('rel')
        assert email.get_attribute('href') == 'mailto:amir@amirkazemkhani.com'
        assert dock.evaluate('(e)=>getComputedStyle(e).animationName') == 'none'
        for link in [whatsapp, email]:
            box = link.bounding_box()
            assert box['height'] >= 44 and box['width'] >= 44
            assert box['x'] >= 0 and box['x'] + box['width'] <= width
            assert box['y'] >= 0 and box['y'] + box['height'] <= height
            assert link.evaluate('(e)=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}')
        whatsapp.focus()
        expect(whatsapp).to_be_focused()
        page.keyboard.press('Tab')
        expect(email).to_be_focused()
        page.screenshot(path=str(OUT/f'hero-{width}.png'))
        page.locator('#contact').scroll_into_view_if_needed()
        expect(page.locator('#contact').get_by_role('link', name='WhatsApp me')).to_be_visible()
        expect(dock).to_be_visible()
        top = page.get_by_role('button', name='Back to top')
        a, b = top.bounding_box(), dock.bounding_box()
        assert a['y'] + a['height'] <= b['y'] or a['x'] >= b['x'] + b['width'], 'Back to top overlaps contact bar'
        page.screenshot(path=str(OUT/f'contact-{width}.png'))
        page.locator('#bayyina').get_by_role('button', name='Watch the film', exact=True).click()
        expect(dock).not_to_be_visible()
        page.get_by_role('button', name='Close film').click()
        expect(dock).to_be_visible()
        for path in ['/work-with-me', '/articles', '/articles/futurehack-cyberlife']:
            page.goto(BASE + path, wait_until='domcontentloaded')
            page.locator('h1').wait_for()
            expect(dock).to_be_visible()
        page.add_style_tag(content='html { font-size: 24px !important; }')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert not errors, errors
        print(f'PASS {width}x{height}: exact contact links, 44px targets, keyboard, persistent routes, film isolation, no overlap or page errors', flush=True)
        page.close()
    page = browser.new_page()
    page.goto(BASE)
    dock = page.locator('.contact-dock')
    expect(dock).to_be_visible()
    assert dock.evaluate('(e)=>getComputedStyle(e).animationName') == 'contact-arrive'
    print('PASS motion: entrance enabled normally and disabled for reduced motion')
    browser.close()
print('ALL CONTACT CHECKS PASS')
