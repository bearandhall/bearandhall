export const onRequest: PagesFunction<{ SIGNING_SECRET:string }> = async (ctx) => {
  const { request, env } = ctx
  const cookie = request.headers.get('Cookie') || ''
  const token = (cookie.match(/gh_access=([^;]+)/)?.[1]) || ''
  const unlocked = await verify(token, env.SIGNING_SECRET)
  if(!unlocked) return new Response('Unauthorized', { status: 401 })

  // 권한 확인 통과 → 실제 정적 자산을 반환
  // env.ASSETS는 Pages의 정적 빌드 산출물을 가리킵니다.
  return env.ASSETS.fetch(request)
}

async function verify(token:string, secret:string){
  if(!token) return false
  const parts = token.split('|')
  if(parts.length !== 4) return false
  const [scope, iatStr, ttlStr, sig] = parts
  const payload = `${scope}|${iatStr}|${ttlStr}`
  const expected = await sign(payload, secret)
  if(sig !== expected) return false
  const iat = parseInt(iatStr,10); const ttl = parseInt(ttlStr,10)
  const now = Math.floor(Date.now()/1000)
  return now <= iat + ttl
}
async function sign(text:string, secret:string){
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name:'HMAC', hash:'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(text))
  return [...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,'0')).join('')
}
