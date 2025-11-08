// src/components/EmailUnlockModal.tsx
import { useState } from 'react';

export default function EmailUnlockModal({
  lockKey,            // ex) '/monthly/2025/09' - localStorage grants 키
  allowList,          // 이메일 화이트리스트 (있으면 클라에서 직접 검사)
  onSuccess,
  onClose,
}: {
  lockKey: string;
  allowList?: string[];
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr]   = useState<string | null>(null);

  const goodEmail = (s:string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

  const grant = () => {
    const key = 'gho:grants';
    const now = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    now.add(lockKey);
    localStorage.setItem(key, JSON.stringify([...now]));
  };

  const submit = async () => {
    setErr(null);
    if (!goodEmail(email)) { setErr('올바른 이메일 형식이 아닙니다.'); return; }
    setBusy(true);
    try {
      if (allowList && allowList.length) {
        // 클라이언트 즉시 검사
        const ok = allowList.map(s => s.trim().toLowerCase())
                            .includes(email.trim().toLowerCase());
        if (!ok) { setErr('구독 중인 이메일이 아닙니다.'); return; }
        grant();
        onSuccess();
        return;
      }
      // 서버가 있을 때
      const r = await fetch('/api/unlock', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, lockId: lockKey }),
      });
      if (r.ok) { grant(); onSuccess(); return; }
      if (r.status === 403 || r.status === 404) setErr('구독 중인 이메일이 아닙니다.');
      else setErr((await r.text().catch(()=>'')) || '인증 중 오류가 발생했습니다.');
    } catch {
      setErr('네트워크 오류가 발생했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-5 w-[520px] shadow-xl">
        <h3 className="text-xl font-semibold mb-2">🔒 이메일 인증</h3>
        <p className="mb-3">구독에 사용하신 이메일을 입력하세요.</p>

        <input
          type="email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border px-3 py-2" placeholder="you@example.com" disabled={busy}
        />
        {err && <p className="text-red-600 mt-2">{err}</p>}

        <div className="mt-4 flex gap-2 justify-end">
          <button className="btn" onClick={onClose} disabled={busy}>닫기</button>
          <button className="btn" onClick={submit} disabled={busy}>인증</button>
        </div>

        <div className="mt-4 text-right">
          <a className="underline" href="https://docs.google.com/forms/d/e/1FAIpQLSdlE3CK_GvTYxe0QBupJRj_aAooJNbeB6I2MvWI4jdSZL0lcA/viewform?usp=sharing&ouid=110716193080514386844" target="_blank" rel="noreferrer">
            구독 신청하러 가기
          </a>
        </div>
      </div>
    </div>
  );
}
