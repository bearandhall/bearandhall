// src/components/EdgeNav.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Key = 'home' | 'guro' | 'techme' | 'horse' | 'info';

export default function EdgeNav() {
  const [overlay, setOverlay] = useState<null | Key>(null);
  const isMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 1023px)').matches
    : true;

  const pageImg: Record<Key, string> = {
    home: '/img/pages/homepage.png',
    guro: '/img/pages/guropage.png',
    techme: '/img/pages/techmepage.png',
    horse: '/img/pages/horsepage.png',
    info: '/img/pages/infopage.png',
  };

  const overlayKeys: Key[] = ['guro', 'techme', 'horse'];

  const handleClick = (e: React.MouseEvent, k: Key) => {
    if (!isMobile) return;                 // 데스크탑: 라우팅 그대로
    if (overlayKeys.includes(k)) {
      e.preventDefault();                  // 모바일: 페이지 이동 막고
      setOverlay(k);                       // 중앙 오버레이만 띄움
    }
  };

  return (
    <>
      {/* 모바일 엣지 내브 */}
      <div className="pointer-events-none fixed inset-0 z-[60] lg:hidden">
        <Link to="/" onClick={(e)=>handleClick(e,'home')}
          className="pointer-events-auto edgebtn left-[-6px] top-2" aria-label="home">
          <img src="/img/nav/home.png" className="w-16 h-16" />
        </Link>

        <Link to="/guro" onClick={(e)=>handleClick(e,'guro')}
          className="pointer-events-auto edgebtn left-[-10px] bottom-28" aria-label="guro">
          <img src="/img/nav/guro.png" className="w-16 h-16" />
        </Link>

        <Link to="/techme" onClick={(e)=>handleClick(e,'techme')}
          className="pointer-events-auto edgebtn right-[-10px] top-24" aria-label="techme">
          <img src="/img/nav/techme.png" className="w-16 h-16" />
        </Link>

        <Link to="/horse" onClick={(e)=>handleClick(e,'horse')}
          className="pointer-events-auto edgebtn right-[-12px] bottom-24" aria-label="horse">
          <img src="/img/nav/horse.png" className="w-16 h-16" />
        </Link>

        <Link to="/info" onClick={(e)=>handleClick(e,'info')}
          className="pointer-events-auto edgebtn left-1/2 -translate-x-1/2 bottom-[-6px]" aria-label="info">
          <img src="/img/nav/info.png" className="w-16 h-16" />
        </Link>
      </div>

      {/* 모바일 중앙 오버레이 */}
      {overlay && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOverlay(null)}
        >
          <div className="pointer-events-auto p-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={pageImg[overlay]}
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/img/pages/placeholder.png'; }}
              alt={overlay}
              className="w-[88vw] max-w-[720px] h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
