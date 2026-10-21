import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = join(import.meta.dirname, '..');
const output = join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const entries = await readdir(root, { withFileTypes: true });
const rootFiles = entries
  .filter(entry => entry.isFile() && (extname(entry.name) === '.html' || ['styles.css', 'inner.css', 'theme.css', 'theme.js', 'main.js'].includes(entry.name)))
  .map(entry => entry.name);

await Promise.all([
  ...rootFiles.map(file => cp(join(root, file), join(output, file))),
  ...['images', 'media', 'vendor'].map(directory => cp(join(root, directory), join(output, directory), { recursive: true })),
]);

console.log(`Build de produção concluído: ${rootFiles.length} arquivos raiz e 3 diretórios de mídia em dist/.`);
