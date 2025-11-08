

  // src/components/IntroBlock.tsx
import type { ReactNode } from 'react';

type Tone = 'brand' | 'cat';

export default function IntroBlock({
  tone = 'cat',
  text,
}: {
  tone?: Tone;
  text?: string | string[] | ReadonlyArray<string>;
}) {
  // string이면 배열로 감싸고, 배열/readonly 배열이면 Array.from으로 복사
  const blocks = typeof text === 'string' ? [text] : Array.from(text ?? []);

  return (
    <div className={`block ${tone === 'brand' ? 'block-brand' : 'block-cat'}`}>
      <div className="space-y-4">
        {blocks.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}
