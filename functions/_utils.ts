// functions/_utils.ts
export interface Env {
  JWT_SECRET: string;        // Pages > Settings > Environment variables
  ALLOWLIST: string;         // JSON 문자열: {"monthly-2025-08":["a@x.com","b@y.com"], "novel-foo":["..."]}
}

import { SignJWT, jwtVerify } from 'jose';

export async function issueToken(env: Env, email: string, grants: string[], ttlSec=60*60*24*30) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const now = Math.floor(Date.now()/1000);
  return await new SignJWT({ email, grants })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSec)
    .sign(secret);
}

export async function verifyToken(env: Env, token: string) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload as any; // {email, grants}
}

export function readAllowlist(env: Env) {
  try { return JSON.parse(env.ALLOWLIST || '{}') as Record<string,string[]>; }
  catch { return {}; }
}
