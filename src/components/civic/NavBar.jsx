import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/4f5fc7227_ChatGPTImageAug4202608_12_14PM.png';

export default function NavBar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.government'), href: '#government' },
    { label: t('nav.tourism'), href: '#tourism' },
    { label: t('nav.statistics'), href: '#glance' },
    { label: t('nav.transparency'), href: '#transparency' },
    { label: t('nav.contact'), href: '#contact' }
  ];

  const LangToggle = ({ dark }) => (
    <div className="flex items-center rounded-full border p-0.5 text-xs font-bold" style={{ borderColor: dark ? 'rgba(255,255,255,0.25)' : '#e2e8f0' }}>
      <button onClick={() => setLang('en')} className={`rounded-full px-2.5 py-1 transition ${lang === 'en' ? 'bg-[#1a73e8] text-white' : dark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-[#0a1a35]'}`}>EN</button>
      <button onClick={() => setLang('fil')} className={`rounded-full px-2.5 py-1 transition ${lang === 'fil' ? 'bg-[#1a73e8] text-white' : dark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-[#0a1a35]'}`}>FIL</button>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#0a1a35] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <p className="flex items-center gap-2 font-medium"><span>🚀</span> {t('nav.utility')}</p>
          <div className="hidden items-center gap-4 md:flex">
            <a href="tel:+63282506800" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white"><Phone size={12} /> (02) 8250-6800</a>
            <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white"><Mail size={12} /> mayorsoffice@teresarizal.gov.ph</a>
            <span className="inline-flex items-center gap-1.5 text-white/70"><MapPin size={12} /> Teresa, Rizal</span>
            <LangToggle dark />
          </div>
        </div>
      </div>
      <div className={`border-b border-slate-200 bg-white transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-11 w-11 rounded-full object-contain drop-shadow-[0_0_8px_rgba(26,115,232,0.45)]" fittingType="fit" />
            <div className="leading-tight">
              <p className="text-lg font-black tracking-tight text-[#0a1a35]">Better Teresa</p>
              <span className="mt-1 inline-block rounded bg-[#1a73e8]/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#1a73e8]">.ORG</span>
            </div>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(l => <a key={l.label} href={l.href} className="rounded-md px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[#0a1a35]">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle />
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="hidden rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0] sm:inline-flex">{t('nav.browse')}</a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 lg:hidden" aria-label="Open menu"><Menu size={20} className="text-slate-700" /></button>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-10 w-10 rounded-full object-contain" fittingType="fit" />
              <span className="text-lg font-black text-[#0a1a35]">Better Teresa</span>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu"><X className="text-slate-700" /></button>
          </div>
          <nav className="mt-10 grid gap-2">
            {navLinks.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg border-b border-slate-100 py-4 text-2xl font-semibold text-slate-800">{l.label}</a>)}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f8f9fa] px-4 py-3">
              <span className="text-sm font-bold text-slate-600">Language</span>
              <LangToggle />
            </div>
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#1a73e8] px-4 py-3.5 text-center font-bold text-white">{t('nav.browse')}</a>
          </nav>
        </div>
      )}
    </header>
  );
}