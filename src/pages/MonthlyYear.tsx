// src/pages/MonthlyYear.tsx
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

  // 로컬 권한 로드
  useEffect(() => {
    if (!year) return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith('grant:'));
    const g: Record<string, true> = {};
    keys.forEach(k => {
      if (localStorage.getItem(k) === '1') g[k] = true;
    });
    setGrants(g);
  }, [year]);

  if (!yearEntry) return <div className="p-6">연도 없음</div>;

  const isGranted = (issue: string, allow?: string[]) => {
    // 잠금이 아니면 true
    if (!allow || !Array.isArray(allow) || allow.length === 0) return true;
    // 잠금이면 localStorage 키 확인
    return !!grants[`grant:${year}-${issue}`];
  };

  return (
    <div className="grid lg:grid-cols-[560px_minmax(0,1fr)] gap-10 items-start">
      {/* 좌측 커버 — 데스크탑에서만 */}
      <div className="hidden lg:block cover-tall">
        <img
          src={`/img/covers/cover-${year}.png`}
          onError={(e) => (e.currentTarget.src = '/img/covers/cover-monthly.png')}
          className="cover-img"
          alt=""
        />
      </div>

      {/* 우측 목록 */}
      <div className="right-col">
        <BreadcrumbStack sticky
          items={[
            { label: '곰과회당', tone: 'brand', to: '/' },
            { label: `${RS} 월간 보수`, tone: 'cat', to: '/monthly' },
            { label: `${RS}${RS} ${year}`, tone: 'year' },
          ]}
        />

        <div className="mt-6 space-y-0">
          {yearEntry.issues.map((it) => {
            const allow = Array.isArray((it as any).lockId) ? ((it as any).lockId as string[]) : [];
            const locked = !!it.locked && allow.length > 0 && !isGranted(it.issue, allow);
            const to = locked ? undefined : `/monthly/${year}/${it.issue}`;

            return (
              <BlockCard
                key={it.issue}
                tone="issue"
                to={to}
                right={
                  locked ? (
                    <img src="/img/ui/lock.png" className="w-4 h-4" alt="" />
                  ) : null
                }
                onClick={
                  locked
                    ? () => setAsk({ issue: it.issue, allow })
                    : undefined
                }
              >
                {it.issue}월호
              </BlockCard>
            );
          })}
        </div>
      </div>

      {/* 잠금 해제 모달 */}
      {ask && (
        <EmailUnlockModal
          allow={ask.allow}
          onSuccess={() => {
            // 성공 시 로컬 권한 저장 후 목록 리프레시
            localStorage.setItem(`grant:${year}-${ask.issue}`, '1');
            setAsk(null);
            // state 동기화
            setGrants((g) => ({ ...g, [`grant:${year}-${ask.issue}`]: true }));
          }}
          onClose={() => setAsk(null)}
        />
      )}
    </div>
  );
}
