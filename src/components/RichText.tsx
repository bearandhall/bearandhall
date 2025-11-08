export default function RichText({ text }: { text: string }) {
  // [red]...[/red] 을 <span class="text-red-600">...</span> 으로 치환
  const parts: Array<{ t: string; red: boolean }> = [];
  const re = /\[red\](.*?)\[\/red\]/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index), red: false });
    parts.push({ t: m[1], red: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ t: text.slice(last), red: false });

  return (
    <>
      {parts.map((p, i) =>
        p.red ? <span key={i} className="text-red-600">{p.t}</span> : <span key={i}>{p.t}</span>
      )}
    </>
  );
}
