import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const HERO_BG = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/cbad148b9_generated_image.png';

const chips = [
  { label: 'Business Permit', slug: 'business-and-livelihood' },
  { label: 'Senior Citizen ID', slug: 'social-welfare' },
  { label: 'Building Permit', slug: 'infrastructure-public-works' },
  { label: 'Health Certificate', slug: 'health-services' }
];

export default function Hero() {
  const { t } = useLang();
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  // The hero search routes to the real site-wide search results page.
  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#0a1a35] pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a35]/95 via-[#0a1a35]/75 to-[#0a1a35]/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl text-white">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur">{t('hero.badge')}</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight">{t('hero.title')}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{t('hero.subtitle')}</p>
          <form onSubmit={submit} className="mt-8 max-w-xl" role="search">
            <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-lg">
              <Search className="ml-2 text-slate-400" size={18} />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                aria-label={t('hero.searchPlaceholder')}
                className="w-full bg-transparent px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="shrink-0 rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-bold text-white hover:bg-[#1557b0]">{t('hero.search')}</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <Link key={c.slug} to={`/services/${c.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/20">{c.label} <ArrowRight size={13} /></Link>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}