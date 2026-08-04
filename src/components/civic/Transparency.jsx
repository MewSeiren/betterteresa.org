import React, { useState, useMemo } from 'react';
import { Search, FileCheck2, ExternalLink } from 'lucide-react';
import { records } from '@/data/teresaData';

export default function Transparency() {
  const [q, setQ] = useState('');
  const found = useMemo(() => records.filter(r => (r.title + r.type + r.tags).toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <section id="transparency" className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Transparency</p>
      <h2 className="mt-1 text-lg font-black text-[#0a1a35]">Public records</h2>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search records..." className="min-h-11 w-full rounded-lg border border-slate-200 bg-[#f8f9fa] pl-9 pr-3 text-sm outline-none focus:border-[#1a73e8]" />
      </div>
      <div className="mt-4 space-y-2">
        {found.map(r => (
          <a key={r.title} href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="group block rounded-xl border border-slate-100 p-3 transition hover:border-[#1a73e8] hover:bg-[#f8f9fa]">
            <div className="flex items-center justify-between">
              <FileCheck2 size={16} className="text-[#1a73e8]" />
              <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
            </div>
            <p className="mt-2 text-sm font-bold leading-snug text-[#0a1a35]">{r.title}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#1a73e8]">{r.type}</p>
          </a>
        ))}
        {!found.length && <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">No matching records. Search the full archive for all 104 documents.</p>}
      </div>
      <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0a1a35] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#15294a]">Open all 104 public records <ExternalLink size={14} /></a>
    </section>
  );
}