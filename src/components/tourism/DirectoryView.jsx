import React, { useMemo, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { CATEGORIES, VERIFICATION_STATUSES, statusLabel } from '@/data/tourismTaxonomy';
import { BARANGAYS, filterPlaces } from '@/lib/tourism';
import PlaceCard from '@/components/tourism/PlaceCard';

const PAGE_SIZE = 12;

export default function DirectoryView({
  places,
  presetCategory = '',
  presetSubcategory = '',
  presetTitle,
  presetDescription
}) {
  const { t, lang } = useLang();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(presetCategory);
  const [subcategory, setSubcategory] = useState(presetSubcategory);
  const [barangay, setBarangay] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('relevance');
  const [includeInactive, setIncludeInactive] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const catOptions = CATEGORIES.map((c) => ({ value: c.key, label: c.label[lang] || c.label.en }));
  const subOptions = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.key === category);
    return cat ? cat.subcategories.map((s) => ({ value: s.key, label: s.label[lang] || s.label.en })) : [];
  }, [category, lang]);

  const results = useMemo(
    () => filterPlaces(places, { query, category, subcategory, barangay, status, sort, includeInactive }),
    [places, query, category, subcategory, barangay, status, sort, includeInactive]
  );

  const selectCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20';

  return (
    <div>
      {presetTitle && (
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{presetTitle}</h2>
          {presetDescription && <p className="mt-3 text-base text-slate-600">{presetDescription}</p>}
        </div>
      )}

      {/* Filter bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label className="sr-only" htmlFor="dir-search">{t('tm.searchPlaces')}</label>
            <input
              id="dir-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
              placeholder={t('tm.searchPlaces')}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="dir-cat">{t('tm.allCategories')}</label>
            <select
              id="dir-cat"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setSubcategory(''); setVisible(PAGE_SIZE); }}
              className={selectCls}
              disabled={!!presetCategory}
            >
              <option value="">{t('tm.allCategories')}</option>
              {catOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="dir-sub">{t('tm.allSubcategories')}</label>
            <select
              id="dir-sub"
              value={subcategory}
              onChange={(e) => { setSubcategory(e.target.value); setVisible(PAGE_SIZE); }}
              className={selectCls}
              disabled={!!presetCategory || subOptions.length === 0}
            >
              <option value="">{t('tm.allSubcategories')}</option>
              {subOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="dir-bgy">{t('tm.allBarangays')}</label>
            <select id="dir-bgy" value={barangay} onChange={(e) => { setBarangay(e.target.value); setVisible(PAGE_SIZE); }} className={selectCls}>
              <option value="">{t('tm.allBarangays')}</option>
              {BARANGAYS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="dir-status">{t('tm.allStatuses')}</label>
            <select id="dir-status" value={status} onChange={(e) => { setStatus(e.target.value); setVisible(PAGE_SIZE); }} className={selectCls}>
              <option value="">{t('tm.allStatuses')}</option>
              {VERIFICATION_STATUSES.map((s) => <option key={s.key} value={s.key}>{statusLabel(s.key, lang)}</option>)}
            </select>
          </div>
          <div>
            <label className="sr-only" htmlFor="dir-sort">{t('tm.sortBy')}</label>
            <select id="dir-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls}>
              <option value="relevance">{t('tm.sortRelevance')}</option>
              <option value="alpha">{t('tm.sortAlpha')}</option>
              <option value="verified">{t('tm.sortVerified')}</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
              <input
                type="checkbox"
                checked={includeInactive}
                onChange={(e) => { setIncludeInactive(e.target.checked); setVisible(PAGE_SIZE); }}
                className="h-4 w-4 rounded border-slate-300 text-[#1a73e8] focus:ring-[#1a73e8]"
              />
              {t('tm.showInactive')}
            </label>
          </div>
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400" aria-live="polite">
          {results.length} {t('tm.results')}
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-500">{t('tm.noResults')}</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, visible).map((p) => <PlaceCard key={p.id} place={p} />)}
          </div>
          {visible < results.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0a1a35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#15294a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
              >
                {t('tm.loadMore')} <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}