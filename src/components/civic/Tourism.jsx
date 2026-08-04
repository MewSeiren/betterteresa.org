import React from 'react';
import { Church, Mountain, Leaf, Landmark, Waves, Palette, MapPin, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const inTeresa = [
  { icon: Church, title: 'St. Rose de Lima Parish Church',
    en: "Teresa\u2019s heritage parish in the town proper — a landmark of faith and community dating to the Spanish era.",
    fil: "Heritage parish ng Teresa sa bayan — isang landmark ng pananampalataya at komunidad mula pa sa panahon ng Espanyol.",
    href: 'https://www.google.com/maps/search/St+Rose+de+Lima+Parish+Teresa+Rizal' },
  { icon: Mountain, title: 'Sierra Madre Foothills & Sunset Views',
    en: 'Scenic mountain backdrops, hiking trails, and golden-hour viewpoints along Teresa\u2019s highland barrios.',
    fil: 'Magagandang mountain backdrop, hiking trails, at golden-hour na viewpoint sa mga highland na barangay ng Teresa.',
    href: 'https://www.google.com/maps/search/Teresa+Rizal+viewpoint' },
  { icon: Leaf, title: 'ISWMMRF Eco-Park & Agri-Tourism',
    en: "Teresa\u2019s award-winning Integrated Solid Waste Management Recovery Facility and surrounding farmlands showcase green innovation and rural life.",
    fil: 'Gantimpalang ISWMMRF ng Teresa at mga kalapit na bukid na nagpapakita ng berdeng inobasyon at rural na pamumuhay.',
    href: 'https://teresarizal.gov.ph/services/menro' }
];

const nearby = [
  { icon: Landmark, title: 'Antipolo Cathedral',
    en: 'Shrine of Our Lady of Peace and Good Voyage — a major pilgrimage site just minutes from Teresa.',
    fil: 'Shrine of Our Lady of Peace and Good Voyage — isang malaking pilgrimage site na ilang minuto lang mula sa Teresa.',
    href: 'https://en.wikipedia.org/wiki/Antipolo_Cathedral' },
  { icon: Waves, title: 'Hinulugang Taktak',
    en: "Rizal\u2019s iconic waterfall national park in Antipolo, a protected natural landmark.",
    fil: 'Sikat na waterfall national park ng Rizal sa Antipolo, isang protektadong natural na landmark.',
    href: 'https://en.wikipedia.org/wiki/Hinulugang_Taktak' },
  { icon: Palette, title: 'Pinto Art Museum',
    en: 'An open-air contemporary art museum set in the cool hills of Antipolo.',
    fil: 'Open-air na contemporary art museum sa malamig na burol ng Antipolo.',
    href: 'https://en.wikipedia.org/wiki/Pinto_Art_Museum' },
  { icon: Mountain, title: 'Angono Petroglyphs',
    en: 'The oldest known rock engravings in the Philippines — a UNESCO tentative heritage site near Angono.',
    fil: 'Pinakalumang kilalang rock carving sa Pilipinas — isang UNESCO tentative heritage site malapit sa Angono.',
    href: 'https://en.wikipedia.org/wiki/Angono_Petroglyphs' }
];

export default function Tourism() {
  const { t, lang } = useLang();
  const Card = ({ c }) => {
    const Icon = c.icon;
    return (
      <a href={c.href} target="_blank" rel="noreferrer" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#1a73e8] hover:shadow-lg">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] transition group-hover:bg-[#1a73e8] group-hover:text-white"><Icon size={22} /></div>
        <h3 className="flex items-start justify-between gap-2 font-bold text-[#0a1a35]">{c.title} <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-slate-300 transition group-hover:text-[#1a73e8]" /></h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{lang === 'fil' ? c.fil : c.en}</p>
      </a>
    );
  };
  return (
    <section id="tourism" className="bg-[#f8f9fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('tm.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{t('tm.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t('tm.desc')}</p>
        </div>
        <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0a1a35]"><MapPin size={13} className="text-[#1a73e8]" /> {t('tm.inTeresa')}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inTeresa.map(c => <Card key={c.title} c={c} />)}
        </div>
        <p className="mb-3 mt-10 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0a1a35]"><MapPin size={13} className="text-[#1a73e8]" /> {t('tm.nearby')}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nearby.map(c => <Card key={c.title} c={c} />)}
        </div>
      </div>
    </section>
  );
}