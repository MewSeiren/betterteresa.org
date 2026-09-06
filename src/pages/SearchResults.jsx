import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '@/components/civic/PageShell';
import SearchBox from '@/components/search/SearchBox';
import useSearchIndex from '@/hooks/useSearchIndex';
import Seo from '@/components/tourism/Seo';
import {
  runSearch, highlightParts, groupOfRecord,
  SEARCH_GROUPS, POPULAR_SEARCHES, typeLabelKey
} from '@/lib/search';
import { useLang } from '@/lib/LanguageContext';

const PAGE_SIZE = 10;

const BROWSE_LINKS = [
  { labelKey: 'nav.services', to: '/services' },
  { labelKey: 'nav.government', to: '/government' },
  { labelKey: 'nav.transparency', to: '/transparency' },
  { labelKey: 'nav.tourism', to: '/tourism' },
  { labelKey: 'nav.contact', to: '/contact' }
];

// /search?q=... — dedicated site-wide search results page.
export default function SearchResults() {
  const { t } = useLang();
  const index = useSearchIndex();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').trim();
  const [group, setGroup] = useState('all');
  const [shown, setShown] = useState(PAGE_SIZE);

  const allResults = useMemo(() => (q ? runSearch(index, q, 'all') : []), [index, q]);
  const results = useMemo(
    () => (group === 'all' ? allResults : runSearch(index, q, group)),
    [allResults, group, index, q]
  );
  const counts = useMemo(() => {
    const c = { all: allResults.length };
    SEARCH_GROUPS.forEach((g) => { if (g.key !== 'all') c[g.key] = 0; });
    allResults.forEach((r) => {
      const g = groupOfRecord(r.rec);
      c[g] = (c[g] || 0) + 1;
    });
    return c;
  }, [allResults]);

  const setQuery = (newQ) => {
    setSearchParams(newQ ? { q: newQ } : {});
    setGroup('all');
    setShown(PAGE_SIZE);
  };
  const setFilter = (g) => { setGroup(g); setShown(PAGE_SIZE); };
  const visible = results.slice(0, shown);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Seo
        title={`${q ? `${q} · ` : ''}${t('sr.searchTitle')} — Better Teresa`}
        description={t('sr.resultsFor')}
        canonical={`${window.location.origin}/search`}
      />
      <PageShell crumbs={[{ label: t('sr.searchTitle') }]}>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-[#0a1a35]">
            {q ? t('sr.resultsFor') : t('sr.searchTitle')} {q && <span className="text-[#1a73e8]">“{q}”</span>}
          </h1>
          {q && <p className="mt-2 text-sm font-semibold text-slate-500">{allResults.length} {t('sr.results')}</p>}

          <div className="mt-6 max-w-2xl">
            <SearchBox key={q} initialQ={q} />
          </div>

          {!q && (
            <p className="mt-10 max-w-xl rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
              {t('sr.empty')}
            </p>
          )}

          {q && (
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={t('sr.searchTitle')}>
              {SEARCH_GROUPS.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setFilter(g.key)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${group === g.key
                    ? 'border-[#1a73e8] bg-[#1a73e8] text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#1a73e8]/50 hover:text-[#1565c0]'}`}
                >
                  {t(g.labelKey)} ({counts[g.key] || 0})
                </button>
              ))}
            </div>
          )}

          {q && allResults.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8">
              <p className="text-lg font-black text-[#0a1a35]">{t('sr.noResultsFor')} “{q}”.</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t('sr.tryThese')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button key={s} type="button" onClick={() => setQuery(s)}
                    className="rounded-full bg-[#e8eff7] px-3.5 py-1.5 text-xs font-bold text-[#1565c0] transition hover:bg-[#1a73e8] hover:text-white">
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('sr.orBrowse')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BROWSE_LINKS.map((l) => (
                  <Link key={l.to} to={l.to}
                    className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-[#1a73e8]/50 hover:text-[#1565c0]">
                    {t(l.labelKey)}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500">
                {t('sr.help')}{' '}
                <Link to="/contact" className="font-bold text-[#1a73e8] hover:underline">{t('nav.contact')}</Link>
              </p>
            </div>
          )}

          {q && allResults.length > 0 && (
            <>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {visible.map((r) => {
                  const snippet = (r.rec.description || r.rec.content || '').slice(0, 220);
                  const parts = highlightParts(snippet, q);
                  return (
                    <article key={r.rec.id} className="flex flex-col rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5 transition hover:border-[#1a73e8]/50 hover:bg-white hover:shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[#e8eff7] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1565c0]">
                          {t(typeLabelKey(r.rec.type))}
                        </span>
                        {r.rec.date && <span className="text-xs font-semibold text-slate-400">{r.rec.date}</span>}
                      </div>
                      <h2 className="mt-2 text-lg font-black leading-snug text-[#0a1a35]">{r.rec.title}</h2>
                      {snippet && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {parts.map((p, i) => p.hit
                            ? <mark key={i} className="rounded bg-[#fde68a] px-0.5 text-inherit">{p.text}</mark>
                            : <span key={i}>{p.text}</span>)}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between gap-3 pt-1">
                        <span className="truncate text-xs font-semibold text-slate-400">{r.rec.category}</span>
                        <Link to={r.rec.url} className="shrink-0 text-sm font-bold text-[#1a73e8] transition hover:text-[#1557b0]">
                          {t('sr.view')} →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
              {shown < results.length && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setShown((s) => s + PAGE_SIZE)}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 px-6 font-bold text-slate-700 transition hover:bg-slate-100">
                    {t('sr.showMore')} ({results.length - shown})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </PageShell>
    </div>
  );
}