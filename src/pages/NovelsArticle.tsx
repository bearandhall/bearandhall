import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { NOVELS_DYNAMIC } from '../content/build';
import BreadcrumbStack from '../components/BreadcrumbStack';
import PdfEmbed from '../components/PdfEmbed';
import ArticleRenderer from '../components/ArticleRenderer';
import LinksPanel from '../components/LinksPanel';

const RS = '＼';

export default function NovelsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const meta = NOVELS_DYNAMIC.find((a) => a.slug === slug);
  if (!meta) return <div className="p-6">글 없음</div>;

  const [view, setView] = useState<'pdf' | 'text'>(meta.pdf ? 'pdf' : 'text');

  return (
    <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
      {/* 🔒 모바일 상단 고정 헤더: 그리드의 최상단에 독립 배치 */}
      <div className="lg:hidden sticky top-0 z-30 -mx-2 mb-2 bg-white/80 backdrop-blur">
        <BreadcrumbStack
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 소설`, tone: 'cat', to: '/novels' },
            { label: `${RS}${RS} ${meta.title}`, tone: 'issue' },
          ]}
        />
        {meta.pdf && (
          <div className="px-2 pb-2">
            <a className="btn w-full" href={meta.pdf} target="_blank" rel="noreferrer">
              PDF 다운
            </a>
          </div>
        )}
      </div>

      {/* 데스크탑 좌측(고정) */}
      <div className="hidden lg:flex flex-col min-h-[70vh] lg:sticky lg:top-6 lg:self-start">
        <BreadcrumbStack
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 소설`, tone: 'cat', to: '/novels' },
            { label: `${RS}${RS} ${meta.title}`, tone: 'issue' },
          ]}
        />
        <div className="mt-auto pl-1 pt-4 space-y-2">
          {meta.pdf && (
            <a className="btn-link block" href={meta.pdf} target="_blank" rel="noreferrer">
              PDF 다운
            </a>
          )}
          {!!(meta as any).links?.length && <LinksPanel links={(meta as any).links} />}
        </div>
      </div>

      {/* 오른쪽 본문 */}
      <div className="right-col">
        {/* 데스크탑 토글 */}
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

        {/* 데스크탑 콘텐츠 토글 */}
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

        {/* 모바일: 항상 텍스트 */}
        <div className="lg:hidden block block-article">
          <ArticleRenderer title={meta.body.title} blocks={meta.body.blocks} />
        </div>
      </div>
    </div>
  );
}
