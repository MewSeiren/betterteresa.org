import React from 'react';
import { glance } from '@/data/teresaData';

export default function Glance() {
  return (
    <section id="glance" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Teresa sa Isang Sulyap</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Isang first-class municipality sa Rizal</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map(g => (
            <div key={g.label} className="bg-white p-8">
              <p className="text-5xl font-black tracking-tight text-[#1d4ed8]">{g.value}</p>
              <p className="mt-2 font-bold text-slate-900">{g.label}</p>
              <p className="text-sm text-slate-500">{g.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}