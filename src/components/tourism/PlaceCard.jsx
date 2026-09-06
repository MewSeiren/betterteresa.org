import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin, Star, MapPinned } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';
import { getCategory, getSubcategory, statusMeta, statusLabel } from '@/data/tourismTaxonomy';
import { isActivePlace } from '@/lib/tourism';

const ICONS = { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin };

export default function PlaceCard({ place }) {
  const { lang } = useLang();
  const cat = getCategory(place.category);
  const sub = place.subcategory ? getSubcategory(place.subcategory) : null;
  const CatIcon = cat && ICONS[cat.icon] ? ICONS[cat.icon] : MapPin;
  const meta = statusMeta(place.verification_status);
  const inactive = !isActivePlace(place);
  const subLabel = sub ? (sub.subcategory.label[lang] || sub.subcategory.label.en) : '';

  return (
    <Link
      to={`/tourism/${place.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#1a73e8]/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
    >
      <div className="relative h-40 w-full overflow-hidden">
        {place.photos && place.photos.length > 0 ? (
          <Image
            src={place.photos[0]}
            alt={place.name}
            fittingType="fill"
            className="h-40 w-full transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-40 w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${cat?.color || '#0071BC'}22, ${cat?.color || '#0071BC'}44)` }}
            aria-hidden="true"
          >
            <CatIcon size={44} style={{ color: cat?.color || '#0071BC' }} />
          </div>
        )}
        {place.is_featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-600 shadow">
            <Star size={12} className="fill-amber-400 text-amber-400" /> Featured
          </span>
        )}
        {inactive && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white">
            {statusLabel(place.verification_status, lang)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{place.barangay || 'Teresa, Rizal'}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 font-bold leading-snug text-[#0a1a35] group-hover:text-[#1a73e8]">
          {place.name}
        </h3>
        {subLabel && (
          <p className="mt-1 text-xs font-semibold" style={{ color: cat?.color || '#0071BC' }}>{subLabel}</p>
        )}
        {place.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">{place.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {statusLabel(place.verification_status, lang)}
          </span>
          <MapPinned size={16} className="text-slate-300 transition group-hover:text-[#1a73e8]" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}