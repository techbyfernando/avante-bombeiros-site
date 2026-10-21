import { readFile, writeFile } from 'node:fs/promises';

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Uso: node scripts/strip-audio.mjs entrada.mp4 saida.mp4');
const data = await readFile(input);

function boxes(start, end) {
  const result = [];
  for (let at = start; at + 8 <= end;) {
    let size = data.readUInt32BE(at);
    const type = data.toString('ascii', at + 4, at + 8);
    let header = 8;
    if (size === 1) { size = Number(data.readBigUInt64BE(at + 8)); header = 16; }
    if (size === 0) size = end - at;
    if (!Number.isSafeInteger(size) || size < header || at + size > end) throw new Error(`MP4 inválido: ${type} em ${at}`);
    result.push({ at, size, type, start: at + header, end: at + size });
    at += size;
  }
  return result;
}

const moov = boxes(0, data.length).find(box => box.type === 'moov');
if (!moov) throw new Error('Átomo moov ausente');
let removed = 0;
for (const trak of boxes(moov.start, moov.end).filter(box => box.type === 'trak')) {
  const mdia = boxes(trak.start, trak.end).find(box => box.type === 'mdia');
  const hdlr = mdia && boxes(mdia.start, mdia.end).find(box => box.type === 'hdlr');
  if (hdlr && data.toString('ascii', hdlr.start + 8, hdlr.start + 12) === 'soun') {
    // A free box has the exact same byte length, preserving every video chunk offset.
    data.write('free', trak.at + 4, 4, 'ascii');
    data.fill(0, trak.start, trak.end);
    removed++;
  }
}
if (removed === 0) console.log('Nenhuma trilha de áudio encontrada; copiando vídeo original.');
await writeFile(output, data);
const remaining = boxes(moov.start, moov.end).filter(box => box.type === 'trak').some(trak => {
  const mdia = boxes(trak.start, trak.end).find(box => box.type === 'mdia');
  const hdlr = mdia && boxes(mdia.start, mdia.end).find(box => box.type === 'hdlr');
  return hdlr && data.toString('ascii', hdlr.start + 8, hdlr.start + 12) === 'soun';
});
if (remaining) throw new Error('Falha: trilha de áudio remanescente');
console.log(`${removed} trilha(s) de áudio removida(s); arquivo sem trilha de áudio: ${output}`);
