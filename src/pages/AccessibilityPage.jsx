import React from 'react';
import PageShell from '@/components/civic/PageShell';
import { useLang } from '@/lib/LanguageContext';

// /accessibility — accessibility commitment statement.
export default function AccessibilityPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('ft.accessibility') }]}>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('pg.accessibility')}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
          <p>{t('pg.accessBody1')}</p>
          <p>{t('pg.accessBody2')}</p>
        </div>
      </div>
    </PageShell>
  );
}