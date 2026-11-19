"""Check the CyberLife exhibition journey and its relationship labels."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import sys

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4181'
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else '/tmp/cyberlife-qa')
OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(1280,720), (390,844), (320,568), (768,1024), (1024,768)]:
        page = browser.new_page(viewport={'width':width,'height':height}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(BASE, wait_until='domcontentloaded')
        page.locator('h1').wait_for()
        button = page.locator('.world-dock').get_by_role('button', name='CyberLife', exact=True)
        assert button.count() == 1, 'CyberLife is missing from the opening gallery'
        button.click()
        selected = page.locator('.active-world')
        expect(selected).to_contain_text('Exhibiting at')
        expect(selected).to_contain_text('British Embassy')
        assert 'University-selected' in selected.inner_text()
        selected.locator('img').evaluate_all('(images)=>Promise.all(images.map(i=>i.decode()))')
        assert 'British Embassy' in selected.inner_text()
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.screenshot(path=str(OUT/f'hero-{width}.png'))
        selected.get_by_role('link', name='Explore CyberLife', exact=True).click()
        chapter = page.locator('#cyberlife')
        assert chapter.locator('h2').is_visible()
        assert 'Mediclinic' in chapter.inner_text()
        assert 'offered' in chapter.inner_text()
        assert 'MBRIF' in chapter.inner_text()
        assert 'Exhibition card' in chapter.locator('.scene-caption').inner_text()
        assert 'Actual product interface' not in chapter.inner_text()
        chapter.locator('img').evaluate_all('(images)=>images.forEach(i=>i.loading="eager")')
        page.wait_for_function('Array.from(document.querySelectorAll("#cyberlife img")).every(i=>i.complete && i.naturalWidth > 0)')
        assert chapter.get_by_role('link', name='Read the CyberLife story', exact=True).first.get_attribute('href') == '/articles/futurehack-cyberlife'
        page.screenshot(path=str(OUT/f'chapter-{width}.png'))
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        chapter.get_by_role('link', name='Read the CyberLife story', exact=True).first.click()
        page.wait_for_url('**/articles/futurehack-cyberlife')
        assert 'British Embassy' in page.locator('main').inner_text()
        assert not errors, errors
        print(f'PASS {width}x{height}: CyberLife gallery, Embassy identity, chapter, article and no overflow or page errors', flush=True)
        page.close()
    browser.close()
print('ALL CYBERLIFE CHECKS PASS')
