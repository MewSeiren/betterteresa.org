import React from 'react';
import PageShell from '@/components/civic/PageShell';
import Transparency from '@/components/civic/Transparency';
import { projects } from '@/data/teresaData';
import { useLang } from '@/lib/LanguageContext';

// /transparency — public records plus infrastructure & program reports.
export default function TransparencyPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('nav.transparency') }]}>
      <Transparency />
      <section id="projects" className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('tr.eyebrow')}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{t('tr.projects')}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">{t('tr.projectsDesc')}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5 transition hover:border-[#1a73e8]/50 hover:bg-white hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#e8eff7] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1565c0]">{p.status}</span>
                <span className="text-xs font-semibold text-slate-400">{p.cycle}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold leading-snug text-[#0a1a35]">{p.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.detail}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.source}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}