// src/pages/Guro.tsx
export default function Horse() {
  return (
    <main className="page-full tone-horse bg-horse">
      {/* 좌측 내비 영역 배경 채우기 */}
      <div className="nav-rail-fill" />
      {/* 중앙에 단일 이미지 */}
      <img src="/img/nav/horsepage.png" alt="horse" className="hero-img" />
    </main>
  );
}
