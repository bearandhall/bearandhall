type Tone = 'brand' | 'cat' | 'year' | 'issue';

type Props = {
  text: string | string[] | ReadonlyArray<string>;
  tone?: Tone;          // ← 배경/톤
  className?: string;   // ← 필요 시 추가 클래스
};

export default function IntroBlock({ text, tone = 'brand', className }: Props) {
  const raw  = Array.isArray(text) ? text.join('\n') : (text || '');
  const html = raw.replace(/\[red\](.*?)\[\/red\]/g, '<span class="hl-red">$1</span>');

  // tone → 대응하는 블록 클래스
  const toneClass =
    tone === 'cat'   ? 'block-cat'   :
    tone === 'year'  ? 'block-year'  :
    tone === 'issue' ? 'block-issue' : 'block-brand';

  return (
    <div className={`block ${toneClass} ${className ?? ''}`}>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
