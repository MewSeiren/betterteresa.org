// Seed records for the Teresa tourism & local directory.
// Sources: Teresa 2024-2034 Comprehensive Land Use Plan (CLUP) tourism
// establishment list, the municipal Tourism Office locator map (Mar 2023),
// and reputable public publications. Records without a confirmed current
// status are seeded as "needs_verification" — they are never presented as
// verified facts until an administrator verifies them.
// Do NOT fabricate missing fields: absent data stays null and the UI shows
// "Not available".

const CLUP_SOURCE = 'Teresa CLUP 2024–2034 & Municipal Tourism Locator Map (Mar 2023)';
const CLUP_URLS = ['https://teresarizal.gov.ph'];

const rec = (o) => ({
  is_active: true,
  is_featured: false,
  verification_status: 'needs_verification',
  source_name: CLUP_SOURCE,
  source_urls: CLUP_URLS,
  ...o
});

export const tourismSeed = [
  // ── Attractions & Heritage ──────────────────────────────────────────────
  rec({
    name: 'St. Rose of Lima Parish Church',
    slug: 'st-rose-of-lima-parish-church',
    category: 'attractions',
    subcategory: 'churches',
    barangay: 'Poblacion',
    description: "Teresa's central Catholic parish church, dedicated to Nuestra Señora de Santa Rosa de Lima — the town's patroness and the origin of the community that grew into the municipality.",
    tourism_relevance: 'Primary heritage and religious site; center of the town fiesta and religious celebrations.',
    verification_status: 'verified',
    is_featured: true,
    last_verified: '2026-09-06'
  }),
  rec({
    name: "Sarian Ornamentals & Exotic Fruit Farm",
    slug: 'sarian-ornamentals-exotic-fruit-farm',
    category: 'attractions',
    subcategory: 'farms',
    description: 'A well-known exotic fruit tree farm and nursery in Teresa, Rizal, cultivating rare fruit varieties and ornamental plants. Recognized in Philippine farm-tourism coverage as a destination where agriculture meets adventure.',
    tourism_relevance: 'Agri-tourism destination featured in national agriculture media.',
    source_name: 'Agriculture Monthly / Philippine Daily Inquirer — farm tourism features',
    source_urls: ['https://agriculture.com.ph/2019/06/19/farm-tourism-the-future/', 'https://business.inquirer.net/256541/farm-tourism-future'],
    verification_status: 'verified',
    is_featured: true,
    last_verified: '2026-09-06'
  }),

  // ── Recreation & Leisure ────────────────────────────────────────────────
  rec({
    name: "Marden's Place Private Resort",
    slug: 'mardens-place-private-resort',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Private resort in Teresa, Rizal listed in the municipal tourism establishment directory.',
    is_featured: true
  }),
  rec({
    name: "Tita El's Place Private Resort",
    slug: 'tita-els-place-private-resort',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Private resort in Teresa, Rizal listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Yasak Resort',
    slug: 'yasak-resort',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Private resort in Teresa, Rizal listed in the municipal tourism establishment directory.',
    is_featured: true
  }),
  rec({
    name: "Ysabelle's Garden Resort",
    slug: 'ysabelles-garden-resort',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Resort in Teresa, Rizal listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Rancho Bravo',
    slug: 'rancho-bravo',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Ranch resort in Teresa, Rizal listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Rancho Felipe',
    slug: 'rancho-felipe',
    category: 'recreation',
    subcategory: 'resorts',
    description: 'Ranch resort in Teresa, Rizal listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Quest Adventure Camp',
    slug: 'quest-adventure-camp',
    category: 'recreation',
    subcategory: 'adventure',
    description: 'Adventure camp in Teresa, Rizal listed in the municipal tourism establishment directory.',
    is_featured: true
  }),
  rec({
    name: 'Sidetrip',
    slug: 'sidetrip',
    category: 'recreation',
    subcategory: 'parks',
    description: 'Recreational stop in Teresa, Rizal listed in the municipal tourism establishment directory.'
  }),

  // ── Food & Drink ────────────────────────────────────────────────────────
  rec({
    name: "Greyson's Dimsum and Noodles",
    slug: 'greysons-dimsum-and-noodles',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local dimsum and noodle house listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Kamayan sa Palayan',
    slug: 'kamayan-sa-palayan',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local restaurant listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Kokoyito's Sizzling Hauz",
    slug: 'kokoyitos-sizzling-hauz',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local sizzling-food eatery listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Eat's Takoyummy Food Hub",
    slug: 'eats-takoyummy-food-hub',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local food hub listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Leof's Food House",
    slug: 'leofs-food-house',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local eatery listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Jhayco's Grill and Restaurant",
    slug: 'jaycos-grill-and-restaurant',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Grill and restaurant in Teresa, Rizal, described in local food coverage as a vibrant dining spot.',
    source_name: 'Teresa Rizal community food coverage (Facebook)',
    source_urls: ['https://www.facebook.com/']
  }),
  rec({
    name: "Timplado's Cuisine",
    slug: 'timplados-cuisine',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local eatery listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Samgville 199',
    slug: 'samgville-199',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local eatery listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Dad's Burger & House of Unlimited",
    slug: 'dads-burger-house-of-unlimited',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local burger house listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Aurora's Place",
    slug: 'auroras-place',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local dining spot listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Ancla Coffee',
    slug: 'ancla-coffee',
    category: 'food',
    subcategory: 'cafes',
    description: 'Local coffee shop listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Thirteen Thirty Cafe',
    slug: 'thirteen-thirty-cafe',
    category: 'food',
    subcategory: 'cafes',
    description: 'Local café listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Cafe Amelita',
    slug: 'cafe-amelita',
    category: 'food',
    subcategory: 'cafes',
    description: 'A locally known café in Teresa, Rizal, described in local coverage as a mom-and-pop café known for traditional dishes and a warm ambiance.',
    source_name: 'Teresa Rizal community food coverage (Facebook)',
    source_urls: ['https://www.facebook.com/']
  }),
  rec({
    name: 'Gocca Coffee',
    slug: 'gocca-coffee',
    category: 'food',
    subcategory: 'cafes',
    description: 'Local coffee shop listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Terra Coffee',
    slug: 'terra-coffee',
    category: 'food',
    subcategory: 'cafes',
    description: 'Coffee shop in Teresa, Rizal mentioned in local social-media food coverage for its brews, pastries, and relaxing vibe.',
    source_name: 'Local food coverage (TikTok)',
    source_urls: ['https://www.tiktok.com/discover/teresa-rizal-restaurant']
  }),
  rec({
    name: 'Balai Urunjing',
    slug: 'balai-urunjing',
    category: 'food',
    subcategory: 'restaurants',
    description: 'Local establishment listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "MJ's Burger",
    slug: 'mjs-burger',
    category: 'food',
    subcategory: 'food-stalls',
    description: 'Local food stall listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Pinoy's Tsibug",
    slug: 'pinoy-tsibug',
    category: 'food',
    subcategory: 'food-stalls',
    description: 'Local food stall listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Teresa's Mais at Mani",
    slug: 'teresas-mais-at-mani',
    category: 'food',
    subcategory: 'food-stalls',
    description: 'Local street-food stall listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: "Amara's Corner",
    slug: 'amaras-corner',
    category: 'food',
    subcategory: 'food-stalls',
    description: 'Local food stall listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Wish Upon a Cake',
    slug: 'wish-upon-a-cake',
    category: 'food',
    subcategory: 'bakeries',
    description: 'Local cake shop listed in the municipal tourism establishment directory.'
  }),

  // ── Local Services & Rentals ─────────────────────────────────────────────
  rec({
    name: 'Dicitadel Swimming Pool Rental',
    slug: 'dicitadel-swimming-pool-rental',
    category: 'services',
    subcategory: 'recreation-rentals',
    description: 'Swimming pool rental listed in the municipal tourism establishment directory.'
  }),
  rec({
    name: 'Simon De La Casa',
    slug: 'simon-de-la-casa',
    category: 'services',
    subcategory: 'recreation-rentals',
    description: 'Rental business listed in the municipal tourism establishment directory.'
  }),

  // ── Local Businesses ─────────────────────────────────────────────────────
  rec({
    name: 'Integrated Solid Waste Management Recovery Facility (ISWMMRF)',
    slug: 'integrated-solid-waste-management-recovery-facility',
    category: 'business',
    subcategory: 'minor-industrial',
    description: "The municipality's award-winning solid waste management recovery facility, recognized for its integrated approach to waste processing.",
    tourism_relevance: 'Award-winning facility; visited for educational tours on local governance and environmental management.',
    source_name: 'Municipality of Teresa — official information'
  }),

  // ── Others ───────────────────────────────────────────────────────────────
  rec({
    name: 'Teresa Municipal Hall',
    slug: 'teresa-municipal-hall',
    category: 'others',
    subcategory: '',
    barangay: 'Poblacion',
    description: 'The seat of the municipal government of Teresa, Rizal, rebuilt during the administration of Mayor Francisco C. Francisco in the 1950s.',
    tourism_relevance: 'Civic landmark and reference point for visitors.',
    source_name: 'Municipality of Teresa — official portal',
    source_urls: ['https://teresarizal.gov.ph'],
    verification_status: 'verified',
    last_verified: '2026-09-06'
  })
];