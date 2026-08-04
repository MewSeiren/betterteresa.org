import React from 'react';
import { ArrowDownRight, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Hero() {
  return <section id="pulse" className="min-h-screen border-b border-[#0F2D2E]/15 pt-16 lg:pt-0">
    <div className="grid min-h-[78vh] lg:grid-cols-[1.08fr_.92fr]">
      <div className="flex flex-col justify-between p-6 pt-16 sm:p-12 lg:p-16 xl:p-24"><div><p className="mb-8 text-xs font-bold uppercase tracking-[.25em] text-[#0F2D2E]/55">Municipality of Teresa · Province of Rizal</p><h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] font-black leading-[.82] tracking-[-.065em] text-[#0F2D2E]">Public data.<br/><span className="text-[#00B85C]">Clear progress.</span></h1><p className="mt-9 max-w-xl text-lg leading-8 text-[#0F2D2E]/70">A citizen-first view of local officials, public funds, programs, laws, and essential services—linked to the records that verify them.</p></div>
      <div className="mt-12 flex flex-wrap gap-3"><a href="#budget" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#0F2D2E] px-6 font-bold text-white hover:bg-[#174244]">Explore the ledger <ArrowDownRight size={18}/></a><a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#0F2D2E]/20 px-6 font-bold text-[#0F2D2E]">Municipal services <ExternalLink size={16}/></a></div></div>
      <div className="relative min-h-[52vh] overflow-hidden bg-[#0F2D2E]"><Image src="https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/57917dbc2_generated_7bffaba6.png" alt="A documentary landscape of Teresa, Rizal" className="h-full w-full opacity-90"/><div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/30 bg-[#0F2D2E]/75 text-white backdrop-blur-md">{[['104','public records'],['10','elected leaders'],['1st','class municipality']].map(([v,l])=><div key={l} className="border-r border-white/20 p-4 sm:p-6"><strong className="block text-2xl sm:text-4xl">{v}</strong><span className="text-[10px] uppercase tracking-wider text-white/65">{l}</span></div>)}</div></div>
    </div>
  </section>;
}