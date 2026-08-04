import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/4f5fc7227_ChatGPTImageAug4202608_12_14PM.png';

export default function CivicFooter() {
  const { t } = useLang();
  return (
    <footer className="bg-[#0a1a35] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-12 w-12 rounded-full object-contain drop-shadow-[0_0_12px_rgba(96,165,250,0.65)]" fittingType="fit" />
              <p className="text-lg font-black">Better Teresa</p>
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
            <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><Github size={16} /> github.com/MewSeiren/betterteresa.org</a>
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