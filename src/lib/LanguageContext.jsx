import React, { createContext, useContext, useState, useCallback } from 'react';

const dict = {
  en: {
    'nav.utility': 'Join the CivicTech Revolution — Help shape the future of Teresa through technology.',
    'nav.home': 'Home', 'nav.services': 'Services', 'nav.government': 'Government', 'nav.statistics': 'Statistics', 'nav.tourism': 'Tourism', 'nav.transparency': 'Transparency', 'nav.contact': 'Contact',
    'nav.browse': 'Browse Services',
    'hero.badge': 'Teresa, Province of Rizal',
    'hero.title': 'Welcome to Better Teresa',
    'hero.subtitle': 'A volunteer-run portal for the Municipality of Teresa. Find information, access government services, and stay updated on the latest public records — all linked to verified sources.',
    'hero.searchPlaceholder': 'Search a service — e.g. business permit, health, senior ID...',
    'hero.search': 'Search',
    'qa.eyebrow': 'Quick Access', 'qa.title': 'The most frequently needed', 'qa.viewAll': 'View All Services',
    'sv.eyebrow': 'Government Services', 'sv.title': 'Municipal Services',
    'sv.desc': 'Browse all offices and services offered by the Municipal Government of Teresa. Select a category to view details, then open the full service page for requirements and fees.',
    'sv.menuLabel': 'Services', 'sv.location': 'Location:', 'sv.schedule': 'Schedule:', 'sv.servicesCount': 'services available', 'sv.viewFull': 'View Full Details', 'sv.officialPortal': 'Official Portal',
    'gl.eyebrow': 'Teresa at a Glance', 'gl.title': 'A first-class municipality in Rizal', 'gl.hall': 'Teresa Municipal Hall',
    'hi.eyebrow': 'History of Teresa', 'hi.title': 'From a small settlement to a modern town', 'hi.more': 'Show More', 'hi.less': 'Show Less',
    'gv.eyebrow': 'Local Government', 'gv.title': 'Officials of Teresa', 'gv.sb': 'Sangguniang Bayan', 'gv.exOfficio': 'Ex Officio',
    'tr.eyebrow': 'Transparency', 'tr.title': 'Public records', 'tr.search': 'Search records...',
    'tr.none': 'No matching records. Search the full archive for all 104 documents.', 'tr.openAll': 'Open all 104 public records',
    'fb.eyebrow': 'Latest Updates', 'fb.title': 'Real-time updates', 'fb.desc': 'Follow the official LGU Teresa Rizal Facebook page for announcements, advisories, and events.',
    'fb.followers': 'Official Facebook Page · 30K+ followers', 'fb.follow': 'Follow Page',
    'ct.eyebrow': 'Contact & Hotlines', 'ct.hall': 'Municipal Hall', 'ct.urgent': 'For urgent local assistance and municipal service concerns.',
    'ct.pnp': 'PNP (Teresa)', 'ct.bfp': 'Bureau of Fire (BFP)', 'ct.mdrrmo': 'Disaster Risk (MDRRMO)', 'ct.directory': 'Office Directory',
    'tm.eyebrow': 'Tourism', 'tm.title': 'Tourism Spots in Teresa', 'tm.spotsTitle': 'Browse by Category', 'tm.mapCredit': 'Source: Tourism Office & MPDO, Municipality of Teresa · Google Earth (March 2023)', 'tm.catChurch': 'Church', 'tm.catFood': 'Food and Drink', 'tm.catIndustrial': 'Minor Industrial', 'tm.catParks': 'Parks and Recreational', 'tm.catResort': 'Private Resort', 'tm.catRental': 'Rental Business', 'tm.catOthers': 'Others',
    'tm.desc': 'Teresa offers a growing mix of heritage faith sites, local dining, private resorts, and recreational spots. Explore the official Tourism Office locator map below, then browse establishments by category.',
    'wt.title': 'Weather in Teresa', 'wt.feels': 'Feels like', 'wt.humidity': 'Humidity', 'wt.wind': 'Wind', 'wt.updated': 'Updated just now', 'wt.loading': 'Loading weather...', 'wt.failed': 'Weather unavailable',
    'wt.clear': 'Clear sky', 'wt.mainlyClear': 'Mainly clear', 'wt.partlyCloudy': 'Partly cloudy', 'wt.overcast': 'Overcast', 'wt.fog': 'Fog', 'wt.drizzle': 'Light drizzle', 'wt.rain': 'Rain', 'wt.heavyRain': 'Heavy rain', 'wt.thunderstorm': 'Thunderstorm',
    'ft.tagline': 'A volunteer-run community portal for the Municipality of Teresa, Province of Rizal.',
    'ft.explore': 'Explore', 'ft.sources': 'Official Sources', 'ft.national': 'National Data Sources', 'ft.opensource': 'Open Source',
    'ft.osDesc': 'This portal is open source. Contribute, report issues, or fork the project on GitHub.',
    'ft.rights': 'Better Teresa · Independent public-interest interface',
    'ft.sourceLine': 'Open source on GitHub · github.com/MewSeiren/betterteresa.org · Sources: Municipality of Teresa · COA · DBM',
    'sd.allServices': 'All Services', 'sd.schedule': 'Working Schedule', 'sd.location': 'Location', 'sd.contact': 'Contact',
    'sd.available': 'Available Services', 'sd.who': 'Who may avail:', 'sd.requirements': 'Requirements',
    'sd.note': 'Information compiled from the official Municipality of Teresa portal and kept updated for this community portal. Always confirm current fees and requirements with the office before applying.',
    'sd.verify': 'Verify on official portal', 'sd.notFound': 'Service not found', 'sd.notFoundDesc': "The service you're looking for doesn't exist.", 'sd.back': 'Back to all services'
  },
  fil: {
    'nav.utility': 'Sumali sa CivicTech Revolution — Tumulong sa pag-unlad ng Teresa gamit ang teknolohiya.',
    'nav.home': 'Home', 'nav.services': 'Mga Serbisyo', 'nav.government': 'Gobyerno', 'nav.statistics': 'Estadistika', 'nav.tourism': 'Turismo', 'nav.transparency': 'Transparency', 'nav.contact': 'Kontak',
    'nav.browse': 'Tignan ang Serbisyo',
    'hero.badge': 'Teresa, Lalawigan ng Rizal',
    'hero.title': 'Mabuhay sa Better Teresa',
    'hero.subtitle': 'Isang volunteer-run na portal para sa Munisipalidad ng Teresa. Maghanap ng impormasyon, i-access ang mga serbisyong pansibiko, at manatiling updated sa mga pinakabagong public records — lahat mula sa mga beripikadong source.',
    'hero.searchPlaceholder': 'Maghanap ng serbisyo — hal. business permit, health, senior ID...',
    'hero.search': 'Hanapin',
    'qa.eyebrow': 'Mabilisang Akses', 'qa.title': 'Pinaka-kailangan', 'qa.viewAll': 'Lahat ng Serbisyo',
    'sv.eyebrow': 'Mga Serbisyong Pansibiko', 'sv.title': 'Mga Serbisyong Municipal',
    'sv.desc': 'Tignan ang lahat ng opisina at serbisyo ng Municipal Government of Teresa. Pumili ng kategorya para sa detalye, at buksan ang buong pahina para sa mga requirement at fees.',
    'sv.menuLabel': 'Mga Serbisyo', 'sv.location': 'Lokasyon:', 'sv.schedule': 'Oras:', 'sv.servicesCount': 'serbisyong available', 'sv.viewFull': 'Tignan ang Buong Detalye', 'sv.officialPortal': 'Opisyal na Portal',
    'gl.eyebrow': 'Teresa sa Isang Sulyap', 'gl.title': 'Isang first-class na munisipalidad sa Rizal', 'gl.hall': 'Teresa Municipal Hall',
    'hi.eyebrow': 'Kasaysayan ng Teresa', 'hi.title': 'Mula maliit na pamayanan patungong modernong bayan', 'hi.more': 'Ipakita ang Iba', 'hi.less': 'Itago ang Iba',
    'gv.eyebrow': 'Lokal na Gobyerno', 'gv.title': 'Mga Opisyal ng Teresa', 'gv.sb': 'Sangguniang Bayan', 'gv.exOfficio': 'Ex Officio',
    'tr.eyebrow': 'Transparency', 'tr.title': 'Mga pampublikong tala', 'tr.search': 'Maghanap ng tala...',
    'tr.none': 'Walang tumugma. Hanapin sa buong archive para sa 104 na dokumento.', 'tr.openAll': 'Buksan ang 104 na pampublikong tala',
    'fb.eyebrow': 'Mga Pinakabagong Update', 'fb.title': 'Real-time na update', 'fb.desc': 'Sundan ang opisyal na Facebook page ng LGU Teresa Rizal para sa mga anunsyo, advisory, at event.',
    'fb.followers': 'Opisyal na Facebook Page · 30K+ followers', 'fb.follow': 'Sundan ang Page',
    'ct.eyebrow': 'Kontak at Hotlines', 'ct.hall': 'Municipal Hall', 'ct.urgent': 'Para sa urgenteng lokal na tulong at mga serbisyong municipal.',
    'ct.pnp': 'PNP (Teresa)', 'ct.bfp': 'Bureau of Fire (BFP)', 'ct.mdrrmo': 'Disaster Risk (MDRRMO)', 'ct.directory': 'Direktoryo ng Opisina',
    'tm.eyebrow': 'Turismo', 'tm.title': 'Mga Tourism Spot sa Teresa', 'tm.spotsTitle': 'Tignan ayon sa Kategorya', 'tm.mapCredit': 'Source: Tourism Office & MPDO, Munisipalidad ng Teresa · Google Earth (March 2023)', 'tm.catChurch': 'Simbahan', 'tm.catFood': 'Pagkain at Inumin', 'tm.catIndustrial': 'Minor Industrial', 'tm.catParks': 'Parks at Recreational', 'tm.catResort': 'Pribadong Resort', 'tm.catRental': 'Rental Business', 'tm.catOthers': 'Iba Pa',
    'tm.desc': 'Magkakahalo ng heritage faith sites, local na kainan, pribadong resort, at recreational spots ang Teresa. Tignan ang opisyal na locator map ng Tourism Office sa ibaba, at tuklasin ang mga establishment ayon sa kategorya.',
    'wt.title': 'Panahon sa Teresa', 'wt.feels': 'Parang', 'wt.humidity': 'Humidity', 'wt.wind': 'Hangin', 'wt.updated': 'Na-update ngayon', 'wt.loading': 'Naglo-load ng panahon...', 'wt.failed': 'Hindi available ang panahon',
    'wt.clear': 'Maaliwalaw', 'wt.mainlyClear': 'Halos maaliwalaw', 'wt.partlyCloudy': 'Bahagyang makaulap', 'wt.overcast': 'Makaulap', 'wt.fog': 'Ulap', 'wt.drizzle': 'Ulan-ulan', 'wt.rain': 'Ulan', 'wt.heavyRain': 'Malakas na ulan', 'wt.thunderstorm': 'Kidlat at kulog',
    'ft.tagline': 'Isang volunteer-run na community portal para sa Munisipalidad ng Teresa, Lalawigan ng Rizal.',
    'ft.explore': 'Tuklasin', 'ft.sources': 'Mga Opisyal na Source', 'ft.national': 'Mga Pambansang Source ng Data', 'ft.opensource': 'Open Source',
    'ft.osDesc': 'Open source ang portal na ito. Mag-contribute, mag-report ng issue, o i-fork ang proyekto sa GitHub.',
    'ft.rights': 'Better Teresa · Independent public-interest interface',
    'ft.sourceLine': 'Open source sa GitHub · github.com/MewSeiren/betterteresa.org · Sources: Municipality of Teresa · COA · DBM',
    'sd.allServices': 'Lahat ng Serbisyo', 'sd.schedule': 'Oras ng Opisina', 'sd.location': 'Lokasyon', 'sd.contact': 'Kontak',
    'sd.available': 'Mga Available na Serbisyo', 'sd.who': 'Sino pwedeng umavail:', 'sd.requirements': 'Mga Requirement',
    'sd.note': 'Ang impormasyon ay nakuha sa opisyal na portal ng Munisipalidad ng Teresa at patuloy na ina-update. Laging tinitiyak ang kasalukuyang fees at requirements sa opisina bago mag-apply.',
    'sd.verify': 'Beripikahin sa opisyal na portal', 'sd.notFound': 'Hindi nahanap ang serbisyo', 'sd.notFoundDesc': 'Ang serbisyong hinahanap mo ay hindi umiiral.', 'sd.back': 'Bumalik sa lahat ng serbisyo'
  }
};

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = useCallback((k) => dict[lang][k] ?? dict.en[k] ?? k, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() { return useContext(LanguageContext); }