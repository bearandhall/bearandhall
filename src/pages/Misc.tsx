import BreadcrumbStack from '../components/BreadcrumbStack';
import IntroBlock from '../components/IntroBlock';
import BlockCard from '../components/BlockCard';
import { INTROS } from '../content/intros';
import { MISC_DYNAMIC } from '../content/build';
// import PageShell from '../components/PageShell';
import { toMutableText } from '../utils/text';
const RS = '＼';

export default function Misc(){
  return (
    <div className="grid lg:grid-cols-[520px_minmax(0,1fr)] gap-8 items-start">
      <div className="left-col cover-tall hidden lg:block cover-tall">
        <img src="/img/covers/cover-misc.png" onError={e=>e.currentTarget.src='/img/covers/cover-monthly.png'} className="cover-img" alt=""/>
      </div>

      <div className="right-col">
        <BreadcrumbStack sticky items={[
          {label:'곰과회당', tone:'brand', to:'/'},
          {label:`${RS} 기타`, tone:'cat', to:'/misc'},
        ]}/>
        <div className="mt-4 space-y-0">
          {/* <IntroBlock tone="cat" text={INTROS.misc}/> */}
          <IntroBlock tone="cat" text={toMutableText(INTROS.monthly)} />
        </div>

        <div className="mt-6 space-y-0">
          {MISC_DYNAMIC.map(a=>(
            <BlockCard key={a.slug} tone="issue" to={`/misc/${a.slug}`}>
              {RS}{RS} {a.title}
            </BlockCard>
          ))}
        </div>
      </div>
    </div>
  );
}
