import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import useSearchIndex from '@/hooks/useSearchIndex';
import { runSearch, typeLabelKey } from '@/lib/search';
import { useLang } from '@/lib/LanguageContext';

// Global search input with debounced autocomplete, keyboard navigation,
// clear button, and full-results navigation to /search?q=...
export default function SearchBox({ initialQ = '', onNavigate }) {
  const { t } = useLang();
  const navigate = useNavigate();
  const index = useSearchIndex();
  const [q, setQ] = useState(initialQ);
  const [debounced, setDebounced] = useState(initialQ);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef(null);

  // Debounce keystrokes — no work per keypress beyond the timer.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(id);
  }, [q]);

  // Close the suggestion panel on outside click.
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const suggestions = useMemo(() => {
    const s = debounced.trim();
    return s.length >= 2 ? runSearch(index, s, 'all', 6) : [];
  }, [debounced, index]);

  const goTo = (path) => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
    navigate(path);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    goTo(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const onKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      goTo(suggestions[active].rec.url);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  };

  const busy = q !== debounced;

  return (
    <div ref={ref} className="relative w-full">
      <form
        role="search"
        onSubmit={submit}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-[#f8f9fa] px-3 py-1.5 transition focus-within:border-[#1a73e8] focus-within:bg-white"
      >
        {busy
          ? <Loader2 size={16} className="shrink-0 animate-spin text-slate-400" aria-hidden="true" />
          : <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />}
        <input
          type="text"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={t('sr.placeholder')}
          aria-label={t('sr.placeholder')}
          className="w-full min-w-0 bg-transparent py-1.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQ(''); setDebounced(''); setActive(-1); }}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
          >
            <X size={13} />
          </button>
        )}
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#1a73e8] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#1557b0]"
        >
          {t('sr.search')}
        </button>
      </form>

      {open && debounced.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
          {suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">{busy ? '\u00A0' : t('sr.noSuggest')}</p>
          ) : (
            <>
              {suggestions.map((s, i) => (
                <button
                  key={s.rec.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => goTo(s.rec.url)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition ${i === active ? 'bg-[#e8eff7]' : 'hover:bg-slate-50'}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#0a1a35]">{s.rec.title}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{t(typeLabelKey(s.rec.type))}</span>
                  </span>
                  <span className="shrink-0 text-xs font-bold text-[#1a73e8]">{t('sr.view')}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={submit}
                className="w-full border-t border-slate-100 px-4 py-2.5 text-center text-xs font-bold text-[#1a73e8] transition hover:bg-slate-50"
              >
                {t('sr.viewAll')} →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}