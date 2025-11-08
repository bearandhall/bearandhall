import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/',       label: 'home',   icon: '/img/nav/home.png' },
  { to: '/guro',   label: 'guro',   icon: '/img/nav/guro.png',   hideSelfOnPage: true },
  { to: '/techme', label: 'techme', icon: '/img/nav/techme.png', hideSelfOnPage: true },
  { to: '/horse',  label: 'horse',  icon: '/img/nav/horse.png',  hideSelfOnPage: true },
  { to: '/info',   label: 'info',   icon: '/img/nav/info.png',   hideSelfOnPage: true },
];

export default function NavIcons() {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col items-start gap-6 p-4 sticky top-6">
      {items.map((i) => {
        const active = pathname === i.to || pathname.startsWith(i.to + '/');
        if (active && i.hideSelfOnPage) return null;
        return (
          <Link
            key={i.to}
            to={i.to}
            aria-current={active ? 'page' : undefined}
            className={`block w-[96px] h-[96px] transition hover:scale-[1.02] ${active ? 'opacity-40 pointer-events-none' : ''}`}
            title={i.label}
            aria-label={i.label}
          >
            <img src={i.icon} alt="" className="w-full h-full object-contain" />
          </Link>
        );
      })}

    </nav>
  );
}
