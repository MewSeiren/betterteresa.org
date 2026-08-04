import React from 'react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';

const MAP_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/a834e57dc_TeresaTourismSpotsLocatorMap.png';

const gmap = (name) => `https://www.google.com/maps/search/${encodeURIComponent(name + ', Teresa, Rizal')}`;

const CATS = [
  { key: 'tm.catChurch', color: '#8CC63F', spots: ['St. Rose of Lima Parish Church'] },
  { key: 'tm.catResort', color: '#F7941E', spots: ["Marden\u2019s Place Private Resort", "Tita El\u2019s Place Private Resort", 'Yasak Resort', 'Rancho Felipe', 'Rancho Bravo'] },
  { key: 'tm.catParks', color: '#EC008C', spots: ['Quest Adventure Camp', 'Sidetrip'] },
  { key: 'tm.catFood', color: '#0071BC', spots: ['Ancla Coffee', "Greyson\u2019s Dimsum and Noodles", 'Thirteen Thirty Cafe', "Dad\u2019s Burger & House of Unlimited", "Ysabelle\u2019s Garden", 'Cafe Amelita', "Aurora\u2019s Place", 'Kamayan sa Palayan', "Kokoyito\u2019s Sizzling Hauz", "Eat\u2019s Takoyummy Food Hub", 'Gocca Coffee', 'Balai Urunjing', "Leof\u2019s Food House", "MJ\u2019s Burger", "Pinoy\u2019s Tsibug", "Teresa\u2019s Mais at Mani", "Timplado\u2019s Cuisine", 'Samgville 199', "Amara\u2019s Corner", "Jhayco\u2019s Grill and Restaurant", 'Wish Upon a Cake'] },
  { key: 'tm.catRental', color: '#92278F', spots: ['Dictadel Swimming Pool Rental', 'Simon De La Casa'] },
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

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <Image src={MAP_URL} alt="Teresa Tourism Spots Locator Map" fittingType="fit" className="w-full" />
          <p className="mt-2 px-2 pb-1 text-xs text-slate-400">{t('tm.mapCredit')}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {CATS.map(c => (
            <span key={c.key} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} /> {t(c.key)}
            </span>
          ))}
        </div>

        <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-[#0a1a35]">{t('tm.spotsTitle')}</h3>
        <div className="mt-4 space-y-6">
          {CATS.map(c => (
            <div key={c.key}>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: c.color }} />
                <p className="text-sm font-black text-[#0a1a35]">{t(c.key)}</p>
                <span className="text-xs font-semibold text-slate-400">{c.spots.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.spots.map(s => (
                  <a key={s} href={gmap(s)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-[#1a73e8] hover:text-[#1a73e8]">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} /> {s}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}