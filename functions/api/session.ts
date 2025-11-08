// functions/api/session.ts
import { verifyToken, Env } from '../_utils';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/gwhd_session=([^;]+)/);
  if (!m) return new Response(JSON.stringify({ grants: [] }), { headers: { 'Content-Type':'application/json' }});
  try {
    const payload:any = await verifyToken(env, decodeURIComponent(m[1]));
    return new Response(JSON.stringify({ email: payload.email, grants: payload.grants || [] }), { headers: { 'Content-Type':'application/json' }});
  } catch {
    return new Response(JSON.stringify({ grants: [] }), { headers: { 'Content-Type':'application/json' }});
  }
};
