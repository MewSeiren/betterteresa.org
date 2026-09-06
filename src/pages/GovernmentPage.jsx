import React from 'react';
import PageShell from '@/components/civic/PageShell';
import Government from '@/components/civic/Government';
import OfficeDirectory from '@/components/civic/OfficeDirectory';
import { useLang } from '@/lib/LanguageContext';

// /government — elected officials plus the municipal office directory.
export default function GovernmentPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('nav.government') }]}>
      <Government />
      <section id="offices" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('ct.directory')}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{t('gv.officesTitle')}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">{t('gv.officesDesc')}</p>
        <div className="mt-6">
          <OfficeDirectory />
        </div>
      </section>
    </PageShell>
  );
}