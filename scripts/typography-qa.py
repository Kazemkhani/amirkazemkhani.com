"""Catch duplicate glyph painting and word collisions in portfolio motion text."""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright
import sys

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173'
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else '/tmp/portfolio-type-fix/qa')
OUT.mkdir(parents=True, exist_ok=True)
ENGINES = sys.argv[3:] or ['chromium', 'webkit']


def check_words(page):
    # Inspect the settled layout, including wrapped lines. No pair of words may intersect.
    collisions = page.locator('.kinetic-line').evaluate_all('''lines => lines.flatMap(line => {
      const bounds = line.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) return [];
      if ([...line.children].some(e => Number(getComputedStyle(e).opacity) < .999)) return [];
      const words = [...line.children].map(e => ({text:e.textContent, r:e.getBoundingClientRect()}));
      return words.flatMap((a,i) => words.slice(i+1).filter(b =>
        Math.min(a.r.right,b.r.right)-Math.max(a.r.left,b.r.left)>1 &&
        Math.min(a.r.bottom,b.r.bottom)-Math.max(a.r.top,b.r.top)>1
      ).map(b => [a.text,b.text]));
    })''')
    assert not collisions, collisions
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Page overflow'


with sync_playwright() as p:
    for engine in ENGINES:
        browser = getattr(p, engine).launch()
        for width, height in [(1280,720), (390,844), (768,1024), (320,568)]:
            page = browser.new_page(viewport={'width':width,'height':height})
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.goto(BASE, wait_until='domcontentloaded')
            page.wait_for_function('document.fonts.status === "loaded"')
            page.locator('.journey-opening').scroll_into_view_if_needed()
            page.wait_for_timeout(1800)
            frozen = page.add_style_tag(content='.project-formats .kinetic-line{animation-play-state:paused!important}')
            label = f'{engine}-{width}'
            page.screenshot(path=str(OUT/f'intro-{label}.png'))
            actual = page.locator('.project-formats').screenshot()
            # A plain-text reference must paint the same glyphs. This catches the
            # compositor artifact even when every DOM word has the correct rectangle.
            reference_style = page.add_style_tag(content='.project-formats .kinetic-line{background-image:none!important;background-clip:border-box!important;-webkit-background-clip:border-box!important}')
            reference = page.locator('.project-formats').screenshot()
            diff = ImageChops.difference(Image.open(BytesIO(actual)).convert('RGB'), Image.open(BytesIO(reference)).convert('RGB'))
            assert diff.getbbox() is None, f'Duplicate/incorrect glyph painting: {label}'
            reference_style.evaluate('(e)=>e.remove()')
            frozen.evaluate('(e)=>e.remove()')
            check_words(page)
            if width in [1280,390]:
                for selector in ['.hero-title', '.recognition-heading', '.award-ifza', '.award-ruya', '.award-airports', '.award-cyberlife', *[f'#{id} .chapter-copy' for id in ['bayyina','marsad','enec','nova','ruya','samt','morning','gold']], '.broadcast-heading', '.archive-heading', '.proof-heading']:
                    section=page.locator(selector)
                    if not section.count(): continue
                    section.scroll_into_view_if_needed()
                    page.wait_for_timeout(1300)
                    check_words(page)
                page.get_by_role('button',name='Pause motion',exact=True).click()
                page.locator('.journey-opening').scroll_into_view_if_needed()
                page.screenshot(path=str(OUT/f'paused-{label}.png'))
                assert page.locator('.project-formats').inner_text().replace('\n',' ').strip() == 'Watch the films. Try the products.'
                page.get_by_role('button',name='Play motion',exact=True).click()
                page.locator('.journey-opening').scroll_into_view_if_needed()
                page.wait_for_timeout(1600)
                check_words(page)
                for route in ['/articles','/articles/dubai-police-hackathon','/work-with-me','/work/']:
                    page.goto(BASE+route,wait_until='domcontentloaded')
                    page.locator('h1').first.wait_for()
                    page.wait_for_timeout(1800)
                    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),route
                    page.screenshot(path=str(OUT/f'{route.strip("/").replace("/","-")}-{label}.png'))
            page.emulate_media(reduced_motion='reduce')
            page.goto(BASE,wait_until='domcontentloaded')
            page.locator('.journey-opening').scroll_into_view_if_needed()
            page.add_style_tag(content='html{font-size:125%}')
            page.screenshot(path=str(OUT/f'reduced-large-text-{label}.png'))
            check_words(page)
            assert not errors,errors
            print(f'PASS {label}: clean glyph painting, word layout, pause/resume, reduced motion and larger text',flush=True)
            page.close()
        browser.close()
print('ALL TYPOGRAPHY CHECKS PASS',flush=True)
