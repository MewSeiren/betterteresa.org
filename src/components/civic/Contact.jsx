import React from 'react';
import { MapPin, Mail, Facebook, Phone } from 'lucide-react';
import { offices, hotlines } from '@/data/teresaData';

export default function Contact() {
  return (
    <section id="contact" className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="rounded-2xl bg-[#0a1a35] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-white/60">Contact & Hotlines</p>
        <h2 className="mt-1 text-lg font-black">Municipal Hall</h2>
        <a href="tel:+63282506800" className="mt-3 block text-3xl font-black leading-none tracking-tight">(02) 8250-6800</a>
        <p className="mt-2 text-xs text-white/70">For urgent local assistance and municipal service concerns.</p>
        <div className="mt-4 space-y-1.5 rounded-xl bg-white/10 p-3">
          {hotlines.filter(h => h.label !== 'Municipal Hall').map(h => (
            <a key={h.label} href={`tel:${h.number.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-between text-xs font-semibold text-white hover:text-white/80">
              <span className="text-white/70">{h.label === 'PNP' ? 'PNP (Teresa)' : h.label === 'BFP' ? 'Bureau of Fire (BFP)' : 'Disaster Risk (MDRRMO)'}</span>
              <span className="font-bold">{h.number}</span>
            </a>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0" size={14} /> Corazon C. Aquino Ave., Brgy. Poblacion, Teresa, Rizal 1880</p>
          <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="flex items-center gap-2 hover:text-white"><Mail size={14} /> mayorsoffice@teresarizal.gov.ph</a>
          <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Facebook size={14} /> facebook.com/lguteresarizal</a>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Office Directory</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {offices.map(o => (
            <div key={o.name} className="rounded-xl border border-slate-100 p-3">
              <h4 className="text-sm font-bold text-[#0a1a35]">{o.name}</h4>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <a href={`tel:${o.line.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a73e8]"><Phone size={12} /> {o.line}</a>
                <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a73e8]"><Mail size={12} /> {o.email}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}