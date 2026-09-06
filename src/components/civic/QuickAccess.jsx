import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Building2, Gavel, BarChart3, ArrowRight } from 'lucide-react';
import { quickAccess } from '@/data/teresaData';
import { useLang } from '@/lib/LanguageContext';

const icons = { FileText, Building2, Gavel, BarChart3 };

const Peso = () => <span className="text-[22px] font-black leading-none">₱</span>;

// Quick-access cards. Internal destinations use router <Link>; external
// sources remain explicit <a> links.
export default function QuickAccess() {
  const { t } = useLang();
  return (
    <section className="bg-[#f8f9fa] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('qa.eyebrow')}</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a1a35] sm:text-3xl">{t('qa.title')}</h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-[#0a1a35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#15294a]">{t('qa.viewAll')} <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((q) => {
            const Icon = q.icon === 'Peso' ? Peso : (icons[q.icon] || FileText);
            const internal = q.href.startsWith('/');
            const cls = 'group rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#1a73e8] hover:shadow-lg';
            const body = (
              <>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] transition group-hover:bg-[#1a73e8] group-hover:text-white"><Icon size={22} /></div>
                <h3 className="font-bold text-[#0a1a35]">{q.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{q.desc}</p>
              </>
            );
            return internal
              ? <Link key={q.title} to={q.href} className={cls}>{body}</Link>
              : <a key={q.title} href={q.href} target="_blank" rel="noreferrer" className={cls}>{body}</a>;
          })}
        </div>
      </div>
    </section>
  );
}