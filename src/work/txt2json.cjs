const fs = require('fs');
const path = require('path');

const input = process.argv[2];   // input .txt
const output = process.argv[3];  // output .json
const title = process.argv[4] || '제목 미상';

if (!input || !output) {
  console.error('usage: node scripts/txt2json.cjs "<input.txt>" "<output.json>" [title]');
  process.exit(1);
}

const raw = fs.readFileSync(input, 'utf-8')
  .replace(/\r/g, '\n')    // CR→LF
  .replace(/\u0000/g, '');

const paras = raw.split(/\n{2,}/).map(p => {
  // 단락 내부의 줄바꿈은 \n로 살리고, 좌우 공백만 최소화
  const lines = p.split(/\n/).map(s => s.replace(/[ \t]+$/g, '')).join('\n');
  return lines.trim();
}).filter(Boolean);

const data = {
  title,
  blocks: paras
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✔ Wrote ${output} (blocks=${paras.length})`);
