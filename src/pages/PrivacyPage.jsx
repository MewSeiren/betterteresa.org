import React from 'react';
import PageShell from '@/components/civic/PageShell';
import { useLang } from '@/lib/LanguageContext';

// /privacy — community-portal privacy statement.
export default function PrivacyPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('ft.privacy') }]}>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('pg.privacy')}</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
          <p>{t('pg.privacyBody1')}</p>
          <p>{t('pg.privacyBody2')}</p>
          <p>{t('pg.privacyBody3')}</p>
        </div>
      </div>
    </PageShell>
  );
}