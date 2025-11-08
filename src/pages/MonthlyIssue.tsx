// src/pages/MonthlyIssue.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  const [view, setView] = useState<'pdf' | 'text'>(meta.pdf ? 'pdf' : 'text');
// ✅ 모바일 전용: PDF 열기/닫기
const [mShowPdf, setMShowPdf] = useState(false);
  const [session, setSession] = useState<{ grants: string[] } | null>(null);
  const [showUnlock, setShowUnlock] = useState(false);

  const refreshSession = () =>
    fetch('/api/session')
      .then((r) => (r.ok ? r.json() : { grants: [] }))
      .then(setSession)
      .catch(() => setSession({ grants: [] }));

  const isLocked = !!meta.locked && !!meta.lockId;
  useEffect(() => { if (isLocked) refreshSession(); }, [isLocked]);

  const issueKey = `/monthly/${year}/${issue}`;
  const allow = Array.isArray((meta as any).lockId) ? ((meta as any).lockId as string[]) : [];
  const locked = !!meta.locked && !hasGrant(issueKey);

  if (locked) {
    return (
      <>
        <div className="block block-article p-6">
          <p>🔒 이 글은 이메일 인증이 필요합니다.</p>
          <button className="btn mt-3" onClick={() => setShowUnlock(true)}>이메일로 열람하기</button>
        </div>
        {showUnlock && (
          <EmailUnlockModal
            lockKey={issueKey}
            allowList={allow}
            onSuccess={() => { setShowUnlock(false); /* 렌더 갱신은 상위에서 처리 */ }}
            onClose={() => setShowUnlock(false)}
          />
        )}
      </>
    );
  }

// ---------------- Normal render ----------------
return (
  <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
    {/* 좌측 */}
    <div className="hidden lg:flex flex-col min-h-[70vh] lg:sticky lg:top-6 lg:self-start">
      <BreadcrumbStack
        items={[
          { label: '곰과회당', tone: 'brand', to: '/' },
          { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
          { label: `${RS}${RS} ${year}`, tone: 'year', to: `/monthly/${year}` },
          { label: `${RS}${RS}${RS} ${issue}월호`, tone: 'issue' },
        ]}
      />

      {/* 좌측(데스크탑) 하단 액션 */}
      <div className="mt-auto pl-1 pt-4 space-y-3 text-base">
        {meta.pdf && (
          <a className="btn-link block" href={meta.pdf} target="_blank" rel="noreferrer">
            PDF 다운
          </a>
        )}
        {(meta as any).links?.length ? <LinksPanel links={(meta as any).links} /> : null}
      </div>
    </div>

    {/* 우측 */}
    <div className="pdf-col right-col">
      {/* ✅ 데스크탑: 토글 유지 */}
      {meta.pdf && (
        <div className="hidden lg:flex items-center gap-3 mb-3">
          <button
            className={`btn ${view === 'text' ? 'btn-ghost' : ''}`}
            onClick={() => setView('text')}
          >
            글로 보기
          </button>
          <button
            className={`btn ${view === 'pdf' ? 'btn-ghost' : ''}`}
            onClick={() => setView('pdf')}
          >
            PDF 보기
          </button>
        </div>
      )}

      {/* ✅ 데스크탑: 토글에 따른 렌더 */}
      <div className="hidden lg:block">
        {view === 'pdf' && meta.pdf ? (
          <div className="block block-article p-0 mb-4">
            <PdfEmbed src={meta.pdf} />
          </div>
        ) : null}

        {view === 'text' || !meta.pdf ? (
          <div className="block block-article">
            <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
          </div>
        ) : null}
      </div>

      {/* ✅ 모바일: 상단에 PDF 다운 버튼만 + 항상 텍스트 렌더 */}
      <div className="lg:hidden">
        {/* 상단 고정 브레드크럼(선택) */}
        <div className="sticky top-0 z-30 -mx-2 mb-2 bg-white/80 backdrop-blur">
          <BreadcrumbStack
            items={[
              { label: '곰과회당', tone: 'brand', to: '/' },
              { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
              { label: `${RS}${RS} ${year}`, tone: 'year', to: `/monthly/${year}` },
              { label: `${RS}${RS}${RS} ${issue}월호`, tone: 'issue' },
            ]}
          />
        </div>

        {meta.pdf && (
          <div className="mb-3">
            <a
              className="btn w-full"
              href={meta.pdf}
              target="_blank"
              rel="noreferrer"
            >
              PDF 다운
            </a>
          </div>
        )}

        <div className="block block-article">
          <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
        </div>
      </div>
    </div>
  </div>
);

}
