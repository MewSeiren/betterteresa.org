// Site-wide search: tokenization, synonym expansion, relevance scoring,
// and query highlighting. Pure functions over the normalized index built
// in searchIndex.js — no DOM text is ever searched.

export const SEARCH_GROUPS = [
  { key: 'all', labelKey: 'sr.all' },
  { key: 'services', labelKey: 'sr.f.services' },
  { key: 'government', labelKey: 'sr.f.government' },
  { key: 'documents', labelKey: 'sr.f.documents' },
  { key: 'tourism', labelKey: 'sr.f.tourism' },
  { key: 'businesses', labelKey: 'sr.f.businesses' },
  { key: 'pages', labelKey: 'sr.f.pages' }
];

export const POPULAR_SEARCHES = [
  'business permit',
  'senior citizen id',
  'resort',
  'ordinance',
  'emergency hotline',
  'mayor'
];

export function groupOfRecord(rec) {
  switch (rec.type) {
    case 'service': return 'services';
    case 'office': case 'official': case 'hotline': return 'government';
    case 'document': case 'project': return 'documents';
    case 'tourism': return 'tourism';
    case 'business': return 'businesses';
    default: return 'pages';
  }
}

export const typeLabelKey = (type) => `sr.t.${type}`;

const tokenize = (s) =>
  (s || '').toLowerCase().split(/[^a-z0-9ñ]+/).filter((w) => w.length >= 2);

// Related-term expansion: searching "permit" also surfaces renewal,
// licensing, and occupancy records — at a lower weight than direct hits.
const SYNONYMS = {
  permit: ['business permit', "mayor's permit", 'renewal', 'license', 'occupancy'],
  mayor: ["mayor's clearance", "mayor's office", 'municipal mayor'],
  id: ['senior citizen id', 'pwd id', 'valid id'],
  senior: ['senior citizen', 'pwd', 'social pension'],
  business: ['business permit', 'trade', 'livelihood', 'occupational'],
  garbage: ['waste', 'trash', 'disposal', 'segregation'],
  ordinance: ['resolution', 'legislation', 'sangguniang bayan'],
  barangay: ['brgy', 'clearance', 'certificate'],
  resort: ['pool', 'swimming', 'recreation', 'private resort'],
  emergency: ['hotline', 'mdrrmo', 'rescue', 'disaster'],
  health: ['medical', 'clinic', 'rhu', 'sanitary', 'vaccination'],
  budget: ['fund', 'utilization', 'financial', 'statement'],
  disaster: ['emergency', 'calamity', 'rescue', 'flood', 'typhoon'],
  document: ['record', 'report', 'disclosure'],
  tax: ['treasury', 'real property', 'cedula']
};

function expandTokens(tokens) {
  const syn = new Set();
  tokens.forEach((tok) => (SYNONYMS[tok] || []).forEach((s) => syn.add(s)));
  return [...syn];
}

// Relevance ranking, highest first:
// exact title > title starts-with > title token > keywords > category >
// description > content, with synonym matches weighted lower.
function scoreRecord(rec, tokens, synTokens) {
  const title = (rec.title || '').toLowerCase();
  const phrase = tokens.join(' ');
  let score = 0;
  if (phrase && title === phrase) score += 120;
  else if (phrase && title.startsWith(phrase)) score += 90;
  tokens.forEach((tok) => { if (title.includes(tok)) score += 40; });
  synTokens.forEach((tok) => { if (title.includes(tok)) score += 14; });
  const kw = (rec.keywords || []).map((k) => k.toLowerCase());
  tokens.forEach((tok) => kw.forEach((k) => {
    if (k.includes(tok) || (tok.length >= 3 && tok.includes(k))) score += 24;
  }));
  synTokens.forEach((tok) => kw.forEach((k) => { if (k.includes(tok)) score += 9; }));
  const cat = `${rec.category} ${rec.subcategory}`.toLowerCase();
  tokens.forEach((tok) => { if (cat.includes(tok)) score += 15; });
  const desc = (rec.description || '').toLowerCase();
  tokens.forEach((tok) => { if (desc.includes(tok)) score += 12; });
  synTokens.forEach((tok) => { if (desc.includes(tok)) score += 4; });
  const content = (rec.content || '').toLowerCase();
  tokens.forEach((tok) => { if (content.includes(tok)) score += 6; });
  synTokens.forEach((tok) => { if (content.includes(tok)) score += 2; });
  return score;
}

const MIN_SCORE = 12;

export function runSearch(index, query, group = 'all', limit = 100) {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const synTokens = expandTokens(tokens);
  return index
    .filter((rec) => group === 'all' || groupOfRecord(rec) === group)
    .map((rec) => ({ rec, score: scoreRecord(rec, tokens, synTokens) }))
    .filter((r) => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score ||
      String(a.rec.title).localeCompare(String(b.rec.title)))
    .slice(0, limit);
}

// Splits `text` around the first matching query token for <mark> rendering.
export function highlightParts(text, query) {
  const lower = (text || '').toLowerCase();
  let best = null;
  tokenize(query).forEach((tok) => {
    const i = lower.indexOf(tok);
    if (i !== -1 && (best === null || i < best.i)) best = { i, len: tok.length };
  });
  if (!best) return [{ text: text || '', hit: false }];
  return [
    { text: text.slice(0, best.i), hit: false },
    { text: text.slice(best.i, best.i + best.len), hit: true },
    { text: text.slice(best.i + best.len), hit: false }
  ];
}