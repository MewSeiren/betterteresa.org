import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/4f5fc7227_ChatGPTImageAug4202608_12_14PM.png';

export default function CivicFooter() {
  const { t } = useLang();
  const columns = [
    {
      title: t('ft.explore'),
      links: [
        { label: t('nav.services'), href: '#services' },
        { label: t('nav.government'), href: '#government' },
        { label: t('nav.tourism'), href: '#tourism' },
        { label: t('nav.transparency'), href: '#transparency' },
        { label: t('nav.contact'), href: '#contact' }
      ]
    },
    {
      title: t('ft.sources'),
      links: [
        { label: 'Municipal Portal', href: 'https://teresarizal.gov.ph', ext: true },
        { label: 'Public Document Archive', href: 'https://pda.teresarizal.gov.ph/', ext: true },
        { label: 'Facebook Page', href: 'https://www.facebook.com/lguteresarizal', ext: true }
      ]
    },
    {
      title: t('ft.national'),
      links: [
        { label: 'Commission on Audit (COA)', href: 'https://www.coa.gov.ph/', ext: true },
        { label: 'DBM Open Budget Portal', href: 'https://www.dbm.gov.ph/index.php/dbm-open-budget-portal', ext: true },
        { label: 'Official Gov.ph', href: 'https://www.gov.ph/', ext: true }
      ]
    }
  ];

  return (
    <footer className="bg-[#0a1a35] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        {/* Brand row */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-24 w-24 object-contain drop-shadow-[0_0_18px_rgba(96,165,250,0.6)]" fittingType="fit" style={{ filter: 'grayscale(1) brightness(1.1)' }} />
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Better Teresa<span className="ml-1 align-top text-xs font-bold tracking-wider text-[#60a5fa]">.ORG</span></p>
              <p className="mt-1 max-w-sm text-sm text-white/55">{t('ft.tagline')}</p>
            </div>
          </div>
          <a href="https://lgu.bettergov.ph/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 transition hover:border-[#60a5fa]/40 hover:bg-white/10">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-[#1a73e8] to-[#0a3a8c] text-white shadow-lg"><Globe size={20} /></span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white group-hover:text-[#60a5fa]">BetterGov.ph</span>
              <span className="text-xs font-medium text-white/55">LGU Directory</span>
            </span>
            <ExternalLink size={13} className="ml-1 text-white/40" />
          </a>
        </div>

        {/* Link grid */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map(col => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{col.title}</p>
              <ul className="grid gap-2.5 text-sm text-white/70">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noreferrer' : undefined} className="inline-flex items-center gap-1.5 transition hover:text-white">
                      {l.label}{l.ext && <ExternalLink size={12} className="opacity-60" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.opensource')}</p>
            <p className="mb-4 text-sm text-white/55">{t('ft.osDesc')}</p>
            <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><Github size={16} /> View on GitHub <ExternalLink size={12} className="opacity-70" /></a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>{t('ft.rights')}</p>
          <p>{t('ft.sourceLine')}</p>
        </div>
      </div>
    </footer>
  );
}