
type Tone = 'brand' | 'cat' | 'year' | 'issue' | 'article';
const toneClass: Record<Tone, string> = {
  brand: 'block-brand',
  cat: 'block-cat',
  year: 'block-year',
  issue: 'block-issue',
  article: 'block-article',
};

type Props = {
  // ✅ readonly 배열도 허용
  // text: string | ReadonlyArray<string> | string[];
  text: string | readonly string[];
  tone?: Tone;
};

// function normalizeToString(input: string | ReadonlyArray<string> | string[]): string {
//   if (Array.isArray(input)) return [...input].join('\n'); // readonly → 복사 후 join
//   return input ?? '';
// }

function normalizeToString(input: string | readonly string[]): string {
  if (typeof input === 'string') {
    return input;
  }
  return input.join('\n');
}

export default function IntroBlock({ text, tone = 'brand' }: Props) {
  // ✅ 여기서 확실히 string으로 고정
  // const raw: string = normalizeToString(text);
   const raw = normalizeToString(text);
  const html = raw.replace(/\[red\](.*?)\[\/red\]/g, '<span class="hl-red">$1</span>');

  return (
    <div className={`block ${toneClass[tone]}`}>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
