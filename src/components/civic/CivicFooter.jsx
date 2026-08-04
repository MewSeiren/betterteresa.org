import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/ee5788f6f_ChatGPTImageAug4202610_03_36PM.png';

export default function CivicFooter() {
  const { t } = useLang();
  return (
    <footer className="bg-[#0a1a35] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-16 w-16 rounded-full object-contain drop-shadow-[0_0_14px_rgba(96,165,250,0.7)]" fittingType="fit" />
              <p className="text-lg font-black">Better Teresa<span className="ml-1 align-top text-[10px] font-bold tracking-wider text-[#60a5fa]">.ORG</span></p>
            </div>
            <p className="mt-4 text-sm text-white/60">{t('ft.tagline')}</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.explore')}</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="#services" className="hover:text-white">{t('nav.services')}</a></li>
              <li><a href="#government" className="hover:text-white">{t('nav.government')}</a></li>
              <li><a href="#tourism" className="hover:text-white">{t('nav.tourism')}</a></li>
              <li><a href="#transparency" className="hover:text-white">{t('nav.transparency')}</a></li>
              <li><a href="#contact" className="hover:text-white">{t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.sources')}</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="https://teresarizal.gov.ph" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Municipal Portal <ExternalLink size={13} /></a></li>
              <li><a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Public Document Archive <ExternalLink size={13} /></a></li>
              <li><a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Facebook Page <ExternalLink size={13} /></a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.national')}</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="https://www.coa.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Commission on Audit (COA) <ExternalLink size={13} /></a></li>
              <li><a href="https://www.dbm.gov.ph/index.php/dbm-open-budget-portal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">DBM Open Budget Portal <ExternalLink size={13} /></a></li>
              <li><a href="https://www.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Official Gov.ph <ExternalLink size={13} /></a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">{t('ft.opensource')}</p>
            <p className="text-sm text-white/60">{t('ft.osDesc')}</p>
            <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><Github size={16} /> View on GitHub <ExternalLink size={12} className="opacity-70" /></a>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">BetterGov</p>
            <a href="https://lgu.bettergov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-sm font-bold text-white transition hover:text-[#60a5fa]">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#1a73e8] to-[#0a3a8c] text-white shadow-lg"><Globe size={18} /></span>
              <span className="leading-tight">BetterGov.ph<br /><span className="text-xs font-medium text-white/55">LGU Directory</span></span>
            </a>
            <p className="mt-3 text-xs text-white/45">A community-maintained directory of Better LGU transparency portals.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 text-xs text-white/45">
          <p>{t('ft.rights')}</p>
          <p>{t('ft.sourceLine')}</p>
        </div>
      </div>
    </footer>
  );
}