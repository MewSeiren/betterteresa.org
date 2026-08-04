import React, { useState, useMemo } from 'react';
import { Search, FileCheck2, ArrowUpRight, Plus, X, ExternalLink } from 'lucide-react';
import { records, projects } from '@/data/teresaData';

export default function Transparency() {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(null);
  const found = useMemo(() => records.filter(r => (r.title + r.type + r.tags).toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <section id="transparency" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Transparency & Public Records</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Subaybayan ang public peso</h2>
          <p className="mt-4 text-lg text-slate-600">Budget disclosures, fund utilization, at project reports — naka-link sa opisyal na Public Document Archive. Walang aggregate figures na ipinapakita hanggang sa mayroong verified na appropriation document.</p>
        </div>

        <div id="projects" className="mb-16">
          <h3 className="mb-6 text-xl font-bold text-slate-900">Projects & Programs</h3>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div key={p.name} className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#1d4ed8]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1d4ed8]">{p.status}</span>
                  <span className="text-xs font-semibold text-slate-400">{p.cycle}</span>
                </div>
                <h4 className="mt-4 text-lg font-bold leading-snug text-slate-900">{p.name}</h4>
                <button onClick={() => setActive(active === i ? null : i)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#1d4ed8]">
                  {active === i ? <X size={16} /> : <Plus size={16} />} {active === i ? 'Hide details' : 'View details'}
                </button>
                {active === i && (
                  <div className="mt-4 rounded-lg border-l-2 border-[#1d4ed8] bg-slate-50 p-4">
                    <p className="text-sm leading-relaxed text-slate-600">{p.detail}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">Primary source</p>
                    <p className="font-semibold text-slate-900">{p.source}</p>
                    <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#1d4ed8]">Inspect source <ExternalLink size={14} /></a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="records">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">Financial & Public Records</h3>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Maghanap ng records..." className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-[#1d4ed8]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {found.map(r => (
              <a key={r.title} href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#1d4ed8] hover:shadow-md">
                <div className="flex items-center justify-between">
                  <FileCheck2 size={20} className="text-[#1d4ed8]" />
                  <span className="text-xs font-bold text-slate-400">{r.date}</span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">{r.type}</p>
                <h4 className="mt-1.5 flex-1 font-bold leading-snug text-slate-900">{r.title}</h4>
                <p className="mt-3 text-xs text-slate-500">{r.tags}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1d4ed8]">View <ArrowUpRight size={15} /></span>
              </a>
            ))}
          </div>
          {!found.length && <p className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">No matching records in this featured set. Search the full archive for all 104 documents.</p>}
          <div className="mt-6">
            <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#1d4ed8] px-6 font-bold text-white transition hover:bg-[#1e40af]">Open all 104 public records <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}