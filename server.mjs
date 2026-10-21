import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname);
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    const common = {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    };
    if (extname(file) === '.mp4') {
      const range = request.headers.range;
      const match = /^bytes=(\d*)-(\d*)$/.exec(range || '');
      const start = match ? (match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]))) : 0;
      const end = match && match[1] && match[2] ? Math.min(info.size - 1, Number(match[2])) : info.size - 1;
      if (range && (!match || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size)) {
        response.writeHead(416, { ...common, 'Content-Range': `bytes */${info.size}` }).end();
        return;
      }
      response.writeHead(match ? 206 : 200, {
        ...common,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        ...(match ? { 'Content-Range': `bytes ${start}-${end}/${info.size}` } : {}),
      });
      createReadStream(file, { start, end }).pipe(response);
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { ...common, 'Content-Length': body.length }).end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
  }
}).listen(port, '127.0.0.1', () => console.log(`Avante em http://127.0.0.1:${port}`));
