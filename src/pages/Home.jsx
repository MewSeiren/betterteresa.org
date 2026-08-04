import React from 'react';
import NavBar from '@/components/civic/NavBar';
import Hero from '@/components/civic/Hero';
import QuickAccess from '@/components/civic/QuickAccess';
import Services from '@/components/civic/Services';
import Glance from '@/components/civic/Glance';
import History from '@/components/civic/History';
import Government from '@/components/civic/Government';
import Transparency from '@/components/civic/Transparency';
import FacebookUpdates from '@/components/civic/FacebookUpdates';
import Contact from '@/components/civic/Contact';
import CivicFooter from '@/components/civic/CivicFooter';
import ScrollProgress from '@/components/civic/ScrollProgress';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <QuickAccess />
        <Services />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <Glance />
              <History />
              <FacebookUpdates />
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <Government />
              <Transparency />
            </aside>
          </div>
          <div className="mt-8">
            <Contact />
          </div>
        </div>
      </main>
      <CivicFooter />
    </div>
  );
}