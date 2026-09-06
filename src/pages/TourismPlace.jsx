import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin, Star, Phone, Mail, Globe, Facebook, Navigation, Share2, Clock, Tag, ExternalLink, BadgeCheck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import PlaceCard from '@/components/tourism/PlaceCard';
import { useLang } from '@/lib/LanguageContext';
import { getCategory, getSubcategory, statusMeta, statusLabel, categoryLabel } from '@/data/tourismTaxonomy';
import { mapsLink, mapsEmbedSrc, isActivePlace } from '@/lib/tourism';

const ICONS = { Landmark, Waves, UtensilsCrossed, KeyRound, Store, MapPin };

const fmtDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  return isNaN(date) ? d : date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
};

function Field({ label, value, icon: Icon }) {
  const { t } = useLang();
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0">
      {Icon && <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 break-words text-sm font-medium text-slate-700">{value || t('tm.notAvailable')}</p>
      </div>
    </div>
  );
}

export default function TourismPlacePage({ place, related }) {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const cat = getCategory(place.category);
  const sub = place.subcategory ? getSubcategory(place.subcategory) : null;
  const CatIcon = cat && ICONS[cat.icon] ? ICONS[cat.icon] : MapPin;
  const meta = statusMeta(place.verification_status);
  const inactive = !isActivePlace(place);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: place.name, url }); return; } catch { /* user dismissed */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div>
      {/* Hero */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-64 w-full sm:h-80">
          {place.photos && place.photos.length > 0 ? (
            <Image src={place.photos[0]} alt={place.name} fittingType="fill" className="h-64 w-full sm:h-80" />
          ) : (
            <div
              className="flex h-64 w-full items-center justify-center sm:h-80"
              style={{ background: `linear-gradient(135deg, ${cat?.color || '#0071BC'}26, ${cat?.color || '#0071BC'}4D)` }}
              aria-hidden="true"
            >
              <CatIcon size={72} style={{ color: cat?.color || '#0071BC' }} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {cat && (
                <Link to={`/tourism/${cat.slug}`} className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {categoryLabel(cat, lang)}
                </Link>
              )}
              {sub && (
                <Link to={`/tourism/${sub.subcategory.slug}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {sub.subcategory.label[lang] || sub.subcategory.label.en}
                </Link>
              )}
              {place.is_featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> {t('tm.featured')}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0a1a35] sm:text-4xl">{place.name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={mapsLink(place)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0]"
            >
              <Navigation size={16} /> {t('tm.getDirections')}
            </a>
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Share2 size={16} /> {copied ? t('tm.linkCopied') : t('tm.share')}
            </button>
          </div>
        </div>
      </div>

      {/* Inactive notice */}
      {inactive && (
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold text-orange-800" role="note">
          {t('tm.inactiveNotice')} ({statusLabel(place.verification_status, lang)})
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-8 lg:col-span-2">
          {place.description && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-black text-[#0a1a35]">{t('tm.about')}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{place.description}</p>
            </div>
          )}

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <iframe
              title={`Map — ${place.name}`}
              src={mapsEmbedSrc(place)}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="text-xs text-slate-400">{t('tm.mapNote')}</p>
              <a href={mapsLink(place)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a73e8] hover:underline">
                {t('tm.getDirections')} <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {(place.tourism_relevance || place.ownership_type) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-black text-[#0a1a35]">{t('tm.moreInfo')}</h2>
              {place.tourism_relevance && <p className="mt-3 text-sm leading-relaxed text-slate-600"><strong className="text-slate-800">{t('tm.relevance')}:</strong> {place.tourism_relevance}</p>}
              {place.ownership_type && <p className="mt-2 text-sm leading-relaxed text-slate-600"><strong className="text-slate-800">{t('tm.ownership')}:</strong> {place.ownership_type}</p>}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-1 text-lg font-black text-[#0a1a35]">{t('tm.info')}</h2>
            <Field label={t('tm.location')} value={[place.address, place.barangay].filter(Boolean).join(', ')} icon={MapPin} />
            <Field label={t('tm.openingHours')} value={place.opening_hours} icon={Clock} />
            <Field label={t('tm.priceRange')} value={place.price_range} icon={Tag} />
            <Field label={t('tm.contact')} value={place.contact_number} icon={Phone} />
            {place.email && (
              <div className="flex items-start gap-3 border-b border-slate-100 py-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Email</p>
                  <a href={`mailto:${place.email}`} className="mt-0.5 block break-words text-sm font-medium text-[#1a73e8] hover:underline">{place.email}</a>
                </div>
              </div>
            )}
            {place.website && (
              <div className="flex items-start gap-3 border-b border-slate-100 py-3">
                <Globe size={16} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Website</p>
                  <a href={place.website} target="_blank" rel="noreferrer" className="mt-0.5 block break-words text-sm font-medium text-[#1a73e8] hover:underline">{place.website}</a>
                </div>
              </div>
            )}
            {(place.facebook_url || place.instagram_url || place.tiktok_url) && (
              <div className="flex flex-wrap gap-2 pt-4">
                {place.facebook_url && <a href={place.facebook_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2]/10 px-3 py-1.5 text-xs font-bold text-[#1877F2]"><Facebook size={13} /> Facebook</a>}
                {place.instagram_url && <a href={place.instagram_url} target="_blank" rel="noreferrer" className="rounded-full bg-pink-500/10 px-3 py-1.5 text-xs font-bold text-pink-600">Instagram</a>}
                {place.tiktok_url && <a href={place.tiktok_url} target="_blank" rel="noreferrer" className="rounded-full bg-slate-900/10 px-3 py-1.5 text-xs font-bold text-slate-800">TikTok</a>}
              </div>
            )}
          </div>

          {(place.amenities?.length || place.services?.length) ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              {place.amenities?.length > 0 && (
                <>
                  <h3 className="text-sm font-black uppercase tracking-wide text-slate-400">{t('tm.amenities')}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {place.amenities.map((a) => <li key={a} className="rounded-full bg-[#f8f9fa] px-3 py-1 text-xs font-semibold text-slate-600">{a}</li>)}
                  </ul>
                </>
              )}
              {place.services?.length > 0 && (
                <>
                  <h3 className={`text-sm font-black uppercase tracking-wide text-slate-400 ${place.amenities?.length ? 'mt-5' : ''}`}>{t('tm.services')}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {place.services.map((s) => <li key={s} className="rounded-full bg-[#1a73e8]/10 px-3 py-1 text-xs font-semibold text-[#1a73e8]">{s}</li>)}
                  </ul>
                </>
              )}
            </div>
          ) : null}

          {/* Verification box */}
          <div className="rounded-2xl border border-slate-200 bg-[#0a1a35] p-6 text-white">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-[#60a5fa]" aria-hidden="true" />
              <h2 className="text-sm font-black uppercase tracking-wide text-white/80">{t('tm.dataQuality')}</h2>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <span className={`inline-block h-2 w-2 rounded-full ${meta.dot}`} aria-hidden="true"></span>
              <span className="font-bold">{statusLabel(place.verification_status, lang)}</span>
            </p>
            <p className="mt-1.5 text-sm text-white/60">
              {t('tm.lastVerified')}: {fmtDate(place.last_verified) || t('tm.notAvailable')}
            </p>
            {place.source_name && (
              <p className="mt-1.5 text-sm text-white/60">
                {t('tm.source')}: {place.source_name}
              </p>
            )}
            {place.source_urls?.length > 0 && (
              <ul className="mt-3 space-y-1">
                {place.source_urls.map((u) => (
                  <li key={u}>
                    <a href={u} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 break-all text-xs font-semibold text-[#60a5fa] hover:underline">
                      {u} <ExternalLink size={10} className="shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related && related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-6 text-2xl font-black tracking-tight text-[#0a1a35]">{cat ? `${t('tm.moreIn')} ${categoryLabel(cat, lang)}` : t('tm.morePlaces')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PlaceCard key={p.id} place={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}