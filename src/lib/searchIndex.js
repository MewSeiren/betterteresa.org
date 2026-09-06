// Builds the normalized site-wide search index.
// Static records come from the verified data modules (services, offices,
// officials, hotlines, public records, projects, history, pages); tourism
// places are appended at runtime from the TourismPlace entity
// (see useSearchIndex). Every record: title, description, content,
// url, category, subcategory, date, keywords, type.

import { serviceCategories } from '@/data/servicesData';
import { officials, offices, hotlines, records, projects, history } from '@/data/teresaData';
import { isActivePlace } from '@/lib/tourism';

const rec = (r) => ({
  id: r.id,
  type: r.type,
  title: r.title,
  description: r.description || '',
  content: r.content || '',
  url: r.url,
  category: r.category || '',
  subcategory: r.subcategory || '',
  date: r.date || '',
  keywords: r.keywords || []
});

const PAGES = [
  { title: 'Home — Better Teresa', description: 'Municipal information, services, transparency records, and the community directory for Teresa, Rizal.', url: '/', keywords: ['home', 'welcome', 'portal', 'teresa'] },
  { title: 'Municipal Services', description: 'Browse all offices and citizen services of the Municipal Government of Teresa — requirements, fees, schedules, and locations.', url: '/services', keywords: ['services', 'citizen charter', 'forms', 'requirements', 'fees'] },
  { title: 'Government — Officials of Teresa', description: 'The Mayor, Vice Mayor, Sangguniang Bayan, ex officio members, and the municipal office directory.', url: '/government', keywords: ['government', 'officials', 'mayor', 'vice mayor', 'councilors', 'sangguniang bayan', 'offices', 'directory'] },
  { title: 'Transparency — Public Records', description: 'Budget and fund utilization reports, full disclosure documents, and infrastructure program reports.', url: '/transparency', keywords: ['transparency', 'budget', 'records', 'documents', 'ordinances', 'resolutions', 'full disclosure', 'procurement', 'audit'] },
  { title: 'Explore Teresa — Directory of Places', description: 'A community-maintained directory of attractions, resorts, restaurants, cafés, and local businesses in Teresa, Rizal.', url: '/tourism', keywords: ['tourism', 'directory', 'places', 'resort', 'restaurant', 'cafe', 'attractions', 'food'] },
  { title: 'About Teresa', description: 'The history of Teresa, its municipal profile and statistics, and its nine barangays.', url: '/about', keywords: ['about', 'history', 'barangays', 'statistics', 'profile', 'municipality'] },
  { title: 'Contact & Emergency Hotlines', description: 'Municipal Hall trunkline, emergency hotlines (MDRRMO, PNP, BFP), office directory, email, and official social media.', url: '/contact', keywords: ['contact', 'hotline', 'emergency', 'phone', 'email', 'address', 'mdrrmo', 'pnp', 'bfp'] },
  { title: 'Privacy', description: 'How the Better Teresa community portal handles information.', url: '/privacy', keywords: ['privacy', 'data', 'policy'] },
  { title: 'Accessibility', description: 'The accessibility commitment of the Better Teresa portal.', url: '/accessibility', keywords: ['accessibility', 'wcag', 'screen reader'] }
];

export function buildStaticIndex() {
  const idx = [];

  PAGES.forEach((p, i) => idx.push(rec({ id: `page-${i}`, type: 'page', ...p })));

  // Services: one record per category, one per individual service offering.
  serviceCategories.forEach((c) => {
    idx.push(rec({
      id: `svc-${c.slug}`,
      type: 'service',
      title: c.name,
      description: c.intro,
      content: `${c.office}. Services: ${c.services.map((s) => s.title).join(', ')}.`,
      url: `/services/${c.slug}`,
      category: c.office,
      keywords: c.keywords
    }));
    c.services.forEach((s, i) => idx.push(rec({
      id: `svci-${c.slug}-${i}`,
      type: 'service',
      title: s.title,
      description: `${s.who}. ${c.office}. Fees: ${s.fees}.`,
      content: `Requirements: ${s.requirements.join(', ')}`,
      url: `/services/${c.slug}`,
      category: c.office,
      keywords: c.keywords
    })));
  });

  offices.forEach((o, i) => idx.push(rec({
    id: `office-${i}`,
    type: 'office',
    title: o.name,
    description: `${o.line} · ${o.email}`,
    content: 'Municipal office contact details.',
    url: '/government',
    keywords: ['office', 'directory', 'contact', 'phone', 'email']
  })));

  officials.forEach((o, i) => idx.push(rec({
    id: `official-${i}`,
    type: 'official',
    title: `Hon. ${o.name}`,
    description: `${o.role} — ${o.focus}`,
    content: 'Elected official of the Municipality of Teresa, Rizal.',
    url: '/government',
    keywords: [o.role.toLowerCase(), 'official', 'sangguniang bayan', 'mayor', 'councilor']
  })));

  hotlines.forEach((h) => idx.push(rec({
    id: `hotline-${h.key}`,
    type: 'hotline',
    title: `${h.label} — ${h.number}`,
    description: `Call ${h.number}${h.availability ? ` · ${h.availability}` : ''}`,
    content: 'Emergency / government hotline for Teresa, Rizal.',
    url: '/contact',
    keywords: ['emergency', 'hotline', 'call', 'number', h.key]
  })));

  records.forEach((r, i) => idx.push(rec({
    id: `doc-${i}`,
    type: 'document',
    title: r.title,
    description: `${r.type} — ${r.tags}`,
    content: 'Public record in the Municipal Public Document Archive.',
    url: '/transparency',
    date: r.date,
    keywords: [r.type.toLowerCase(), 'record', 'document', 'report', ...r.tags.toLowerCase().split(' · ')]
  })));

  projects.forEach((p, i) => idx.push(rec({
    id: `proj-${i}`,
    type: 'project',
    title: p.name,
    description: p.detail,
    content: `${p.status} · ${p.source}`,
    url: '/transparency',
    date: p.cycle,
    keywords: ['project', 'program', 'infrastructure', 'report']
  })));

  history.forEach((h, i) => idx.push(rec({
    id: `hist-${i}`,
    type: 'history',
    title: `${h.year} — ${h.title}`,
    description: h.desc,
    content: 'History of the Municipality of Teresa, Rizal.',
    url: '/about',
    keywords: ['history', 'origin', 'founding']
  })));

  return idx;
}

// Converts TourismPlace entity records (live database data) into
// searchable index records. Inactive/closed/archived places are excluded.
export function tourismRecords(places) {
  return (places || []).filter(isActivePlace).map((p) => {
    const isBusiness = p.category === 'business' || p.category === 'services';
    return rec({
      id: `place-${p.id}`,
      type: isBusiness ? 'business' : 'tourism',
      title: p.name,
      description: p.description || '',
      content: [p.address, p.barangay, p.subcategory, (p.services || []).join(', '), (p.amenities || []).join(', ')]
        .filter(Boolean).join(' · '),
      url: `/tourism/${p.slug}`,
      category: p.category,
      subcategory: p.subcategory || '',
      date: p.last_verified || '',
      keywords: [p.barangay, p.category, p.subcategory].filter(Boolean)
    });
  });
}