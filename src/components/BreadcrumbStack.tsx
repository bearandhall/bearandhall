// src/components/BreadcrumbStack.tsx
import { Link } from 'react-router-dom';

type Tone = 'brand' | 'cat' | 'year' | 'issue' | 'article';
const toneClass: Record<Tone, string> = {
  brand: 'block-brand',
  cat: 'block-cat',
  year: 'block-year',
  issue: 'block-issue',
  article: 'block-article',
};

export default function BreadcrumbStack({
  items,
  inline,
  sticky,
}: {
  items: { label: string; tone: Tone; to?: string }[];
  inline?: boolean;  // 모바일 가로바용
  sticky?: boolean;  // top 고정
}) {
  const wrapSticky = sticky ? 'sticky top-0 z-30' : '';
  if (inline) {
    // 모바일 가로바 (여백 최소화)
    return (
      <div className={`${wrapSticky} flex gap-1 p-1`}>
        {items.map((it, i) => {
          const cls = `px-2 py-1 ${toneClass[it.tone]}`;
          return it.to ? (
            <Link key={i} className={cls} to={it.to}>{it.label}</Link>
          ) : (
            <div key={i} className={cls}>{it.label}</div>
          );
        })}
      </div>
    );
  }
  // 데스크탑 세로 스택 (여백 최소화)
  return (
    <div className={`${wrapSticky} space-y-1`}>
      {items.map((it, i) => {
        const cls = `w-full px-4 py-3 ${toneClass[it.tone]}`;
        return it.to ? (
          <Link key={i} className={cls} to={it.to}>{it.label}</Link>
        ) : (
          <div key={i} className={cls}>{it.label}</div>
        );
      })}
    </div>
  );
}
