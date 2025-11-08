import type { PropsWithChildren, CSSProperties } from 'react';

export default function PageShell({
  children,
  mobileBg,
  className = '',
}: PropsWithChildren<{ mobileBg?: string; className?: string }>) {
  // CSS 변수에만 이미지 경로를 싣는다
  const style: CSSProperties | undefined = mobileBg
    ? ({ ['--mobile-bg' as any]: `url(${mobileBg})` } as CSSProperties)
    : undefined;

  return (
    <div
      className={`min-h-screen ${mobileBg ? 'mobile-bg' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
