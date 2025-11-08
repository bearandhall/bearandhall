type Sticker = { src: string; alt?: string };

const stickers: Sticker[] = [
  { src: "/img/info/st1.png", alt: "sticker" },
  { src: "/img/info/st2.png" },
  { src: "/img/info/st3.png" },
  { src: "/img/info/st4.png" },
  { src: "/img/info/st5.png" },
  { src: "/img/info/st6.png" },
  { src: "/img/info/st7.png" },
    { src: "/img/info/st8.png" },
      { src: "/img/info/st9.png" },
        { src: "/img/info/st10.png" },
          { src: "/img/info/st11.png" },
            { src: "/img/info/st12.png" }
];

export default function Info() {
  return (
    <section className="relative min-h-screen bg-[#efefef] overflow-hidden">
      {/* 상단 띠 */}
      <div className="absolute top-3 left-0 right-0 flex justify-center gap-3 pointer-events-none">
        {stickers.map((s, i) => (
          <img key={`t-${i}`} src={s.src} alt={s.alt ?? "sticker"} className="h-12 w-auto" />
        ))}
      </div>

      {/* 좌측 띠 */}
      <div className="absolute top-0 bottom-0 left-3 flex flex-col justify-center gap-3 pointer-events-none">
        {stickers.map((s, i) => (
          <img key={`l-${i}`} src={s.src} alt={s.alt ?? "sticker"} className="h-12 w-auto" />
        ))}
      </div>

      {/* 우측 띠 */}
      <div className="absolute top-0 bottom-0 right-3 flex flex-col justify-center gap-3 pointer-events-none">
        {stickers.map((s, i) => (
          <img key={`r-${i}`} src={s.src} alt={s.alt ?? "sticker"} className="h-12 w-auto" />
        ))}
      </div>

      {/* 하단 띠 */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 pointer-events-none">
        {stickers.map((s, i) => (
          <img key={`b-${i}`} src={s.src} alt={s.alt ?? "sticker"} className="h-12 w-auto" />
        ))}
      </div>

      {/* 중앙 카드 */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-10 bg-white shadow-md mt-28 mb-28">
        <h1 className="text-2xl font-semibold mb-4">INFO</h1>
        <p className="leading-8">
          곰과 회당 홈페이지의 제작자 관련 정보

        </p>

        <ul className="mt-6 space-y-2 leading-7">
<li>제작자 : 유령2
</li>
<li>게재된 글의 저자 : 유령2
</li>
<li>디자인 : 유령2
</li>
<li>소셜네트워크 : <a target="_blank" href="https://www.instagram.com/devil_tree_man/">@devil_tree_man</a>
</li>
<li>이메일 주소 : srbin9444@gmail.com
</li>
<li>본 사이트는 안산시나 구로구와 아무런 관련이 없습니다.
</li>
<li>
  본 사이트는 데스크탑 버전에 최적화 되어있습니다.
</li>

        </ul>
      </div>
    </section>
  );
}
