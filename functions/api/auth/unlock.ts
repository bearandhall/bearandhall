// functions/api/auth/unlock.ts
import { issueToken, readAllowlist, verifyToken, Env } from '../_utils';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { email, lockId } = await request.json() as { email?: string; lockId?: string };
    if (!email || !lockId) return new Response('bad request', { status: 400 });

    const allow = readAllowlist(env)[lockId] || [];
    const ok = allow.map(s=>s.toLowerCase().trim()).includes(email.toLowerCase().trim());
    if (!ok) return new Response('not allowed', { status: 403 });

    // 기존 토큰이 있으면 grants 병합
    const cookie = request.headers.get('Cookie') || '';
    const m = cookie.match(/gwhd_session=([^;]+)/);
    let grants:string[] = [];
    if (m) {
      try { const p = await verifyToken(env, decodeURIComponent(m[1])); grants = Array.isArray(p.grants)? p.grants: []; } catch {}
    }
    if (!grants.includes(lockId)) grants.push(lockId);

    const jwt = await issueToken(env, email, grants);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Set-Cookie', `gwhd_session=${encodeURIComponent(jwt)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*30}`);
    return new Response(JSON.stringify({ ok:true, grants }), { status: 200, headers });
  } catch (e:any) {
    return new Response('error', { status: 500 });
  }
};
