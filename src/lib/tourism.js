import { CATEGORIES, getCategory, getSubcategory } from '@/data/tourismTaxonomy';

// Official barangays of Teresa, Rizal (PSGC / PhilAtlas)
export const BARANGAYS = [
  'Bagumbayan',
  'Calumpang Santo Cristo',
  'Dalig',
  'Dulumbayan',
  'May-iba',
  'Poblacion',
  'Prinza',
  'San Gabriel',
  'San Roque'
];

export const slugify = (s = '') =>
  s.toLowerCase().trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function isActivePlace(p) {
  return p.is_active !== false &&
    !['archived', 'closed'].includes(p.verification_status);
}

export function mapsLink(place) {
  if (place.maps_url) return place.maps_url;
  if (place.latitude != null && place.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, Teresa, Rizal, Philippines`)}`;
}

export function mapsEmbedSrc(place) {
  if (place.latitude != null && place.longitude != null) {
    return `https://maps.google.com/maps?q=${place.latitude},${place.longitude}&z=15&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${place.name}, Teresa, Rizal, Philippines`)}&z=14&output=embed`;
}

// Filter + sort the directory. Presets come from the resolved category route.
export function filterPlaces(places, {
  query = '',
  category = '',
  subcategory = '',
  barangay = '',
  status = '',
  includeInactive = false,
  sort = 'relevance'
} = {}) {
  const q = query.trim().toLowerCase();
  let list = places.filter((p) => {
    if (!includeInactive && !isActivePlace(p)) return false;
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (barangay && p.barangay !== barangay) return false;
    if (status && p.verification_status !== status) return false;
    if (q) {
      const hay = [p.name, p.description, p.address, p.barangay, p.subcategory]
        .filter(Boolean).join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const byName = (a, b) => (a.name || '').localeCompare(b.name || '');
  if (sort === 'alpha') list.sort(byName);
  else if (sort === 'verified') {
    list.sort((a, b) => {
      const av = a.last_verified || '';
      const bv = b.last_verified || '';
      if (av !== bv) return av < bv ? 1 : -1;
      return byName(a, b);
    });
  } else {
    // relevance: featured first, then recently verified, then name
    list.sort((a, b) => {
      if (!!b.is_featured !== !!a.is_featured) return b.is_featured ? 1 : -1;
      const av = a.last_verified || '';
      const bv = b.last_verified || '';
      if (av !== bv) return av < bv ? 1 : -1;
      return byName(a, b);
    });
  }
  return list;
}

// Duplicate detection for the admin form: name similarity, contact number,
// social links, address, and coordinate proximity.
export function findDuplicates(candidate, places, excludeId = null) {
  const norm = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const dupes = [];
  for (const p of places) {
    if (excludeId && p.id === excludeId) continue;
    const reasons = [];
    const cn = norm(candidate.name);
    const pn = norm(p.name);
    if (cn && pn && (cn === pn || (cn.length > 5 && pn.length > 5 && (cn.includes(pn) || pn.includes(cn))))) {
      reasons.push('Similar name');
    }
    if (candidate.contact_number && p.contact_number &&
        candidate.contact_number.replace(/\D/g, '').slice(-9) ===
        p.contact_number.replace(/\D/g, '').slice(-9)) {
      reasons.push('Same contact number');
    }
    for (const [ck, pk] of [
      ['facebook_url', 'facebook_url'],
      ['instagram_url', 'instagram_url'],
      ['tiktok_url', 'tiktok_url'],
      ['website', 'website']
    ]) {
      const a = candidate[ck] || '';
      const b = p[pk] || '';
      if (a && b && norm(a) === norm(b)) reasons.push(`Same ${ck.split('_')[0]} link`);
    }
    if (candidate.address && p.address &&
        norm(candidate.address) === norm(p.address)) {
      reasons.push('Same address');
    }
    if (candidate.latitude != null && p.latitude != null &&
        Math.abs(candidate.latitude - p.latitude) < 0.0005 &&
        Math.abs(candidate.longitude - p.longitude) < 0.0005) {
      reasons.push('Very close coordinates');
    }
    if (reasons.length) dupes.push({ place: p, reasons });
  }
  return dupes;
}

// schema.org type per taxonomy
export function schemaTypeFor(place) {
  if (place.category === 'attractions') {
    if (place.subcategory === 'churches') return 'Church';
    if (place.subcategory === 'farms') return 'Farm';
    return 'TouristAttraction';
  }
  if (place.category === 'recreation') {
    if (place.subcategory === 'resorts') return 'Resort';
    return 'TouristAttraction';
  }
  if (place.category === 'food') {
    if (place.subcategory === 'cafes') return 'CafeOrCoffeeShop';
    if (place.subcategory === 'bakeries') return 'Bakery';
    return 'Restaurant';
  }
  return 'LocalBusiness';
}

// JSON-LD structured data; only includes properties we actually have.
export function buildJsonLd(place) {
  const node = {
    '@context': 'https://schema.org',
    '@type': schemaTypeFor(place),
    name: place.name
  };
  if (place.description) node.description = place.description;
  if (place.address) node.address = { '@type': 'PostalAddress', streetAddress: place.address, addressLocality: 'Teresa', addressRegion: 'Rizal', addressCountry: 'PH' };
  else node.address = { '@type': 'PostalAddress', addressLocality: 'Teresa', addressRegion: 'Rizal', addressCountry: 'PH' };
  if (place.latitude != null && place.longitude != null) {
    node.geo = { '@type': 'GeoCoordinates', latitude: place.latitude, longitude: place.longitude };
  }
  if (place.contact_number) node.telephone = place.contact_number;
  if (place.email) node.email = place.email;
  if (place.website) node.url = place.website;
  const sameAs = [place.facebook_url, place.instagram_url, place.tiktok_url].filter(Boolean);
  if (sameAs.length) node.sameAs = sameAs;
  if (place.opening_hours) node.openingHours = place.opening_hours;
  if (place.price_range) node.priceRange = place.price_range;
  return node;
}

export function categoryChain(place) {
  const cat = getCategory(place.category);
  const sub = cat ? getSubcategory(place.subcategory) : null;
  return { cat, sub };
}

export { CATEGORIES, getCategory, getSubcategory };