import React from 'react';
import { ArrowUpRight, FileCheck2 } from 'lucide-react';
import { records } from '@/data/teresaData';

export default function Budget() {
 return <section id="budget" className="border-b border-[#0F2D2E]/15 bg-[#F4F7F6] px-6 py-24 sm:px-12 lg:px-16 xl:px-24">
  <div className="mb-14 grid gap-8 lg:grid-cols-2"><div><p className="eyebrow">01 · Financial transparency</p><h2 className="section-title">Follow the<br/>public peso.</h2></div><div className="max-w-xl self-end"><p className="text-lg leading-8 text-[#0F2D2E]/70">The archive currently lists 104 public documents. The records below are the latest verified Q2 2026 disclosures; open the official archive to inspect the source files.</p><p className="mt-4 text-sm font-semibold text-[#0F2D2E]">No aggregate annual budget figure is displayed until a verified appropriation document is published.</p></div></div>
  <div className="grid border-l border-t border-[#0F2D2E]/15 sm:grid-cols-2 xl:grid-cols-3">{records.map((r,i)=><a key={r.title} href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="group min-h-64 border-b border-r border-[#0F2D2E]/15 bg-white p-7 transition hover:-translate-y-1 hover:bg-[#0F2D2E] hover:text-white"><div className="flex justify-between"><FileCheck2 className="text-[#00B85C]"/><span className="text-xs font-bold">{String(i+1).padStart(2,'0')}</span></div><p className="mt-10 text-xs font-bold uppercase tracking-widest opacity-55">{r.type} · {r.date}</p><h3 className="mt-3 text-xl font-bold leading-snug">{r.title}</h3><p className="mt-5 text-sm opacity-60">{r.tags}</p></a>)}</div>
  <a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 font-bold text-[#0F2D2E]">Open all 104 records <ArrowUpRight size={18}/></a>
 </section>;
}