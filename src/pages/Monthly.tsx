// 예: src/pages/Monthly.tsx
import PageShell from '../components/PageShell';
import BreadcrumbStack from '../components/BreadcrumbStack';
import IntroBlock from '../components/IntroBlock';
import BlockCard from '../components/BlockCard';
import { INTROS } from '../content/intros';
import { MONTHLY_DYNAMIC } from '../content/build';
import { toMutableText } from '../utils/text';

const RS = '＼';

export default function Monthly(){
  return (
    <PageShell mobileBg="/img/covers/cover-monthly.png">
      <div className="lg:grid lg:grid-cols-[520px_minmax(0,1fr)] gap-8 items-start">
        <div className="hidden lg:block h-[560px] overflow-hidden">
          <img src="/img/covers/cover-monthly.png" className="w-full h-full object-cover" />
        </div>

        <div className="right-col px-4 py-6 lg:px-0">
          <BreadcrumbStack items={[
            {label:'곰과회당', tone:'brand', to:'/'},
            {label:`${RS} 월간 보수`, tone:'cat'}
          ]}/>
          <div className="mt-3">

            <IntroBlock tone="cat" text={toMutableText(INTROS.monthly)} />
          </div>
          

          <div className="mt-8 space-y-3">
            {MONTHLY_DYNAMIC.map(y=>(
              <BlockCard key={y.year} tone="year" to={`/monthly/${y.year}`}>
                {RS}{RS} {y.year}
              </BlockCard>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
