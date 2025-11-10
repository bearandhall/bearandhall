import BreadcrumbStack from '../components/BreadcrumbStack';
import IntroBlock from '../components/IntroBlock';
import BlockCard from '../components/BlockCard';
import { INTROS } from '../content/intros';
import { NOVELS_DYNAMIC } from '../content/build';
// import PageShell from '../components/PageShell';
import { toMutableText } from '../utils/text';
const RS = '＼';

export default function Novels(){
  return (
    
    <div className="grid lg:grid-cols-[520px_minmax(0,1fr)] gap-8 items-start">
      <div className="left-col cover-tall hidden lg:block cover-tall">
        <img src="/img/covers/cover-novels.png" onError={e=>e.currentTarget.src='/img/covers/cover-monthly.png'} className="cover-img" alt=""/>
      </div>

      <div className="right-col">
        <BreadcrumbStack sticky items={[
          {label:'곰과회당', tone:'brand', to:'/'},
          {label:`${RS} 소설`, tone:'cat', to:'/novels'},
        ]}/>
        <div className="mt-4 space-y-0">
          {/* <IntroBlock tone="cat" text={INTROS.novels}/> */}
          <IntroBlock tone="cat" text={toMutableText(INTROS.monthly)} />
        </div>
        <div className="mt-6 space-y-0">
          {NOVELS_DYNAMIC.map(a=>(
            <BlockCard key={a.slug} tone="issue" to={`/novels/${a.slug}`}>
              {RS}{RS} {a.title}
            </BlockCard>
          ))}
        </div>
      </div>
    </div>
  );
}
