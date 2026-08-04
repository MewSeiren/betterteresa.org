import React from 'react';
import NavBar from '@/components/civic/NavBar';
import Hero from '@/components/civic/Hero';
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
    <div className="min-h-screen bg-white text-[#0F2D2E]">
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Glance />
        <History />
        <Government />
        <Transparency />
        <FacebookUpdates />
        <Contact />
      </main>
      <CivicFooter />
    </div>
  );
}