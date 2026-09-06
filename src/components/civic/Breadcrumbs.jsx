import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

// Functional breadcrumb trail: every segment except the current page is a
// working link. items = [{ label, to? }] — the last item is the current page.
export default function Breadcrumbs({ items }) {
  const { t } = useLang();
  const all = [{ label: t('bc.home'), to: '/' }, ...(items || [])];
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-slate-500">
      {all.map((it, i) => {
        const isLast = i === all.length - 1;
        return (
          <span key={`${it.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />}
            {it.to && !isLast
              ? <Link to={it.to} className="transition hover:text-[#1a73e8]">{it.label}</Link>
              : <span className="text-[#0a1a35]" aria-current={isLast ? 'page' : undefined}>{it.label}</span>}
          </span>
        );
      })}
    </nav>
  );
}