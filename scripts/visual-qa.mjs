import { mkdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { chromium } from 'playwright';

const root = join(import.meta.dirname, '..');
const output = join(root, 'qa');
await mkdir(output, { recursive: true });
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname === '/' ? '/index.html' : new URL(request.url, 'http://127.0.0.1').pathname);
  const file = join(root, pathname.replace(/^\//, ''));
  const extension = file.slice(file.lastIndexOf('.'));
  response.setHeader('Content-Type', mime[extension] ?? 'application/octet-stream');
  createReadStream(file).on('error', () => { response.statusCode = 404; response.end(); }).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROME_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH } : {}),
});
const viewports = [
  { name: 'phone-320', width: 320, height: 720 },
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'wide-1920', width: 1920, height: 1080 },
];
const results = [];
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const errors = [];
  page.on('console', message => {
    if (message.type() !== 'error') return;
    const value = message.text();
    // Kaspersky injects a local browser helper in the test profile. The site CSP
    // correctly blocks it; it is outside the application and not a site defect.
    if (value.includes('gc.kes.v2.scr.kaspersky-labs.com') || value.includes("directive 'connect-src' contains the keyword 'none'")) return;
    errors.push(value);
  });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach(image => { image.loading = 'eager'; image.src = image.src; });
    await Promise.allSettled(images.map(image => image.decode()));
  });
  await page.locator('#solucoes').scrollIntoViewIfNeeded();
  await page.locator('#tab-eventos').click();
  await page.waitForTimeout(550);
  await page.locator('#parceiros').scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  const metrics = await page.evaluate(() => {
    const directory = document.querySelector('.service-directory');
    const marks = [...document.querySelectorAll('.partner-track-group:first-child .partner-mark img')];
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
      partnerCount: marks.length,
      uniquePartnerSources: new Set(marks.map(image => image.currentSrc)).size,
      directoryWidth: Math.round(directory?.getBoundingClientRect().width ?? 0),
      directoryLinks: directory ? [...directory.children].map(link => ({ width: Math.round(link.getBoundingClientRect().width), height: Math.round(link.getBoundingClientRect().height) })) : [],
      activePanel: document.querySelector('.service-panel:not([hidden])')?.id,
      hasSplitText: Boolean(document.querySelector('.gsap-word')),
      hasFlipRail: Boolean(document.querySelector('.service-active-rail')),
    };
  });
  await page.screenshot({ path: join(output, `${viewport.name}.png`), fullPage: true });
  results.push({ viewport: viewport.name, errors, ...metrics });
  await context.close();
}
await browser.close();
await new Promise(resolve => server.close(resolve));
const defects = results.flatMap(result => [
  ...(result.errors.length ? [`${result.viewport}: ${result.errors.join(' | ')}`] : []),
  ...(result.overflow > 1 ? [`${result.viewport}: overflow horizontal ${result.overflow}px`] : []),
  ...(result.brokenImages.length ? [`${result.viewport}: ${result.brokenImages.length} imagens quebradas`] : []),
  ...(result.partnerCount !== 51 || result.uniquePartnerSources !== 51 ? [`${result.viewport}: parceiros ${result.partnerCount}/${result.uniquePartnerSources}`] : []),
  ...(result.directoryLinks.some(link => link.height < 44 || link.width > result.directoryWidth + 1) ? [`${result.viewport}: diretório fora do alvo responsivo`] : []),
  ...(result.activePanel !== 'panel-eventos' ? [`${result.viewport}: troca de serviço falhou`] : []),
  ...(!result.hasSplitText || !result.hasFlipRail ? [`${result.viewport}: integração GSAP incompleta`] : []),
]);
console.log(JSON.stringify(results, null, 2));
if (defects.length) throw new Error(defects.join('\n'));
