import React from 'react';
import PageShell from '@/components/civic/PageShell';
import Services from '@/components/civic/Services';
import { useLang } from '@/lib/LanguageContext';

// /services — the municipal services directory.
export default function ServicesPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('nav.services') }]}>
      <Services />
    </PageShell>
  );
}