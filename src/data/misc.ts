// 기타 최종 글 페이지용 데이터
export type MiscMeta = {
  slug: string;          // 라우트 파라미터 (/misc/:slug)
  title: string;         // 글 제목
  body: string;          // 본문 JSON 경로 (public/ 기준 절대경로)
  pdf?: string;          // 선택: PDF 경로
};

export const MISCARTICLES: MiscMeta[] = [
  {
    slug: 'lab-situation-review',
    title: '가공실황 서평',
    body:  '/protected/misc/lab-situation-review.json',
  },
  {
    slug: 'do-not-press-guide',
    title: '안하기 가이드',
    body:  '/protected/misc/do-not-press-guide.json',
    pdf:   '/protected/misc/do-not-press-guide.pdf',
  },
];
