import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Phone, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { hotlines } from '@/data/teresaData';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/c8d4c5f01_ChatGPTImageAug4202607_39_14PM.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Government', href: '#government' },
  { label: 'Statistics', href: '#glance' },
  { label: 'Transparency', href: '#transparency' },
  { label: 'Contact', href: '#contact' }
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(t); };
  }, []);

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      {/* Utility bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            {hotlines.map(h => (
              <a key={h.label} href={`tel:${h.number.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#1d4ed8]">
                <Phone size={12} /> {h.label}: {h.number}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span className="font-semibold text-slate-600">Teresa, Rizal</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">{dateStr} · {timeStr} PHT</span>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className={`border-b border-slate-200 bg-white transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-12 w-12 rounded-full object-contain drop-shadow-[0_0_10px_rgba(29,78,216,0.5)]" fittingType="fit" />
            <div className="leading-tight">
              <p className="text-lg font-black tracking-tight text-slate-900">Better Teresa</p>
              <p className="text-[11px] font-medium text-slate-500">A community-run portal for Teresa, Rizal</p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="rounded-md px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 sm:inline-flex"><Search size={16} /> Search</button>
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="hidden rounded-lg bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1e40af] sm:inline-flex">Browse Services</a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 lg:hidden" aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </div>
      </div>
      {/* Announcement banner */}
      <div className="bg-[#ef4444] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6">
          <p className="flex items-center gap-2 font-medium"><span>🚀</span> Sumali sa #CivicTech Revolution — Tulungan mong itayo ang hinaharap ng Teresa sa pamamagitan ng teknolohiya.</p>
          <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="hidden shrink-0 items-center gap-1 rounded bg-white/15 px-3 py-1 text-xs font-bold hover:bg-white/25 sm:inline-flex">Sumali Now <ChevronRight size={14} /></a>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-10 w-10 rounded-full object-contain drop-shadow-[0_0_10px_rgba(29,78,216,0.5)]" fittingType="fit" />
              <span className="text-lg font-black text-slate-900">Better Teresa</span>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu"><X className="text-slate-700" /></button>
          </div>
          <nav className="mt-10 grid gap-2">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg border-b border-slate-100 py-4 text-2xl font-semibold text-slate-800">{l.label}</a>
            ))}
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-4 rounded-lg bg-[#1d4ed8] px-4 py-3.5 text-center font-bold text-white">Browse Services</a>
          </nav>
        </div>
      )}
    </header>
  );
}