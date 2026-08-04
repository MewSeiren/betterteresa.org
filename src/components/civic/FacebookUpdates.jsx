import React from 'react';
import { Facebook, ArrowUpRight } from 'lucide-react';

export default function FacebookUpdates() {
  return (
    <section className="bg-[#F4F7F6] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <p className="eyebrow">Latest Updates</p>
          <h2 className="text-3xl font-black tracking-tight text-[#0F2D2E] sm:text-4xl">Real-time updates, straight from our page</h2>
          <p className="mt-4 max-w-xl text-lg text-[#0F2D2E]/65">Follow the official LGU Teresa Rizal Facebook page for the latest announcements, advisories, events, and community updates as they happen.</p>
          <ul className="mt-6 grid gap-2 text-[#0F2D2E]/70">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00B85C]" /> Official announcements & advisories</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00B85C]" /> Events & community programs</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00B85C]" /> Posted in real time, as it happens</li>
          </ul>
          <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#0F2D2E] px-6 font-bold text-white transition hover:bg-[#174244]">Visit our Facebook Page <ArrowUpRight size={18} /></a>
        </div>
        <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[#0F2D2E]/10 bg-white p-6 transition hover:border-[#00B85C] hover:shadow-lg">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#1877F2] text-white"><Facebook size={32} /></div>
          <div>
            <p className="font-bold text-[#0F2D2E]">Municipal Government of Teresa, Rizal</p>
            <p className="text-sm text-[#0F2D2E]/55">Official Facebook Page · 30K+ followers</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#00A854]">Follow Page <ArrowUpRight size={15} /></span>
          </div>
        </a>
      </div>
    </section>
  );
}