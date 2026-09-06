import React from 'react';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import Breadcrumbs from '@/components/civic/Breadcrumbs';

// Shared shell for content pages: global header, optional breadcrumbs,
// content, global footer.
export default function PageShell({ crumbs, children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <main className="pt-32">
        {crumbs && crumbs.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {children}
      </main>
      <CivicFooter />
    </div>
  );
}