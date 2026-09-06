import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Phone, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { hotlines } from '@/data/teresaData';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/1319c9771_ChatGPTImageAug4202610_51_11PM.png';

// Global footer. Every link is verified: internal routes use <Link>,
// external sources are explicit, hotlines are click-to-call.
export default function CivicFooter() {
  const { t } = useLang();

  const explore = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.government'), to: '/government' },
    { label: t('nav.transparency'), to: '/transparency' },
    { label: t('nav.tourism'), to: '/tourism' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.contact'), to: '/contact' }
  ];
  const officialSources = [
    { label: 'Municipal Portal', href: 'https://teresarizal.gov.ph' },
    { label: 'Public Document Archive', href: 'https://pda.teresarizal.gov.ph/' },
    { label: 'Facebook Page', href: 'https://www.facebook.com/lguteresarizal' }
  ];
  const national = [
    { label: 'Commission on Audit (COA)', href: 'https://www.coa.gov.ph/' },
    { label: 'DBM Open Budget Portal', href: 'https://www.dbm.gov.ph/index.php/dbm-open-budget-portal' },
    { label: 'Official Gov.ph', href: 'https://www.gov.ph/' }
  ];

  const ExtLink = ({ href, label }) => (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-white">
      {label}<ExternalLink size={12} className="opacity-60" />
    </a>
  );

  return (
    <footer className="bg-[#0a1a35] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        {/* Brand row */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(147,197,253,0.85)] drop-shadow-[0_0_44px_rgba(96,165,250,0.55)]" fittingType="fit" />
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Better Teresa<span className="ml-1 align-top text-xs font-bold tracking-wider text-[#60a5fa]">.ORG</span></p>
              <p className="mt-1 max-w-sm text-sm text-white/55">{t('ft.tagline')}</p>
            </div>
          </div>
          <a href="https://lgu.bettergov.ph/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 transition hover:border-[#60a5fa]/40 hover:bg-white/10">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white p-1.5 shadow-lg"><Image src="https://lgu.bettergov.ph/assets/images/logos/BetterGov_Icon-Primary.svg" alt="BetterGov.ph logo" className="h-full w-full object-contain" fittingType="fit" /></span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white group-hover:text-[#60a5fa]">BetterGov.ph</span>
              <span className="text-xs font-medium text-white/55">LGU Directory</span>
            </span>
            <ExternalLink size={13} className="ml-1 text-white/40" />
          </a>
        </div>

        {/* Link grid — 5 verified columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.explore')}</p>
            <ul className="grid gap-2.5 text-sm text-white/70">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#fbbf24]">{t('ft.hotlines')}</p>
            <ul className="grid gap-2.5 text-sm text-white/70">
              {hotlines.map((h) => (
                <li key={h.key}>
                  <a href={`tel:${h.tel}`} className="inline-flex items-center gap-1.5 transition hover:text-white">
                    <Phone size={12} className="text-[#fbbf24]" />
                    <span className="font-semibold">{t(`hl.${h.key}`)}</span>
                    <span className="font-bold text-white/90">{h.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link to="/contact" className="inline-flex items-center gap-1.5 font-semibold text-[#60a5fa] transition hover:text-white">
                  {t('ft.help')} <ArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.sources')}</p>
            <ul className="grid gap-2.5 text-sm text-white/70">
              {officialSources.map((l) => <li key={l.href}><ExtLink href={l.href} label={l.label} /></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.national')}</p>
            <ul className="grid gap-2.5 text-sm text-white/70">
              {national.map((l) => <li key={l.href}><ExtLink href={l.href} label={l.label} /></li>)}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.opensource')}</p>
            <p className="mb-4 text-sm text-white/55">{t('ft.osDesc')}</p>
            <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><Github size={16} /> View on GitHub <ExternalLink size={12} className="opacity-70" /></a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>{t('ft.rights')}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition hover:text-white">{t('ft.privacy')}</Link>
            <Link to="/accessibility" className="transition hover:text-white">{t('ft.accessibility')}</Link>
            <a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="transition hover:text-white">{t('ft.feedback')}</a>
          </div>
          <p>{t('ft.sourceLine')}</p>
        </div>
      </div>
    </footer>
  );
}