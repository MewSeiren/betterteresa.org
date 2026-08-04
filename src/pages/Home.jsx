import React from 'react';
import NavBar from '@/components/civic/NavBar';
import Hero from '@/components/civic/Hero';
import QuickAccess from '@/components/civic/QuickAccess';
import Services from '@/components/civic/Services';
import Tourism from '@/components/civic/Tourism';
import Glance from '@/components/civic/Glance';
import History from '@/components/civic/History';
import Government from '@/components/civic/Government';
import Transparency from '@/components/civic/Transparency';
import FacebookUpdates from '@/components/civic/FacebookUpdates';
import Contact from '@/components/civic/Contact';
import Weather from '@/components/civic/Weather';
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
        <Tourism />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Glance />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <History />
        </div>
        <Government />
        <Transparency />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Weather />
            <FacebookUpdates />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <Contact />
        </div>
      </main>
      <CivicFooter />
    </div>
  );
}