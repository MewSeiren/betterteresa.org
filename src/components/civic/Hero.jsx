import React from 'react';
import { Search, FileText, Building2, Gavel, BarChart3, DollarSign, ArrowRight } from 'lucide-react';
import { quickAccess } from '@/data/teresaData';

const icons = { Search, FileText, Building2, Gavel, BarChart3, DollarSign };

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#1d4ed8] pt-40 pb-20 lg:pt-44 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div className="text-white">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur">Municipality of Teresa · Province of Rizal</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight">Welcome to Better Teresa</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">Ang volunteer-run portal ng Municipality of Teresa. Maghanap ng impormasyon, ma-access ang government services, at manatiling updated sa mga pinakabagong public records — lahat ay naka-link sa mga verified na sources.</p>
          <div className="mt-7 max-w-xl">
            <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-lg">
              <Search className="ml-2 text-slate-400" size={18} />
              <input placeholder="Maghanap ng services, directory..." className="w-full bg-transparent px-1 py-2 text-sm text-slate-700 outline-none" />
              <a href="#services" className="shrink-0 rounded-full bg-[#1d4ed8] px-5 py-2 text-sm font-bold text-white hover:bg-[#1e40af]">Search</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Birth Certificate', 'Business Permit', 'Real Property Tax'].map(t => (
                <a key={t} href="#services" className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 hover:bg-white/20">{t}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-widest text-white/90">Sikat na Services</h2>
          <p className="mb-5 text-sm text-white/60">Ang mga pinakahanap na services ng mga residente.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickAccess.map(q => {
              const Icon = icons[q.icon] || FileText;
              return (
                <a key={q.title} href={q.href} target={q.href.startsWith('http') ? '_blank' : undefined} rel={q.href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-white/40 hover:bg-white/10">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-white/15 text-white"><Icon size={20} /></div>
                  <p className="font-bold text-white">{q.title}</p>
                  <p className="mt-0.5 text-xs text-white/60">{q.desc}</p>
                </a>
              );
            })}
          </div>
          <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#1d4ed8] hover:bg-white/90">View All Services <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}