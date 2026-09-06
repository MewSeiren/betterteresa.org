import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone, Siren, ShieldCheck, Flame, Landmark, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import SearchBox from '@/components/search/SearchBox';
import { hotlines } from '@/data/teresaData';
import { serviceCategories } from '@/data/servicesData';
import { CATEGORIES, categoryLabel } from '@/data/tourismTaxonomy';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/4f5fc7227_ChatGPTImageAug4202608_12_14PM.png';
const HALL_EMAIL = 'mayorsoffice@teresarizal.gov.ph';
const HOTLINE_ICONS = { Siren, ShieldCheck, Flame, Landmark };

// Global site header: hotline utility bar (always reachable, click-to-call),
// primary navigation with dropdowns and active-section state, and site search.
// The mobile menu exposes the exact same destinations as desktop.
export default function NavBar() {
  const { t, lang, setLang } = useLang();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [openAcc, setOpenAcc] = useState(null);
  const [hotlinePanel, setHotlinePanel] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  // Close all overlays on navigation.
  useEffect(() => {
    setOpenMenu(false);
    setOpenGroup(null);
    setHotlinePanel(false);
    setMobileSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setHotlinePanel(false);
        setOpenMenu(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';
    return () => {document.body.style.overflow = '';};
  }, [openMenu]);

  const navItems = [
  { key: 'home', label: t('nav.home'), to: '/' },
  {
    key: 'services',
    label: t('nav.services'),
    to: '/services',
    children: [
    { label: t('qa.viewAll'), to: '/services' },
    ...serviceCategories.map((c) => ({ label: c.name, to: `/services/${c.slug}` }))]

  },
  {
    key: 'government',
    label: t('nav.government'),
    to: '/government',
    children: [
    { label: t('gv.title'), to: '/government' },
    { label: t('ct.directory'), to: '/government#offices' },
    { label: t('nav.contact'), to: '/contact' }]

  },
  {
    key: 'transparency',
    label: t('nav.transparency'),
    to: '/transparency',
    children: [
    { label: t('tr.title'), to: '/transparency#documents' },
    { label: t('tr.projects'), to: '/transparency#projects' }]

  },
  {
    key: 'tourism',
    label: t('nav.tourism'),
    to: '/tourism',
    children: [
    { label: t('tm.dirTitle'), to: '/tourism' },
    ...CATEGORIES.map((c) => ({ label: categoryLabel(c, lang), to: `/tourism/${c.slug}` }))]

  },
  {
    key: 'about',
    label: t('nav.about'),
    to: '/about',
    children: [
    { label: t('ab.municipality'), to: '/about' },
    { label: t('hi.eyebrow'), to: '/about#history' },
    { label: t('ab.barangays'), to: '/about#barangays' },
    { label: t('nav.contact'), to: '/contact' }]

  }];


  const isActiveGroup = (key) => {
    if (key === 'home') return pathname === '/';
    if (key === 'about') {
      return ['/about', '/contact', '/privacy', '/accessibility'].some((p) => pathname.startsWith(p));
    }
    return pathname.startsWith(`/${key}`);
  };

  const navLinkCls = (on) =>
  `inline-flex items-center gap-1 rounded-md border-b-2 px-3 py-2 text-sm font-semibold transition ${on ?
  'border-[#1a73e8] text-[#1565c0]' :
  'border-transparent text-slate-700 hover:bg-slate-100 hover:text-[#0a1a35]'}`;

  const LangToggle = ({ dark }) =>
  <div className="flex items-center rounded-full border p-0.5 text-xs font-bold" style={{ borderColor: dark ? 'rgba(255,255,255,0.25)' : '#e2e8f0' }}>
      <button onClick={() => setLang('en')} className={`rounded-full px-2.5 py-1 transition ${lang === 'en' ? 'bg-[#1a73e8] text-white' : dark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-[#0a1a35]'}`}>EN</button>
      <button onClick={() => setLang('fil')} className={`rounded-full px-2.5 py-1 transition ${lang === 'fil' ? 'bg-[#1a73e8] text-white' : dark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-[#0a1a35]'}`}>FIL</button>
    </div>;


  const HotlineLink = ({ h, className }) => {
    const Icon = HOTLINE_ICONS[h.icon] || Phone;
    return (
      <a href={`tel:${h.tel}`} className={className}>
        <Icon size={13} className="shrink-0 text-[#fbbf24]" aria-hidden="true" />
        <span className="truncate">{t(`hl.${h.key}`)}</span>
        <span className="whitespace-nowrap font-bold">{h.number}</span>
      </a>);

  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility / hotline bar — never fully hidden, even on mobile */}
      <div className="bg-[#0a1a35] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6">
          <div className="hidden min-w-0 flex-1 items-center gap-4 md:flex">
            {hotlines.map((h) =>
            <HotlineLink key={h.key} h={h} className="inline-flex items-center gap-1.5 font-semibold text-white/80 transition hover:text-white" />
            )}
          </div>
          <button
            type="button"
            onClick={() => setHotlinePanel((v) => !v)}
            aria-expanded={hotlinePanel}
            className="inline-flex items-center gap-1.5 py-0.5 font-bold text-white md:hidden">
            
            <Siren size={14} className="text-[#fbbf24]" aria-hidden="true" />
            {t('nav.hotlines')}
            <ChevronDown size={13} className={hotlinePanel ? 'rotate-180 transition' : 'transition'} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-3">
            <a href={`mailto:${HALL_EMAIL}`} className="hidden text-white/70 transition hover:text-white lg:inline-flex">{HALL_EMAIL}</a>
            <LangToggle dark />
          </div>
        </div>
        {hotlinePanel &&
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
            <div className="grid gap-2">
              {hotlines.map((h) =>
            <HotlineLink key={h.key} h={h} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/85" />
            )}
            </div>
          </div>
        }
      </div>

      {/* Main bar: logo, nav + dropdowns, search (desktop); logo/search/menu (mobile) */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Better Teresa — Home">
            <Image src="https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/c20b63916_ChatGPT_Image_Sep_6__2026__11_23_26_AM.png" alt="Teresa, Rizal official seal" className="h-12 w-12 rounded-full object-contain drop-shadow-[0_0_10px_rgba(26,115,232,0.5)]" fittingType="fit" />
            <div className="leading-tight">
              <p className="text-lg font-black tracking-tight text-[#0a1a35]">Better Teresa</p>
              <span className="mt-0.5 inline-block rounded bg-[#1a73e8]/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#1a73e8]">.ORG</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const on = isActiveGroup(item.key);
              if (!item.children) {
                return <Link key={item.key} to={item.to} className={navLinkCls(on)}>{item.label}</Link>;
              }
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(item.key)}
                  onMouseLeave={() => setOpenGroup(null)}>
                  
                  <Link to={item.to} className={navLinkCls(on)} aria-haspopup="true" aria-expanded={openGroup === item.key}>
                    {item.label} <ChevronDown size={13} aria-hidden="true" />
                  </Link>
                  {openGroup === item.key &&
                  <div className="absolute left-0 top-full z-50 w-80 pt-1.5">
                      <div className="max-h-[65vh] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                        {item.children.map((ch) =>
                      <Link key={`${ch.to}-${ch.label}`} to={ch.to} className="block px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#e8eff7] hover:text-[#1565c0]">
                            {ch.label}
                          </Link>
                      )}
                      </div>
                    </div>
                  }
                </div>);

            })}
          </nav>

          <div className="hidden w-72 shrink-0 xl:block">
            <SearchBox />
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button type="button" onClick={() => setMobileSearch((v) => !v)} aria-label="Search" aria-expanded={mobileSearch} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50">
              <Search size={20} />
            </button>
            <button type="button" onClick={() => setOpenMenu(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
        {mobileSearch &&
        <div className="border-t border-slate-100 px-4 py-2.5 xl:hidden">
            <SearchBox />
          </div>
        }
      </div>

      {/* Mobile menu — same destinations as desktop, plus hotlines and search */}
      {openMenu &&
      <div className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-11 w-11 rounded-full object-contain" fittingType="fit" />
              <span className="text-lg font-black text-[#0a1a35]">Better Teresa</span>
            </div>
            <button type="button" onClick={() => setOpenMenu(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center text-slate-700">
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <SearchBox onNavigate={() => setOpenMenu(false)} />

            <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('nav.hotlines')}</p>
            <div className="grid gap-2">
              {hotlines.map((h) =>
            <HotlineLink key={h.key} h={h} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#f8f9fa] px-3 py-3 text-sm font-semibold text-slate-700" />
            )}
            </div>

            <nav className="mt-6 grid gap-0" aria-label="Mobile navigation">
              {navItems.map((item) => {
              if (!item.children) {
                return (
                  <Link key={item.key} to={item.to} className="border-b border-slate-100 py-3.5 text-xl font-bold text-slate-800">
                      {item.label}
                    </Link>);

              }
              const open = openAcc === item.key;
              return (
                <div key={item.key} className="border-b border-slate-100">
                    <button type="button" onClick={() => setOpenAcc(open ? null : item.key)} aria-expanded={open} className="flex w-full items-center justify-between py-3.5 text-left text-xl font-bold text-slate-800">
                      {item.label}
                      <ChevronDown size={20} className={open ? 'rotate-180 text-slate-400 transition' : 'text-slate-400 transition'} aria-hidden="true" />
                    </button>
                    {open &&
                  <div className="grid gap-0.5 pb-3">
                        {item.children.map((ch) =>
                    <Link key={`${ch.to}-${ch.label}`} to={ch.to} onClick={() => setOpenMenu(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#1565c0]">
                            {ch.label}
                          </Link>
                    )}
                      </div>
                  }
                  </div>);

            })}
            </nav>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#f8f9fa] px-4 py-3">
              <span className="text-sm font-bold text-slate-600">Language</span>
              <LangToggle />
            </div>
          </div>
        </div>
      }
    </header>);

}