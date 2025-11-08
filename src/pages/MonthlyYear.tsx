import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadcrumbStack from '../components/BreadcrumbStack';
import BlockCard from '../components/BlockCard';
import EmailUnlockModal from '../components/EmailUnlockModal';
import { MONTHLY_DYNAMIC } from '../content/build';

const RS = '＼';

export default function MonthlyYear() {
  const { year } = useParams<{ year: string }>();
  const yearEntry = MONTHLY_DYNAMIC.find(yy => String(yy.year) === String(year));

  const [ask, setAsk] = useState<{ issue: string; allow: string[] } | null>(null);
  const [grants, setGrants] = useState<Record<string, true>>({});

  // grants load
  useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('grant:'));
    const g: Record<string, true> = {};
    keys.forEach(k => { if (localStorage.getItem(k) === '1') g[k] = true; });
    setGrants(g);
  }, [year]);

  const isGranted = (issue: string, allow?: string[]) => {
    if (!allow?.length) return true;
    return !!grants[`grant:${year}-${issue}`];
  };

  if (!yearEntry) return <div className="p-6">연도 없음</div>;

  return (
    <div className="grid lg:grid-cols-[560px_minmax(0,1fr)] gap-10 items-start">

      {/* 모바일 상단 고정 헤더 */}
      <div className="lg:hidden sticky top-0 z-30 -mx-2 mb-2 bg-white/80 backdrop-blur">
        <BreadcrumbStack
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
            { label: `${RS}${RS} ${year}`, tone: 'year' },
          ]}
        />
      </div>

      {/* 좌측 커버(데스크탑) */}
      <div className="hidden lg:block cover-tall">
        <img
          src={`/img/covers/cover-${year}.png`}
          onError={e => (e.currentTarget.src = '/img/covers/cover-monthly.png')}
          className="cover-img"
          alt=""
        />
      </div>

      {/* 우측 */}
      <div className="right-col">
        {/* 데스크탑 좌측 고정처럼 보이게, 우측 컬럼 맨 위에 sticky 배치 */}
        <div className="hidden lg:block lg:sticky lg:top-6">
          <BreadcrumbStack
            items={[
              { label: '곰과회당', tone: 'brand', to: '/' },
              { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
              { label: `${RS}${RS} ${year}`, tone: 'year' },
            ]}
          />
        </div>

        <div className="mt-6 space-y-0">
          {yearEntry.issues.map(it => {
            const allow = Array.isArray((it as any).lockId) ? ((it as any).lockId as string[]) : [];
            const locked = !!it.locked && allow.length > 0 && !isGranted(it.issue, allow);
            const to = locked ? undefined : `/monthly/${year}/${it.issue}`;

            return (
              <BlockCard
                key={it.issue}
                tone="issue"
                to={to}
                right={locked ? <img src="/img/ui/lock.png" className="w-4 h-4" alt="" /> : null}
                onClick={locked ? () => setAsk({ issue: it.issue, allow }) : undefined}
              >
                {it.issue}월호
              </BlockCard>
            );
          })}
        </div>
      </div>

      {/* 이메일 언락(연도 단계) */}
      {ask && (
        <EmailUnlockModal
          allowList={ask.allow}
          lockKey={`grant:${year}-${ask.issue}`}
          onSuccess={() => {
            localStorage.setItem(`grant:${year}-${ask.issue}`, '1');
            setGrants(g => ({ ...g, [`grant:${year}-${ask.issue}`]: true }));
            setAsk(null);
          }}
          onClose={() => setAsk(null)}
        />
      )}
    </div>
  );
}
