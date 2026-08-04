import React, { useState } from 'react';
import { history } from '@/data/teresaData';
import { ChevronDown } from 'lucide-react';

export default function History() {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? history : history.slice(0, 5);
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Kasaysayan ng Teresa</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Mula sa maliit na settlement patungong modernong bayan</h2>
        </div>
        <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-8">
          {items.map((h, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[33px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[#1d4ed8] ring-4 ring-slate-50 sm:-left-[41px]"><span className="h-2 w-2 rounded-full bg-white" /></span>
              <p className="text-sm font-bold uppercase tracking-widest text-[#1d4ed8]">{h.year}</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">{h.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">{h.desc}</p>
            </div>
          ))}
        </div>
        {history.length > 5 && (
          <button onClick={() => setExpanded(!expanded)} className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 px-5 font-bold text-slate-700 transition hover:bg-slate-100">
            {expanded ? 'Show Less' : 'Show More'} <ChevronDown size={18} className={expanded ? 'rotate-180 transition' : 'transition'} />
          </button>
        )}
      </div>
    </section>
  );
}