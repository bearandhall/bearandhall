// 소설 최종 글 페이지용 데이터
export type NovelMeta = {
  slug: string;          // 라우트 파라미터 (/novels/:slug)
  title: string;         // 소설 제목
  body: string;          // 본문 JSON 경로 (public/ 기준 절대경로)
  pdf?: string;          // 선택: PDF 경로 (public/ 기준 절대경로)
};

export const NOVELS: NovelMeta[] = [
  {
    slug: 'simple-explainer',
    title: '단순한 설명',
    body:  '/protected/novels/simple-explainer.json',
    pdf:   '/protected/novels/simple-explainer.pdf',
  },
  {
    slug: 'another-story',
    title: '또다른 소설',
    body:  '/protected/novels/another-story.json',
  },
];
