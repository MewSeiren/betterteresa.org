import React, { useState, useMemo } from 'react';
import { Search, FileCheck2, ExternalLink } from 'lucide-react';
import { records } from '@/data/teresaData';
import { useLang } from '@/lib/LanguageContext';

export default function Transparency() {
  const { t } = useLang();
  const [q, setQ] = useState('');
  const found = useMemo(() => records.filter(r => (r.title + r.type + r.tags).toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <section id="documents" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('tr.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('tr.title')}</h2>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('tr.search')} className="min-h-12 w-full rounded-xl border border-slate-200 bg-[#f8f9fa] pl-10 pr-4 text-sm outline-none focus:border-[#1a73e8]" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {found.map(r => (
            <a key={r.title} href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5 transition hover:border-[#1a73e8] hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between">
                <FileCheck2 size={18} className="text-[#1a73e8]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{r.date}</span>
              </div>
              <p className="mt-3 text-sm font-bold leading-snug text-[#0a1a35]">{r.title}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#1a73e8]">{r.type}</p>
            </a>
          ))}
        </div>
        {!found.length && <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">{t('tr.none')}</p>}
        <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a1a35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#15294a]">{t('tr.openAll')} <ExternalLink size={15} /></a>
      </div>
    </section>
  );
}