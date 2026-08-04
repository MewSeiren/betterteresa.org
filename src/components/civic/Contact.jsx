import React from 'react';
import { MapPin, Phone, Mail, Facebook, ExternalLink } from 'lucide-react';
import { offices } from '@/data/teresaData';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Contact & Hotlines</p>
          <h2 className="text-3xl font-black tracking-tight text-[#0F2D2E] sm:text-4xl">The right desk, without the runaround</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-[#0F2D2E] p-8 text-white">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#00E676]">Municipal Hall</h3>
            <a href="tel:+63282506800" className="mt-4 block text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-tight">(02) 8250-6800</a>
            <p className="mt-4 text-white/65">For urgent local assistance and municipal service concerns. For life-threatening emergencies, call 911.</p>
            <div className="mt-8 grid gap-4 text-sm">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-[#00E676]" size={18} /> Corazon C. Aquino Ave., Poblacion, Teresa, Rizal, Philippines</p>
              <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="flex items-center gap-3 hover:text-[#00E676]"><Mail size={18} /> mayorsoffice@teresarizal.gov.ph</a>
              <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#00E676]"><Facebook size={18} /> facebook.com/lguteresarizal</a>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#0F2D2E]/10 bg-[#0F2D2E]/10">
            {offices.map(o => (
              <div key={o.name} className="bg-white p-5">
                <h4 className="font-bold text-[#0F2D2E]">{o.name}</h4>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <a href={`tel:${o.line.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-[#0F2D2E]/70 hover:text-[#0F2D2E]"><Phone size={15} /> {o.line}</a>
                  <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-[#0F2D2E]/70 hover:text-[#0F2D2E]"><Mail size={15} /> {o.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}