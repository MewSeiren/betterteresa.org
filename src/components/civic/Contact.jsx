import React from 'react';
import { MapPin, Phone, Mail, Facebook } from 'lucide-react';
import { offices } from '@/data/teresaData';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Contact & Hotlines</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Ang tamang desk, walang pag-ikot-ikot</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-[#1d4ed8] p-8 text-white">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Municipal Hall</h3>
            <a href="tel:+63282506800" className="mt-4 block text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-tight">(02) 8250-6800</a>
            <p className="mt-4 text-white/80">Para sa urgent local assistance at municipal service concerns. Para sa life-threatening emergencies, tawagan ang 911.</p>
            <div className="mt-8 grid gap-4 text-sm">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0" size={18} /> Corazon C. Aquino Ave., Poblacion, Teresa, Rizal, Philippines</p>
              <a href="mailto:mayorsoffice@teresarizal.gov.ph" className="flex items-center gap-3 hover:text-white"><Mail size={18} /> mayorsoffice@teresarizal.gov.ph</a>
              <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white"><Facebook size={18} /> facebook.com/lguteresarizal</a>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
            {offices.map(o => (
              <div key={o.name} className="bg-white p-5">
                <h4 className="font-bold text-slate-900">{o.name}</h4>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <a href={`tel:${o.line.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Phone size={15} /> {o.line}</a>
                  <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Mail size={15} /> {o.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}