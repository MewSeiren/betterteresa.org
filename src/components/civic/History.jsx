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
          <p className="eyebrow">History of Teresa</p>
          <h2 className="text-3xl font-black tracking-tight text-[#0F2D2E] sm:text-4xl">From a small settlement to a modern town</h2>
        </div>
        <div className="relative border-l-2 border-[#0F2D2E]/15 pl-6 sm:pl-8">
          {items.map((h, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[33px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[#00B85C] ring-4 ring-[#F4F7F6] sm:-left-[41px]"><span className="h-2 w-2 rounded-full bg-white" /></span>
              <p className="text-sm font-bold uppercase tracking-widest text-[#00A854]">{h.year}</p>
              <h3 className="mt-1 text-xl font-bold text-[#0F2D2E]">{h.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-[#0F2D2E]/65">{h.desc}</p>
            </div>
          ))}
        </div>
        {history.length > 5 && (
          <button onClick={() => setExpanded(!expanded)} className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#0F2D2E]/15 px-5 font-bold text-[#0F2D2E] transition hover:bg-[#0F2D2E]/5">
            {expanded ? 'Show Less' : 'Show More'} <ChevronDown size={18} className={expanded ? 'rotate-180 transition' : 'transition'} />
          </button>
        )}
      </div>
    </section>
  );
}