import React from 'react';
import { officials } from '@/data/teresaData';

export default function Government() {
  return (
    <section id="government" className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Local Government</p>
      <h2 className="mt-1 text-lg font-black text-[#0a1a35]">Officials of Teresa</h2>
      <div className="mt-4 space-y-3">
        {officials.slice(0, 2).map(o => (
          <div key={o.name} className="flex items-center gap-3 rounded-xl bg-[#f8f9fa] p-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0a1a35] text-sm font-black text-white">{o.initials}</div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a73e8]">{o.role}</p>
              <p className="text-sm font-bold leading-tight text-[#0a1a35]">Hon. {o.name}</p>
              <p className="truncate text-xs text-slate-500">{o.focus}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Sangguniang Bayan</h3>
      <div className="grid gap-1">
        {officials.slice(2).map(o => (
          <div key={o.name} className="flex items-center gap-3 py-1.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-black text-[#1a73e8]">{o.initials}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0a1a35]">Hon. {o.name}</p>
              <p className="truncate text-xs text-slate-500">{o.focus}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}