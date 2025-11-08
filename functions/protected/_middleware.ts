// functions/protected/_middleware.ts
import { verifyToken, Env } from '../_utils';

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  // URL에서 lockId 추정 규칙: /protected/monthly/YYYY/MM.* → monthly-YYYY-MM
  //                          /protected/novels/<slug>.*  → novel-<slug>
  //                          /protected/misc/<slug>.*    → misc-<slug>
  const url = new URL(request.url);
  const p = url.pathname;

  let lockId: string | null = null;
  const m1 = p.match(/^\/protected\/monthly\/(\d{4})\/(\d{2})\./);
  if (m1) lockId = `monthly-${m1[1]}-${m1[2]}`;
  const m2 = p.match(/^\/protected\/novels\/([^/]+)\./);
  if (m2) lockId = `novel-${m2[1]}`;
  const m3 = p.match(/^\/protected\/misc\/([^/]+)\./);
  if (m3) lockId = `misc-${m3[1]}`;

  if (!lockId) return next(); // 보호 대상 아님

  // 세션 쿠키 검사
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/gwhd_session=([^;]+)/);
  if (!m) return new Response('Unauthorized', { status: 401 });

  try {
    const payload:any = await verifyToken(env, decodeURIComponent(m[1]));
    const grants: string[] = payload.grants || [];
    if (!grants.includes(lockId)) return new Response('Forbidden', { status: 403 });
    return next();
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }
};
