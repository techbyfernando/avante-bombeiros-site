import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const inventory = await readFile(join(root, 'CONTENT_INVENTORY.md'), 'utf8');
const official = [...inventory.matchAll(/^\|\s*(\d+)\s*\|\s*([^|]+)\s*\|\s*\[([^\]]+)\]\(([^)]+)\)/gm)].map(([, number, name, filename, sourcePath]) => ({
  number: Number(number), name: name.trim(), source: filename, sourcePath,
})).filter(item => item.number >= 1 && item.number <= 40);
if (official.length !== 40) throw new Error(`Esperados 40 parceiros da página oficial; encontrados ${official.length}`);
const slug = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const generatedSrc = (number, name) => `./images/partners/generated/${String(number).padStart(2, '0')}-${slug(name)}.png`;
const extras = ['Eureka Coworking', 'Meliá Hotels International', 'Mercado Livre', 'Summit Connect', 'Arena B3', 'Zenvia', 'Volvo', 'Teatro Santander', 'Rede D’Or', 'Omie', 'Casas Bahia']
  .map((name, index) => ({ number: 41 + index, name, src: generatedSrc(41 + index, name), darkCard: false }));
const extraCount = extras.length;
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const items = [];
official.forEach((item, index) => {
  item.src = generatedSrc(item.number, item.name);
  item.darkCard = false;
  items.push(item);
  if ((index + 1) % 4 === 0 && extras.length) items.push(extras.shift());
});
items.push(...extras);
if (new Set(items.map(item => item.name)).size !== items.length) throw new Error('Nomes duplicados no inventário');
const mark = (item, clone = false) => `<span class="partner-mark"${clone ? ' aria-hidden="true"' : ''}><img src="${esc(item.src)}" alt="${clone ? '' : esc(item.name)}" width="400" height="180" loading="lazy" decoding="async" /></span>`;
const row = (set, reverse = false) => `<div class="partner-marquee${reverse ? ' partner-marquee--reverse' : ''}"><div class="partner-track"><div class="partner-track-group">${set.map(item => mark(item)).join('')}</div><div class="partner-track-group" aria-hidden="true">${set.map(item => mark(item, true)).join('')}</div></div></div>`;
const section = `<section class="partners" id="parceiros" aria-labelledby="partners-title"><div class="partners-layout"><div class="partners-main"><div class="partners-heading"><span class="partners-kicker">CONFIANÇA CONSTRUÍDA EM CAMPO</span><h2 id="partners-title">Nossos parceiros</h2><p>Empresas e instituições presentes em nossas referências.</p></div><div class="partners-rows" aria-label="Marcas relacionadas à Avante">${row(items.slice(0, 26))}${row(items.slice(26), true)}</div><details class="partners-all"><summary>Ver todas as marcas</summary><ul>${items.map(item => `<li>${esc(item.name)}</li>`).join('')}</ul></details><p class="partners-source">Marcas presentes em nossas referências.</p></div></div></section>`;
const indexPath = join(root, 'index.html');
let html = await readFile(indexPath, 'utf8');
const start = html.indexOf('      <section class="partners"');
const oldEnd = html.indexOf('</section>', start) + '</section>'.length;
if (start < 0 || oldEnd < '</section>'.length) throw new Error('Seção partners não encontrada');
html = html.slice(0, start) + html.slice(oldEnd);
const fieldStart = html.indexOf('<section class="field');
const fieldEnd = html.indexOf('</section>', fieldStart) + '</section>'.length;
if (fieldStart < 0 || fieldEnd < '</section>'.length) throw new Error('Seção de atuação não encontrada');
html = html.slice(0, fieldEnd) + '\n\n      ' + section + html.slice(fieldEnd);
await writeFile(indexPath, html);
console.log(`${items.length} parceiros no carrossel: ${official.length} parceiros oficiais e ${extraCount} nomes da referência visual.`);



