import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin, ArrowRight } from 'lucide-react';
import PlaceCard from '@/components/tourism/PlaceCard';
import useTourismPlaces from '@/hooks/useTourismPlaces';
import { CATEGORIES, categoryLabel } from '@/data/tourismTaxonomy';
import { isActivePlace } from '@/lib/tourism';
import { useLang } from '@/lib/LanguageContext';

const ICONS = { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin };

// Home-page teaser for the full tourism directory at /tourism.
export default function Tourism() {
  const { t, lang } = useLang();
  const { places } = useTourismPlaces();
  const featured = useMemo(
    () => (places || []).filter((p) => isActivePlace(p) && p.is_featured).slice(0, 3),
    [places]
  );
  const activeCount = useMemo(() => (places || []).filter(isActivePlace).length, [places]);

  return (
    <section id="tourism" className="bg-[#f8f9fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('tm.eyebrow')}</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{t('tm.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('tm.desc')}</p>
          </div>
          <Link
            to="/tourism"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a1a35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#15294a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
          >
            {t('tm.exploreCta')} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category chips */}
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#0a1a35]">{t('tm.spotsTitle')}</h3>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon] || MapPin;
            return (
              <Link
                key={c.key}
                to={`/tourism/${c.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1a73e8]/40 hover:shadow-md"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${c.color}18`, color: c.color }} aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 text-sm font-bold leading-tight text-[#0a1a35] group-hover:text-[#1a73e8]">
                  {categoryLabel(c, lang)}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Featured places */}
        {places ? (
          featured.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => <PlaceCard key={p.id} place={p} />)}
            </div>
          )
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/70" />)}
          </div>
        )}
        {places && (
          <p className="mt-6 text-center text-sm font-semibold text-slate-400">
            {activeCount} {t('tm.inDirectory')} — <Link to="/tourism" className="text-[#1a73e8] hover:underline">{t('tm.exploreCta')}</Link>
          </p>
        )}
      </div>
    </section>
  );
}