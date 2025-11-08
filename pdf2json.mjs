import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// args
const input = process.argv[2];
const output = process.argv[3];
const modeArg = process.argv.find(a => a.startsWith('--mode=')) || '--mode=paragraph';
const MODE = modeArg.split('=')[1]; // 'paragraph' | 'lines'

if (!input || !output) {
  console.error('usage: node scripts/pdf2json.mjs "<input.pdf>" "<output.json>" --mode=paragraph|lines');
  process.exit(1);
}

const inAbs  = path.resolve(process.cwd(), input);
const outAbs = path.resolve(process.cwd(), output);
if (!fs.existsSync(inAbs)) {
  console.error('❌ Input PDF not found:', inAbs);
  process.exit(1);
}
console.log('📄 Input :', inAbs);
console.log('📝 Output:', outAbs);

// ✅ Buffer → Uint8Array 로 변환해서 전달
const buf = fs.readFileSync(inAbs);
const data = new Uint8Array(buf);

const loadingTask = pdfjs.getDocument({
  data,
  isEvalSupported: false,
  useWorkerFetch: false,
   disableWorker: true,  
  disableFontFace: true,
});
const pdf = await loadingTask.promise;

let extracted = '';
for (let p = 1; p <= pdf.numPages; p++) {
  const page = await pdf.getPage(p);
  const content = await page.getTextContent();
  const lines = content.items
    .map(it => ('str' in it ? it.str : ''))
    .filter(Boolean);
  extracted += lines.join('\n') + '\n\n'; // 페이지 끝에 빈 줄 추가
}

// ---- 공백만 정리(내용은 수정 X) ----
let normalized = extracted
  .replace(/\r/g, '\n')
  .replace(/\t/g, ' ')
  .replace(/\u0000/g, '');

function toBlocksParagraph(t) {
  const raw = t.split(/\n{2,}/); // 빈 줄 = 단락
  return raw
    .map(p => p.split(/\n+/).map(s => s.trim()).filter(Boolean).join(' ')) // 단락 내부 줄바꿈 → 공백
    .map(s => s.replace(/ {2,}/g, ' '))
    .filter(Boolean);
}

function toBlocksLines(t) {
  const raw = t.split(/\n{2,}/);
  return raw
    .map(p => p.split(/\n+/).map(s => s.replace(/[ \t]+$/g, '')).join('\n').trim()) // 줄바꿈 유지
    .filter(Boolean);
}

const blocks = (MODE === 'lines') ? toBlocksLines(normalized) : toBlocksParagraph(normalized);
const firstLine = (blocks[0] || '').split('\n')[0].trim();
const title = firstLine.slice(0, 120) || '제목 미상';

const json = { title, blocks };
fs.mkdirSync(path.dirname(outAbs), { recursive: true });
fs.writeFileSync(outAbs, JSON.stringify(json, null, 2), 'utf-8');

console.log(`✔ Wrote ${outAbs} (blocks=${blocks.length}, mode=${MODE})`);
