import { mkdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { chromium } from 'playwright';

const root = join(import.meta.dirname, '..');
const output = join(root, 'qa', 'critical');
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
const { port } = server.address();
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
const routes = [
  'brigada-de-incendio-nr23.html', 'plano-de-abandono.html', 'auto-de-vistoria-avcb-clcb.html',
  'bombeiro-civil-terceirizacao.html', 'eventos.html', 'treinamentos.html',
  'orientacao-socioeducativa.html', 'blog.html',
];
const report = { homepage: [], routes: [] };

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
  const top = await page.evaluate(() => {
    const title = document.querySelector('.hero h1').getBoundingClientRect();
    const titleElement = document.querySelector('.hero h1');
    const firstLineRange = document.createRange();
    firstLineRange.selectNodeContents(titleElement.firstChild);
    const titleInk = firstLineRange.getBoundingClientRect();
    const splitLines = [...titleElement.querySelectorAll('.gsap-line')];
    const splitWords = [...titleElement.querySelectorAll('.gsap-word')];
    const description = document.querySelector('.hero-description').getBoundingClientRect();
    const video = document.querySelector('.hero-video');
    const floating = getComputedStyle(document.querySelector('.floating-contact'));
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      titleBottom: Math.round(title.bottom),
      descriptionTop: Math.round(description.top),
      titleWidth: Math.round(title.width),
      titleInkLeft: Math.round(titleInk.left),
      titleInkRight: Math.round(titleInk.right),
      titleContentOverflow: titleElement.scrollWidth - titleElement.clientWidth,
      titleFontSize: getComputedStyle(document.querySelector('.hero h1')).fontSize,
      splitLineOverflow: splitLines.map(line => getComputedStyle(line).overflow),
      splitWordsInsideViewport: splitWords.every(word => {
        const rect = word.getBoundingClientRect();
        return rect.left >= 12 && rect.right <= document.documentElement.clientWidth - 12;
      }),
      sideNoteCount: document.querySelectorAll('.hero-side-note').length,
      floatingVisibleAtTop: floating.visibility !== 'hidden' || Number(floating.opacity) > 0.01,
      video: { paused: video.paused, muted: video.muted, loop: video.loop, readyState: video.readyState, currentTime: Number(video.currentTime.toFixed(2)) },
    };
  });
  await page.screenshot({ path: join(output, `${viewport.name}-hero.png`) });
  await page.locator('#solucoes').scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  const services = await page.evaluate(() => {
    const tab = document.querySelector('.service-tab');
    const number = tab.querySelector('.service-num').getBoundingClientRect();
    const text = tab.childNodes[2]?.parentElement ? [...tab.children].find(el => !el.classList.contains('service-num') && !el.classList.contains('service-arrow') && !el.classList.contains('service-active-rail')) : null;
    const directoryLinks = [...document.querySelectorAll('.service-directory a')];
    const directoryRect = document.querySelector('.service-directory').getBoundingClientRect();
    const linkRects = directoryLinks.map(link => link.getBoundingClientRect());
    const floating = getComputedStyle(document.querySelector('.floating-contact'));
    return {
      numberOffset: Math.round(number.x - tab.getBoundingClientRect().x),
      directoryAligned: linkRects.every(rect => rect.left >= directoryRect.left - 1 && rect.right <= directoryRect.right + 1 && rect.width >= 90),
      directoryX: Math.round(directoryRect.x),
      floatingVisibleAfterHero: floating.visibility === 'visible' && Number(floating.opacity) > 0.99,
    };
  });
  await page.screenshot({ path: join(output, `${viewport.name}-services.png`) });
  report.homepage.push({ viewport: viewport.name, ...top, ...services });
  await context.close();
}

for (const route of routes) {
  for (const viewport of [{ name: 'phone-390', width: 390, height: 844 }, { name: 'desktop-1280', width: 1280, height: 800 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${port}/${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const images = [...document.images];
      images.forEach(image => { image.loading = 'eager'; image.src = image.src; });
      await Promise.allSettled(images.map(image => image.decode()));
    });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Visible: Boolean(document.querySelector('h1')?.getBoundingClientRect().height),
      brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).length,
      coverageGroups: document.querySelectorAll('.inner-coverage-grid article').length,
    }));
    report.routes.push({ route, viewport: viewport.name, errors, ...result });
    await context.close();
  }
}

await browser.close();
await new Promise(resolve => server.close(resolve));
const defects = [
  ...report.homepage.flatMap(item => [
    ...(item.overflow > 1 ? [`${item.viewport}: overflow ${item.overflow}`] : []),
    ...(item.titleBottom > item.descriptionTop ? [`${item.viewport}: título do hero invade a descrição`] : []),
    ...(item.titleInkLeft < 12 || item.titleInkRight > Number(item.viewport.match(/\d+/)?.[0] ?? 0) - 12 ? [`${item.viewport}: glifos do hero sem margem segura`] : []),
    ...(item.titleContentOverflow > 1 ? [`${item.viewport}: conteúdo tipográfico excede a caixa`] : []),
    ...(item.splitLineOverflow.some(value => value !== 'visible') ? [`${item.viewport}: máscara ainda recorta os glifos do hero`] : []),
    ...(!item.splitWordsInsideViewport ? [`${item.viewport}: palavra animada do hero sai da margem segura`] : []),
    ...(item.sideNoteCount ? [`${item.viewport}: nota vertical ainda presente`] : []),
    ...(item.floatingVisibleAtTop ? [`${item.viewport}: CTA flutuante visível no hero`] : []),
    ...(!item.floatingVisibleAfterHero ? [`${item.viewport}: CTA flutuante não aparece após o hero`] : []),
    ...(!item.directoryAligned ? [`${item.viewport}: diretório desalinhado`] : []),
    ...(item.video.paused || !item.video.muted || !item.video.loop || item.video.readyState < 2 || item.video.currentTime <= 0 ? [`${item.viewport}: vídeo não está em reprodução contínua`] : []),
  ]),
  ...report.routes.flatMap(item => [
    ...(item.errors.length ? [`${item.route}/${item.viewport}: ${item.errors.join(' | ')}`] : []),
    ...(item.overflow > 1 ? [`${item.route}/${item.viewport}: overflow ${item.overflow}`] : []),
    ...(!item.h1Visible ? [`${item.route}/${item.viewport}: título invisível`] : []),
    ...(item.brokenImages ? [`${item.route}/${item.viewport}: ${item.brokenImages} imagens quebradas`] : []),
    ...(item.route !== 'blog.html' && item.coverageGroups !== 3 ? [`${item.route}/${item.viewport}: cobertura editorial incompleta`] : []),
  ]),
];
console.log(JSON.stringify(report, null, 2));
if (defects.length) throw new Error(defects.join('\n'));
