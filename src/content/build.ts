// 모든 컨텐츠를 자동으로 인덱싱해서 앱에서 바로 사용 가능하게 만듭니다.

export type Body = { title: string; blocks: string[]; locked?: boolean; lockId?: string };

// === 월간보수 ===
// JSON은 파싱된 객체로, PDF는 발행된 URL로 가져옵니다.
const monthlyJsonMods = import.meta.glob('./monthly/**/*.json', { eager: true }) as Record<string, { default: Body }>;
const monthlyPdfUrls  = import.meta.glob('./monthly/**/*.pdf',  { eager: true, as: 'url' }) as Record<string, string>;

export type MonthlyIssueEntry = {
  year: number;
  issue: string;             // '08' 같은 문자열(0패딩 유지)
  title: string;
  locked: boolean;
  lockId?: string;  
  pdf?: string;              // URL
  body: Body;                // 파싱된 본문
};

export type MonthlyYearEntry = { year: number; issues: MonthlyIssueEntry[] };

// 파일 경로 예: "./monthly/2023/08.json"
function pathToYearIssue(p: string) {
  const m = p.match(/monthly\/(\d{4})\/(\d{2})\.json$/);
  if (!m) return null;
  return { year: Number(m[1]), issue: m[2] };
}

const monthlyEntries: MonthlyIssueEntry[] = Object.entries(monthlyJsonMods)
  .map(([p, mod]) => {
    const parsed = pathToYearIssue(p);
    if (!parsed) return null;
    const { year, issue } = parsed;
    const body = mod.default;

    const pdfKey = p.replace('.json', '.pdf');
    const pdf = monthlyPdfUrls[pdfKey];

    return {
      year,
      issue,
      title: body.title,
      locked: !!body.locked,
      lockId: body.lockId,   // ⬅︎ 추가
      pdf,
      body,
      
    } as MonthlyIssueEntry;
  })
  .filter(Boolean) as MonthlyIssueEntry[];

export const MONTHLY_DYNAMIC: MonthlyYearEntry[] = Array.from(
  monthlyEntries.reduce((map, it) => {
    const k = it.year;
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(it);
    return map;
  }, new Map<number, MonthlyIssueEntry[]>())
).map(([year, issues]) => ({
  year,
  issues: issues.sort((a, b) => a.issue.localeCompare(b.issue)),
})).sort((a, b) => b.year - a.year);



export interface ArticleMeta {
  slug: string;
  title: string;
  body: { title: string; blocks: string[] };
  pdf?: string; // 최종적으로는 브라우저에서 접근 가능한 URL이 들어가도록
  linksTitle?: string;                  // ← 추가
  links?: { label: string; href: string }[]; // ← 추가
}

// JSON과 PDF를 모두 glob
const novelsJson = import.meta.glob('./novels/*.json', { eager: true, import: 'default' }) as Record<string, ArticleMeta>;
const novelsPdf  = import.meta.glob('./novels/*.pdf',  { eager: true, as: 'url' })       as Record<string, string>;

function base(p: string) {
  return p.split('/').pop()!.replace(/\.(json|pdf)$/i, '');
}

export const NOVELS_DYNAMIC: ArticleMeta[] = Object.entries(novelsJson).map(([jsonPath, meta]) => {
  const b = base(jsonPath);
  // 1) slug가 있으면 slug로 우선 매칭
  let url = Object.entries(novelsPdf).find(([pdfPath]) => base(pdfPath) === meta.slug)?.[1];
  // 2) 없으면 파일명(pdf 필드)에 맞춰 매칭
  if (!url && meta.pdf) {
    url = Object.entries(novelsPdf).find(([pdfPath]) => pdfPath.endsWith('/' + meta.pdf))?.[1];
  }
  return { ...meta, pdf: url ?? undefined };
});

// misc도 동일 패턴으로
const miscJson = import.meta.glob('./misc/*.json', { eager: true, import: 'default' }) as Record<string, ArticleMeta>;
const miscPdf  = import.meta.glob('./misc/*.pdf',  { eager: true, as: 'url' })         as Record<string, string>;

export const MISC_DYNAMIC: ArticleMeta[] = Object.entries(miscJson).map(([jsonPath, meta]) => {
  const b = base(jsonPath);
  let url = Object.entries(miscPdf).find(([pdfPath]) => base(pdfPath) === meta.slug)?.[1];
  if (!url && meta.pdf) {
    url = Object.entries(miscPdf).find(([pdfPath]) => pdfPath.endsWith('/' + meta.pdf))?.[1];
  }
  return { ...meta, pdf: url ?? undefined };
});
