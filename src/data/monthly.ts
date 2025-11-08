export const MONTHLY = [
  {
    year: 2023,
    issues: [
      {
        issue: '08',
        title: '8월호 제목',
        slug: 'monthly-2023-08',
        locked: false,
        // dev/배포 공통으로 /protected 경로 사용 (public/ 아래 파일과 정확히 매칭!)
        // pdf:  '/protected/monthly/2023/08.pdf',
        body: '/protected/monthly/2023/08.json'
      },
      {
        issue: '09',
        title: '9월호 제목',
        slug: 'monthly-2023-09',
        locked: true,
        // pdf:  '/protected/monthly/2023/09.pdf',
        body: '/protected/monthly/2023/09.json'
      }
    ]
  },
  {
    year: 2024,
    issues: [
      {
        issue: '04',
        title: '4월호 제목',
        slug: 'monthly-2024-04',
        locked: false,
        // pdf:  '/protected/monthly/2024/04.pdf',
        body: '/protected/monthly/2024/04.json'
      }
    ]
  }
] as const;
