import React from 'react';
import { Image } from '@/components/ui/image';
import { quickAccess } from '@/data/teresaData';
import { Search, FileText, Building2, Gavel, BarChart3, DollarSign, ArrowUpRight } from 'lucide-react';

const icons = { Search, FileText, Building2, Gavel, BarChart3, DollarSign };

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0F2D2E] pt-28 lg:pt-32">
      <div className="absolute inset-0">
        <Image src="https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/57917dbc2_generated_7bffaba6.png" alt="Documentary landscape of Teresa, Rizal" className="h-full w-full object-cover opacity-25" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2D2E] via-[#0F2D2E]/90 to-[#0F2D2E]/60" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
        <div className="text-white">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00E676] backdrop-blur">Municipality of Teresa · Province of Rizal</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight">Welcome to Better Teresa</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">The volunteer-run portal of the Municipality of Teresa. Find information, access government services, and stay updated with the latest public records — all linked to verified sources.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#services" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#00B85C] px-6 font-bold text-white transition hover:bg-[#00A04E]">Browse Services</a>
            <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-6 font-bold text-white transition hover:bg-white/10">Contact Us</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#00E676]"><FileText size={15} /> View Municipal Services</a>
            <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#00E676]"><Gavel size={15} /> Public Document Archive</a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-6">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-widest text-[#00E676]">Quick Access</h2>
          <p className="mb-5 text-sm text-white/60">Jump straight to what citizens search for most.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickAccess.map(q => {
              const Icon = icons[q.icon] || FileText;
              return (
                <a key={q.title} href={q.href} target={q.href.startsWith('http') ? '_blank' : undefined} rel={q.href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-[#00E676]/60 hover:bg-white/10">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-[#00E676]/20 text-[#00E676]"><Icon size={20} /></div>
                  <p className="font-bold text-white">{q.title}</p>
                  <p className="mt-0.5 text-xs text-white/55">{q.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}