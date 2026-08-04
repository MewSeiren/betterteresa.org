import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';
import { serviceCategories } from '@/data/servicesData';

export default function Services() {
  const [active, setActive] = useState(7);
  const sel = serviceCategories[active];

  return (
    <section id="services" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Government Services</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">Municipal Services</h2>
          <p className="mt-4 text-base text-slate-600">Browse all offices and services offered by the Municipal Government of Teresa. Select a category to view details, then open the full service page for requirements and fees.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center justify-between bg-[#e8eff7] px-4 py-3">
              <span className="text-sm font-bold text-[#1565c0]">Services</span>
              <ChevronUp className="text-[#1565c0]" size={18} />
            </div>
            <ul className="py-1">
              {serviceCategories.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.slug}>
                    <button onClick={() => setActive(i)} className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition ${on ? 'bg-[#e8eff7] text-[#1565c0]' : 'text-[#37474f] hover:bg-slate-50'}`}>
                      <span>{c.name}</span>
                      <ChevronRight size={15} className={on ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-6 sm:p-8">
            <span className="inline-flex items-center rounded-full bg-[#e8eff7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1565c0]">{sel.office}</span>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-[#0a1a35]">{sel.name}</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{sel.intro}</p>
            <p className="mt-4 text-sm text-slate-500"><span className="font-bold text-[#0a1a35]">Location:</span> {sel.location}</p>
            <p className="mt-1 text-sm text-slate-500"><span className="font-bold text-[#0a1a35]">Schedule:</span> {sel.schedule}</p>
            {sel.count && <p className="mt-3 text-sm font-bold text-[#1a73e8]">{sel.count} services available</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/services/${sel.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1a73e8] px-6 font-bold text-white transition hover:bg-[#1557b0]">View Full Details <ArrowRight size={16} /></Link>
              <a href={sel.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 px-5 font-bold text-slate-700 transition hover:bg-white">Official Portal <ExternalLink size={15} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}