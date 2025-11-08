import { useEffect, useRef, useState } from 'react'

type Props = { open: boolean; onClose: () => void; onUnlocked?: () => void }
export default function PasskeyModal({ open, onClose, onUnlocked }: Props){
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => { if(open) setTimeout(()=>ref.current?.focus(), 0) }, [open])
  if(!open) return null

  async function submit(){
    setLoading(true); setError(undefined)
    try{
      const res = await fetch('/api/unlock', {
        method:'POST',
        headers: { 'content-type':'application/json' },
        body: JSON.stringify({ passkey: value })
      })
      if(!res.ok){
        const msg = await res.text()
        throw new Error(msg || '인증 실패')
      }
      onClose(); onUnlocked?.(); // 쿠키는 HttpOnly라 읽을 수 없으니, 서버상태 확인은 /api/session으로
    }catch(e:any){
      setError(e.message)
    }finally{ setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50" onClick={onClose}>
      <div className="bg-white w-[560px] max-w-[92vw] p-6 rounded shadow" onClick={e=>e.stopPropagation()}>
        <div className="text-xl mb-4">패스키 입력 <span className="text-sm text-gray-500">(구독신청 이메일)</span></div>
        <input ref={ref} className="w-full border px-3 py-2 mb-3" 
               value={value} onChange={e=>setValue(e.target.value)} placeholder="you@example.com" />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex gap-3 justify-end">
          <button className="px-4 py-2 border rounded" onClick={onClose}>취소</button>
          <button className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
                  onClick={submit} disabled={loading || !value}>
            {loading ? '확인 중…' : '확인'}
          </button>
        </div>
      </div>
    </div>
  )
}
