import React from 'react';
import { FileText, Briefcase, Receipt, HeartHandshake, Stethoscope, HardHat, GraduationCap, Wheat, ArrowUpRight } from 'lucide-react';
import { services } from '@/data/teresaData';

const icons = { FileText, Briefcase, Receipt, HeartHandshake, Stethoscope, HardHat, GraduationCap, Wheat };

export default function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Government Services</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Mabilis na access sa opisyal na government services</h2>
          <p className="mt-4 text-lg text-slate-600">Hanapin ang kailangan mo para sa citizenship, business, education, health, at marami pang iba. Bawat service ay naka-link sa opisyal na municipal portal.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(s => {
            const Icon = icons[s.icon] || FileText;
            return (
              <a key={s.title} href={s.href} target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#1d4ed8] hover:shadow-lg">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-[#1d4ed8] transition group-hover:bg-[#1d4ed8] group-hover:text-white"><Icon size={22} /></div>
                <h3 className="text-lg font-bold leading-snug text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1d4ed8]">View <ArrowUpRight size={15} /></span>
              </a>
            );
          })}
        </div>
        <div className="mt-8">
          <a href="https://teresarizal.gov.ph/services" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#1d4ed8] px-6 font-bold text-white transition hover:bg-[#1e40af]">View All Services <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}