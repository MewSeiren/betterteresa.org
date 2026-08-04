import React from 'react';
import { officials } from '@/data/teresaData';
import { useLang } from '@/lib/LanguageContext';

export default function Government() {
  const { t } = useLang();
  const exec = officials.slice(0, 2);
  const sb = officials.slice(2, 10);
  const exOff = officials.slice(10);

  return (
    <section id="government" className="bg-[#f8f9fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('gv.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('gv.title')}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {exec.map(o => (
            <div key={o.name} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0a1a35] text-base font-black text-white">{o.initials}</div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">{o.role}</p>
                <p className="text-lg font-black leading-tight text-[#0a1a35]">Hon. {o.name}</p>
                <p className="mt-1 text-sm text-slate-500">{o.focus}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="mt-8 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{t('gv.sb')}</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sb.map(o => (
            <div key={o.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8eff7] text-sm font-black text-[#1565c0]">{o.initials}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#0a1a35]">Hon. {o.name}</p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-snug text-slate-500">{o.focus}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-8 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{t('gv.exOfficio')}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {exOff.map(o => (
            <div key={o.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8eff7] text-sm font-black text-[#1565c0]">{o.initials}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#0a1a35]">{o.name}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#e8eff7] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1565c0]">{t('gv.exOfficio')}</span>
              </div>
              <p className="mt-2 text-xs leading-snug text-slate-500">{o.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}