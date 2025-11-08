type Props = { text: string | string[] };

export default function IntroBlock({ text }: Props) {
  const raw = Array.isArray(text) ? text.join('\n') : (text || '');
  const html = raw.replace(/\[red\](.*?)\[\/red\]/g, '<span class="hl-red">$1</span>');

  return (
    <div className="block block-brand"> {/* ← 배경/패딩/모서리 상자 */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
