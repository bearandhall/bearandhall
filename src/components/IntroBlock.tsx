// src/components/IntroBlock.tsx
- import type { ReactNode } from 'react'; // ← 안 쓰면 삭제

type Tone = 'brand' | 'cat';

export default function IntroBlock({
  tone = 'cat',
  text,
}: {
  tone?: Tone;
  text?: string | string[] | ReadonlyArray<string>;
}) {
  const blocks = typeof text === 'string' ? [text] : Array.from(text ?? []);
  return (
    <div className={`block ${tone === 'brand' ? 'block-brand' : 'block-cat'}`}>
      <div className="space-y-4">
        {blocks.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}
