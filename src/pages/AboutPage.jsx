import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageShell from '@/components/civic/PageShell';
import History from '@/components/civic/History';
import Glance from '@/components/civic/Glance';
import { BARANGAYS } from '@/lib/tourism';
import { useLang } from '@/lib/LanguageContext';

// /about — municipality profile: history, at-a-glance statistics, barangays.
export default function AboutPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('nav.about') }]}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div id="history">
          <History />
        </div>
        <div className="mt-14">
          <Glance />
        </div>
        <div id="barangays" className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('ab.municipality')}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{t('ab.barangays')}</h2>
          <p className="mt-3 text-sm text-slate-600">{t('ab.barangaysDesc')}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {BARANGAYS.map((b) => (
              <span key={b} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0a1a35]">
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-14 rounded-2xl bg-[#0a1a35] p-8 text-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black">{t('nav.contact')}</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">{t('ct.urgent')}</p>
          </div>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1557b0] sm:mt-0">
            {t('ft.help')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}