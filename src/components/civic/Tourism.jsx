import React from 'react';
import { useLang } from '@/lib/LanguageContext';

const gmap = (name) => `https://www.google.com/maps/search/${encodeURIComponent(name + ', Teresa, Rizal')}`;

const CATS = [
  { key: 'tm.catChurch', color: '#8CC63F', spots: ['St. Rose of Lima Parish Church'] },
  { key: 'tm.catResort', color: '#F7941E', spots: ["Marden\u2019s Place Private Resort", "Tita El\u2019s Place Private Resort", 'Yasak Resort', 'Rancho Felipe', 'Rancho Bravo'] },
  { key: 'tm.catParks', color: '#EC008C', spots: ['Quest Adventure Camp', 'Sidetrip'] },
  { key: 'tm.catFood', color: '#0071BC', spots: ['Ancla Coffee', "Greyson\u2019s Dimsum and Noodles", 'Thirteen Thirty Cafe', "Dad\u2019s Burger & House of Unlimited", "Ysabelle\u2019s Garden", 'Cafe Amelita', "Aurora\u2019s Place", 'Kamayan sa Palayan', "Kokoyito\u2019s Sizzling Hauz", "Eat\u2019s Takoyummy Food Hub", 'Gocca Coffee', 'Balai Urunjing', "Leof\u2019s Food House", "MJ\u2019s Burger", "Pinoy\u2019s Tsibug", "Teresa\u2019s Mais at Mani", "Timplado\u2019s Cuisine", 'Samgville 199', "Amara\u2019s Corner", "Jhayco\u2019s Grill and Restaurant", 'Wish Upon a Cake'] },
  { key: 'tm.catRental', color: '#92278F', spots: ['Dicitadel Swimming Pool Rental', 'Simon De La Casa'] },
  { key: 'tm.catIndustrial', color: '#00AEEF', spots: ['Integrated Solid Waste Management Facility (MRF)'] },
  { key: 'tm.catOthers', color: '#29ABE2', spots: ['Sarian Exotic Farm'] }
];

export default function Tourism() {
  const { t } = useLang();
  return (
    <section id="tourism" className="bg-[#f8f9fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('tm.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('tm.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t('tm.desc')}</p>
        </div>

        <h3 className="mt-2 text-sm font-bold uppercase tracking-wider text-[#0a1a35]">{t('tm.spotsTitle')}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATS.map(c => (
            <div key={c.key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5" style={{ backgroundColor: `${c.color}12` }}>
                <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: c.color }} />
                <h3 className="flex-1 text-sm font-black text-[#0a1a35]">{t(c.key)}</h3>
                <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-bold text-slate-500">{c.spots.length}</span>
              </div>
              <ul className="p-2">
                {c.spots.map(s => (
                  <li key={s}>
                    <a href={gmap(s)} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-[#f8f9fa] hover:text-[#1a73e8]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="truncate">{s}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}