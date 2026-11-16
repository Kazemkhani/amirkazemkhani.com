from pathlib import Path
from playwright.sync_api import sync_playwright
import json

out = Path(__file__).resolve().parents[1] / 'client/public/worlds'
out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    for name, path in [('bayyina','/twin/'), ('marsad','/replay/'), ('enec','/')]:
        url = f'https://{name}.amirkazemkhani.com{path}'
        response = page.goto(url, wait_until='domcontentloaded', timeout=60000)
        page.wait_for_timeout(6000)
        page.screenshot(path=str(out / f'{name}.png'))
        text = page.locator('body').inner_text()
        Path(f'/tmp/portfolio-{name}.txt').write_text(text)
        print(json.dumps({'project': name, 'status':response.status, 'title':page.title(),'copy':text[:9000]}), flush=True)
    browser.close()
