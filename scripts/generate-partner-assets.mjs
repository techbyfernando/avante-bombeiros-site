import { mkdir, readFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'file:///C:/Users/FernandodePaulaRodri/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';

const root = join(import.meta.dirname, '..');
const inventory = await readFile(join(root, 'CONTENT_INVENTORY.md'), 'utf8');
const official = [...inventory.matchAll(/^\|\s*(\d+)\s*\|\s*([^|]+)\s*\|\s*\[([^\]]+)\]\(([^)]+)\)/gm)]
  .map(([, number, name, filename, sourcePath]) => ({
    number: Number(number),
    name: name.trim(),
    sourcePath: sourcePath.replaceAll('\\', '/'),
  }))
  .filter(item => item.number >= 1 && item.number <= 40);

if (official.length !== 40) throw new Error(`Esperados 40 parceiros oficiais; encontrados ${official.length}`);

const preferred = new Map([
  [1, 'research/partner-highres/center-norte.png'],
  [8, 'images/partners/08-shopping-granja-vianna.png'],
  [11, 'images/partners/11-cbsi-solucoes-em-servicos.svg'],
  [17, 'research/partner-highres/electrolux.png'],
  [18, 'images/partners/18-shopping-west-plaza.png'],
  [19, 'images/partners/19-shopping-internacional-de-guarulhos.png'],
  [22, 'images/partners/22-3-coracoes.png'],
  [30, 'images/partners/30-voke.svg'],
  [32, 'images/partners/32-lar-de-maria.png'],
  [35, 'images/partners/35-transamerica-expo-center.png'],
  [39, 'images/partners/39-sgs.png'],
]);

const extras = [
  ['Eureka Coworking', 'images/partners/extra-eureka-coworking.png'],
  ['Meliá Hotels International', 'images/partners/extra-melia-hotels-international.png'],
  ['Mercado Livre', 'images/partners/extra-mercado-livre.png'],
  ['Summit Connect', 'images/partners/extra-summit-connect.png'],
  ['Arena B3', 'images/partners/extra-arena-b3.png'],
  ['Zenvia', 'images/partners/extra-zenvia.svg'],
  ['Volvo', 'images/partners/extra-volvo.png'],
  ['Teatro Santander', 'images/partners/extra-teatro-santander.png'],
  ['Rede D’Or', 'images/partners/extra-rede-dor.png'],
  ['Omie', 'images/partners/extra-omie.png'],
  ['Casas Bahia', 'research/partner-highres/casas-bahia.svg'],
].map(([name, sourcePath], index) => ({ number: 41 + index, name, sourcePath }));

const slug = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const destinationDir = join(root, 'images', 'partners', 'generated');
await mkdir(destinationDir, { recursive: true });

function inferBackground(data, width, height, channels) {
  const samples = [];
  const push = (x, y) => {
    const i = (y * width + x) * channels;
    if (data[i + 3] < 245) return;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  };
  for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 60))) { push(x, 0); push(x, height - 1); }
  for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 60))) { push(0, y); push(width - 1, y); }
  if (!samples.length) return null;
  return [0, 1, 2].map(channel => samples.map(pixel => pixel[channel]).sort((a, b) => a - b)[Math.floor(samples.length / 2)]);
}

function removeConnectedBackground(data, width, height, channels) {
  const background = inferBackground(data, width, height, channels);
  if (!background) return data;
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = new Uint32Array(total);
  let head = 0;
  let tail = 0;
  const distance = index => {
    const i = index * channels;
    const dr = data[i] - background[0];
    const dg = data[i + 1] - background[1];
    const db = data[i + 2] - background[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };
  const enqueue = index => {
    if (visited[index] || data[index * channels + 3] < 8 || distance(index) > 74) return;
    visited[index] = 1;
    queue[tail++] = index;
  };
  for (let x = 0; x < width; x++) { enqueue(x); enqueue((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { enqueue(y * width); enqueue(y * width + width - 1); }
  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (y) enqueue(index - width);
    if (y + 1 < height) enqueue(index + width);
  }
  for (let index = 0; index < total; index++) {
    if (!visited[index]) continue;
    const i = index * channels;
    const dist = distance(index);
    const alpha = Math.max(0, Math.min(255, Math.round((dist - 7) / 50 * 255)));
    if (alpha <= 0) {
      data[i + 3] = 0;
      continue;
    }
    const opacity = alpha / 255;
    for (let channel = 0; channel < 3; channel++) {
      data[i + channel] = Math.max(0, Math.min(255, Math.round((data[i + channel] - background[channel] * (1 - opacity)) / opacity)));
    }
    data[i + 3] = Math.min(data[i + 3], alpha);
  }
  return data;
}

function removeWhiteEverywhere(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    if (min < 198 || max - min > 25) continue;
    data[i + 3] = Math.min(data[i + 3], Math.max(0, Math.round((255 - min) / 48 * 255)));
  }
  return data;
}

function recolorOpaque(data, channels, color) {
  for (let i = 0; i < data.length; i += channels) {
    if (data[i + 3] < 8) continue;
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
  }
  return data;
}

function keepLightForeground(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    const matte = Math.max(0, Math.min(255, Math.round((luminance - 118) / 82 * 255)));
    data[i + 3] = Math.min(data[i + 3], matte);
  }
  return data;
}

function clearTopRegion(data, width, height, channels, ratio) {
  const limit = Math.floor(height * ratio) * width * channels;
  for (let i = 3; i < limit; i += channels) data[i] = 0;
  return data;
}

async function render(item) {
  const selected = preferred.get(item.number) ?? item.sourcePath;
  const source = join(root, selected);
  const isVector = extname(source).toLowerCase() === '.svg';
  const decoded = await sharp(source, isVector ? { density: 420 } : undefined).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const edgeTransparency = (() => {
    let transparent = 0;
    let total = 0;
    const alphaAt = (x, y) => decoded.data[(y * decoded.info.width + x) * decoded.info.channels + 3];
    for (let x = 0; x < decoded.info.width; x++) {
      transparent += alphaAt(x, 0) < 245 ? 1 : 0;
      transparent += alphaAt(x, decoded.info.height - 1) < 245 ? 1 : 0;
      total += 2;
    }
    for (let y = 1; y + 1 < decoded.info.height; y++) {
      transparent += alphaAt(0, y) < 245 ? 1 : 0;
      transparent += alphaAt(decoded.info.width - 1, y) < 245 ? 1 : 0;
      total += 2;
    }
    return transparent / Math.max(total, 1);
  })();
  let clean = edgeTransparency > 0.82 ? decoded.data : removeConnectedBackground(decoded.data, decoded.info.width, decoded.info.height, decoded.info.channels);
  if (item.number === 36 || item.number === 41) clean = removeWhiteEverywhere(clean, decoded.info.channels);
  if (item.number === 42 || item.number === 47) clean = removeWhiteEverywhere(clean, decoded.info.channels);
  if (item.number === 49) clean = clearTopRegion(keepLightForeground(clean, decoded.info.channels), decoded.info.width, decoded.info.height, decoded.info.channels, 0.34);
  if (item.number === 30) clean = recolorOpaque(clean, decoded.info.channels, [18, 35, 51]);
  if (item.number === 42) clean = recolorOpaque(clean, decoded.info.channels, [52, 52, 52]);
  if (item.number === 45) clean = recolorOpaque(clean, decoded.info.channels, [23, 37, 68]);
  if (item.number === 46) clean = recolorOpaque(clean, decoded.info.channels, [31, 24, 46]);
  if (item.number === 47) clean = recolorOpaque(clean, decoded.info.channels, [13, 60, 120]);
  if (item.number === 49) clean = recolorOpaque(clean, decoded.info.channels, [25, 83, 143]);
  const output = `${String(item.number).padStart(2, '0')}-${slug(item.name)}.png`;
  const canvasWidth = 1600;
  const canvasHeight = 720;
  let markPipeline = sharp(clean, { raw: decoded.info })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
    .resize({ width: 1320, height: 500, fit: 'inside', kernel: sharp.kernel.lanczos3, withoutEnlargement: false });
  const mark = await markPipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer();
  const metadata = await sharp(mark).metadata();
  const left = Math.max(0, Math.floor((canvasWidth - metadata.width) / 2));
  const top = Math.max(0, Math.floor((canvasHeight - metadata.height) / 2));
  const destination = join(destinationDir, output);
  await sharp({ create: { width: canvasWidth, height: canvasHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: mark, left, top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(destination);
  const stats = await sharp(destination).stats();
  const alpha = stats.channels[3];
  if (!alpha || alpha.min !== 0 || alpha.max < 180) throw new Error(`${item.name}: transparência ou conteúdo visível inválido`);
  return { ...item, output, source: selected, width: canvasWidth, height: canvasHeight };
}

const manifest = [];
for (const item of [...official, ...extras]) manifest.push(await render(item));
console.log(JSON.stringify(manifest, null, 2));
console.error(`${manifest.length} logos normalizados em PNG RGBA ${manifest[0].width}×${manifest[0].height}.`);
