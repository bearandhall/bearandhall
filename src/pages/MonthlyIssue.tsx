// src/pages/MonthlyIssue.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { hasGrant } from '../utils/grants';
import BreadcrumbStack from '../components/BreadcrumbStack';
import PdfEmbed from '../components/PdfEmbed';
import ArticleRenderer from '../components/ArticleRenderer';
import LinksPanel from '../components/LinksPanel';
import EmailUnlockModal from '../components/EmailUnlockModal';
import { MONTHLY_DYNAMIC } from '../content/build';

const RS = '＼';

export default function MonthlyIssue() {
  const { year, issue } = useParams<{ year: string; issue: string }>();
  const y = MONTHLY_DYNAMIC.find((yy) => String(yy.year) === year);
  const meta = y?.issues.find((i) => i.issue === issue);

  if (!meta) return <div className="p-6">글 없음</div>;

  // 데스크탑 토글
  const [view, setView] = useState<'pdf' | 'text'>(meta.pdf ? 'pdf' : 'text');

  // 🔐 로컬락 판정
  const issueKey = `/monthly/${year}/${issue}`;
  const allow = Array.isArray((meta as any).lockId) ? ((meta as any).lockId as string[]) : [];
  const locked = !!meta.locked && allow.length > 0 && !hasGrant(issueKey);
  const [showUnlock, setShowUnlock] = useState(false);

  if (locked) {
    return (
      <>
        <div className="block block-article p-6">
          <p>🔒 이 글은 이메일 인증이 필요합니다.</p>
          <button className="btn mt-3" onClick={() => setShowUnlock(true)}>
            이메일로 열람하기
          </button>
        </div>
        {showUnlock && (
          <EmailUnlockModal
            lockKey={issueKey}
            allowList={allow}
            onSuccess={() => {
              setShowUnlock(false);
              // hasGrant(issueKey) 가 true 로 바뀌었으므로 컴포넌트가 리렌더되며 본문 노출
            }}
            onClose={() => setShowUnlock(false)}
          />
        )}
      </>
    );
  }

  // 🔓 일반 렌더
  return (
    <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
      {/* 좌측 스택(데스크탑 sticky는 class로 제어) */}
      <div className="left-col flex flex-col min-h-[70vh] lg:sticky lg:top-6 lg:self-start">
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
            <a className="btn-link block" href={meta.pdf} target="_blank" rel="noreferrer">
              PDF 다운
            </a>
          )}
          {(meta as any).links?.length ? <LinksPanel links={(meta as any).links} /> : null}
        </div>
      </div>

      {/* 우측 본문 */}
      <div className="pdf-col right-col">
        {meta.pdf && (
          <div className="hidden lg:flex items-center gap-3 mb-3">
            <button className={`btn ${view === 'text' ? 'btn-ghost' : ''}`} onClick={() => setView('text')}>
              글로 보기
            </button>
            <button className={`btn ${view === 'pdf' ? 'btn-ghost' : ''}`} onClick={() => setView('pdf')}>
              PDF 보기
            </button>
          </div>
        )}

        <div className="hidden lg:block">
          {view === 'pdf' && meta.pdf ? (
            <div className="block block-article p-0">
              <PdfEmbed src={meta.pdf} />
            </div>
          ) : (
            <div className="block block-article">
              <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
            </div>
          )}
        </div>

        <div className="lg:hidden block block-article">
          <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
        </div>
      </div>
    </div>
  );
}
