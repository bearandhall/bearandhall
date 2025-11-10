// src/components/IntroBlock.tsx
import type { ReactNode } from 'react';

type Tone = 'brand' | 'cat' | 'year' | 'issue' | 'article';
const toneClass: Record<Tone, string> = {
  brand: 'block-brand',
  cat: 'block-cat',
  year: 'block-year',
  issue: 'block-issue',
  article: 'block-article',
};

type Props = {
  text: string | ReadonlyArray<string> | string[];
  tone?: Tone;
};

export default function IntroBlock({ text, tone = 'brand' }: Props) {
  // ✅ string으로 고정
  const raw: string = Array.isArray(text)
    ? (text as ReadonlyArray<string>).join('\n')
    : (text ?? '');

  const html = raw.replace(/\[red\](.*?)\[\/red\]/g, '<span class="hl-red">$1</span>');

  return (
    <div className={`block ${toneClass[tone]}`}>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
