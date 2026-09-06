import React from 'react';
import { MapPin, Mail, Facebook } from 'lucide-react';
import { hotlines } from '@/data/teresaData';
import OfficeDirectory from '@/components/civic/OfficeDirectory';
import { useLang } from '@/lib/LanguageContext';

// Contact section: Municipal Hall card with verified emergency hotlines
// (click-to-call) and the full office directory.
export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="rounded-2xl bg-[#0a1a35] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-white/60">{t('ct.eyebrow')}</p>
        <h2 className="mt-1 text-lg font-black">{t('ct.hall')}</h2>
        <a href="tel:+63282506800" className="mt-3 block text-3xl font-black leading-none tracking-tight transition hover:text-[#93c5fd]">(02) 8250-6800</a>
        <p className="mt-2 text-xs text-white/70">{t('ct.urgent')}</p>
        <div className="mt-4 space-y-1.5 rounded-xl bg-white/10 p-3">
          {hotlines.filter((h) => h.key !== 'hall').map((h) => (
            <a key={h.key} href={`tel:${h.tel}`} className="flex items-center justify-between gap-2 text-xs font-semibold text-white hover:text-white/80">
              <span className="truncate text-white/70">{t(`hl.${h.key}`)}</span>
              <span className="whitespace-nowrap font-bold">{h.number}</span>
            </a>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0" size={14} /> Corazon C. Aquino Ave., Brgy. Poblacion, Teresa, Rizal 1880</p>
          <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="flex items-center gap-2 hover:text-white"><Mail size={14} /> mayorsoffice@teresarizal.gov.ph</a>
          <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Facebook size={14} /> facebook.com/lguteresarizal</a>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('ct.directory')}</p>
        <div className="mt-4">
          <OfficeDirectory />
        </div>
      </div>
    </section>
  );
}