import React from 'react';
import { Facebook, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function FacebookUpdates() {
  const { t } = useLang();
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('fb.eyebrow')}</p>
      <h2 className="mt-1 text-lg font-black text-[#0a1a35]">{t('fb.title')}</h2>
      <p className="mt-2 text-sm text-slate-500">{t('fb.desc')}</p>
      <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="group mt-4 flex items-center gap-4 rounded-xl bg-[#f8f9fa] p-4 transition hover:border-[#1a73e8] hover:shadow-md">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1877F2] text-white"><Facebook size={24} /></div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0a1a35]">Municipal Government of Teresa, Rizal</p>
          <p className="text-xs text-slate-500">{t('fb.followers')}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#1a73e8]">{t('fb.follow')} <ArrowUpRight size={13} /></span>
        </div>
      </a>
    </section>
  );
}