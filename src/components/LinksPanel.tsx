// src/components/LinkPanel.tsx
export default function LinksPanel({
  pdf,
  linksTitle,
  links,
}: {
  pdf?: string;
  linksTitle?: string;
  links?: { label: string; href: string }[];
}) {
  const hasLinks = Array.isArray(links) && links.length > 0;
  if (!pdf && !hasLinks) return null;

  return (
    <div className="mt-8 relative z-20">
      {pdf && (
        <a className="btn-link block mb-4" href={pdf} target="_blank" rel="noreferrer">
          PDF 다운
        </a>
      )}

      {hasLinks && (
        <div className="mt-4">
          {linksTitle ? <div className="mb-2 font-semibold">{linksTitle}</div> : null}
          <ul className="list-disc pl-6">
            {links!.map(lk => (
              <li key={lk.href}>
                <a className="btn-link" href={lk.href} target="_blank" rel="noreferrer">
                  {lk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
