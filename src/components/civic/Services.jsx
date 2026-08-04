import React, { useState } from 'react';
import { ChevronUp, ChevronRight, ExternalLink } from 'lucide-react';

const categories = [
  { name: 'Health Services', office: 'Health Office (RHU)', desc: 'Public health programs, immunization, maternal care, sanitary permits, and health certificates.', count: 8, href: 'https://teresarizal.gov.ph/services/health-office' },
  { name: 'Education', office: "Office of the Mayor", desc: 'Educational assistance, clearances, and youth support programs coordinated through the Mayor\u2019s office.', count: 5, href: 'https://teresarizal.gov.ph/services/office-of-the-mayor' },
  { name: 'Business and Livelihood', office: 'Business Permits & Licensing (BPLS)', desc: 'Processing of business permits, occupational permits, and special permits for businesses operating in Teresa.', count: 5, href: 'https://teresarizal.gov.ph/services/business-permits-licensing' },
  { name: 'Social Welfare', office: 'MSWD (Social Welfare)', desc: 'IDs for senior citizens and PWDs, solo parent support, and crisis assistance.', count: 7, href: 'https://teresarizal.gov.ph/services/mswd' },
  { name: 'Agriculture & Fisheries', office: 'Agriculture Office', desc: 'Agricultural support, seed distribution, anti-rabies vaccination, and livestock and farmer assistance.', count: 6, href: 'https://teresarizal.gov.ph/services/agriculture-office' },
  { name: 'Infrastructure & Public Works', office: 'Engineering Office', desc: 'Issuance of building permits and occupancy permits for construction in Teresa.', count: 2, href: 'https://teresarizal.gov.ph/services/engineering-office' },
  { name: 'Garbage and Waste Disposal', office: 'MENRO · ISWMMRF', desc: 'Solid waste management through Teresa\u2019s award-winning Integrated Solid Waste Management Recovery Facility.', count: null, href: 'https://teresarizal.gov.ph/services/menro' },
  { name: 'Environment', office: 'MENRO (Environment)', desc: 'Environmental permits, certifications, and natural resources management.', count: 1, href: 'https://teresarizal.gov.ph/services/menro' },
  { name: 'Disaster Preparedness', office: 'MDRRMO', desc: 'Disaster risk reduction, emergency response, and resilience programs. Hotline: 0945-113-7077.', count: null, href: 'https://teresarizal.gov.ph/services' },
  { name: 'Housing & Land Use', office: 'MPDO (Planning & Development)', desc: 'Municipal planning, land use, data and statistics, and provision of development plans.', count: 2, href: 'https://teresarizal.gov.ph/services/mpdo' }
];

export default function Services() {
  const [active, setActive] = useState(7);
  const sel = categories[active];

  return (
    <section id="services" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Government Services</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">Municipal Services</h2>
          <p className="mt-4 text-base text-slate-600">Browse all offices and services offered by the Municipal Government of Teresa. Select a category to view details.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center justify-between bg-[#e8eff7] px-4 py-3">
              <span className="text-sm font-bold text-[#1565c0]">Services</span>
              <ChevronUp className="text-[#1565c0]" size={18} />
            </div>
            <ul className="py-1">
              {categories.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.name}>
                    <button onClick={() => setActive(i)} className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition ${on ? 'bg-[#e8eff7] text-[#1565c0]' : 'text-[#37474f] hover:bg-slate-50'}`}>
                      <span>{c.name}</span>
                      <ChevronRight size={15} className={on ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-6 sm:p-8">
            <span className="inline-flex items-center rounded-full bg-[#e8eff7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1565c0]">{sel.office}</span>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-[#0a1a35]">{sel.name}</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{sel.desc}</p>
            {sel.count && <p className="mt-3 text-sm font-bold text-[#1a73e8]">{sel.count} services available</p>}
            <a href={sel.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1a73e8] px-6 font-bold text-white transition hover:bg-[#1557b0]">View on Teresa Portal <ExternalLink size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}