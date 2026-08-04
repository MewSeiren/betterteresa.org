import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, MapPin, Phone, Mail, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import { findService } from '@/data/servicesData';
import { useLang } from '@/lib/LanguageContext';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const cat = findService(slug);

  if (!cat) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="mx-auto max-w-3xl px-4 py-32 text-center">
          <h1 className="text-3xl font-black text-[#0a1a35]">{t('sd.notFound')}</h1>
          <p className="mt-3 text-slate-600">{t('sd.notFoundDesc')}</p>
          <Link to="/#services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-6 py-3 font-bold text-white hover:bg-[#1557b0]"><ArrowLeft size={16} /> {t('sd.back')}</Link>
        </div>
        <CivicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <main className="pt-28">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <Link to="/#services" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a73e8] hover:text-[#1557b0]"><ArrowLeft size={16} /> {t('sd.allServices')}</Link>
          <div className="mt-6">
            <span className="inline-flex items-center rounded-full bg-[#e8eff7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1565c0]">{cat.office}</span>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0a1a35] sm:text-5xl">{cat.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{cat.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5">
              <Clock className="text-[#1a73e8]" size={18} />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{t('sd.schedule')}</p>
              <p className="mt-1 text-sm font-semibold text-[#0a1a35]">{cat.schedule}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5">
              <MapPin className="text-[#1a73e8]" size={18} />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{t('sd.location')}</p>
              <p className="mt-1 text-sm font-semibold text-[#0a1a35]">{cat.location}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-5">
              <Phone className="text-[#1a73e8]" size={18} />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{t('sd.contact')}</p>
              <a href={`tel:${cat.contact.phone.replace(/[^0-9+]/g, '')}`} className="mt-1 block text-sm font-semibold text-[#0a1a35] hover:text-[#1a73e8]">{cat.contact.phone}</a>
              <a href={`mailto:${cat.contact.email}`} className="mt-0.5 block text-xs text-slate-500 hover:text-[#1a73e8]">{cat.contact.email}</a>
            </div>
          </div>
          <h2 className="mt-12 text-2xl font-black tracking-tight text-[#0a1a35]">{t('sd.available')}</h2>
          <div className="mt-5 space-y-4">
            {cat.services.map((s, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#0a1a35]">{s.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-[#1a73e8]/10 px-3 py-1 text-xs font-bold text-[#1a73e8]">{s.fees}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500"><span className="font-semibold text-slate-700">{t('sd.who')}</span> {s.who}</p>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('sd.requirements')}</p>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {s.requirements.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#1a73e8]" /> <span>{r}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-[#0a1a35] p-6 text-white">
            <p className="text-sm text-white/70">{t('sd.note')}</p>
            <a href={cat.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">{t('sd.verify')} <ExternalLink size={14} /></a>
          </div>
        </div>
      </main>
      <CivicFooter />
    </div>
  );
}