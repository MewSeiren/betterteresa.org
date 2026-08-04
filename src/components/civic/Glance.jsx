import React from 'react';
import { Image } from '@/components/ui/image';
import { glance } from '@/data/teresaData';

const BUILDING = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/c4e95c870_generated_image.png';

export default function Glance() {
  return (
    <section id="glance" className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Teresa sa Isang Sulyap</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35]">Isang first-class municipality sa Rizal</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {glance.map(g => (
              <div key={g.label}>
                <p className="text-4xl font-black tracking-tight text-[#1a73e8]">{g.value}</p>
                <p className="mt-1 font-bold text-[#0a1a35]">{g.label}</p>
                <p className="text-xs text-slate-500">{g.sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <Image src={BUILDING} alt="Teresa Municipal Hall" className="aspect-[4/3] w-full" fittingType="fill" />
        </div>
      </div>
    </section>
  );
}