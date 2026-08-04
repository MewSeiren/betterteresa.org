import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Search, ChevronDown } from 'lucide-react';
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#0F2D2E] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            {hotlines.map(h => (
              <a key={h.label} href={`tel:${h.number.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-[#00E676]">
                <Phone size={12} /> <span className="font-semibold">{h.label}:</span> {h.number}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span>Teresa, Rizal</span>
            <span className="text-white/40">|</span>
            <span>{dateStr} · {timeStr} PHT</span>
          </div>
        </div>
      </div>
      <div className={`border-b border-[#0F2D2E]/10 bg-white transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-11 w-11 rounded-lg object-contain bg-white" fittingType="fit" />
            <div className="leading-tight">
              <p className="text-lg font-black tracking-tight text-[#0F2D2E]">Better Teresa</p>
              <p className="text-[11px] font-medium text-[#0F2D2E]/55">Community Portal · Municipality of Teresa, Rizal</p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="rounded-md px-3.5 py-2 text-sm font-semibold text-[#0F2D2E]/75 transition hover:bg-[#0F2D2E]/5 hover:text-[#0F2D2E]">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="hidden rounded-lg bg-[#00B85C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#00A04E] sm:inline-flex">Browse Services</a>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg border border-[#0F2D2E]/15 lg:hidden" aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-[#0F2D2E] p-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-10 w-10 rounded-lg object-contain bg-white" fittingType="fit" />
            <span className="text-lg font-black">Better Teresa</span>
            <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu"><X /></button>
          </div>
          <nav className="mt-10 grid gap-2">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg border-b border-white/10 py-4 text-2xl font-semibold">{l.label}</a>
            ))}
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-4 rounded-lg bg-[#00B85C] px-4 py-3.5 text-center font-bold">Browse Services</a>
          </nav>
        </div>
      )}
    </header>
  );
}