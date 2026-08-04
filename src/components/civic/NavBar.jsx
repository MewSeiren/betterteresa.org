import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-[#0a1a35] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <p className="flex items-center gap-2 font-medium"><span>🚀</span> Join the #CivicTech Revolution — Help shape the future of Teresa through technology.</p>
          <div className="hidden items-center gap-4 md:flex">
            <a href="tel:+63282506800" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white"><Phone size={12} /> (02) 8250-6800</a>
            <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white"><Mail size={12} /> mayorsoffice@teresarizal.gov.ph</a>
            <span className="inline-flex items-center gap-1.5 text-white/70"><MapPin size={12} /> Teresa, Rizal</span>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className={`border-b border-slate-200 bg-white transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-11 w-11 rounded-full object-contain mix-blend-multiply drop-shadow-[0_0_8px_rgba(26,115,232,0.4)]" fittingType="fit" />
            <div className="leading-tight">
              <p className="text-lg font-black tracking-tight text-[#0a1a35]">Better Teresa</p>
              <p className="text-[11px] font-medium text-slate-500">Municipality of Teresa · Rizal</p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="rounded-md px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[#0a1a35]">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="hidden rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0] sm:inline-flex">Browse Services</a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 lg:hidden" aria-label="Open menu"><Menu size={20} className="text-slate-700" /></button>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-10 w-10 rounded-full object-contain mix-blend-multiply" fittingType="fit" />
              <span className="text-lg font-black text-[#0a1a35]">Better Teresa</span>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu"><X className="text-slate-700" /></button>
          </div>
          <nav className="mt-10 grid gap-2">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg border-b border-slate-100 py-4 text-2xl font-semibold text-slate-800">{l.label}</a>
            ))}
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-[#1a73e8] px-4 py-3.5 text-center font-bold text-white">Browse Services</a>
          </nav>
        </div>
      )}
    </header>
  );
}