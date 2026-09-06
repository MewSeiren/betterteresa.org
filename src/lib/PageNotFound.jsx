import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import SearchBox from '@/components/search/SearchBox';
import { useLang } from '@/lib/LanguageContext';

const RECOVER_LINKS = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.services', to: '/services' },
  { labelKey: 'nav.government', to: '/government' },
  { labelKey: 'nav.transparency', to: '/transparency' },
  { labelKey: 'nav.tourism', to: '/tourism' },
  { labelKey: 'nav.contact', to: '/contact' }
];

// 404 page that helps users recover: search + direct links to every major section.
export default function PageNotFound() {
  const { t } = useLang();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 pt-40 pb-24 text-center sm:px-6">
        <p className="text-7xl font-black text-slate-200">404</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0a1a35]">{t('nf.title')}</h1>
        <p className="mt-3 text-slate-600">
          {t('nf.desc')} <span className="font-semibold text-[#0a1a35]">“{pathname}”</span>
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBox />
        </div>
        <p className="mt-10 text-xs font-bold uppercase tracking-widest text-slate-400">{t('nf.recover')}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {RECOVER_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#1a73e8]/50 hover:text-[#1565c0]"
            >
              {t(l.labelKey)}
            </Link>
          ))}
        </div>
      </main>
      <CivicFooter />
    </div>
  );
}