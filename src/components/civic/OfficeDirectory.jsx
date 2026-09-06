import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { offices } from '@/data/teresaData';

// Directory of municipal offices with click-to-call and email links.
export default function OfficeDirectory() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {offices.map((o) => (
        <div key={o.name} className="rounded-xl border border-slate-100 p-3">
          <h4 className="text-sm font-bold text-[#0a1a35]">{o.name}</h4>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <a href={`tel:${o.line.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a73e8]">
              <Phone size={12} /> {o.line}
            </a>
            <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1a73e8]">
              <Mail size={12} /> {o.email}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}