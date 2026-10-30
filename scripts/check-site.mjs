import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = (await readdir(root)).filter(name => name.endsWith('.html'));
const expected = ['index.html', 'brigada-de-incendio-nr23.html', 'plano-de-abandono.html', 'auto-de-vistoria-avcb-clcb.html', 'bombeiro-civil-terceirizacao.html', 'eventos.html', 'treinamentos.html', 'orientacao-socioeducativa.html', 'blog.html'];
for (const slug of expected) if (!files.includes(slug)) throw new Error(`Rota ausente: ${slug}`);
let links = 0;
for (const file of files) {
  const html = await readFile(join(root, file), 'utf8');
  if (/href=["']https?:\/\/(?:www\.)?avantebombeiros\.com\//i.test(html)) throw new Error(`Link ao site antigo em ${file}`);
  for (const [, attr, ref] of html.matchAll(/\b(href|src)=["'](\.\/[^"']+)["']/g)) {
    const path = ref.split(/[?#]/)[0];
    const target = resolve(dirname(join(root, file)), path);
    if (!target.startsWith(root)) throw new Error(`Caminho fora do projeto em ${file}: ${ref}`);
    await stat(target).catch(() => { throw new Error(`Arquivo ausente em ${file}: ${attr}=${ref}`); });
    links++;
  }
}
const home = await readFile(join(root, 'index.html'), 'utf8');
const hero = home.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0] || '';
if (hero.includes('class="hero-photo"') || /\bposter=/.test(hero)) throw new Error('Fallback visual ou poster ainda presente no vídeo do hero');
if (hero.includes('hero-side-note')) throw new Error('Nota vertical redundante ainda presente no hero');
if (!/class="hero-video"[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/.test(hero)) throw new Error('Vídeo do hero precisa iniciar mudo e em loop inline');
if ([...hero.matchAll(/<source\b/g)].length !== 1) throw new Error('Fonte do vídeo do hero ausente ou duplicada');
const directoryCount = [...home.matchAll(/<nav class="service-directory"[\s\S]*?<\/nav>/g)].flatMap(match => [...match[0].matchAll(/<a\b/g)]).length;
if (directoryCount !== 7) throw new Error(`Esperados 7 serviços na grade; encontrados ${directoryCount}`);
const blog = await readFile(join(root, 'blog.html'), 'utf8');
if (!blog.includes('blog-card--featured')) throw new Error('Artigo principal do blog sem destaque editorial');
if ([...blog.matchAll(/<article class="blog-card/g)].length !== 7) throw new Error('O blog precisa manter as 7 publicações oficiais nativas');
const coverageTerms = {
  'brigada-de-incendio-nr23.html': ['Unidade móvel', 'Atribuições da brigada', 'dimensionamento'],
  'plano-de-abandono.html': ['Plano de abandono: evacuação segura', 'Um plano para o seu espaço', 'Preparação e atualização'],
  'auto-de-vistoria-avcb-clcb.html': ['Via Fácil Bombeiros', 'Sistemas avaliados', 'ART/RRT'],
  'bombeiro-civil-terceirizacao.html': ['Atuação operacional', 'Soluções complementares', 'controle de fumaça'],
  'eventos.html': ['Recepcionistas bilíngues', 'limpeza e conservação', 'rh@avantebombeiros.com'],
  'treinamentos.html': ['NR-35', 'NR-33', 'baterias de íons de lítio'],
  'orientacao-socioeducativa.html': ['Conselho Tutelar', 'Cidade Protetora', '61.426/2022'],
};
for (const [file, terms] of Object.entries(coverageTerms)) {
  const html = await readFile(join(root, file), 'utf8');
  if ([...html.matchAll(/class="inner-coverage-grid"/g)].length !== 1 || [...html.matchAll(/<article>/g)].length < 6) throw new Error(`Cobertura editorial incompleta em ${file}`);
  for (const term of terms) if (!html.toLocaleLowerCase('pt-BR').includes(term.toLocaleLowerCase('pt-BR'))) throw new Error(`Conteúdo oficial ausente em ${file}: ${term}`);
}
const partnerList = home.match(/<details class="partners-all">([\s\S]*?)<\/details>/)?.[1] || '';
const partnerNames = [...partnerList.matchAll(/<li>/g)].length;
if (partnerNames !== 51) throw new Error(`Esperados 51 nomes de parceiros; encontrados ${partnerNames}`);
if (/partners-mascot|partner-card/.test(home)) throw new Error('Elemento antigo de mascote ou cartão de parceiro ainda está na página');
const partnerMarks = [...home.matchAll(/class="partner-mark(?: partner-mark--dark)?"/g)].length;
if (partnerMarks !== 102) throw new Error(`Esperados 102 elementos do carrossel (51 marcas e 51 clones); encontrados ${partnerMarks}`);
const partnerImages = [...home.matchAll(/<span class="partner-mark(?: partner-mark--dark)?"[^>]*><img src="([^\"]+)" alt="([^\"]*)"/g)];
if (partnerImages.length !== 102) throw new Error(`Esperadas 102 imagens no carrossel; encontradas ${partnerImages.length}`);
const uniquePartnerImages = new Set(partnerImages.map(([,src]) => src));
if (uniquePartnerImages.size !== 51) throw new Error(`Esperados 51 arquivos de logos distintos; encontrados ${uniquePartnerImages.size}`);
if (/partner-wordmark/.test(home)) throw new Error('Ainda há wordmarks tipográficos no carrossel; cada parceiro precisa de um arquivo de imagem');
if (partnerImages.filter(([, , alt]) => alt).length !== 51) throw new Error('Cada marca principal precisa de texto alternativo; clones devem permanecer decorativos');
if ([...uniquePartnerImages].some(src => !src.startsWith('./images/partners/generated/'))) throw new Error('Todos os parceiros devem usar os novos arquivos transparentes normalizados');
for (const plugin of ['gsap.min.js', 'ScrollTrigger.min.js', 'SplitText.min.js', 'Flip.min.js']) {
  if (!home.includes(`./vendor/${plugin}`)) throw new Error(`Integração GSAP ausente: ${plugin}`);
  await stat(join(root, 'vendor', plugin));
}
for (const interaction of ['ScrollTrigger', 'SplitText', 'Flip']) if (!home.includes(interaction) && !(await readFile(join(root, 'main.js'), 'utf8')).includes(interaction)) throw new Error(`Interação GSAP não encontrada: ${interaction}`);
const responsiveCss = await readFile(join(root, 'styles.css'), 'utf8');
if (responsiveCss.includes('.hero-photo')) throw new Error('CSS ainda mantém imagem de fallback do hero');
for (const width of [1100, 900, 800, 700, 600, 360]) {
  if (!responsiveCss.includes(`@media(max-width:${width}px)`)) throw new Error(`Breakpoint responsivo ausente: ${width}px`);
}
if (!responsiveCss.includes('@media(prefers-reduced-motion:reduce)')) throw new Error('Tratamento de movimento reduzido ausente');
const video = await readFile(join(root, 'media', 'avante-hero-silent.mp4'));
if (!video.includes(Buffer.from('vide'))) throw new Error('Vídeo hero sem trilha de imagem detectável');
if (video.includes(Buffer.from('soun'))) throw new Error('Vídeo hero ainda contém identificador de trilha de áudio');
for (const file of files) {
  const html = await readFile(join(root, file), 'utf8');
  if (!html.includes('./theme.js') || !html.includes('./theme.css') || !html.includes('class="theme-toggle"')) throw new Error(`Tema não integrado em ${file}`);
  if (/[↗↘↓↑←✳]/u.test(html)) throw new Error(`Ícone Unicode/emoji encontrado em ${file}; use SVG inline para manter consistência móvel`);
}
console.log(`${files.length} páginas HTML, ${links} referências locais válidas, vídeo sem trilha de áudio, tema claro/escuro integrado, breakpoints verificados, ${partnerNames} parceiros com logos em imagem no carrossel.`);
