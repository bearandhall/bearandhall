import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

type Key = 'home' | 'guro' | 'techme' | 'horse' | 'info';

export default function EdgeNav() {
  const refs: Record<Key, React.RefObject<HTMLAnchorElement>> = {
    home: useRef(null),
    guro: useRef(null),
    techme: useRef(null),
    horse: useRef(null),
    info: useRef(null),
  };

  const [overlay, setOverlay] = useState<null | Key>(null);

  const isMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 1023px)').matches
    : true;

  // 중앙에 띄울 페이지 이미지(루트 경로 사용)
  const pageImg: Record<Key, string> = {
    home: '/img/pages/homepage.png',
    guro: '/img/pages/guropage.png',
    techme: '/img/pages/techmepage.png',
    horse: '/img/pages/horsepage.png',
    info: '/img/pages/infopage.png',
  };

  // 모바일에서 오버레이만 띄울 대상
  const overlayKeys: Key[] = ['guro', 'techme', 'horse'];

  const handleClick = (e: React.MouseEvent, k: Key) => {
    if (!isMobile) return; // 데스크탑: 그대로 이동
    if (overlayKeys.includes(k)) {
      e.preventDefault();   // 이동 막고
      setOverlay(k);        // 중앙 오버레이 표시
    }
    // home, info 는 모바일에서도 그대로 이동 (e.preventDefault 안 함)
  };

  return (
    <>
      {/* 모바일 엣지 내브(데스크탑 숨김) */}
      <div className="pointer-events-none fixed inset-0 z-[60] lg:hidden">
        <Link
          ref={refs.home}
          to="/"
          onClick={(e) => handleClick(e, 'home')}
          className="pointer-events-auto edgebtn left-[-6px] top-2"
          aria-label="home"
        >
          <img src="/img/nav/home.png" className="w-16 h-16" />
        </Link>

        <Link
          ref={refs.guro}
          to="/guro"
          onClick={(e) => handleClick(e, 'guro')}
          className="pointer-events-auto edgebtn left-[-10px] bottom-28"
          aria-label="guro"
        >
          <img src="/img/nav/guro.png" className="w-16 h-16" />
        </Link>

        <Link
          ref={refs.techme}
          to="/techme"
          onClick={(e) => handleClick(e, 'techme')}
          className="pointer-events-auto edgebtn right-[-10px] top-24"
          aria-label="techme"
        >
          <img src="/img/nav/techme.png" className="w-16 h-16" />
        </Link>

        <Link
          ref={refs.horse}
          to="/horse"
          onClick={(e) => handleClick(e, 'horse')}
          className="pointer-events-auto edgebtn right-[-12px] bottom-24"
          aria-label="horse"
        >
          <img src="/img/nav/horse.png" className="w-16 h-16" />
        </Link>

        <Link
          ref={refs.info}
          to="/info"
          onClick={(e) => handleClick(e, 'info')}
          className="pointer-events-auto edgebtn left-1/2 -translate-x-1/2 bottom-[-6px]"
          aria-label="info"
        >
          <img src="/img/nav/info.png" className="w-16 h-16" />
        </Link>
      </div>

      {/* 📱 모바일 전용 중앙 오버레이 (guro/techme/horse 전용) */}
      {overlay && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOverlay(null)}
        >
          <div className="pointer-events-auto p-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={pageImg[overlay]}
              onError={(e) => (e.currentTarget.src = '/img/pages/placeholder.png')}
              alt={overlay}
              className="w-[88vw] max-w-[720px] h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
