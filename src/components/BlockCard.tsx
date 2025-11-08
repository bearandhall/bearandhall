import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export default function BlockCard({
  tone, to, children, right, onClick,
}: {
  tone: 'brand' | 'cat' | 'year' | 'issue' | 'article',
  to?: string,
  right?: ReactNode,
  children: ReactNode,
  onClick?: () => void
}) {
  const base = `block ${toneToCls(tone)} flex items-center justify-between`;
  const inner = (
    <div className={base} onClick={onClick}>
      <div>{children}</div>
      {right ? <div className="ml-4 shrink-0">{right}</div> : null}
    </div>
  );
  return to ? <Link to={to} className="block">{inner}</Link> : inner;
}

function toneToCls(t: string) {
  return t === 'brand' ? 'block-brand'
    : t === 'cat' ? 'block-cat'
    : t === 'year' ? 'block-year'
    : t === 'issue' ? 'block-issue'
    : 'block-article';
}
