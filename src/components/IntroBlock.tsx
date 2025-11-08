// src/components/IntroBlock.tsx
type Tone = 'brand' | 'cat' | 'year' | 'issue' | 'article';

const bg: Record<Tone, string> = {
  brand: 'block-brand',
  cat: 'block-cat',
  year: 'block-year',
  issue: 'block-issue',
  article: 'block-article',
};

/** text: string | string[] | undefined 모두 안전하게 처리 */
export default function IntroBlock({
  tone = 'article',
  text,
}: {
  tone?: Tone;
  text?: string | string[];
}) {
  if (!text) return null;
  const body =
    Array.isArray(text) ? text.join('\n\n') : String(text);

  // [red]...[/red] 마크업만 빨간색으로
  const html = body
    .replace(/\[red\]/g, '<span style="color:#e11d48;">')
    .replace(/\[\/red\]/g, '</span>');

  return (
    <div className={`px-4 py-3 ${bg[tone]}`}>
      <div
        className="article-text"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
