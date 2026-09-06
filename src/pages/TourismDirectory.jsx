import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import ScrollProgress from '@/components/civic/ScrollProgress';
import Seo from '@/components/tourism/Seo';
import PlaceCard from '@/components/tourism/PlaceCard';
import DirectoryView from '@/components/tourism/DirectoryView';
import useTourismPlaces from '@/hooks/useTourismPlaces';
import { CATEGORIES, categoryLabel } from '@/data/tourismTaxonomy';
import { isActivePlace } from '@/lib/tourism';
import { useLang } from '@/lib/LanguageContext';

const ICONS = { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin };

export default function TourismDirectory() {
  const { t, lang } = useLang();
  const { places, error } = useTourismPlaces();

  const active = useMemo(() => (places || []).filter(isActivePlace), [places]);
  const featured = useMemo(() => active.filter((p) => p.is_featured).slice(0, 6), [active]);
  const recentlyVerified = useMemo(
    () => active
      .filter((p) => p.last_verified)
      .sort((a, b) => (a.last_verified < b.last_verified ? 1 : -1))
      .slice(0, 3),
    [active]
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900">
      <Seo
        title={`${t('tm.dirTitle')} — Better Teresa`}
        description={t('tm.dirDesc')}
        canonical={`${window.location.origin}/tourism`}
      />
      <ScrollProgress />
      <NavBar />
      <main>
        {/* Hero */}
        <section className="bg-[#0a1a35] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
              <Link to="/" className="transition hover:text-white">{t('nav.home')}</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-[#60a5fa]">{t('nav.tourism')}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{t('tm.dirTitle')}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">{t('tm.dirDesc')}</p>
            {places && (
              <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-[#60a5fa]">
                {active.length} {t('tm.inDirectory')}
              </p>
            )}
          </div>
        </section>

        {/* Category grid */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="dir-cats">
          <h2 id="dir-cats" className="text-2xl font-black tracking-tight text-[#0a1a35]">{t('tm.spotsTitle')}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon] || MapPin;
              const count = active.filter((p) => p.category === c.key).length;
              return (
                <Link
                  key={c.key}
                  to={`/tourism/${c.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#1a73e8]/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${c.color}18`, color: c.color }} aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <span className="flex-1 leading-tight">
                    <span className="block font-bold text-[#0a1a35] group-hover:text-[#1a73e8]">{categoryLabel(c, lang)}</span>
                    <span className="text-sm text-slate-500">{count} {t('tm.results')}</span>
                  </span>
                  <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1a73e8]" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          {error && (
            <p className="mb-8 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{t('tm.loadError')}</p>
          )}
          {!places ? (
            <div className="grid place-items-center py-20" role="status" aria-label="Loading">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a73e8]" />
            </div>
          ) : (
            <div className="space-y-16">
              {featured.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-black tracking-tight text-[#0a1a35]">{t('tm.featured')}</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((p) => <PlaceCard key={p.id} place={p} />)}
                  </div>
                </div>
              )}
              {recentlyVerified.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-black tracking-tight text-[#0a1a35]">{t('tm.recentlyVerified')}</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {recentlyVerified.map((p) => <PlaceCard key={p.id} place={p} />)}
                  </div>
                </div>
              )}
              <DirectoryView places={places} />
            </div>
          )}
        </section>
      </main>
      <CivicFooter />
    </div>
  );
}