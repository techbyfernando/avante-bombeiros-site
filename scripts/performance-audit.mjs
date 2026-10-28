import { mkdir, writeFile } from 'node:fs/promises';
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
  response.setHeader('Cache-Control', 'no-store');
  createReadStream(file).on('error', () => { response.statusCode = 404; response.end(); }).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROME_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH } : {}),
});
const runs = [];

for (let index = 0; index < 10; index += 1) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__avanteLcp = 0;
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__avanteLcp = last.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
  await page.waitForTimeout(1300);
  runs.push(await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const navigation = performance.getEntriesByType('navigation')[0];
    const paints = Object.fromEntries(performance.getEntriesByType('paint').map(entry => [entry.name, entry.startTime]));
    const resources = performance.getEntriesByType('resource');
    const video = document.querySelector('.hero-video');
    const videoResource = resources.find(entry => entry.name.endsWith('/media/avante-hero-silent.mp4'));
    const scriptResources = resources.filter(entry => entry.initiatorType === 'script');
    return {
      domContentLoadedMs: navigation.domContentLoadedEventEnd,
      loadMs: navigation.loadEventEnd,
      firstContentfulPaintMs: paints['first-contentful-paint'] || 0,
      largestContentfulPaintMs: window.__avanteLcp || 0,
      resourceCount: resources.length,
      encodedBytes: resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),
      scriptsEncodedBytes: scriptResources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0),
      videoEncodedBytes: videoResource?.encodedBodySize || 0,
      videoResourceDurationMs: videoResource?.duration || 0,
      videoReadyState: video?.readyState || 0,
      videoPlaying: Boolean(video && !video.paused && video.currentTime > 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  }));
  await context.close();
}

await browser.close();
await new Promise(resolve => server.close(resolve));

const percentile = (values, fraction) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)];
};
const summarize = key => ({
  p50: Number(percentile(runs.map(run => run[key]), 0.5).toFixed(1)),
  p95: Number(percentile(runs.map(run => run[key]), 0.95).toFixed(1)),
  p99: Number(percentile(runs.map(run => run[key]), 0.99).toFixed(1)),
});
const report = {
  environment: 'Chrome headless, servidor HTTP local sem cache, viewport 1280x800, 10 execuções frias',
  hotPath: ['HTML local', 'CSS e JavaScript locais', 'vídeo MP4 local', 'parse/execução GSAP', 'layout e pintura no navegador'],
  latencyMs: {
    domContentLoaded: summarize('domContentLoadedMs'),
    load: summarize('loadMs'),
    firstContentfulPaint: summarize('firstContentfulPaintMs'),
    largestContentfulPaint: summarize('largestContentfulPaintMs'),
    videoResource: summarize('videoResourceDurationMs'),
  },
  resources: {
    requests: runs[0].resourceCount,
    encodedBytes: runs[0].encodedBytes,
    scriptsEncodedBytes: runs[0].scriptsEncodedBytes,
    videoEncodedBytes: runs[0].videoEncodedBytes,
  },
  correctness: {
    successfulRuns: runs.filter(run => run.videoPlaying && run.videoReadyState >= 2 && run.overflow <= 1).length,
    totalRuns: runs.length,
    retries: 0,
    failures: runs.filter(run => !run.videoPlaying || run.videoReadyState < 2 || run.overflow > 1).length,
  },
  notApplicable: ['provider/API response time', 'queue depth', 'cache hit rate', 'stream freshness'],
  runs,
};
await writeFile(join(output, 'performance-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (report.correctness.failures) throw new Error('Falha de correção no caminho crítico');
