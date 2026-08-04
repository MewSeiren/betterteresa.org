import React, { useState } from 'react';
import { history } from '@/data/teresaData';
import { ChevronDown } from 'lucide-react';

export default function History() {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? history : history.slice(0, 5);
  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Kasaysayan ng Teresa</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">Mula sa maliit na settlement patungong modernong bayan</h2>
      </div>
      <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-8">
        {items.map((h, i) => (
          <div key={i} className="relative pb-9 last:pb-0">
            <span className="absolute -left-[33px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[#1a73e8] ring-4 ring-white sm:-left-[41px]"><span className="h-2 w-2 rounded-full bg-white" /></span>
            <p className="text-sm font-bold uppercase tracking-widest text-[#1a73e8]">{h.year}</p>
            <h3 className="mt-1 text-xl font-bold text-[#0a1a35]">{h.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{h.desc}</p>
          </div>
        ))}
      </div>
      {history.length > 5 && (
        <button onClick={() => setExpanded(!expanded)} className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 px-5 font-bold text-slate-700 transition hover:bg-slate-100">
          {expanded ? 'Show Less' : 'Show More'} <ChevronDown size={18} className={expanded ? 'rotate-180 transition' : 'transition'} />
        </button>
      )}
    </section>
  );
}