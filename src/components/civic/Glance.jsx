import React from 'react';
import { glance } from '@/data/teresaData';

export default function Glance() {
  return (
    <section id="glance" className="bg-[#F4F7F6] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Teresa at a Glance</p>
          <h2 className="text-3xl font-black tracking-tight text-[#0F2D2E] sm:text-4xl">A first-class municipality in Rizal</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0F2D2E]/10 bg-[#0F2D2E]/10 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map(g => (
            <div key={g.label} className="bg-white p-8">
              <p className="text-5xl font-black tracking-tight text-[#0F2D2E]">{g.value}</p>
              <p className="mt-2 font-bold text-[#0F2D2E]">{g.label}</p>
              <p className="text-sm text-[#0F2D2E]/55">{g.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}