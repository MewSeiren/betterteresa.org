// Tourism directory taxonomy for Teresa, Rizal.
// Categories and subcategories are the single source of truth for the
// directory's routes (/tourism/<category-or-subcategory-slug>) and filters.
// Add a new entry here and it becomes available everywhere instantly.

export const CATEGORIES = [
  {
    key: 'attractions',
    slug: 'attractions-heritage',
    label: { en: 'Attractions & Heritage', fil: 'Atraksyon at Pamanang Lugar' },
    icon: 'Landmark',
    color: '#8CC63F',
    subcategories: [
      { key: 'churches', slug: 'churches', label: { en: 'Churches & Religious Sites', fil: 'Simbahan at Relihiyosong Lugar' } },
      { key: 'historical', slug: 'historical-cultural', label: { en: 'Historical & Cultural Sites', fil: 'Kasaysayan at Kultura' } },
      { key: 'farms', slug: 'farms-agritourism', label: { en: 'Farms & Agri-Tourism', fil: 'Buahanan at Agri-Tourism' } },
      { key: 'nature', slug: 'nature-scenic', label: { en: 'Nature & Scenic Areas', fil: 'Kalikasan at Tanawin' } },
      { key: 'educational', slug: 'educational-tourism', label: { en: 'Educational Tourism', fil: 'Edukasyonal na Turismo' } }
    ]
  },
  {
    key: 'recreation',
    slug: 'recreation-leisure',
    label: { en: 'Recreation & Leisure', fil: 'Libangan at Aliwan' },
    icon: 'Waves',
    color: '#F7941E',
    subcategories: [
      { key: 'resorts', slug: 'resorts', label: { en: 'Resorts', fil: 'Mga Resort' } },
      { key: 'swimming', slug: 'swimming-pools', label: { en: 'Swimming Pools', fil: 'Swimming Pool' } },
      { key: 'adventure', slug: 'adventure-outdoor', label: { en: 'Adventure & Outdoor Activities', fil: 'Pakikipagsapalaran at Outdoor' } },
      { key: 'parks', slug: 'parks-recreation', label: { en: 'Parks & Recreation', fil: 'Parks at Recreational' } },
      { key: 'campsites', slug: 'campsites', label: { en: 'Campsites', fil: 'Camping Site' } }
    ]
  },
  {
    key: 'food',
    slug: 'food-drink',
    label: { en: 'Food & Drink', fil: 'Pagkain at Inumin' },
    icon: 'UtensilsCrossed',
    color: '#EC008C',
    subcategories: [
      { key: 'restaurants', slug: 'restaurants', label: { en: 'Restaurants', fil: 'Mga Restaurant' } },
      { key: 'cafes', slug: 'cafes', label: { en: 'Cafés', fil: 'Mga Kapihan' } },
      { key: 'bakeries', slug: 'bakeries', label: { en: 'Bakeries', fil: 'Mga Panaderia' } },
      { key: 'food-stalls', slug: 'food-stalls', label: { en: 'Food Stalls', fil: 'Mga Food Stall' } },
      { key: 'specialty-food', slug: 'specialty-food', label: { en: 'Specialty Food', fil: 'Espesyal na Pagkain' } }
    ]
  },
  {
    key: 'services',
    slug: 'services-rentals',
    label: { en: 'Local Services & Rentals', fil: 'Lokal na Serbisyo at Rental' },
    icon: 'KeyRound',
    color: '#92278F',
    subcategories: [
      { key: 'event-venues', slug: 'event-venues', label: { en: 'Event Venues', fil: 'Venue para sa Event' } },
      { key: 'equipment-rentals', slug: 'equipment-rentals', label: { en: 'Equipment Rentals', fil: 'Rental ng Kagamitan' } },
      { key: 'function-rooms', slug: 'function-rooms', label: { en: 'Function Rooms', fil: 'Function Room' } },
      { key: 'recreation-rentals', slug: 'recreation-rentals', label: { en: 'Recreation Rentals', fil: 'Rental para sa Recreational' } },
      { key: 'tourism-services', slug: 'tourism-services', label: { en: 'Other Tourism-Related Services', fil: 'Ibang Serbisyong Pang-Turismo' } }
    ]
  },
  {
    key: 'business',
    slug: 'local-businesses',
    label: { en: 'Local Businesses', fil: 'Lokal na Negosyo' },
    icon: 'Store',
    color: '#0071BC',
    subcategories: [
      { key: 'retail', slug: 'retail', label: { en: 'Retail', fil: 'Retail' } },
      { key: 'minor-industrial', slug: 'minor-industrial', label: { en: 'Minor Industrial', fil: 'Minor Industrial' } },
      { key: 'specialty-businesses', slug: 'specialty-businesses', label: { en: 'Specialty Businesses', fil: 'Espesyal na Negosyo' } }
    ]
  },
  {
    key: 'others',
    slug: 'others',
    label: { en: 'Other Places of Interest', fil: 'Ibang Karapat-dapat Tuklasin' },
    icon: 'MapPin',
    color: '#29ABE2',
    subcategories: []
  }
];

export function getCategory(keyOrSlug) {
  return CATEGORIES.find(
    (c) => c.key === keyOrSlug || c.slug === keyOrSlug
  ) || null;
}

export function getSubcategory(keyOrSlug) {
  for (const c of CATEGORIES) {
    const s = c.subcategories.find(
      (sc) => sc.key === keyOrSlug || sc.slug === keyOrSlug
    );
    if (s) return { category: c, subcategory: s };
  }
  return null;
}

// Resolve a /tourism/:slug path segment to a category view, subcategory view,
// or null (meaning it should be treated as a place slug).
export function resolveTaxonomySlug(slug) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (cat) return { type: 'category', category: cat };
  const sub = getSubcategory(slug);
  if (sub) return { type: 'subcategory', ...sub };
  return null;
}

export function categoryLabel(cat, lang) {
  return cat?.label?.[lang] || cat?.label?.en || '';
}

// Verification status metadata shared across the directory and admin.
export const VERIFICATION_STATUSES = [
  {
    key: 'verified',
    label: { en: 'Verified', fil: 'Beripikado' },
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500'
  },
  {
    key: 'recently_updated',
    label: { en: 'Recently Updated', fil: 'Bagong Na-update' },
    badge: 'bg-blue-100 text-blue-800',
    dot: 'bg-blue-500'
  },
  {
    key: 'needs_verification',
    label: { en: 'Needs Verification', fil: 'Kailangang Beripikahin' },
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500'
  },
  {
    key: 'potentially_inactive',
    label: { en: 'Potentially Inactive', fil: 'Maaaring Hindi Na Aktibo' },
    badge: 'bg-orange-100 text-orange-800',
    dot: 'bg-orange-500'
  },
  {
    key: 'closed',
    label: { en: 'Closed', fil: 'Sarado na' },
    badge: 'bg-rose-100 text-rose-800',
    dot: 'bg-rose-500'
  },
  {
    key: 'archived',
    label: { en: 'Archived', fil: 'Naka-archive' },
    badge: 'bg-slate-200 text-slate-600',
    dot: 'bg-slate-400'
  }
];

export function statusMeta(key) {
  return VERIFICATION_STATUSES.find((s) => s.key === key) || VERIFICATION_STATUSES[2];
}

export function statusLabel(key, lang) {
  const meta = statusMeta(key);
  return meta.label[lang] || meta.label.en;
}