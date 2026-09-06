import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import ScrollProgress from '@/components/civic/ScrollProgress';
import Seo from '@/components/tourism/Seo';
import DirectoryView from '@/components/tourism/DirectoryView';
import TourismPlacePage from '@/pages/TourismPlace';
import useTourismPlaces from '@/hooks/useTourismPlaces';
import { resolveTaxonomySlug, categoryLabel, getSubcategory } from '@/data/tourismTaxonomy';
import { buildJsonLd } from '@/lib/tourism';
import { useLang } from '@/lib/LanguageContext';

// Resolves /tourism/:slug — a category slug, a subcategory slug, or a place.
export default function TourismEntry() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const { places, error } = useTourismPlaces();

  const taxonomy = useMemo(() => resolveTaxonomySlug(slug), [slug]);
  const place = useMemo(
    () => (places ? places.find((p) => p.slug === slug) : undefined),
    [places, slug]
  );

  const seo = taxonomy
    ? {
        title: `${(taxonomy.type === 'category'
          ? categoryLabel(taxonomy.category, lang)
          : categoryLabel(taxonomy.category, lang) + ' — ' + (getSubcategory(taxonomy.subcategory.slug)?.subcategory.label[lang] || ''))} — Better Teresa`,
        description: t('tm.dirDesc')
      }
    : place
      ? {
          title: `${place.name} — Teresa, Rizal | Better Teresa`,
          description: place.description || t('tm.dirDesc'),
          ogImage: place.photos && place.photos[0]
        }
      : { title: `${t('tm.dirTitle')} — Better Teresa` };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900">
      <Seo
        title={seo.title}
        description={seo.description}
        ogImage={seo.ogImage}
        canonical={`${window.location.origin}/tourism/${slug}`}
        jsonLd={place ? buildJsonLd(place) : undefined}
      />
      <ScrollProgress />
      <NavBar />
      <main>
        {/* Compact header / breadcrumb */}
        <section className="bg-[#0a1a35] py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/50">
              <Link to="/" className="transition hover:text-white">{t('nav.home')}</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <Link to="/tourism" className="transition hover:text-white">{t('tm.dirTitle')}</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-[#60a5fa]">{place ? place.name : (taxonomy ? slug : t('tm.notFound'))}</span>
            </nav>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          {error && (
            <p className="mb-8 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{t('tm.loadError')}</p>
          )}
          {!places ? (
            <div className="grid place-items-center py-20" role="status" aria-label="Loading">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a73e8]" />
            </div>
          ) : taxonomy ? (
            <DirectoryView
              places={places}
              presetCategory={taxonomy.category.key}
              presetSubcategory={taxonomy.type === 'subcategory' ? taxonomy.subcategory.key : ''}
              presetTitle={
                taxonomy.type === 'category'
                  ? categoryLabel(taxonomy.category, lang)
                  : `${getSubcategory(taxonomy.subcategory.slug).subcategory.label[lang] || ''} · ${categoryLabel(taxonomy.category, lang)}`
              }
              presetDescription={t('tm.categoryDesc')}
            />
          ) : place ? (
            <TourismPlacePage
              place={place}
              related={places
                .filter((p) => p.category === place.category && p.id !== place.id && !['archived', 'closed'].includes(p.verification_status))
                .slice(0, 3)}
            />
          ) : (
            <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <MapPin size={32} className="mx-auto text-slate-300" aria-hidden="true" />
              <h1 className="mt-4 text-xl font-black text-[#0a1a35]">{t('tm.notFound')}</h1>
              <p className="mt-2 text-sm text-slate-500">{t('tm.notFoundDesc')}</p>
              <Link to="/tourism" className="mt-6 inline-block rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0]">
                {t('tm.backToDirectory')}
              </Link>
            </div>
          )}
        </section>
      </main>
      <CivicFooter />
    </div>
  );
}