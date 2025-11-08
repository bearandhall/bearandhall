
// src/pages/Guro.tsx
export default function Guro() {
  return (
    <main className="page-full tone-guro bg-guro">
      {/* 좌측 내비 영역 배경 채우기 */}
      <div className="nav-rail-fill" />
      {/* 중앙에 단일 이미지 */}
      <img src="/img/nav/guropage.png" alt="guro" className="hero-img" />
    </main>
  );
}
