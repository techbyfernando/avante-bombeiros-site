import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const input = join(root, 'dist');
const output = join(root, '.vercel-source');
const payload = join(output, 'payload');
const chunksRoot = join(output, '.chunks');
const maxPartSize = 480 * 1024;
const manifest = [];

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else result.push(path);
  }
  return result;
}

await rm(output, { recursive: true, force: true });
await mkdir(payload, { recursive: true });
for (const file of await walk(input)) {
  const path = relative(input, file).replaceAll('\\', '/');
  const data = await readFile(file);
  if (data.length <= maxPartSize) {
    const target = join(payload, path);
    await mkdir(dirname(target), { recursive: true });
    await cp(file, target);
    continue;
  }
  const id = manifest.length.toString().padStart(3, '0');
  const chunks = [];
  for (let offset = 0, index = 0; offset < data.length; offset += maxPartSize, index++) {
    const chunkPath = `.chunks/${id}/${index.toString().padStart(3, '0')}.part`;
    const target = join(output, chunkPath);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, data.subarray(offset, Math.min(offset + maxPartSize, data.length)));
    chunks.push(chunkPath);
  }
  manifest.push({ path, chunks });
}

await writeFile(join(output, 'manifest.json'), JSON.stringify(manifest));
await writeFile(join(output, 'package.json'), JSON.stringify({ private: true, type: 'module', scripts: { build: 'node build.mjs' } }, null, 2));
await writeFile(join(output, 'build.mjs'), `import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
const root = process.cwd();
const target = join(root, 'dist');
await rm(target, { recursive: true, force: true });
await cp(join(root, 'payload'), target, { recursive: true });
const manifest = JSON.parse(await readFile(join(root, 'manifest.json'), 'utf8'));
for (const entry of manifest) {
  const parts = await Promise.all(entry.chunks.map(path => readFile(join(root, path))));
  const file = join(target, entry.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, Buffer.concat(parts));
}
console.log('Site reconstruído com ' + manifest.length + ' arquivo(s) segmentado(s).');
`);
console.log(`Fonte Vercel preparada: ${manifest.length} arquivo(s) acima de ${maxPartSize} bytes foram segmentados.`);
