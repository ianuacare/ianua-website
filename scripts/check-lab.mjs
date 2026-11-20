import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Start the site first (npm run dev), then: node scripts/check-lab.mjs
const origin = process.env.LAB_TEST_ORIGIN || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true, channel: process.env.LAB_TEST_BROWSER || 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(origin);
  await page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: 'Lab', exact: true }).click();
  await page.waitForURL('**/lab');
  await page.getByRole('heading', { level: 1, name: 'Lab', exact: true }).waitFor();
  assert.equal(await page.locator('article').count(), 6);
  assert.equal(await page.locator('a[href$=".pdf"]').count(), 6);
  assert.equal(await page.locator('a[href*="github"]').count(), 0);
  assert.match(await page.title(), /Lab/);
  const pdfs = await page.locator('a[href$=".pdf"]').evaluateAll(links => links.map(link => link.href));
  for (const url of pdfs) {
    const response = await page.request.get(url);
    assert.equal(response.status(), 200);
    assert.match(response.headers()['content-type'], /pdf/);
    assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
  }
  await page.locator('article:last-child').scrollIntoViewIfNeeded();
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map(image => image.decode()));
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: join(tmpdir(), 'ianua-lab-desktop.png'), fullPage: true });
  for (const width of [820, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}`);
    if (width < 801) {
      const menu = page.locator('button[aria-controls="home-nav"]');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      assert.equal(await menu.evaluate(element => element === document.activeElement), true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: join(tmpdir(), 'ianua-lab-mobile.png'), fullPage: true });
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: 'I nostri prodotti' }).click();
  await page.waitForURL('**/#ecosistema');
  await page.locator('#ecosistema').waitFor();
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: 'Lab', exact: true }).click();
  await page.waitForURL('**/lab');
  await page.reload();
  await page.getByRole('heading', { level: 1, name: 'Lab', exact: true }).waitFor();
  assert.equal(await page.locator('button[aria-controls="home-nav"]').getAttribute('aria-expanded'), 'false');
  assert.deepEqual(errors, []);
  console.log('PASS: navigation, 6 cards, 6 PDF responses, no GitHub links, metadata, responsive widths, Escape/focus, home section links, reload, no runtime errors.');
  console.log(`Screenshots: ${join(tmpdir(), 'ianua-lab-desktop.png')} and ${join(tmpdir(), 'ianua-lab-mobile.png')}`);
} finally {
  await browser.close();
}
