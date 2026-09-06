import React from 'react';
import PageShell from '@/components/civic/PageShell';
import Contact from '@/components/civic/Contact';
import { useLang } from '@/lib/LanguageContext';

// /contact — emergency hotlines and the office contact directory.
export default function ContactPage() {
  const { t } = useLang();
  return (
    <PageShell crumbs={[{ label: t('nav.contact') }]}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Contact />
      </div>
    </PageShell>
  );
}