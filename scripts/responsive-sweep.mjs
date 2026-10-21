import { mkdir, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { chromium } from 'file:///C:/Users/FernandodePaulaRodri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const root = join(import.meta.dirname, '..');
const output = join(root, 'qa', 'responsive');
await mkdir(output, { recursive: true });
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const file = join(root, pathname.replace(/^\//, ''));
  response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
  createReadStream(file).on('error', () => { response.statusCode = 404; response.end(); }).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

const homeViewports = [
  [280, 653], [300, 667], [320, 568], [320, 720], [360, 640], [375, 667], [390, 844], [412, 915], [430, 932],
  [480, 800], [540, 720], [600, 800], [640, 720], [700, 820], [768, 1024], [800, 600], [820, 680], [834, 1112],
  [912, 1368], [1024, 600], [1100, 700], [1179, 760], [1180, 760], [1280, 720], [1366, 768], [1440, 900], [1600, 900], [1920, 1080],
];
const routes = [
  'brigada-de-incendio-nr23.html', 'plano-de-abandono.html', 'auto-de-vistoria-avcb-clcb.html',
  'bombeiro-civil-terceirizacao.html', 'eventos.html', 'treinamentos.html',
  'orientacao-socioeducativa.html', 'blog.html',
];
const defects = [];
const report = { homepage: [], routes: [] };

function addDefect(scope, condition, message) {
  if (condition) defects.push(`${scope}: ${message}`);
}

for (const [width, height] of homeViewports) {
  const scope = `index ${width}x${height}`;
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  await page.evaluate(() => {
    if (document.documentElement.dataset.theme !== 'dark') document.querySelector('.theme-toggle')?.click();
  });
  await page.waitForTimeout(80);
  const metrics = await page.evaluate(() => {
    const contrast = (foreground, background) => {
      const rgb = value => (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
      const luminance = value => {
        const [r, g, b] = rgb(value).map(channel => {
          const v = channel / 255;
          return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
        });
        return .2126 * r + .7152 * g + .0722 * b;
      };
      const a = luminance(foreground);
      const b = luminance(background);
      return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    };
    const rect = selector => document.querySelector(selector)?.getBoundingClientRect();
    const title = rect('.hero h1');
    const titleElement = document.querySelector('.hero h1');
    const firstLineRange = document.createRange();
    if (titleElement?.firstChild) firstLineRange.selectNodeContents(titleElement.firstChild);
    const firstLine = titleElement?.firstChild ? firstLineRange.getBoundingClientRect() : null;
    const description = rect('.hero-description');
    const hero = rect('.hero');
    const directory = rect('.service-directory');
    const links = [...document.querySelectorAll('.service-directory a')].map(link => {
      const r = link.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width };
    });
    const overflowers = [...document.querySelectorAll('body *')].filter(element => {
      const r = element.getBoundingClientRect();
      return r.width > 0 && (r.right > document.documentElement.clientWidth + 1 || r.left < -1);
    }).slice(0, 8).map(element => `${element.tagName.toLowerCase()}.${element.className}`);
    const faqLabel = document.querySelector('.faq .eyebrow-pill');
    const darkFaqContrast = faqLabel ? contrast(getComputedStyle(faqLabel).color, getComputedStyle(faqLabel.closest('.faq')).backgroundColor) : 0;
    const partners = document.querySelector('.partners');
    const darkPartnersBackground = partners ? getComputedStyle(partners).backgroundColor : '';
    const darkPartnersContrast = partners ? contrast(getComputedStyle(partners).color, darkPartnersBackground) : 0;
    return {
      scrollOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      title: title && { left: title.left, right: title.right, top: title.top, bottom: title.bottom, width: title.width },
      titleInk: firstLine && { left: firstLine.left, right: firstLine.right, width: firstLine.width },
      titleContentOverflow: titleElement ? titleElement.scrollWidth - titleElement.clientWidth : 0,
      description: description && { top: description.top, bottom: description.bottom },
      hero: hero && { top: hero.top, bottom: hero.bottom, height: hero.height },
      directory: directory && { left: directory.left, right: directory.right, width: directory.width },
      links,
      overflowers,
      darkFaqContrast,
      darkPartnersBackground,
      darkPartnersContrast,
      ctaText: document.querySelector('.inner-cta h2')?.textContent.trim() ?? '',
    };
  });
  addDefect(scope, errors.length, `erros JavaScript: ${errors.join(' | ')}`);
  addDefect(scope, metrics.scrollOverflow > 1, `overflow horizontal de ${metrics.scrollOverflow}px (${metrics.overflowers.join(', ')})`);
  addDefect(scope, !metrics.title || metrics.title.left < -1 || metrics.title.right > width + 1, 'título do hero fora do viewport');
  addDefect(scope, !metrics.titleInk || metrics.titleInk.left < 12 || metrics.titleInk.right > width - 12, 'glifos da primeira linha do hero sem margem segura');
  addDefect(scope, metrics.titleContentOverflow > 1, `conteúdo tipográfico do hero excede a caixa em ${metrics.titleContentOverflow}px`);
  addDefect(scope, metrics.title && metrics.description && metrics.title.bottom > metrics.description.top + 1, 'título do hero sobrepõe a descrição');
  addDefect(scope, metrics.hero && metrics.description && metrics.description.bottom > metrics.hero.bottom - 55, 'conteúdo do hero invade o rodapé');
  addDefect(scope, metrics.darkFaqContrast < 4.5, `rótulo de FAQ sem contraste no tema escuro (${metrics.darkFaqContrast.toFixed(2)}:1)`);
  addDefect(scope, metrics.darkPartnersBackground !== 'rgb(17, 25, 27)', `parceiros não acompanha o tema escuro (${metrics.darkPartnersBackground})`);
  addDefect(scope, metrics.darkPartnersContrast < 4.5, `parceiros sem contraste no tema escuro (${metrics.darkPartnersContrast.toFixed(2)}:1)`);
  addDefect(scope, metrics.directory && metrics.links.some(link => link.left < metrics.directory.left - 1 || link.right > metrics.directory.right + 1 || link.width < 90), 'item do diretório fora da grade');
  report.homepage.push({ width, height, errors, ...metrics });
  if ([[320, 568], [390, 844], [768, 1024], [1280, 720], [1920, 1080]].some(v => v[0] === width && v[1] === height)) {
    await page.screenshot({ path: join(output, `index-${width}x${height}.png`), fullPage: true });
  }
  await context.close();
}

for (const route of routes) {
  for (const [width, height] of [[280, 653], [320, 568], [390, 844], [768, 1024], [1024, 600], [1280, 720], [1920, 1080]]) {
    const scope = `${route} ${width}x${height}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${port}/${route}`, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.getBoundingClientRect();
      const cta = document.querySelector('.inner-cta h2');
      const overflowers = [...document.querySelectorAll('body *')].filter(element => {
        const r = element.getBoundingClientRect();
        return r.width > 0 && (r.right > document.documentElement.clientWidth + 1 || r.left < -1);
      }).slice(0, 8).map(element => `${element.tagName.toLowerCase()}.${element.className}`);
      return {
        scrollOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: h1 && { left: h1.left, right: h1.right, width: h1.width, height: h1.height },
        ctaText: cta?.textContent.trim() ?? '',
        ctaBackground: cta ? getComputedStyle(cta.closest('.inner-cta')).backgroundColor : '',
        overflowers,
      };
    });
    addDefect(scope, errors.length, `erros JavaScript: ${errors.join(' | ')}`);
    addDefect(scope, metrics.scrollOverflow > 1, `overflow horizontal de ${metrics.scrollOverflow}px (${metrics.overflowers.join(', ')})`);
    addDefect(scope, !metrics.h1 || metrics.h1.left < -1 || metrics.h1.right > width + 1, 'título principal fora do viewport');
    if (route !== 'blog.html') {
      addDefect(scope, metrics.ctaText !== 'Vamos planejar a segurança do seu espaço?', 'convite final alterado ou ausente');
      addDefect(scope, metrics.ctaBackground === 'rgb(255, 98, 103)', 'CTA final ainda usa o fundo salmão antigo');
    }
    report.routes.push({ route, width, height, errors, ...metrics });
    await context.close();
  }
}

await browser.close();
await new Promise(resolve => server.close(resolve));
await writeFile(join(output, 'report.json'), JSON.stringify({ defects, ...report }, null, 2));
console.log(`Varredura concluída: ${homeViewports.length} viewports da home e ${report.routes.length} combinações de páginas.`);
if (defects.length) throw new Error(defects.join('\n'));
console.log('Sem overflow, sobreposição ou quebra de alinhamento nos cenários testados.');
