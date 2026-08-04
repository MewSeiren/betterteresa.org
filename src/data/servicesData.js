export const serviceCategories = [
  {
    slug: 'health-services',
    name: 'Health Services',
    office: 'Health Office (Rural Health Unit)',
    intro: 'Public health programs, immunization, maternal care, sanitary permits, and health certificates.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: '3rd Floor, Rural Health Unit Building',
    contact: { phone: '(02) 8250-6800 loc. 533/534', email: 'teresa_rhu@yahoo.com' },
    count: 8,
    href: 'https://teresarizal.gov.ph/services/health-office',
    keywords: ['health', 'medical', 'dental', 'vaccine', 'immunization', 'sanitary', 'maternal', 'family planning', 'tb', 'laboratory', 'clinic'],
    services: [
      { title: 'Immunization Services', who: 'Infants 0–11 months old', fees: 'Free', requirements: ['Under Five Form (for old clientele)'] },
      { title: 'Family Planning Program', who: 'Eligible women 15–49 and men', fees: 'Free', requirements: ['Signed Form A-1 (new client)', 'Appointment Card (old client)'] },
      { title: 'Maternal Care', who: 'Pregnant and postpartum women', fees: 'Free', requirements: ['Ante Natal Care Record'] },
      { title: 'Issuance of Sanitary Permit', who: 'All business establishments', fees: 'Per sanitary permit fee schedule', requirements: ["Application Form of Mayor's Business Permit", 'Health Certificate (urinalysis, fecalysis, chest x-ray)', 'Accomplished Registration Form', 'Environment Permit from MENRO', 'Additional requirements vary by establishment type'] },
      { title: 'Issuance of Health Certificate', who: 'Food establishment and regulated business employees', fees: 'Per health certificate fee schedule', requirements: ['Medical examination results (urinalysis, fecalysis, chest x-ray)', 'Valid ID', 'Application Form'] },
      { title: 'TB Control Program (DOTS)', who: 'Individuals with suspected or confirmed TB', fees: 'Free', requirements: ['Valid ID', 'Symptom screening', 'Sputum examination (if required)'] },
      { title: 'Laboratory Examination Services', who: 'Clients referred by the health office', fees: 'Free or minimal fee per test', requirements: ["Doctor's referral (if applicable)", 'Valid ID'] },
      { title: 'Dental Examination & Tooth Extraction', who: 'All residents of Teresa', fees: 'Free', requirements: ['Valid ID'] }
    ]
  },
  {
    slug: 'education',
    name: 'Education',
    office: "Office of the Mayor & Sangguniang Bayan (Special Education Fund)",
    intro: 'Educational assistance and youth support programs coordinated through the Mayor\u2019s Office, with school facilities and programs funded through the Special Education Fund (SEF) of the Sangguniang Bayan.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: 'Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800 loc. 514', email: 'mayorsoffice@teresarizal.gov.ph' },
    count: null,
    href: 'https://teresarizal.gov.ph/services/office-of-the-mayor',
    keywords: ['education', 'scholar', 'school', 'student', 'assistance', 'youth', 'financial aid', 'sef'],
    services: [
      { title: 'Educational / Financial Assistance Slip', who: 'Residents in need of educational or financial assistance', fees: 'Free', requirements: ['Case Study Report (MSWDO)', 'Certificate of Indigency / Residency (Barangay)', 'Valid government-issued ID (photocopy)', 'Certificate of Confinement / Medical Certificate / Clinical Abstract (within 3 months)', 'Outstanding Balance with Billing Clerk signature'] },
      { title: "Mayor's Clearance for Uniformed Service Applicants", who: 'BFP / PNP / AFP / PAF applicants', fees: 'Per municipal fee schedule', requirements: ['Original NBI or Police Clearance', 'Original Community Tax Certificate (CEDULA)', 'Official Receipt for Payment of Clearance'] },
      { title: 'Special Education Fund (SEF) Programs', who: 'Public schools and students in Teresa', fees: 'Funding program (no direct fee)', requirements: ['School endorsement / project proposal', 'Coordination with the Sangguniang Bayan SEF Committee'] }
    ]
  },
  {
    slug: 'business-and-livelihood',
    name: 'Business and Livelihood',
    office: 'Business Permits & Licensing (BPLS)',
    intro: 'Processing of business permits, occupational permits, and special permits for businesses operating in Teresa.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: 'BPLS, 1st Floor, Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800 loc. 526', email: 'bpls@teresarizal.gov.ph' },
    count: 5,
    href: 'https://teresarizal.gov.ph/services/business-permits-licensing',
    keywords: ['business', 'permit', 'license', 'livelihood', 'occupation', 'working permit', 'trade', 'renewal', 'cockfight'],
    services: [
      { title: 'Issuance & Renewal of Business Permit', who: 'Entrepreneurs and business organizations in Teresa', fees: 'Per Business Tax & Regulatory Fees schedule', requirements: ['2x2 picture of business owner (2 pcs) — New', 'Location / Sketch Plan (2 pcs) — New', 'Picture of Business Establishment (2 pcs) — New', 'Duly notarized Application Form', 'Business Name Registration (DTI/SEC/CDA)', 'Locational Clearance (Zoning Office, MPDO)', 'Environmental Permit to Operate (MENRO)', 'Sanitary Permit (Health Office)', 'Annual Inspection Fees (Engineering Office)', 'Statement of Gross Sales/Receipts — Renewal', 'Fire Safety Inspection Certificate (BFP)'] },
      { title: 'Business Retirement', who: 'Entrepreneurs retiring their business', fees: 'Per Business Tax & Regulatory Fees schedule', requirements: ['Accomplished Application Form', 'Latest Business Permit', 'Latest Business Plate', 'Proof of gross sales/receipts (Financial Statement)', 'Sketch of location'] },
      { title: 'Occupational / Working Permit', who: 'Employees of registered businesses in Teresa', fees: 'Per Occupational/Working Permit fee schedule', requirements: ['Application Form (BPLS)', 'Barangay Working Clearance', 'Community Tax Certificate (Treasury Office)', 'Health Clearance (Health Office)'] },
      { title: 'Certified True Copy of Business / Mayor\u2019s Permit', who: 'Taxpayers', fees: '\u20B150.00 per certified copy', requirements: ['Original Business/Mayor\u2019s Permit', 'Valid ID'] },
      { title: 'Special Permit for Cockfight & Related Activities', who: 'Persons or entities conducting cockfights and related activities', fees: 'Per cockfight fee schedule', requirements: ['Three (3) copies of Request Letter to the Municipal Mayor', 'Sangguniang Bayan Resolution approving the request', 'Latest Business / Mayor\u2019s Permit'] }
    ]
  },
  {
    slug: 'social-welfare',
    name: 'Social Welfare',
    office: 'MSWD (Social Welfare)',
    intro: 'Social welfare services including IDs for senior citizens and PWDs, solo parent support, and crisis assistance.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: 'Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800 loc. 525', email: 'mswd@teresarizal.gov.ph' },
    count: 7,
    href: 'https://teresarizal.gov.ph/services/mswd',
    keywords: ['social', 'welfare', 'senior', 'pwd', 'disability', 'solo parent', 'indigency', 'pension', 'crisis', 'aics', 'assistance'],
    services: [
      { title: 'Senior Citizen ID & Purchase Booklet', who: 'Filipino citizens aged 60 and above residing in the Philippines', fees: 'Free', requirements: ['Completed application form', 'Cedula', '2x2 ID picture (2 pcs for purchase booklet)', '1x1 ID picture (1 pc for ID)', 'Affidavit of Loss from Office of the Mayor (if lost)'] },
      { title: 'PWD ID & Purchase Booklet', who: 'People with disability', fees: 'Free', requirements: ['Completed application form', 'Cedula', '2x2 ID picture (2 pcs)', '1x1 ID picture (1 pc)', 'Medical certificate indicating disability', 'Affidavit of Loss from Office of the Mayor (if lost)'] },
      { title: 'Solo Parent ID', who: 'Individuals qualifying as Solo Parent per RA 8972', fees: 'Free', requirements: ['Application Form of Solo Parent', 'Barangay Certificate of being solo parent with name of children below 18', 'Birth certificate of children below 18', 'Two (2) 1x1 ID pictures', 'Marriage Contract (if any)', 'Death certificate of spouse (if any)', 'Certificate of Employment (if any)'] },
      { title: 'Social Case Study Report', who: 'Individuals and families needing social welfare intervention', fees: 'Free', requirements: ['Referral or request letter', 'Valid ID', 'Supporting documents depending on case'] },
      { title: 'Aid to Individuals in Crisis Situation (AICS)', who: 'Individuals in crisis residing in Teresa', fees: 'Free', requirements: ['Case Study Report (MSWDO)', 'Certificate of Indigency/Residency (Barangay)', 'Valid government-issued ID (photocopy)', 'Medical Certificate / Clinical Abstract (if medical)', 'Outstanding Balance from hospital (if medical)'] },
      { title: 'Municipal Certificate of Indigency', who: 'Indigent residents of Teresa', fees: 'Free', requirements: ['Barangay Certificate of Indigency', 'Valid ID', 'Cedula'] },
      { title: 'Social Pension Program', who: 'Indigent senior citizens aged 60 and above', fees: 'Free', requirements: ['Senior Citizen ID', 'Barangay Certificate of Indigency', 'Valid ID'] }
    ]
  },
  {
    slug: 'agriculture-fisheries',
    name: 'Agriculture & Fisheries',
    office: 'Agriculture Office (OMA)',
    intro: 'Agricultural support services, seed distribution, anti-rabies vaccination, and livestock and farmer assistance.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: 'Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800', email: 'agri@teresarizal.gov.ph' },
    count: 6,
    href: 'https://teresarizal.gov.ph/services/agriculture-office',
    keywords: ['agriculture', 'fisheries', 'farm', 'farmer', 'crop', 'seed', 'rabies', 'vaccination', 'livestock', 'rsbsa', 'fisherfolk'],
    services: [
      { title: 'Distribution of Seeds for Urban Gardening', who: 'All residents', fees: 'Free', requirements: ['None — sign the logbook'] },
      { title: 'Anti-Rabies Vaccination', who: 'Pet owners', fees: 'Free', requirements: ["Pet's vaccine/immunization card (if any)", 'Pet must be 3 months old and above', 'Healthy with no sign of sickness', 'Pet has not bitten anyone in the past month'] },
      { title: 'Certification (Land Production)', who: 'Land owner or authorized representative', fees: '\u20B150.00', requirements: ['Transfer of Certificate of Title (photocopy)', 'Tax Declaration (photocopy)', 'Deed of Sale (if TCT not yet in owner\u2019s name)', 'Special Power of Attorney (if representative)'] },
      { title: 'RSBSA Registration for Farmers & Fisherfolks', who: 'Farmers or fisherfolk aged 18 and above', fees: 'Free', requirements: ['RSBSA Application Form', 'Barangay Certificate', '2x2 ID picture (2 pcs)', 'Photocopy of land title, agreement, or proof of land ownership'] },
      { title: 'Animal Health Consultation & Treatment', who: 'Livestock farmers and pet owners', fees: 'Free', requirements: ['Animal/pet for consultation'] },
      { title: 'Crops & Livestock Insurance / Notice of Loss', who: 'Registered farmers and livestock raisers', fees: 'Free (insurance premium subsidized)', requirements: ['RSBSA Registration', 'Proof of loss (photos, veterinary certificate, etc.)'] }
    ]
  },
  {
    slug: 'infrastructure-public-works',
    name: 'Infrastructure & Public Works',
    office: 'Engineering Office',
    intro: 'Issuance of building permits and occupancy permits for construction in Teresa.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: '1st Floor, New Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800', email: 'engineering@teresarizal.gov.ph' },
    count: 2,
    href: 'https://teresarizal.gov.ph/services/engineering-office',
    keywords: ['infrastructure', 'public works', 'building', 'construction', 'permit', 'occupancy', 'engineering', 'renovation', 'demolition'],
    services: [
      { title: 'Issuance of Building Permit', who: 'Land/building owners or businesses constructing in Teresa', fees: 'Per National Building Code schedule', requirements: ['Locational / Zoning Clearance', 'Fire Department Clearance Certificate', 'Barangay Construction Clearance', 'Architectural, Structural, Plumbing, Electrical & Mechanical Plans', 'Bill of Materials & Estimates', 'Specification', 'TCT, Tax Declaration & Latest Tax Receipt', 'Logbook', 'Signboard (1" x 2")'] },
      { title: 'Issuance of Occupancy Permit', who: 'Owners/applicants occupying a building in Teresa', fees: 'Per National Building Code schedule', requirements: ['Certificate of Completion (duly notarized)', 'Construction Logbook', 'As-built plan (if changes from approved plan)', 'Fire Safety Certificate from BFP'] }
    ]
  },
  {
    slug: 'garbage-waste-disposal',
    name: 'Garbage and Waste Disposal',
    office: 'MENRO · ISWMMRF',
    intro: 'Solid waste management through Teresa\u2019s award-winning Integrated Solid Waste Management Recovery Facility (ISWMMRF) — collection, segregation, and materials recovery.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: 'ISWMMRF, Sitio Pantay, Barangay Dalig; MENRO Office, 2nd Floor, Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800 loc. 501', email: 'menro@teresarizal.gov.ph' },
    count: null,
    href: 'https://teresarizal.gov.ph/services/menro',
    keywords: ['garbage', 'waste', 'trash', 'disposal', 'recycling', 'segregation', 'collection', 'mrf', 'iswmmrf', 'solid waste'],
    services: [
      { title: 'Garbage Collection & Segregation', who: 'All households and establishments', fees: 'Free', requirements: ['Segregate waste at source — biodegradable, recyclable, residual, and special waste', 'Follow the municipal collection schedule'] },
      { title: 'Materials Recovery Facility (MRF) Services', who: 'Residents and recyclers', fees: 'Free', requirements: ['Bring clean, segregated recyclables to the ISWMMRF'] },
      { title: 'Special / Hazardous Waste Disposal', who: 'Households and businesses with special waste', fees: 'Per waste type', requirements: ['Coordinate with MENRO for proper handling and disposal'] }
    ]
  },
  {
    slug: 'environment',
    name: 'Environment',
    office: 'MENRO (Environment)',
    intro: 'Environmental permits, certifications, and natural resources management for establishments that are potential contributors to pollution.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: '2nd Floor, Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800 loc. 501', email: 'menro@teresarizal.gov.ph' },
    count: 1,
    href: 'https://teresarizal.gov.ph/services/menro',
    keywords: ['environment', 'pollution', 'permit', 'ecc', 'llda', 'natural resources', 'emission', 'wastewater'],
    services: [
      { title: 'Environmental Permit Certificate', who: 'Establishments that are potential contributors to pollution (land, water, air)', fees: 'Industrial/Major \u2014 \u20B11,000.00 | Farms/Agro-Industrial \u2014 \u20B1800.00 | Minor/Service Provider \u2014 \u20B1300\u2013400.00', requirements: ['Industrial: Photocopy of ECC, LLDA clearance', 'Farms/Agro-Industrial: Photocopy of ECC, LLDA clearance, Environmental Management Plan (EMP)', 'Minor/Service Provider: Process Flow, ECC and/or CNC, LLDA clearance'] }
    ]
  },
  {
    slug: 'disaster-preparedness',
    name: 'Disaster Preparedness',
    office: 'MDRRMO (Disaster Risk Reduction & Management Office)',
    intro: 'Disaster risk reduction, emergency response, and resilience programs. The MDRRMO operates a 24/7 emergency center for the Municipality of Teresa.',
    schedule: '24/7 Operations Center',
    location: 'Municipal Hall, Corazon C. Aquino Ave., Poblacion, Teresa, Rizal',
    contact: { phone: '0945-113-7077', email: 'mdrrmo@teresarizal.gov.ph' },
    count: null,
    href: 'https://teresarizal.gov.ph/services',
    keywords: ['disaster', 'emergency', 'calamity', 'rescue', 'flood', 'landslide', 'typhoon', 'evacuation', 'mdrrmo', 'preparedness'],
    services: [
      { title: 'Emergency Response & Rescue', who: 'All residents of Teresa', fees: 'Free', requirements: ['Call the 24/7 hotline 0945-113-7077'] },
      { title: 'Early Warning & Monitoring', who: 'All residents', fees: 'Free', requirements: ['Weather, flood, and landslide monitoring — advisories released through official LGU channels'] },
      { title: 'Evacuation Center Management', who: 'Displaced families', fees: 'Free', requirements: ['Register at the designated evacuation center'] },
      { title: 'Disaster Preparedness & IEC Training', who: 'Barangays, schools, and organizations', fees: 'Free', requirements: ['Coordination/request with the MDRRMO'] },
      { title: 'Calamity Assistance', who: 'Residents affected by disasters', fees: 'Free', requirements: ['Valid ID', 'Barangay certificate', 'Damage assessment by MDRRMO'] }
    ]
  },
  {
    slug: 'housing-land-use',
    name: 'Housing & Land Use',
    office: 'MPDO (Planning & Development)',
    intro: 'Municipal planning, land use, data and statistics, and provision of development plans, including zoning clearances required before construction and business permits.',
    schedule: 'Monday – Friday, 8:00 AM – 5:00 PM (No Noon Break)',
    location: '2nd Floor, New Teresa Municipal Building',
    contact: { phone: '(02) 8250-6800', email: 'mpdo@teresarizal.gov.ph' },
    count: 2,
    href: 'https://teresarizal.gov.ph/services/mpdo',
    keywords: ['housing', 'land use', 'zoning', 'planning', 'clup', 'data', 'statistics', 'locational', 'development', 'maps'],
    services: [
      { title: 'Locational / Zoning Clearance', who: 'Land/building owners and businesses', fees: 'Per zoning clearance fee schedule', requirements: ['Application Form', 'TCT / Tax Declaration', 'Sketch plan of the lot', 'Required before Building Permits and Business Permits'] },
      { title: 'Data & Statistics (Socio-Economic Profile)', who: 'Students, researchers, agencies, and the general public', fees: 'Per data request schedule', requirements: ['Letter/Request (with full name, address, contact, email)', 'Valid government-issued ID (photocopy)', 'Authorization (if juridical entity)'] },
      { title: 'Provision of Plans (CLUP, CDP)', who: 'Individuals and entities for official/legal purposes', fees: '\u20B1200.00 per page', requirements: ['Letter/Request (with full name, address, contact, email)', 'Valid government-issued ID (photocopy)', 'Authorization (if juridical entity)'] }
    ]
  }
];

export const findService = (slug) => serviceCategories.find(c => c.slug === slug);

export const searchServices = (q) => {
  const s = q.toLowerCase().trim();
  if (!s) return null;
  return serviceCategories.find(c =>
    c.name.toLowerCase().includes(s) ||
    c.office.toLowerCase().includes(s) ||
    c.slug.includes(s) ||
    c.keywords.some(k => k.includes(s) || s.includes(k))
  );
};