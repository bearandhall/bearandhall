// src/pages/Home.tsx
import PageShell from '../components/PageShell';
import BreadcrumbStack from '../components/BreadcrumbStack';
import BlockCard from '../components/BlockCard';
import IntroBlock from '../components/IntroBlock';
import { INTROS } from '../content/intros';

const RS = '＼';

export default function Home() {
  return (
    <PageShell mobileBg="/img/covers/cover-monthly.png">
      {/* 데스크탑: 2단 그리드 / 모바일: 우측 블록만 보이도록 */}
      <div className="lg:grid lg:grid-cols-[520px_minmax(0,1fr)] gap-8 items-start "> 
        {/* 좌측 커버: 모바일에선 숨김 */}
        <div className="mobile-bg hidden lg:block h-[560px] overflow-hidden ">
          <img src="/img/covers/cover-home.png" className="w-full h-full object-cover" />
          
        </div>

        {/* 우측 블록(모바일에선 이것만 노출) */}
        <div className="right-col px-4 py-6 lg:px-0">
          <BreadcrumbStack items={[{label:'곰과회당', tone:'brand'}]} />
          <div className="mt-3">
            <IntroBlock tone="brand" text={INTROS.home} />
          </div>

          <div className="mt-8 space-y-3">
            <BlockCard tone="cat" to="/monthly">{RS} 월간 보수</BlockCard>
            <BlockCard tone="cat" to="/novels">{RS} 소설</BlockCard>
            <BlockCard tone="cat" to="/misc">{RS} 기타</BlockCard>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
