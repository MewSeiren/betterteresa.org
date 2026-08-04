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
          <h2 className="text-3xl font-black tracking-tight text-[#0F2D2E] sm:text-4xl">Follow the public peso</h2>
          <p className="mt-4 text-lg text-[#0F2D2E]/65">Budget disclosures, fund utilization, and project reports — linked to the official Public Document Archive. No aggregate figures are shown until a verified appropriation document is published.</p>
        </div>

        <div id="projects" className="mb-16">
          <h3 className="mb-6 text-xl font-bold text-[#0F2D2E]">Projects & Programs</h3>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0F2D2E]/10 bg-[#0F2D2E]/10 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div key={p.name} className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#00E676]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00A854]">{p.status}</span>
                  <span className="text-xs font-semibold text-[#0F2D2E]/50">{p.cycle}</span>
                </div>
                <h4 className="mt-4 text-lg font-bold leading-snug text-[#0F2D2E]">{p.name}</h4>
                <button onClick={() => setActive(active === i ? null : i)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#00A854]">
                  {active === i ? <X size={16} /> : <Plus size={16} />} {active === i ? 'Hide details' : 'View details'}
                </button>
                {active === i && (
                  <div className="mt-4 rounded-lg border-l-2 border-[#00E676] bg-[#F4F7F6] p-4">
                    <p className="text-sm leading-relaxed text-[#0F2D2E]/75">{p.detail}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#0F2D2E]/50">Primary source</p>
                    <p className="font-semibold text-[#0F2D2E]">{p.source}</p>
                    <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#00A854]">Inspect source <ExternalLink size={14} /></a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="records">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-bold text-[#0F2D2E]">Financial & Public Records</h3>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F2D2E]/40" size={18} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search records..." className="min-h-12 w-full rounded-lg border border-[#0F2D2E]/15 bg-[#F4F7F6] pl-11 pr-4 text-sm outline-none focus:border-[#00B85C]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {found.map(r => (
              <a key={r.title} href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-[#0F2D2E]/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#00B85C] hover:shadow-md">
                <div className="flex items-center justify-between">
                  <FileCheck2 size={20} className="text-[#00A854]" />
                  <span className="text-xs font-bold text-[#0F2D2E]/40">{r.date}</span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#00A854]">{r.type}</p>
                <h4 className="mt-1.5 flex-1 font-bold leading-snug text-[#0F2D2E]">{r.title}</h4>
                <p className="mt-3 text-xs text-[#0F2D2E]/55">{r.tags}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#00A854]">View <ArrowUpRight size={15} /></span>
              </a>
            ))}
          </div>
          {!found.length && <p className="rounded-xl border border-dashed border-[#0F2D2E]/20 p-8 text-center text-[#0F2D2E]/55">No matching records in this featured set. Search the full archive for all 104 documents.</p>}
          <div className="mt-6">
            <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#0F2D2E] px-6 font-bold text-white transition hover:bg-[#174244]">Open all 104 public records <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}