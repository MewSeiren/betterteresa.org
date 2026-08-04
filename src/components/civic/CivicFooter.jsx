import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Image } from '@/components/ui/image';

const LOGO_URL = 'https://media.base44.com/images/public/6a71c2bad4d8c6705a9917b5/c8d4c5f01_ChatGPTImageAug4202607_39_14PM.png';

export default function CivicFooter() {
  return (
    <footer className="bg-[#0f172a] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Teresa, Rizal official seal" className="h-12 w-12 rounded-full object-contain bg-white" fittingType="fit" />
              <p className="text-lg font-black">Better Teresa</p>
            </div>
            <p className="mt-4 text-sm text-white/60">Ang volunteer-run community portal ng Municipality of Teresa, Province of Rizal.</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Explore</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#government" className="hover:text-white">Government</a></li>
              <li><a href="#transparency" className="hover:text-white">Transparency</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Official Sources</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="https://teresarizal.gov.ph" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Municipal Portal <ExternalLink size={13} /></a></li>
              <li><a href="https://pda.teresarizal.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Public Document Archive <ExternalLink size={13} /></a></li>
              <li><a href="https://www.facebook.com/lguteresarizal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Facebook Page <ExternalLink size={13} /></a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">National Data Sources</p>
            <ul className="grid gap-2 text-sm text-white/70">
              <li><a href="https://www.coa.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Commission on Audit (COA) <ExternalLink size={13} /></a></li>
              <li><a href="https://www.dbm.gov.ph/index.php/dbm-open-budget-portal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">DBM Open Budget Portal <ExternalLink size={13} /></a></li>
              <li><a href="https://www.gov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Official Gov.ph <ExternalLink size={13} /></a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Open Source</p>
            <p className="text-sm text-white/60">Open source ang portal na ito. Mag-contribute, mag-report ng issues, o i-fork ang project sa GitHub.</p>
            <a href="https://github.com/MewSeiren/betterteresa.org" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"><Github size={16} /> github.com/MewSeiren/betterteresa.org</a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 text-xs text-white/45">
          <p>Better Teresa · Independent public-interest interface</p>
          <p>Open source on GitHub · github.com/MewSeiren/betterteresa.org · Sources: Municipality of Teresa · COA · DBM</p>
        </div>
      </div>
    </footer>
  );
}