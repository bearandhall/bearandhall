import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { MONTHLY_DYNAMIC } from '../content/build';
import BreadcrumbStack from '../components/BreadcrumbStack';
import PdfEmbed from '../components/PdfEmbed';
import ArticleRenderer from '../components/ArticleRenderer';
import LinksPanel from '../components/LinksPanel';
import { hasGrant } from '../utils/grants';
import EmailUnlockModal from '../components/EmailUnlockModal';

const RS = '＼';

export default function MonthlyIssue() {
  const { year, issue } = useParams<{ year: string; issue: string }>();
  const y = MONTHLY_DYNAMIC.find(yy => String(yy.year) === year);
  const meta = y?.issues.find(i => i.issue === issue);
  if (!meta) return <div className="p-6">글 없음</div>;

  const [view, setView] = useState<'pdf' | 'text'>(meta.pdf ? 'pdf' : 'text');

  // 잠금 검사(로컬 grant 방식)
  const lockKey = `/monthly/${year}/${issue}`;
  const allow   = Array.isArray((meta as any).lockId) ? ((meta as any).lockId as string[]) : [];
  const locked  = !!meta.locked && !hasGrant(lockKey);

  if (locked) {
    return (
      <>
        <div className="block block-article p-6">
          <p>🔒 이 글은 이메일 인증이 필요합니다.</p>
          <UnlockButton />
        </div>
        <EmailUnlockModal
          lockKey={lockKey}
          allowList={allow}
          onSuccess={() => location.reload()}
          onClose={() => {}}
        />
      </>
    );
  }

  return (
    <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">

      {/* 모바일 상단 고정 */}
      <div className="lg:hidden sticky top-0 z-30 -mx-2 mb-2 bg-white/80 backdrop-blur">
        <BreadcrumbStack
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
            { label: `${RS}${RS} ${year}`, tone: 'year', to: `/monthly/${year}` },
            { label: `${RS}${RS}${RS} ${issue}월호`, tone: 'issue' },
          ]}
        />
        {meta.pdf && (
          <div className="px-2 pb-2">
            <a className="btn w-full" href={meta.pdf} target="_blank" rel="noreferrer">PDF 다운</a>
          </div>
        )}

      </div>

      {/* 데스크탑 좌측 고정 */}
      <div className="hidden lg:flex flex-col min-h-[70vh] lg:sticky lg:top-6 lg:self-start">
        <BreadcrumbStack
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
            { label: `${RS}${RS} ${year}`, tone: 'year', to: `/monthly/${year}` },
            { label: `${RS}${RS}${RS} ${issue}월호`, tone: 'issue' },
          ]}
        />
        <div className="mt-auto pl-1 pt-4 space-y-3 text-base">
          {meta.pdf && (
            <a className="btn-link block" href={meta.pdf} target="_blank" rel="noreferrer">PDF 다운</a>
          )}
          {(meta as any).links?.length ? <LinksPanel links={(meta as any).links}/> : null}
        </div>
      </div>

      {/* 우측 본문 */}
      <div className="right-col">
        {/* 데스크탑 토글 */}
        {meta.pdf && (
          <div className="hidden lg:flex items-center gap-3 mb-3">
            <button className={`btn ${view === 'text' ? 'btn-ghost' : ''}`} onClick={() => setView('text')}>글로 보기</button>
            <button className={`btn ${view === 'pdf' ? 'btn-ghost' : ''}`} onClick={() => setView('pdf')}>PDF 보기</button>
          </div>
        )}

        {/* 데스크탑: 토글 */}
        <div className="hidden lg:block">
          {view === 'pdf' && meta.pdf
            ? <div className="block block-article p-0"><PdfEmbed src={meta.pdf} /></div>
            : <div className="block block-article"><ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} /></div>}
        </div>

        {/* 모바일: 항상 텍스트 */}
        <div className="lg:hidden block block-article">
          <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
        </div>
      </div>
    </div>
  );
}

function UnlockButton(){
  return <button className="btn mt-3" onClick={()=>document.dispatchEvent(new CustomEvent('open-unlock'))}>이메일로 열람하기</button>;
}
