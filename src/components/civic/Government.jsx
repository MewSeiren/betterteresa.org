import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { officials, offices } from '@/data/teresaData';

export default function Government() {
  return (
    <section id="government" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Local Government</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Mga piniling opisyal at opisina ng Teresa</h2>
          <p className="mt-4 text-lg text-slate-600">Ang pamunuan na responsable sa pagbuo ng patakaran, paggawa ng batas, at paghahatid ng public service.</p>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officials.slice(0, 2).map(o => (
            <article key={o.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#1d4ed8] text-xl font-black text-white">{o.initials}</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">{o.role}</p>
                <h3 className="text-lg font-bold leading-tight text-slate-900">Hon. {o.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">{o.focus}</p>
              </div>
            </article>
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-lg font-bold text-slate-900">Sangguniang Bayan Members</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {officials.slice(2).map(o => (
            <article key={o.name} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#1d4ed8] hover:shadow-md">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-lg font-black text-[#1d4ed8]">{o.initials}</div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">{o.role}</p>
              <h3 className="mt-1 text-base font-bold leading-tight text-slate-900">Hon. {o.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{o.focus}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">Office Directory</h3>
          <a href="https://teresarizal.gov.ph/about" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1d4ed8] hover:underline">Verify on official portal <ExternalLink size={15} /></a>
        </div>
        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {offices.map(o => (
            <div key={o.name} className="bg-white p-5">
              <h4 className="font-bold text-slate-900">{o.name}</h4>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                <a href={`tel:${o.line.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Phone size={15} /> {o.line}</a>
                <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Mail size={15} /> {o.email}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}