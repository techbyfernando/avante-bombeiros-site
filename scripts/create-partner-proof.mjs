import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const directory = new URL('../images/partners/generated/', import.meta.url);
const files = (await readdir(directory)).filter(file => file.endsWith('.png')).sort();
const columns = 5;
const cellWidth = 300;
const cellHeight = 200;
const composites = [];
for (let index = 0; index < files.length; index++) {
  const left = index % columns * cellWidth;
  const top = Math.floor(index / columns) * cellHeight;
  const logo = await sharp(fileURLToPath(new URL(files[index], directory))).resize({ width: 250, height: 130, fit: 'inside' }).png().toBuffer();
  const metadata = await sharp(logo).metadata();
  composites.push({ input: logo, left: left + Math.floor((cellWidth - metadata.width) / 2), top: top + 12 + Math.floor((130 - metadata.height) / 2) });
  const label = files[index].replace(/^\d+-/, '').replace(/\.png$/, '');
  const caption = Buffer.from(`<svg width="280" height="36" xmlns="http://www.w3.org/2000/svg"><text x="140" y="21" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#20282a">${label}</text></svg>`);
  composites.push({ input: caption, left: left + 10, top: top + 158 });
}
await mkdir(new URL('../qa/', import.meta.url), { recursive: true });
await sharp({
  create: {
    width: columns * cellWidth,
    height: Math.ceil(files.length / columns) * cellHeight,
    channels: 4,
    background: '#f3f3ef',
  },
}).composite(composites).png().toFile(fileURLToPath(new URL('../qa/partner-logos-sheet.png', import.meta.url)));
console.log(`${files.length} logos renderizados na prancha de inspeção.`);
