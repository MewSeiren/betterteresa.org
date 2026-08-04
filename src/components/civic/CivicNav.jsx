import React, { useState } from 'react';
import { Menu, X, Landmark } from 'lucide-react';

const links = [['Pulse','pulse'],['Budget','budget'],['Projects','projects'],['Records','records'],['People','officials'],['Contact','contact']];
export default function CivicNav() {
  const [open, setOpen] = useState(false);
  return <>
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-20 flex-col items-center border-r border-[#0F2D2E]/15 bg-white/90 py-6 backdrop-blur-xl lg:flex">
      <a href="#pulse" aria-label="Better Teresa home"><Landmark className="h-7 w-7 text-[#0F2D2E]" /></a>
      <nav className="my-auto flex flex-col gap-7">{links.map(([label,id],i)=><a key={id} href={`#${id}`} className="group flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-[.18em] text-[#0F2D2E]/60 hover:text-[#0F2D2E]"><span className="h-1.5 w-1.5 rounded-full bg-[#0F2D2E]/20 group-hover:bg-[#00E676]"/>{String(i+1).padStart(2,'0')} {label}</a>)}</nav>
      <button onClick={()=>setOpen(true)} aria-label="Open menu" className="grid h-12 w-12 place-items-center rounded-full bg-[#0F2D2E] text-white"><Menu /></button>
    </aside>
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#0F2D2E]/10 bg-white/90 px-5 backdrop-blur-xl lg:hidden"><a href="#pulse" className="font-black tracking-tight text-[#0F2D2E]">BETTER TERESA</a><button onClick={()=>setOpen(true)} className="grid h-12 w-12 place-items-center" aria-label="Open menu"><Menu/></button></header>
    {open&&<div className="fixed inset-0 z-[70] grid bg-[#0F2D2E]/95 p-7 text-white backdrop-blur-2xl"><button onClick={()=>setOpen(false)} className="ml-auto grid h-12 w-12 place-items-center" aria-label="Close menu"><X/></button><nav className="m-auto grid gap-4 text-center">{links.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className="text-4xl font-light tracking-tight hover:text-[#00E676]">{label}</a>)}</nav><p className="text-center text-xs uppercase tracking-[.25em] text-white/50">The open ledger of Teresa, Rizal</p></div>}
  </>;
}