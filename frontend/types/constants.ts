import { CategoryInfo, UserProfile, Achievement, PassportData } from '.';
import { CloudIcon, FireIcon, MusicNoteIcon, GlobeIcon, MoonIcon, HeartIcon } from '../components/Icons';

// Radio browser API mirrors
// Radio browser API mirrors - using central round-robin endpoint
export const RADIO_BROWSER_MIRRORS = [
    'https://all.api.radio-browser.info'
];

export const DEFAULT_VOLUME = 0.5;

export const GENRES: CategoryInfo[] = [
    { id: 'jazz', name: 'Jazz', color: 'from-amber-600 to-orange-900', description: 'Smooth, soulful improvisation.' },
    { id: 'blues', name: 'Blues', color: 'from-indigo-600 to-purple-900', description: 'Deep emotions, raw vocals.' },
    { id: 'rock', name: 'Rock', color: 'from-red-600 to-pink-900', description: 'Guitars, drums, energy.' },
    { id: 'classical', name: 'Classical', color: 'from-violet-600 to-indigo-900', description: 'Timeless symphonies, orchestral masterpieces.' },
    { id: 'electronic', name: 'Electronic', color: 'from-cyan-600 to-blue-900', description: 'Synthesized beats, futuristic rhythms.' },
    { id: 'hiphop', name: 'Hip Hop', color: 'from-yellow-600 to-amber-900', description: 'Rhythm, flow, storytelling.' },
    { id: 'pop', name: 'Pop', color: 'from-pink-600 to-rose-900', description: 'Catchy melodies, modern hits.' },
    { id: 'rnb', name: 'R&B', color: 'from-violet-500 to-fuchsia-600', description: 'Rhythm and Blues, soulful and smooth.' },
    { id: 'reggae', name: 'Reggae', color: 'from-green-500 to-yellow-500', description: 'Relaxed Jamaican rhythms and vibes.' },
    { id: 'soul', name: 'Soul', color: 'from-rose-400 to-orange-400', description: 'Deeply emotional vocal music.' },
    { id: 'world', name: 'World', color: 'from-emerald-600 to-teal-900', description: 'Global rhythms and traditional folk.' }
];

export const ERAS: CategoryInfo[] = [
    { id: '60s', name: '60s', color: 'from-yellow-300 to-orange-500', description: 'The era of peace, love, and rock & roll.' },
    { id: '70s', name: '70s', color: 'from-orange-500 to-red-600', description: 'Disco, funk, and the rise of stadium rock.' },
    { id: '80s', name: '80s', color: 'from-fuchsia-500 to-indigo-600', description: 'Synth-pop, big hair, and MTV classics.' },
    { id: '90s', name: '90s', color: 'from-teal-400 to-blue-500', description: 'Grunge, rave culture, and the golden age of R&B.' },
    { id: '00s', name: '00s', color: 'from-slate-400 to-slate-600', description: 'The digital revolution and fusion genres.' },
    { id: '10s', name: '10s', color: 'from-blue-600 to-indigo-700', description: 'Streaming era, EDM boom, and modern pop.' },
    { id: '20s', name: '20s', color: 'from-purple-600 to-pink-700', description: 'Contemporary hits and the latest trends.' }
];

export const MOODS: CategoryInfo[] = [
    { id: 'chill', name: 'Chill', type: 'mood', color: 'from-blue-400 to-indigo-500', description: 'Relaxing tunes for a peaceful mind.' },
    { id: 'energy', name: 'Energy', type: 'mood', color: 'from-yellow-400 to-orange-500', description: 'Upbeat tracks to get you moving.' },
    { id: 'romantic', name: 'Romantic', type: 'mood', color: 'from-rose-400 to-pink-600', description: 'Melodies for special moments.' },
    { id: 'love', name: 'Love Songs', type: 'mood', color: 'from-pink-500 to-red-500', description: 'The greatest love stories in music.' },
    { id: 'slow', name: 'Slow & Soft', type: 'mood', color: 'from-indigo-400 to-slate-600', description: 'Gentle melodies and calm vocals.' },
    { id: 'dark', name: 'Club', type: 'mood', color: 'from-slate-800 to-black', description: 'Powerful beats for club enthusiasts.' },
    // World Music
    { id: 'vietnamese', name: 'Vietnamese', type: 'mood', color: 'from-red-500 to-yellow-500', description: 'Music from Vietnam.' },
    { id: 'japanese', name: 'Japanese', type: 'mood', color: 'from-red-400 to-pink-400', description: 'Music from Japan.' },
    { id: 'russian', name: 'Russian', type: 'mood', color: 'from-blue-600 to-red-600', description: 'Music from Russia.' },
    { id: 'spanish', name: 'Spanish', type: 'mood', color: 'from-yellow-400 to-red-500', description: 'Music from Spain.' },
    { id: 'italian', name: 'Italian', type: 'mood', color: 'from-green-500 to-red-500', description: 'Music from Italy.' },
    { id: 'french', name: 'French', type: 'mood', color: 'from-blue-500 to-red-500', description: 'Music from France.' },
    { id: 'kazakh', name: 'Kazakh', type: 'mood', color: 'from-cyan-400 to-yellow-300', description: 'Music from Kazakhstan.' },
    { id: 'kyrgyz', name: 'Kyrgyz', type: 'mood', color: 'from-red-500 to-yellow-400', description: 'Music from Kyrgyzstan.' },
    { id: 'oriental', name: 'Eastern', type: 'mood', color: 'from-amber-500 to-orange-600', description: 'Oriental rhythms.' },
    { id: 'chinese', name: 'Chinese', type: 'mood', color: 'from-red-600 to-yellow-400', description: 'Music from China.' },
];

export const EFFECTS: CategoryInfo[] = [
    { id: 'nature', name: 'Nature', type: 'effect', color: 'from-green-400 to-emerald-600', description: 'Pure sounds of the wild.' },
    { id: 'rain', name: 'Rain', type: 'effect', color: 'from-blue-400 to-slate-600', description: 'Soothing rain and storms.' },
    { id: 'ocean', name: 'Ocean', type: 'effect', color: 'from-cyan-400 to-blue-600', description: 'Waves and sea breeze.' },
    { id: 'forest', name: 'Forest', type: 'effect', color: 'from-emerald-600 to-green-800', description: 'Woodland ambience.' },
    { id: 'storm', name: 'Storm', type: 'effect', color: 'from-slate-600 to-purple-900', description: 'Thunder and heavy rain.' },
];

// Blocked countries - not allowed to access chat (all countries NOT in COUNTRIES_DATA are blocked)
export const BLOCKED_COUNTRIES = [
  'North Korea', 'DPRK', 'Democratic People\'s Republic of Korea',
  // Countries explicitly blocked regardless of the allowed list
  'Afghanistan', 'Syria', 'Iran', 'Iraq', 'Yemen',
  // Central African countries
  'Central African Republic', 'Chad', 'Cameroon', 'Republic of the Congo', 'Democratic Republic of the Congo',
  'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe',
  'Burundi', 'Rwanda', 'Uganda', 'South Sudan', 'Sudan',
  'Eritrea', 'Djibouti', 'Somalia',
  'Mali', 'Niger', 'Burkina Faso', 'Mauritania',
  'Liberia', 'Sierra Leone', 'Guinea', 'Guinea-Bissau',
  'Nigeria', 'Kenya', 'Ethiopia', 'Ghana',
  // Pacific Islands
  'Tuvalu', 'Nauru', 'Palau', 'Marshall Islands', 'Micronesia', 
  'Kiribati', 'Tonga', 'Samoa', 'Vanuatu', 'Solomon Islands',
  'Fiji', 'Papua New Guinea',
  // Other blocked regions
  'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
  'Colombia', 'Ecuador', 'Peru', 'Bolivia', 'Paraguay', 'Argentina', 'Uruguay',
  'Mexico', 'Jamaica', 'Trinidad and Tobago', 'Dominican Republic',
  'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Bhutan', 'Myanmar',
  'Indonesia', 'Philippines',
  'Algeria', 'Tunisia', 'Libya', 'Egypt',
];

// Map country names from various languages to standard English names used in COUNTRIES_DATA
// This helps match geolocation API responses (which may be in Russian or local language)
export const COUNTRY_NAME_ALIASES: Record<string, string> = {
  // Kazakhstan
  'казахстан': 'Kazakhstan',
  'қазақстан': 'Kazakhstan',
  'kz': 'Kazakhstan',
  
  // Russia
  'россия': 'Russia',
  'российская федерация': 'Russia',
  'russian federation': 'Russia',
  'ru': 'Russia',
  
  // Ukraine
  'украина': 'Ukraine',
  'україна': 'Ukraine',
  'ua': 'Ukraine',
  
  // Belarus
  'беларусь': 'Belarus',
  'белоруссия': 'Belarus',
  'беларусія': 'Belarus',
  'by': 'Belarus',
  
  // Uzbekistan
  'узбекистан': 'Uzbekistan',
  'oʻzbekiston': 'Uzbekistan',
  'uz': 'Uzbekistan',
  
  // Kyrgyzstan
  'кыргызстан': 'Kyrgyzstan',
  'киргизия': 'Kyrgyzstan',
  'кыргызстан республикасы': 'Kyrgyzstan',
  'kg': 'Kyrgyzstan',
  
  // Turkmenistan
  'туркменистан': 'Turkmenistan',
  'türkmenistan': 'Turkmenistan',
  'tm': 'Turkmenistan',
  
  // Azerbaijan
  'азербайджан': 'Azerbaijan',
  'azərbaycan': 'Azerbaijan',
  'az': 'Azerbaijan',
  
  // Armenia
  'армения': 'Armenia',
  'հայdelays': 'Armenia',
  'am': 'Armenia',
  
  // Georgia
  'грузия': 'Georgia',
  'საქართველო': 'Georgia',
  'ge': 'Georgia',
  
  // Mongolia
  'монголия': 'Mongolia',
  'монгол улс': 'Mongolia',
  'mn': 'Mongolia',
  
  // Turkey
  'турция': 'Turkey',
  'türkiye': 'Turkey',
  'tr': 'Turkey',
  
  // Germany
  'германия': 'Germany',
  'deutschland': 'Germany',
  'de': 'Germany',
  
  // France
  'франция': 'France',
  'fr': 'France',
  
  // Italy
  'италия': 'Italy',
  'italia': 'Italy',
  'it': 'Italy',
  
  // Spain
  'испания': 'Spain',
  'españa': 'Spain',
  'es': 'Spain',
  
  // Poland
  'польша': 'Poland',
  'polska': 'Poland',
  'pl': 'Poland',
  
  // United Kingdom
  'великобритания': 'United Kingdom',
  'соединённое королевство': 'United Kingdom',
  'united kingdom': 'United Kingdom',
  'uk': 'United Kingdom',
  'england': 'United Kingdom',
  'великобританія': 'United Kingdom',
  'gb': 'United Kingdom',
  
  // United States
  'сша': 'United States',
  'соединённые штаты америки': 'United States',
  'united states': 'United States',
  'united states of america': 'United States',
  'usa': 'United States',
  'us': 'United States',
  
  // China
  'китай': 'China',
  '中国': 'China',
  'cn': 'China',
  
  // Japan
  'япония': 'Japan',
  '日本': 'Japan',
  'jp': 'Japan',
  
  // South Korea
  'южная корея': 'South Korea',
  '한국': 'South Korea',
  'republic of korea': 'South Korea',
  'kr': 'South Korea',
  
  // Israel
  'израиль': 'Israel',
  'ישראל': 'Israel',
  'il': 'Israel',
  
  // United Arab Emirates
  'оаэ': 'United Arab Emirates',
  'объединённые арабские эмираты': 'United Arab Emirates',
  'united arab emirates': 'United Arab Emirates',
  'uae': 'United Arab Emirates',
  'ae': 'United Arab Emirates',
  
  // Thailand
  'таиланд': 'Thailand',
  'ประเทศไทย': 'Thailand',
  'th': 'Thailand',
  
  // Czech Republic
  'чехия': 'Czech Republic',
  'česko': 'Czech Republic',
  'czech': 'Czech Republic',
  'czechia': 'Czech Republic',
  'cz': 'Czech Republic',
  
  // Austria
  'австрия': 'Austria',
  'österreich': 'Austria',
  'at': 'Austria',
  
  // Netherlands
  'нидерланды': 'Netherlands',
  'голландия': 'Netherlands',
  'nederland': 'Netherlands',
  'nl': 'Netherlands',
  
  // Belgium
  'бельгия': 'Belgium',
  'belgië': 'Belgium',
  'belgique': 'Belgium',
  'be': 'Belgium',
  
  // Sweden
  'швеция': 'Sweden',
  'sverige': 'Sweden',
  'se': 'Sweden',
  
  // Norway
  'норвегия': 'Norway',
  'norge': 'Norway',
  'no': 'Norway',
  
  // Finland
  'финляндия': 'Finland',
  'suomi': 'Finland',
  'fi': 'Finland',
  
  // Denmark
  'дания': 'Denmark',
  'danmark': 'Denmark',
  'dk': 'Denmark',
  
  // Portugal
  'португалия': 'Portugal',
  'pt': 'Portugal',
  
  // Greece
  'греция': 'Greece',
  'ελλάδα': 'Greece',
  'gr': 'Greece',
  
  // Hungary
  'венгрия': 'Hungary',
  'magyarország': 'Hungary',
  'hu': 'Hungary',
  
  // Romania
  'румыния': 'Romania',
  'românia': 'Romania',
  'ro': 'Romania',
  
  // Bulgaria
  'болгария': 'Bulgaria',
  'българия': 'Bulgaria',
  'bg': 'Bulgaria',
  
  // Serbia
  'сербия': 'Serbia',
  'србија': 'Serbia',
  'rs': 'Serbia',
  
  // Croatia
  'хорватия': 'Croatia',
  'hrvatska': 'Croatia',
  'hr': 'Croatia',
  
  // Slovakia
  'словакия': 'Slovakia',
  'slovensko': 'Slovakia',
  'sk': 'Slovakia',
  
  // Slovenia
  'словения': 'Slovenia',
  'slovenija': 'Slovenia',
  'si': 'Slovenia',
  
  // Switzerland
  'швейцария': 'Switzerland',
  'schweiz': 'Switzerland',
  'suisse': 'Switzerland',
  'ch': 'Switzerland',
  
  // Canada
  'канада': 'Canada',
  'ca': 'Canada',
  
  // Australia
  'австралия': 'Australia',
  'au': 'Australia',
  
  // New Zealand
  'новая зеландия': 'New Zealand',
  'nz': 'New Zealand',
  
  // Singapore
  'сингапур': 'Singapore',
  'sg': 'Singapore',
  
  // Malaysia
  'малайзия': 'Malaysia',
  'my': 'Malaysia',
  
  // Vietnam
  'вьетнам': 'Vietnam',
  'việt nam': 'Vietnam',
  'vn': 'Vietnam',
  
  // Saudi Arabia
  'саудовская аравия': 'Saudi Arabia',
  'sa': 'Saudi Arabia',
  
  // Qatar
  'катар': 'Qatar',
  'qa': 'Qatar',
  
  // Ireland
  'ирландия': 'Ireland',
  'éire': 'Ireland',
  'ie': 'Ireland',
  
  // Lithuania
  'литва': 'Lithuania',
  'lietuva': 'Lithuania',
  'lt': 'Lithuania',
  
  // Latvia
  'латвия': 'Latvia',
  'latvija': 'Latvia',
  'lv': 'Latvia',
  
  // Estonia
  'эстония': 'Estonia',
  'eesti': 'Estonia',
  'ee': 'Estonia',
  
  // Cyprus
  'кипр': 'Cyprus',
  'κύπρος': 'Cyprus',
  'cy': 'Cyprus',
  
  // Malta
  'мальта': 'Malta',
  'mt': 'Malta',
  
  // Luxembourg
  'люксембург': 'Luxembourg',
  'lu': 'Luxembourg',
  
  // Iceland
  'исландия': 'Iceland',
  'ísland': 'Iceland',
  'is': 'Iceland',
  
  // Maldives
  'мальдивы': 'Maldives',
  'mv': 'Maldives',
  
  // Cambodia
  'камбоджа': 'Cambodia',
  'kh': 'Cambodia',
  
  // Laos
  'лаос': 'Laos',
  'la': 'Laos',
  
  // Taiwan
  'тайвань': 'Taiwan',
  '台灣': 'Taiwan',
  'tw': 'Taiwan',
  
  // Moldova
  'молдова': 'Moldova',
  'молдавия': 'Moldova',
  'md': 'Moldova',
  
  // Brazil
  'бразилия': 'Brazil',
  'brasil': 'Brazil',
  'br': 'Brazil',
};

// Helper function to normalize country names
export function normalizeCountryName(name: string): string {
  if (!name) return 'Unknown';
  
  const lowercaseName = name.toLowerCase().trim();
  
  // Check if it's in our aliases
  if (COUNTRY_NAME_ALIASES[lowercaseName]) {
    return COUNTRY_NAME_ALIASES[lowercaseName];
  }
  
  // Check if it directly matches any country in COUNTRIES_DATA (case-insensitive)
  const directMatch = COUNTRIES_DATA.find(c => 
    c.name.toLowerCase() === lowercaseName
  );
  if (directMatch) {
    return directMatch.name;
  }
  
  // Return original name capitalized if no match found
  return name;
}

export const COUNTRIES_DATA = [
  // Europe (EU + approved)
  { name: 'Austria', lat: 47.51, lon: 14.55, cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'] },
  { name: 'Belgium', lat: 50.50, lon: 4.46, cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'] },
  { name: 'Bulgaria', lat: 42.73, lon: 25.48, cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'] },
  { name: 'Croatia', lat: 45.10, lon: 15.20, cities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'] },
  { name: 'Cyprus', lat: 35.12, lon: 33.42, cities: ['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos'] },
  { name: 'Czech Republic', lat: 49.81, lon: 15.47, cities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'] },
  { name: 'Denmark', lat: 56.26, lon: 9.50, cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'] },
  { name: 'Estonia', lat: 58.59, lon: 25.01, cities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'] },
  { name: 'Finland', lat: 61.92, lon: 25.74, cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu'] },
  { name: 'France', lat: 46.22, lon: 2.21, cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'] },
  { name: 'Germany', lat: 51.16, lon: 10.45, cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'] },
  { name: 'Greece', lat: 39.07, lon: 21.82, cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'] },
  { name: 'Hungary', lat: 47.16, lon: 19.50, cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'] },
  { name: 'Ireland', lat: 53.14, lon: -7.69, cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'] },
  { name: 'Italy', lat: 41.87, lon: 12.56, cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence'] },
  { name: 'Latvia', lat: 56.87, lon: 24.60, cities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'] },
  { name: 'Lithuania', lat: 55.16, lon: 23.88, cities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'] },
  { name: 'Luxembourg', lat: 49.81, lon: 6.12, cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange'] },
  { name: 'Malta', lat: 35.93, lon: 14.37, cities: ['Valletta', 'Birkirkara', 'Qormi', 'Sliema', 'Mosta'] },
  { name: 'Netherlands', lat: 52.13, lon: 5.29, cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'] },
  { name: 'North Macedonia', lat: 41.51, lon: 21.74, cities: ['Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo'] },
  { name: 'Norway', lat: 60.47, lon: 8.46, cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'] },
  { name: 'Poland', lat: 51.91, lon: 19.14, cities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin'] },
  { name: 'Portugal', lat: 39.39, lon: -8.22, cities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'] },
  { name: 'Romania', lat: 45.94, lon: 24.96, cities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'] },
  { name: 'Serbia', lat: 44.01, lon: 21.00, cities: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica'] },
  { name: 'Slovakia', lat: 48.66, lon: 19.69, cities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica'] },
  { name: 'Slovenia', lat: 46.15, lon: 14.99, cities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper'] },
  { name: 'Spain', lat: 40.46, lon: -3.74, cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'] },
  { name: 'Sweden', lat: 60.12, lon: 18.64, cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'] },
  { name: 'Switzerland', lat: 46.81, lon: 8.22, cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern'] },
  
  // Non-EU Europe (approved)
  { name: 'Armenia', lat: 40.06, lon: 45.03, cities: ['Yerevan', 'Gyumri', 'Vanadzor', 'Hrazdan', 'Abovyan'] },
  { name: 'Azerbaijan', lat: 40.14, lon: 47.57, cities: ['Baku', 'Ganja', 'Sumgait', 'Mingachevir', 'Lankaran'] },
  { name: 'Georgia', lat: 42.31, lon: 43.35, cities: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi'] },
  { name: 'Russia', lat: 61.52, lon: 105.31, cities: ['Moscow', 'Saint Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg', 'Chelyabinsk', 'Samara', 'Krasnodar'] },
  { name: 'Turkey', lat: 38.96, lon: 35.24, cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep'] },
  { name: 'Ukraine', lat: 48.37, lon: 31.16, cities: ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Lviv', 'Zaporizhzhia', 'Kryvyi Rih'] },
  { name: 'United Kingdom', lat: 55.37, lon: -3.43, cities: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Manchester', 'Leeds', 'Bristol', 'Edinburgh'] },
  
  // CIS / Central Asia (approved)
  { name: 'Kazakhstan', lat: 48.01, lon: 66.92, cities: ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe', 'Taraz', 'Pavlodar', 'Ust-Kamenogorsk', 'Semey', 'Atyrau'] },
  { name: 'Kyrgyzstan', lat: 41.20, lon: 74.76, cities: ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol', 'Naryn', 'Tokmok'] },
  { name: 'Mongolia', lat: 46.86, lon: 103.84, cities: ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Choibalsan'] },
  { name: 'Turkmenistan', lat: 38.96, lon: 59.55, cities: ['Ashgabat', 'Türkmenabat', 'Daşoguz', 'Mary', 'Balkanabat'] },
  { name: 'Uzbekistan', lat: 41.37, lon: 64.58, cities: ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana'] },
  
  // Asia (approved)
  { name: 'Cambodia', lat: 12.56, lon: 104.99, cities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville'] },
  { name: 'China', lat: 35.86, lon: 104.19, cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan', 'Xi\'an', 'Hangzhou'] },
  { name: 'Israel', lat: 31.04, lon: 34.85, cities: ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva'] },
  { name: 'Japan', lat: 36.20, lon: 138.25, cities: ['Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Yokohama', 'Kobe', 'Kyoto'] },
  { name: 'Laos', lat: 19.85, lon: 102.49, cities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang'] },
  { name: 'Malaysia', lat: 4.21, lon: 101.97, cities: ['Kuala Lumpur', 'Johor Bahru', 'George Town', 'Ipoh', 'Kuching'] },
  { name: 'Maldives', lat: 3.20, lon: 73.22, cities: ['Malé', 'Addu City', 'Fuvahmulah'] },
  { name: 'Qatar', lat: 25.35, lon: 51.18, cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal'] },
  { name: 'Saudi Arabia', lat: 23.88, lon: 45.07, cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif'] },
  { name: 'Singapore', lat: 1.35, lon: 103.81, cities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Ang Mo Kio'] },
  { name: 'South Korea', lat: 35.90, lon: 127.76, cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan'] },
  { name: 'Taiwan', lat: 23.69, lon: 120.96, cities: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hsinchu'] },
  { name: 'Thailand', lat: 15.87, lon: 100.99, cities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Nakhon Ratchasima'] },
  { name: 'United Arab Emirates', lat: 23.42, lon: 53.84, cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah'] },
  { name: 'Vietnam', lat: 14.05, lon: 108.27, cities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Nha Trang'] },
  
  // Americas (approved)
  { name: 'Brazil', lat: -14.23, lon: -51.92, cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Curitiba'] },
  { name: 'Canada', lat: 56.13, lon: -106.34, cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg'] },
  { name: 'Chile', lat: -35.67, lon: -71.54, cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'] },
  { name: 'Cuba', lat: 21.52, lon: -77.78, cities: ['Havana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Santa Clara'] },
  { name: 'El Salvador', lat: 13.79, lon: -88.89, cities: ['San Salvador', 'Santa Ana', 'San Miguel', 'Mejicanos'] },
  { name: 'United States', lat: 37.09, lon: -95.71, cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Miami'] },
  { name: 'Venezuela', lat: 6.42, lon: -66.58, cities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'] },
  
  // Africa (approved)
  { name: 'Madagascar', lat: -18.76, lon: 46.86, cities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa'] },
  { name: 'Morocco', lat: 31.79, lon: -7.09, cities: ['Casablanca', 'Rabat', 'Fez', 'Marrakesh', 'Tangier', 'Agadir'] },
  { name: 'South Africa', lat: -30.56, lon: 22.93, cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'] },
  
  // Oceania (approved)
  { name: 'Australia', lat: -25.27, lon: 133.77, cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle'] },
  { name: 'New Zealand', lat: -40.90, lon: 174.88, cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin'] },
].sort((a, b) => a.name.localeCompare(b.name));

// Country verification data for Trust Score system
export const COUNTRY_VERIFICATION_DATA: Record<string, { 
  timezones: string[]; 
  locales: string[];
  utcOffsetRange: [number, number]; // min and max UTC offset in hours
}> = {
  'Argentina': { timezones: ['America/Argentina'], locales: ['es-AR', 'es'], utcOffsetRange: [-3, -3] },
  'Australia': { timezones: ['Australia/'], locales: ['en-AU'], utcOffsetRange: [8, 11] },
  'Austria': { timezones: ['Europe/Vienna'], locales: ['de-AT', 'de'], utcOffsetRange: [1, 2] },
  'Belgium': { timezones: ['Europe/Brussels'], locales: ['nl-BE', 'fr-BE', 'de-BE'], utcOffsetRange: [1, 2] },
  'Brazil': { timezones: ['America/Sao_Paulo', 'America/Fortaleza', 'America/Manaus'], locales: ['pt-BR', 'pt'], utcOffsetRange: [-5, -2] },
  'Canada': { timezones: ['America/Toronto', 'America/Vancouver', 'America/Montreal', 'America/Edmonton'], locales: ['en-CA', 'fr-CA'], utcOffsetRange: [-8, -3] },
  'China': { timezones: ['Asia/Shanghai', 'Asia/Chongqing'], locales: ['zh-CN', 'zh'], utcOffsetRange: [8, 8] },
  'Denmark': { timezones: ['Europe/Copenhagen'], locales: ['da-DK', 'da'], utcOffsetRange: [1, 2] },
  'Egypt': { timezones: ['Africa/Cairo'], locales: ['ar-EG', 'ar'], utcOffsetRange: [2, 2] },
  'Finland': { timezones: ['Europe/Helsinki'], locales: ['fi-FI', 'fi'], utcOffsetRange: [2, 3] },
  'France': { timezones: ['Europe/Paris'], locales: ['fr-FR', 'fr'], utcOffsetRange: [1, 2] },
  'Germany': { timezones: ['Europe/Berlin'], locales: ['de-DE', 'de'], utcOffsetRange: [1, 2] },
  'Greece': { timezones: ['Europe/Athens'], locales: ['el-GR', 'el'], utcOffsetRange: [2, 3] },
  'India': { timezones: ['Asia/Kolkata', 'Asia/Calcutta'], locales: ['hi-IN', 'en-IN', 'ta-IN', 'te-IN', 'bn-IN'], utcOffsetRange: [5.5, 5.5] },
  'Italy': { timezones: ['Europe/Rome'], locales: ['it-IT', 'it'], utcOffsetRange: [1, 2] },
  'Japan': { timezones: ['Asia/Tokyo'], locales: ['ja-JP', 'ja'], utcOffsetRange: [9, 9] },
  'Kazakhstan': { timezones: ['Asia/Almaty', 'Asia/Aqtobe'], locales: ['kk-KZ', 'ru-KZ', 'kk', 'ru'], utcOffsetRange: [5, 6] },
  'Kyrgyzstan': { timezones: ['Asia/Bishkek'], locales: ['ky-KG', 'ru-KG', 'ky', 'ru'], utcOffsetRange: [6, 6] },
  'Mexico': { timezones: ['America/Mexico_City', 'America/Tijuana'], locales: ['es-MX', 'es'], utcOffsetRange: [-8, -5] },
  'Netherlands': { timezones: ['Europe/Amsterdam'], locales: ['nl-NL', 'nl'], utcOffsetRange: [1, 2] },
  'Norway': { timezones: ['Europe/Oslo'], locales: ['nb-NO', 'nn-NO', 'no'], utcOffsetRange: [1, 2] },
  'Poland': { timezones: ['Europe/Warsaw'], locales: ['pl-PL', 'pl'], utcOffsetRange: [1, 2] },
  'Portugal': { timezones: ['Europe/Lisbon'], locales: ['pt-PT', 'pt'], utcOffsetRange: [0, 1] },
  'Russia': { timezones: ['Europe/Moscow', 'Asia/Yekaterinburg', 'Asia/Novosibirsk', 'Asia/Vladivostok'], locales: ['ru-RU', 'ru'], utcOffsetRange: [2, 12] },
  'Saudi Arabia': { timezones: ['Asia/Riyadh'], locales: ['ar-SA', 'ar'], utcOffsetRange: [3, 3] },
  'South Korea': { timezones: ['Asia/Seoul'], locales: ['ko-KR', 'ko'], utcOffsetRange: [9, 9] },
  'Spain': { timezones: ['Europe/Madrid'], locales: ['es-ES', 'ca-ES', 'es'], utcOffsetRange: [1, 2] },
  'Sweden': { timezones: ['Europe/Stockholm'], locales: ['sv-SE', 'sv'], utcOffsetRange: [1, 2] },
  'Switzerland': { timezones: ['Europe/Zurich'], locales: ['de-CH', 'fr-CH', 'it-CH'], utcOffsetRange: [1, 2] },
  'Turkey': { timezones: ['Europe/Istanbul'], locales: ['tr-TR', 'tr'], utcOffsetRange: [3, 3] },
  'United Arab Emirates': { timezones: ['Asia/Dubai'], locales: ['ar-AE', 'ar'], utcOffsetRange: [4, 4] },
  'United Kingdom': { timezones: ['Europe/London'], locales: ['en-GB', 'en'], utcOffsetRange: [0, 1] },
  'Ukraine': { timezones: ['Europe/Kiev', 'Europe/Kyiv'], locales: ['uk-UA', 'ru-UA', 'uk'], utcOffsetRange: [2, 3] },
  'United States': { timezones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix'], locales: ['en-US'], utcOffsetRange: [-10, -4] },
  'Uzbekistan': { timezones: ['Asia/Tashkent', 'Asia/Samarkand'], locales: ['uz-UZ', 'ru-UZ', 'uz', 'ru'], utcOffsetRange: [5, 5] },
};

export const DEMO_USERS: UserProfile[] = [];

export const ACHIEVEMENTS_LIST: Achievement[] = [
    {
        id: 'explorer',
        icon: '🌍',
        titleKey: 'Globetrotter',
        descKey: 'Visit 5 different countries',
        condition: (data: PassportData) => data.countriesVisited.length >= 5
    },
    {
        id: 'night_owl',
        icon: '🦉',
        titleKey: 'Night Owl',
        descKey: 'Listen for 60 minutes at night',
        condition: (data: PassportData) => data.nightListeningMinutes >= 60
    },
    {
        id: 'audiophile',
        icon: '🎧',
        titleKey: 'Audiophile',
        descKey: 'Listen for 1000 total minutes',
        condition: (data: PassportData) => data.totalListeningMinutes >= 1000
    },
    {
        id: 'curator',
        icon: '❤️',
        titleKey: 'Curator',
        descKey: 'Favorite 10 stations',
        condition: (data: PassportData) => data.stationsFavorited >= 10
    }
];


export const PRESET_AVATARS = [
    // Male
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg',
    // Female
    'https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-purple-hair_23-2149436184.jpg',
    'https://img.freepik.com/free-psd/3d-illustration-person_23-2149436187.jpg'
];


export const TRANSLATIONS: Record<string, any> = {
    en: {
        genres: 'Genres', eras: 'Eras', moods: 'Moods', effects: 'Effects', favorites: 'Favorites',
        listeningTo: 'Listening to', loadMore: 'Load More',
        visualizer: 'Visualizer', eq: 'Equalizer', look: 'Appearance', ambience: 'Ambience', fx: 'Effects FX', sleep: 'Sleep Timer',
        vizGalaxy: 'Galaxy', resetFlat: 'Reset Flat', sleepTimer: 'Sleep Timer', turnOffTimer: 'Turn Off', alarm: 'Alarm', on: 'On', off: 'Off', alarm_set: 'Alarm set to', cardColor: 'Card Tint', developerNews: 'App Tips', interfaceLanguage: 'Language',
        findFriends: 'Find Friends', completeProfile: 'Complete Profile', displayName: 'Display Name', gender: 'Gender', male: 'Male', female: 'Female', other: 'Other', age: 'Age', country: 'Country', city: 'City', saveAndEnter: 'Save & Enter', login: 'Login', any: 'Any', search: 'Search', knock: 'Knock',
        tutorialWelcome: 'Welcome to AU Radio', manualSection2: 'Radio Stream: The Core', manualSection3: 'Sleep Timer: Rest Easy', manualSection5: 'Ambience: Create Atmosphere',
        mode: 'Mode', themeDark: 'Dark', themeLight: 'Light',
        tutorialStep1: 'Choose your vibe from Genres, Eras, or Moods.', tutorialStep2: 'Tap any station card to start listening immediately.', tutorialStep3: 'Set a sleep timer or alarm here.', tutorialStep4: 'Mix ambient sounds like rain or fire.',
        tagline: 'Global Online Radio Streaming Player', platform: 'Global Streaming Platform',
        mobileApp: 'Mobile App', downloadText: 'Download', getTheApp: 'Get the App', listenOnGo: 'Listen to AU Radio on the go',
        scanCamera: 'Scan with phone camera', installApp: 'Install App', qrDesc: 'Open your phone camera and point it at the QR code to launch the app.',
        androidInst: "Tap the browser menu (⋮) and select 'Install App' or 'Add to Home Screen'.",
        iosInst: "In Safari, tap the 'Share' button (square with arrow), scroll down, and select 'Add to Home Screen'.",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: 'Back',
        next: 'Next', gotIt: 'Got it', manualTitle: 'User Manual', manualIntro: 'Welcome to AU Radio, your ultimate radio experience.', whoAreYou: 'Who are you?', createProfile: 'Create your profile to connect.', uploadPhoto: 'Upload Photo', saveProfile: 'Save Profile', joinCommunity: 'Join Community',
        downloader: 'Music Downloader', rain: 'Rain', fire: 'Fire', spatialAudio: '8D Audio', spatialHint: 'Use headphones for best effect', editProfile: 'Edit Profile',
        manual: 'Manual', soundProfiles: 'Sound Profiles', oneClickSetup: 'One-Click Setup',
        vizStageDancer: 'Stage Dancer', vizTrioDancers: 'Trio Dancers', vizJourney: 'Journey', vizDigital: 'Digital', vizNeon: 'Neon', vizRings: 'Rings', vizBubbles: 'Bubbles',
        spatialMixer: 'Spatial Mixer',
        // Category Translations
        jazz: 'Jazz', blues: 'Blues', rock: 'Rock', classical: 'Classical', electronic: 'Electronic', hiphop: 'Hip Hop', pop: 'Pop', rnb: 'R&B', reggae: 'Reggae', soul: 'Soul', world: 'World',
        '60s': '60s', '70s': '70s', '80s': '80s', '90s': '90s', '00s': '00s', '10s': '10s', '20s': '20s',
        chill: 'Chill', energy: 'Energy', romantic: 'Romantic', dark: 'Club',
        nature: 'Nature', storm: 'Storm', ocean: 'Ocean', forest: 'Forest',
        // World Music
        vietnamese: 'Vietnamese', japanese: 'Japanese', russian: 'Russian', spanish: 'Spanish', italian: 'Italian',
        french: 'French', kazakh: 'Kazakh', kyrgyz: 'Kyrgyz', oriental: 'Oriental', chinese: 'Chinese',
        // Countries
        austria: 'Austria', belgium: 'Belgium', brazil: 'Brazil', canada: 'Canada', china: 'China',
        france: 'France', germany: 'Germany', italy: 'Italy', japan: 'Japan', kazakhstan: 'Kazakhstan',
        kyrgyzstan: 'Kyrgyzstan', netherlands: 'Netherlands', poland: 'Poland', russia: 'Russia',
        spain: 'Spain', switzerland: 'Switzerland', turkey: 'Turkey', uk: 'United Kingdom', ukraine: 'Ukraine', usa: 'United States',
        unitedStates: 'United States', australia: 'Australia',
        // Missing Translations Added
        speed: 'Speed', react: 'React', bright: 'Bright', performanceMode: 'Visualizer Mode', accentColor: 'Accent Color', reset: 'Reset',
        searching: 'Searching databases...', noTracks: 'No tracks found.', errorTracks: 'Error fetching tracks.', loading: 'Loading...', download: 'Download', searchTracks: 'Search tracks...',
        infiniteTracks: 'Infinite Tracks', noAuth: 'No Auth Required', searchLib: 'Search infinite library...', all: 'All', moodChill: 'Chill', moodEnergy: 'Energy', moodPhonk: 'Phonk', moodJazz: 'Jazz', moodParty: 'Party',
        dragRotate: 'Drag to rotate • Click name to play',
        // Feedback
        feedbackTitle: "Feedback",
        writeDev: "Write to Developer",
        rating: "Rate App",
        tellUs: "Tell us what to improve...",
        sendSuccess: "Message sent!",
        manualTooltip: "User Manual",
        showWhere: "Show location",
        helpImprove: "Help us improve AU Radio.",
        // New
        randomMode: 'Random Mode (Shuffle)',
        randomModeDesc: 'Plays random stations from all styles when pressing Next.',
        ecoMode: 'Eco Mode (Stars Only)',
        // Mastering
        mastering: "Mastering & Dynamics",
        compressor: "Compressor",
        threshold: "Threshold",
        ratio: "Ratio",
        hifiBass: "HiFi Bass",
        loudness: "Loudness",
        // Energy Saver
        energySaver: "Energy Saver",
        energySaverDesc: "Reduces battery and CPU usage. Audio quality remains unchanged.",
        // Global Reset
        resetApp: "Reset App to Defaults",
        resetConfirm: "Are you sure you want to reset all settings and data? This action cannot be undone.",
        danceMove: "Dance Move",
        switchMove: "Switch Move",
        density: 'Density', layout: 'Layout', layoutCenter: 'Center', layoutBottom: 'Bottom', glow: 'Glow', bgOpacity: 'Background',
        safeMode: 'High Stability Mode',
        safeModeDesc: 'Ensures clean sound in background by disabling visual effects.',
        safeModeEnableMsg: 'Enable High Stability Mode? The app will reload.',
        safeModeDisableMsg: 'Disable High Stability Mode? The app will reload.',
        accept: 'ACCEPT', reject: 'REJECT', enter: 'ENTER', incomingKnock: 'Incoming Knock', waitingRoomDesc: 'Waiting for the other user.',
        yourNameAlias: 'YOUR NAME (ALIAS)', detected: 'Auto-detected: ', presets: 'Presets', selectFile: 'Select File', cartoonStyleNotice: 'Cartoon style will be applied',
        playback: '▶ Play Check', retry: 'Retry', sounds: 'Sounds', banners: 'Banners',
        someoneKnocking: 'Someone is knocking!', partnerLeftChat: 'Partner has left the chat', callEnded: 'Call ended', isKnocking: 'is knocking!',
        accessRestrictedDesc: 'To use the chat, you need to create a profile and follow the platform rules. 18+',
        introRecorded: '✅ Intro recorded', introHook: 'Your main hook for chats',
        streamAttached: 'Stream attached!', noStreamFound: 'No stream found!',
        cancel: 'CANCEL', settings: 'SETTINGS', voiceCall: 'Voice Call', videoComingSoon: 'Video coming soon', 
        voiceEngineTest: 'Voice engine test', acceptedYourKnock: 'Accepted your knock!', reportReasonPrompt: 'Select a reason for the report:',
        photoNotDelivered: 'Photo not delivered', uploadFailed: 'Upload failed',
        stylizedNotice: 'Your photo will be stylized for privacy!', moreAvatarsSoon: 'More avatars coming soon!',
        profileExpiringWarning: 'Your profile expires in {minutes} minutes!', signInToChat: '🔐 Please sign in with Google to start chatting.',
        uploadRealPhoto: '📷 Please upload a real profile photo to start chatting.', newInviteFrom: 'New invite from {name}', user: 'User',
        partnerMustConfirm: 'Partner must confirm to start the chat.', profileInfoHelps: 'This info helps find better matches. Messages and data are automatically deleted.',
        playing: 'Playing...', dataStoredNotice: 'Data is stored only in this browser until you delete it.',
        ageRestrictionNotice: 'Unfortunately, search and chat features are restricted to users 18+. You can continue listening to the radio.',
        free: 'Free', noActiveChatsDesc: 'Your active conversations will appear here. Start one right now!',
        restrictedDueToReport: 'Restricted due to report: {reason}', violation: 'Violation',
        // Avatar Creator
        createPersona: 'Create Persona', chooseAppearance: 'Choose how you want to appear in the world.',
        aiFaceScan: 'AI Face Scan', uploadPhotoAuto: 'Upload photo for auto-generation',
        manualConstructor: 'Manual Constructor', buildLooking: 'Build your unique look from scratch',
        scanningBiometrics: 'SCANNING BIOMETRICS', analyzingStructural: 'Analyzing facial structure... This animation is simulated.',
        checkLook: 'Check Look', head: 'Head', face: 'Face', style: 'Style',
        skinTone: 'Skin Tone', hairStyle: 'Hair Style', hairColor: 'Hair Color',
        eyes: 'Eyes', eyebrows: 'Eyebrows', mouth: 'Mouth', facialHair: 'Facial Hair',
        clothing: 'Clothing', accessories: 'Accessories',

        // New Chat V2 UI
        communications: 'Communications', systemNode: 'System Node',
        globalRadar: 'Global Radar', accessPublicRooms: 'Access Public Rooms',
        scanningSignals: 'Scanning Signals...', nodes: 'Nodes',
        selectPublicFrequency: 'Select a public frequency',
        publicLiveFlow: 'Public Live Flow', activeConnections: 'active connections',
        welcomeToChaos: 'Welcome to the chaos.', messagesVanishQuickly: 'Messages vanish quickly.',
        dropAThought: 'Drop a thought...', encryptedSession: 'Encrypted • Self-Destructing',
        privateEndToEnd: 'Private end-to-end session.', messagesVanish30s: 'Messages vanish after 30s.',
        typeSecurely: 'Type securely...',
    },
    ru: {
        genres: 'Жанры', eras: 'Эпохи', moods: 'Настроение', effects: 'Эффекты', favorites: 'Избранное',
        listeningTo: 'В эфире', loadMore: 'Загрузить еще',
        visualizer: 'Визуал', eq: 'Звук', look: 'Стиль', ambience: 'Атмосфера', fx: 'Эффекты', sleep: 'Сон',
        vizGalaxy: 'Космос', resetFlat: 'Сброс', sleepTimer: 'Режим сна', turnOffTimer: 'Отключить', alarm: 'Будильник', on: 'Вкл', off: 'Выкл', alarm_set: 'Разбудить в', cardColor: 'Оттенок блоков', developerNews: 'Советы', interfaceLanguage: 'Язык',
        findFriends: 'Поиск людей', completeProfile: 'Ваш профиль', displayName: 'Ваше имя', gender: 'Пол', male: 'Мужской', female: 'Женский', other: 'Другой', age: 'Возраст', country: 'Страна', city: 'Город', saveAndEnter: 'Войти', login: 'Логин', any: 'Неважно', search: 'Найти', knock: 'Постучаться',
        tutorialWelcome: 'Добро пожаловать', manualSection2: 'Радио: Сердце Эфира', manualSection3: 'Таймер Сна: Отдыхайте', manualSection5: 'Атмосфера: Создайте Уют',
        tutorialStep1: 'Выберите настроение, жанр или эпоху.', tutorialStep2: 'Нажмите на любую станцию, чтобы начать.', tutorialStep3: 'Здесь можно поставить таймер или будильник.', tutorialStep4: 'Смешивайте звуки дождя или огня.',
        tagline: 'Глобальное онлайн радио вещание', platform: 'Глобальная стриминговая платформа',
        mobileApp: 'Мобильное приложение', downloadText: 'Скачать', getTheApp: 'Скачайте приложение', listenOnGo: 'Слушайте AU Radio на ходу',
        scanCamera: 'Сканируйте камерой телефона', installApp: 'Установить App', qrDesc: 'Откройте камеру на телефоне и наведите на QR-код, чтобы открыть приложение.',
        androidInst: "Нажмите на меню (⋮) в браузере и выберите «Установить приложение» или «Добавить на гл. экран».",
        iosInst: "В Safari нажмите кнопку «Поделиться» (квадрат со стрелкой), прокрутите вниз и выберите «На экран „Домой“».",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: 'Назад',
        next: 'Далее', gotIt: 'Понятно', manualTitle: 'Руководство', manualIntro: 'Добро пожаловать в AU Radio — ваш идеальный радио-опыт.', whoAreYou: 'Кто вы?', createProfile: 'Создайте профиль для общения.', uploadPhoto: 'Загрузить фото', saveProfile: 'Сохранить', joinCommunity: 'Присоединиться',
        downloader: 'Загрузчик Музыки', rain: 'Дождь', spatialAudio: '8D Звук', spatialHint: 'В наушниках лучше', editProfile: 'Ред. Профиль',
        vizStageDancer: 'Танцор', vizTrioDancers: 'Трио', vizJourney: 'Полет', vizDigital: 'Цифра', vizNeon: 'Неон', vizRings: 'Кольца', vizBubbles: 'Пузыри',
        spatialMixer: 'Звуковая Сцена',
        // Category Translations
        jazz: 'Джаз', blues: 'Блюз', rock: 'Рок', classical: 'Классика', electronic: 'Электроника', hiphop: 'Хип-хоп', pop: 'Поп', rnb: 'R&B', reggae: 'Регги', soul: 'Соул',
        '60s': '60-е', '70s': '70-е', '80s': '80-е', '90s': '90-е', '00s': '00-е',
        chill: 'Чилл', energy: 'Энергия', romantic: 'Романтика', dark: 'Клуб',
        nature: 'Природа', storm: 'Шторм', ocean: 'Океан', forest: 'Лес',
        // World Music
        vietnamese: 'Вьетнамская', japanese: 'Японская', russian: 'Русская', spanish: 'Испанская', italian: 'Итальянская',
        french: 'Французская', kazakh: 'Казахская', kyrgyz: 'Кыргызская', oriental: 'Восточная', chinese: 'Китайская',
        // Страны
        austria: 'Австрия', belgium: 'Бельгия', brazil: 'Бразилия', canada: 'Канада', china: 'Китай',
        france: 'Франция', germany: 'Германия', italy: 'Италия', japan: 'Япония', kazakhstan: 'Казахстан',
        kyrgyzstan: 'Кыргызстан', netherlands: 'Нидерланды', poland: 'Польша', russia: 'Россия',
        spain: 'Испания', switzerland: 'Швейцария', turkey: 'Турция', uk: 'Великобритания', ukraine: 'Украина', usa: 'США',
        unitedStates: 'США', australia: 'Австралия',
        // Missing Translations Added
        speed: 'Скорость', react: 'Реакция', bright: 'Яркость', performanceMode: 'Режим визуализации', accentColor: 'Акцент', reset: 'Сброс',
        privateChat: 'ЛИЧНЫЙ ЧАТ', authTitle: 'Общение без границ', authDesc: 'Ваш безопасный хаб. Общение 1-на-1 только по взаимному согласию. Без спама и шума.', signInGuest: 'Войти как Гость', online: 'Онлайн', сегодня: 'Сегодня', recording: 'Запись...', send: 'ОТПРАВИТЬ', noUsers: 'Никого не найдено', showAll: 'Показать всех', knocking: 'Стучится', wantsToConnect: 'хочет общаться', myDialogs: 'Мои Диалоги', noChats: 'Пока нет чатов', useDiscovery: "Используйте 'Барабан Открытий' или ждите приветствия.", photoExpired: '📸 Фото истекло', audioExpired: '🎤 Аудио истекло',
        knockSent: 'Отправлено!', signInAlert: 'Пожалуйста, сначала войдите через панель чата.',
        searching: 'Поиск в базах...', noTracks: 'Треки не найдены.', errorTracks: 'Ошибка загрузки.', loading: 'Загрузка...', download: 'Скачать', searchTracks: 'Поиск треков...',
        infiniteTracks: 'Бесконечные Треки', noAuth: 'Без регистрации', searchLib: 'Поиск в библиотеке...', all: 'Все', moodChill: 'Чилл', moodEnergy: 'Энергия', moodPhonk: 'Фонк', moodJazz: 'Джаз', moodParty: 'Вечеринка',
        dragRotate: 'Тяни для вращения • Клик для игры',
        // Feedback
        feedbackTitle: "Отзывы",
        writeDev: "Написать разработчику",
        rating: "Рейтинг",
        tellUs: "Ваши пожелания и замечания...",
        sendSuccess: "Сообщение отправлено!",
        manualTooltip: "Мануал",
        showWhere: "Показать где",
        helpImprove: "Помогите нам улучшить AU Radio.",
        // New
        randomMode: 'Случайный режим (Mix)',
        randomModeDesc: 'При нажатии «Вперед» будут играть случайные станции всех стилей.',
        ecoMode: 'Эко Режим (Звезды)',
        // Avatar Creator
        createPersona: 'Создание Персоны', chooseAppearance: 'Выберите, как вы хотите выглядеть.',
        aiFaceScan: 'AI Сканирование', uploadPhotoAuto: 'Загрузите фото для авто-генерации',
        manualConstructor: 'Ручной Конструктор', buildLooking: 'Создайте свой уникальный образ с нуля',
        scanningBiometrics: 'СКАНИРОВАНИЕ БИОМЕТРИИ', analyzingStructural: 'Анализ структуры лица... (Симуляция)',
        checkLook: 'Проверить Вид', head: 'Голова', face: 'Лицо', style: 'Стиль',
        skinTone: 'Тон Кожи', hairStyle: 'Прическа', hairColor: 'Цвет Волос',
        eyes: 'Глаза', eyebrows: 'Брови', mouth: 'Рот', facialHair: 'Борода',
        clothing: 'Одежда', accessories: 'Аксессуары',
        // Mastering
        mastering: "Мастеринг и Динамика",
        compressor: "Компрессор", threshold: "Порог", ratio: "Сжатие", hifiBass: "HiFi Бас", loudness: "Глубина (Loud)",
        // Energy Saver
        energySaver: "Энергосбережение",
        energySaverDesc: "Снижает нагрузку на батарею и CPU. Качество звука не меняется.",
        // Global Reset
        resetApp: "Сброс настроек (Reset)",
        resetConfirm: "Вы уверены, что хотите сбросить все настройки и данные приложения? Это действие нельзя отменить.",
        mode: 'Режим', themeDark: 'Темный', themeLight: 'Светлый',
        danceMove: 'Танцевальное движение', switchMove: 'Сменить',
        manual: 'Инструкция', soundProfiles: 'Профили звука', oneClickSetup: 'Установка в один клик',
        fire: 'Огонь',
        density: 'Плотность', layout: 'Вид', layoutCenter: 'Центр', layoutBottom: 'Низ', glow: 'Свечение', bgOpacity: 'Фон',
        safeMode: 'Режим высокой стабильности',
        safeModeDesc: 'Обеспечивает чистый звук в фоне, отключая визуальные эффекты.',
        safeModeEnableMsg: 'Включить режим высокой стабильности? Приложение будет перезагружено.',
        safeModeDisableMsg: 'Выключить режим высокой стабильности? Приложение будет перезагружено.',
        accept: 'ПРИНЯТЬ', reject: 'ОТКЛОНИТЬ', enter: 'ВОЙТИ', incomingKnock: 'Входящий стук', waitingRoomDesc: 'Ожидание собеседника.',
        yourNameAlias: 'ВАШЕ ИМЯ (ПСЕВДОНИМ)', detected: 'Авто-определение: ', presets: 'Готовые варианты', selectFile: 'Выбрать файл', cartoonStyleNotice: 'Будет применен мультяшный стиль',
        playback: '▶ Прослушать', retry: 'Перезаписать', sounds: 'Звуки', banners: 'Баннеры',
        someoneKnocking: 'Кто-то стучится!', partnerLeftChat: 'Собеседник покинул чат', callEnded: 'Звонок завершен', isKnocking: 'стучится!',
        accessRestrictedDesc: 'Для использования чата необходимо создать профиль и соответствовать правилам платформы. 18+',
        introRecorded: '✅ Приветствие записано', introHook: 'Главный «крючок» для общения',
        streamAttached: 'Стрим подключен!', noStreamFound: 'Стрим еще не получен. Подождите...',
        cancel: 'ОТМЕНА', settings: 'НАСТРОЙКИ', voiceCall: 'Голосовой звонок', videoComingSoon: 'Видео скоро',
        voiceEngineTest: 'Проверка голоса', acceptedYourKnock: 'Принял ваш вызов!', reportReasonPrompt: 'Выберите причину жалобы:',
        photoNotDelivered: 'Фото не доставлено', uploadFailed: 'Ошибка загрузки',
        stylizedNotice: 'Ваше фото будет стилизовано для приватности!', moreAvatarsSoon: 'Аватарок скоро будет больше!',
        profileExpiringWarning: 'Ваш профиль истечет через {minutes} минут!', signInToChat: '🔐 Для начала общения войдите через Google аккаунт.',
        uploadRealPhoto: '📷 Загрузите реальное фото профиля, чтобы начать общение.', newInviteFrom: 'Новое приглашение от {name}', user: 'пользователь',
        partnerMustConfirm: 'Партнер должен подтвердить вход в чат.', profileInfoHelps: 'Эта информация помогает подбирать собеседников. Сообщения и данные удаляются автоматически.',
        playing: 'Играет...', dataStoredNotice: 'Данные хранятся только в этом браузере пока вы не удалите их.',
        ageRestrictionNotice: 'К сожалению, функции поиска и общения доступны только для пользователей старше 18 лет. Вы можете продолжить слушать радио.',
        free: 'Свободен', noActiveChatsDesc: 'Здесь будут появляться ваши текущие разговоры. Начните прямо сейчас!',
        restrictedDueToReport: 'Ограничение из-за жалобы: {reason}', violation: 'Нарушение',

        // New Chat V2 UI
        communications: 'Коммуникации', systemNode: 'Системный Узел',
        globalRadar: 'Глобальный Радар', accessPublicRooms: 'Публичные Комнаты',
        scanningSignals: 'Сканирование сигналов...', nodes: 'Узлы',
        selectPublicFrequency: 'Выберите публичную частоту',
        publicLiveFlow: 'Публичный Поток', activeConnections: 'активных соединений',
        welcomeToChaos: 'Добро пожаловать в хаос.', messagesVanishQuickly: 'Сообщения исчезают быстро.',
        dropAThought: 'Напишите мысль...', encryptedSession: 'Зашифровано • Самоуничтожение',
        privateEndToEnd: 'Приватная end-to-end сессия.', messagesVanish30s: 'Сообщения исчезнут через 30с.',
        typeSecurely: 'Печатайте безопасно...',
    },
    es: {
        genres: 'Géneros', eras: 'Épocas', moods: 'Estados de ánimo', effects: 'Efectos', favorites: 'Favoritos',
        listeningTo: 'Escuchando', loadMore: 'Cargar más',
        visualizer: 'Visualizador', eq: 'Ecualizador', look: 'Apariencia', ambience: 'Ambiente', fx: 'Efectos FX', sleep: 'Temporizador',
        vizGalaxy: 'Galaxia', resetFlat: 'Reiniciar', sleepTimer: 'Temporizador', turnOffTimer: 'Apagar', alarm: 'Alarma', on: 'Encendido', off: 'Apagado', alarm_set: 'Alarma programada a las', cardColor: 'Tinte de tarjeta', developerNews: 'Consejos', interfaceLanguage: 'Idioma',
        findFriends: 'Buscar amigos', completeProfile: 'Completar perfil', displayName: 'Nombre', gender: 'Género', male: 'Hombre', female: 'Mujer', other: 'Otro', age: 'Edad', country: 'País', city: 'Ciudad', saveAndEnter: 'Guardar y entrar', login: 'Acceso', any: 'Cualquiera', search: 'Buscar',
        tutorialWelcome: 'Bienvenido a AU Radio', manualSection2: 'Radio Stream: El Núcleo', manualSection3: 'Temporizador: Descansa tranquilo', manualSection5: 'Ambiente: Crea atmósfera',
        mode: 'Modo', themeDark: 'Oscuro', themeLight: 'Claro',
        tutorialStep1: 'Elige tu vibra de Géneros, Épocas o Estados de ánimo.', tutorialStep2: 'Toca cualquier tarjeta de estación para empezar a escuchar.', tutorialStep3: 'Configura un temporizador o alarma aquí.', tutorialStep4: 'Mezcla sonidos ambiente como lluvia o fuego.',
        tagline: 'Reproductor de radio global en línea', platform: 'Plataforma global de streaming',
        mobileApp: 'Aplicación móvil', downloadText: 'Descargar', getTheApp: 'Consigue la aplicación', listenOnGo: 'Escucha AU Radio sobre la marcha',
        scanCamera: 'Escanea con la cámara del teléfono', installApp: 'Instalar aplicación', qrDesc: 'Abre la cámara de tu teléfono y apunta al código QR para iniciar la aplicación.',
        androidInst: "Toca el menú del navegador (⋮) y selecciona 'Instalar aplicación' o 'Añadir a la pantalla de inicio'.",
        iosInst: "En Safari, toca el botón 'Compartir' (cuadrado con flecha), desplázate hacia abajo y selecciona 'Añadir a la pantalla de inicio'.",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: 'Atrás',
        next: 'Siguiente', gotIt: 'Entendido', manualTitle: 'Manual de usuario', manualIntro: 'Bienvenido a AU Radio, tu experiencia de radio definitiva.', whoAreYou: '¿Quién eres?', createProfile: 'Crea tu perfil para conectar.', uploadPhoto: 'Subir foto', saveProfile: 'Guardar perfil', joinCommunity: 'Unirse',
        downloader: 'Descargador de música', rain: 'Lluvia', fire: 'Fuego', spatialAudio: 'Audio 8D', spatialHint: 'Usa auriculares para mejor efecto', editProfile: 'Editar perfil',
        manual: 'Manual', soundProfiles: 'Perfiles de sonido', oneClickSetup: 'Configuración en un clic',
        vizStageDancer: 'Bailarín', vizTrioDancers: 'Trío de bailarines', vizJourney: 'Viaje', vizDigital: 'Digital', vizNeon: 'Neón', vizRings: 'Anillos', vizBubbles: 'Burbujas',
        spatialMixer: 'Mezclador espacial',
        jazz: 'Jazz', blues: 'Blues', rock: 'Rock', classical: 'Clásica', electronic: 'Electrónica', hiphop: 'Hip Hop', pop: 'Pop', rnb: 'R&B', reggae: 'Reggae', soul: 'Soul', world: 'Mundo',
        '60s': '60s', '70s': '70s', '80s': '80s', '90s': '90s', '00s': '00s', '10s': '10s', '20s': '20s',
        chill: 'Chill', energy: 'Energía', romantic: 'Romántico', dark: 'Club',
        nature: 'Naturaleza', storm: 'Tormenta', ocean: 'Océano', forest: 'Bosque',
        vietnamese: 'Vietnamita', japanese: 'Japonés', russian: 'Ruso', spanish: 'Español', italian: 'Italiano',
        french: 'Francés', kazakh: 'Kazajo', kyrgyz: 'Kirguís', oriental: 'Oriental', chinese: 'Chino',
        // Países
        austria: 'Austria', belgium: 'Bélgica', brazil: 'Brasil', canada: 'Canadá', china: 'China',
        france: 'Francia', germany: 'Alemania', italy: 'Italia', japan: 'Japón', kazakhstan: 'Kazajistán',
        kyrgyzstan: 'Kirguistán', netherlands: 'Países Bajos', poland: 'Polonia', russia: 'Rusia',
        spain: 'España', switzerland: 'Suiza', turkey: 'Turquía', uk: 'Reino Unido', ukraine: 'Ucrania', usa: 'EE.UU.',
        unitedStates: 'EE.UU.', australia: 'Australia',
        speed: 'Velocidad', react: 'Reacción', bright: 'Brillo', performanceMode: 'Modo visualizador', accentColor: 'Color de acento', reset: 'Reiniciar',
        searching: 'Buscando...', noTracks: 'Sin pistas.', errorTracks: 'Error.', loading: 'Cargando...', download: 'Descargar', searchTracks: 'Buscar pistas...',
        infiniteTracks: 'Pistas infinitas', noAuth: 'Sin registro', searchLib: 'Buscar biblioteca...', all: 'Todo', moodChill: 'Relax', moodEnergy: 'Energía', moodPhonk: 'Phonk', moodJazz: 'Jazz', moodParty: 'Fiesta',
        feedbackTitle: "Comentarios", writeDev: "Escribir al desarrollador", rating: "Calificar", tellUs: "Dinos qué mejorar...", sendSuccess: "¡Mensaje enviado!", manualTooltip: "Manual", showWhere: "Mostrar dónde", helpImprove: "Ayúdanos a mejorar AU Radio.",
        randomMode: 'Modo aleatorio', randomModeDesc: 'Reproduce estaciones aleatorias al pulsar Siguiente.', ecoMode: 'Modo Eco',
    },
    fr: {
        genres: 'Genres', eras: 'Époques', moods: 'Humeurs', effects: 'Effets', favorites: 'Favoris',
        listeningTo: 'En écoute', loadMore: 'Charger plus',
        visualizer: 'Visualiseur', eq: 'Égaliseur', look: 'Apparence', ambience: 'Ambiance', fx: 'Effets FX', sleep: 'Minuteur',
        vizGalaxy: 'Galaxie', resetFlat: 'Réinitialiser', sleepTimer: 'Minuteur', turnOffTimer: 'Désactiver', alarm: 'Alarme', on: 'On', off: 'Off', alarm_set: 'Alarme réglée à', cardColor: 'Teinte', developerNews: 'Conseils', interfaceLanguage: 'Langue',
        findFriends: 'Trouver des amis', completeProfile: 'Profil complet', displayName: 'Nom', gender: 'Genre', male: 'Homme', female: 'Femme', other: 'Autre', age: 'Âge', country: 'Pays', city: 'Ville', saveAndEnter: 'Enregistrer', login: 'Connexion', any: 'Tous', search: 'Rechercher',
        tutorialWelcome: 'Bienvenue sur AU Radio', manualSection2: 'Radio Stream : Le Cœur', manualSection3: 'Minuteur : Reposez-vous', manualSection5: 'Ambiance : Créez l’atmosphère',
        mode: 'Mode', themeDark: 'Sombre', themeLight: 'Clair',
        tutorialStep1: 'Choisissez votre ambiance via Genres, Époques ou Humeurs.', tutorialStep2: 'Appuyez sur une station pour l’écouter.', tutorialStep3: 'Réglez un minuteur ou une alarme ici.', tutorialStep4: 'Mélangez des sons comme la pluie ou le feu.',
        tagline: 'Lecteur de radio en ligne mondial', platform: 'Plateforme de streaming mondiale',
        mobileApp: 'Application mobile', downloadText: 'Télécharger', getTheApp: 'Obtenez l\'application', listenOnGo: 'Écoutez AU Radio en déplacement',
        scanCamera: 'Scannez avec l\'appareil photo du téléphone', installApp: 'Installer l\'application', qrDesc: 'Ouvrez l\'appareil photo de votre téléphone et pointez-le vers le code QR pour lancer l\'application.',
        androidInst: "Appuyez sur le menu du navigateur (⋮) et sélectionnez 'Installer l\'application' ou 'Ajouter à l\'écran d\'accueil'.",
        iosInst: "Dans Safari, appuyez sur le bouton 'Partager' (carré avec une flèche), faites défiler vers le bas et sélectionnez 'Sur l\'écran d\'accueil'.",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: 'Retour',
        next: 'Suivant', gotIt: 'Compris', manualTitle: 'Manuel d’utilisation', manualIntro: 'Bienvenue sur AU Radio, votre expérience radio ultime.', whoAreYou: 'Qui êtes-vous ?', createProfile: 'Créez votre profil.', uploadPhoto: 'Charger photo', saveProfile: 'Enregistrer', joinCommunity: 'Rejoindre',
        downloader: 'Téléchargeur', rain: 'Pluie', fire: 'Feu', spatialAudio: 'Audio 8D', spatialHint: 'Utilisez un casque', editProfile: 'Modifier le profil',
        manual: 'Manuel', soundProfiles: 'Profils sonores', oneClickSetup: 'Config en un clic',
        vizStageDancer: 'Danseur', vizTrioDancers: 'Trio de danseurs', vizJourney: 'Voyage', vizDigital: 'Digital', vizNeon: 'Néon', vizRings: 'Anneaux', vizBubbles: 'Bulles',
        spatialMixer: 'Mixeur spatial',
        jazz: 'Jazz', blues: 'Blues', rock: 'Rock', classical: 'Classique', electronic: 'Électronique', hiphop: 'Hip Hop', pop: 'Pop', rnb: 'R&B', reggae: 'Reggae', soul: 'Soul', world: 'Monde',
        '60s': '60s', '70s': '70s', '80s': '80s', '90s': '90s', '00s': '00s', '10s': '10s', '20s': '20s',
        chill: 'Chill', energy: 'Énergie', romantic: 'Romantique', dark: 'Club',
        nature: 'Nature', storm: 'Tempête', ocean: 'Océan', forest: 'Forêt',
        vietnamese: 'Vietnamien', japanese: 'Japonais', russian: 'Russe', spanish: 'Espagnol', italian: 'Italien',
        french: 'Français', kazakh: 'Kazakh', kyrgyz: 'Kirghiz', oriental: 'Oriental', chinese: 'Chinois',
        // Pays
        austria: 'Autriche', belgium: 'Belgique', brazil: 'Brésil', canada: 'Canada', china: 'Chine',
        france: 'France', germany: 'Allemagne', italy: 'Italie', japan: 'Japon', kazakhstan: 'Kazakhstan',
        kyrgyzstan: 'Kirghizistan', netherlands: 'Pays-Bas', poland: 'Pologne', russia: 'Russie',
        spain: 'Espagne', switzerland: 'Suisse', turkey: 'Turquie', uk: 'Royaume-Uni', ukraine: 'Ukraine', usa: 'États-Unis',
        unitedStates: 'États-Unis', australia: 'Australie',
        speed: 'Vitesse', react: 'Réaction', bright: 'Luminosité', performanceMode: 'Mode visuel', accentColor: 'Couleur d’accent', reset: 'Reset',
        searching: 'Recherche...', noTracks: 'Aucune piste.', errorTracks: 'Erreur.', loading: 'Chargement...', download: 'Télécharger', searchTracks: 'Chercher pistes...',
        infiniteTracks: 'Pistes infinies', noAuth: 'Sans inscription', searchLib: 'Chercher bibliothèque...', all: 'Tout', moodChill: 'Chill', moodEnergy: 'Énergie', moodPhonk: 'Phonk', moodJazz: 'Jazz', moodParty: 'Fête',
        feedbackTitle: "Avis", writeDev: "Écrire au dév", rating: "Noter", tellUs: "Dites-nous quoi améliorer...", sendSuccess: "Message envoyé !", manualTooltip: "Manuel", showWhere: "Montrer où", helpImprove: "Aidez-nous à améliorer AU Radio.",
        randomMode: 'Mode aléatoire', randomModeDesc: 'Joue des stations au hasard.', ecoMode: 'Mode Éco',
        // Chat
        report: 'Signaler', block: 'Bloquer', unblock: 'Débloquer', unblockAll: 'Tout débloquer', unblockAllConfirm: 'Débloquer tous les utilisateurs ?',
        hideUserConfirm: 'Masquer cet utilisateur ?', hideChatConfirm: 'Masquer cette discussion ?',
        voiceModeEnable: 'Activer la voix directe', voiceModeDisable: 'Désactiver la voix directe', voiceSettings: 'Paramètres voix', voiceTone: 'Ton de la voix',
        auto: 'Auto', previewVoice: 'Écouter', privacy: 'Confidentialité', hideFromSearch: 'Masquer de la recherche',
        hideFromSearchDesc: 'Votre profil ne sera pas affiché.',
        waitingForPartner: 'Attente du partenaire...', partnerConfirmNotice: 'Le partenaire doit confirmer.',
        knockAccepted: 'Appel accepté !', partnerWaiting: 'vous attend', startChat: 'Lancer le chat',
        chooseAvatar: 'Choisir un avatar', uploadAvatarDesc: 'Sélectionnez ou téléchargez un avatar',
        intentTalk: 'Veut parler', intentFree: 'Libre pour discuter', intentListen: 'Juste écoute', intentNoFlirt: 'Pas de flirt',
        justNow: 'à l’instant', minsAgo: 'm ago', hoursAgo: 'h ago', daysAgo: 'j ago', longAgo: 'Il y a longtemps',
        unknown: 'Inconnu', partner: 'Partenaire', sentFile: 'A envoyé un fichier', newMsg: 'Nouveau message',
        profileExpired: 'Profil expiré. Créez-en un nouveau.', profileExpiringSoon: 'Profil expire dans {n} min !',
        restrictedSpam: 'Restreint pour spam.', sessionRefreshed: 'Session rafraîchie. Réessayez.',
        reportSent: 'Signalement envoyé.', partnerJoined: 'Le partenaire a rejoint',
        chatScenario: 'Scénario de chat', registration: 'Inscription', interaction: 'Interaction',
        aroundWorld: 'Autour du monde', inbox: 'Boîte', helpAndDemos: 'Aide & Démos', onlineCount: 'en ligne',
        newKnockFrom: 'Nouvel appel de', open: 'OUVRIR',
        accountDeleteNotice: 'Compte supprimé après 30 jours',
        resetDataConfirm: 'Réinitialiser le profil local ?',
        resetData: 'RESET DONNÉES',
        accessRestricted: 'Accès restreint',
        stage: 'SCÈNE',
        onlineStatsPrefix: 'En ligne : ',
        discoveryAction: 'Trouvez quelqu’un maintenant',
        discoveryNotice: 'Pas d’historique. Sans engagement. 18+',
        randomChat: 'Aléatoire',
        randomChatDesc: 'Chattez avec n’importe qui',
        onlineNow: 'En ligne maintenant',
        activeUsersOnly: 'Seulement actifs',
        orByParameters: 'OU PAR PARAMÈTRES',
        startSearch: 'LANCER RECHERCHE',
        autoDeleteNotice: 'Messages auto-effacés',
        hide: 'Masquer',
        onlineStatus: 'EN LIGNE',
        wasOnline: 'Était en ligne',
        voiceIntroTitle: 'INTRO VOIX',
        noVoice: 'PAS DE VOIX',
        you: 'VOUS',
        sent: 'ENVOYÉ',
        noActiveChats: 'Pas de chats actifs',
        historyNotSaved: 'Historique non sauvegardé',
        findingSomeone: 'TROUVER QUELQU’UN',
        feelingLucky: 'J’AI DE LA CHANCE',
        showAnyway: 'Afficher quand même',
        sessionExpired: 'Session expirée !',
        messagePlaceholder: 'Message...',
        sending: 'Envoi...',
        requestingMic: 'Micro requis...',
        calling: 'Appel...',
        ringing: 'Appel entrant...',
        micNotice: 'Assurez-vous d’autoriser le micro.',
        background: 'Fond',
        voiceAlert: 'Alerte voix',
        announce: 'Annoncer',
        femShort: 'Fem',
        maleShort: 'Masc',
        volume: 'Volume',
        aboutAU: 'À propos d\'AU Radio',
        genresText: 'Genres',
        privacyPolicy: 'Politique de confidentialité',
        contactText: 'Contact',
        directoryText: 'Annuaire',
        copyRight: '© 2026 AU Radio — Lecteur de radio en ligne mondial',
        updatePartial: 'MAJ PARTIELLE',
        continue: 'CONTINUER',
        cancelDeletion: 'ANNULER SUPPRESSION',
        deleteAccount: 'SUPPRIMER COMPTE',
        onlineCountLabel: 'en ligne',
        findingSomeoneBtn: 'TROUVER QUELQU’UN',
        waitingForPartnerTitle: 'Attente du partenaire...',
        waitingForPartnerDesc: 'Attente de l’autre utilisateur.',
        contentFiltered: 'CONTENU FILTRÉ',
        mastering: "Mastering & Dynamique", compressor: "Compresseur", threshold: "Seuil", ratio: "Ratio", hifiBass: "Basses HiFi", loudness: "Intensité",
        energySaver: "Économie d’énergie", energySaverDesc: "Réduit la batterie/CPU. Qualité inchangée.",
        resetApp: "Réinitialiser l’app", resetConfirm: "Êtes-vous sûr ? Cette action est irréversible.",
        danceMove: "Pas de danse", switchMove: "Changer",
        density: 'Densité', layout: 'Disposition', layoutCenter: 'Centre', layoutBottom: 'Bas', glow: 'Éclat', bgOpacity: 'Fond',
        safeMode: 'Mode stabilité', safeModeDesc: 'Son propre en arrière-plan.', safeModeEnableMsg: 'Activer la stabilité ?', safeModeDisableMsg: 'Désactiver la stabilité ?',
        accept: 'ACCEPTER', reject: 'REJETER', enter: 'ENTRER', incomingKnock: 'Appel entrant', waitingRoomDesc: 'Attente de l’autre utilisateur.',
        yourNameAlias: 'VOTRE NOM (PSEUDO)', detected: 'Auto-détecté : ', presets: 'Préréglages', selectFile: 'Choisir un fichier', cartoonStyleNotice: 'Un style cartoon sera appliqué',
        playback: '▶ Test lecture', retry: 'Réessayer', sounds: 'Sons', banners: 'Bannières',
        accessRestrictedDesc: 'Pour utiliser le chat, vous devez créer un profil et suivre les règles. 18+',
        introRecorded: '✅ Intro enregistrée', introHook: 'Votre accroche principale',
        streamAttached: 'Stream connecté !', noStreamFound: 'Aucun stream trouvé !',
        cancel: 'ANNULER', settings: 'PARAMÈTRES', voiceCall: 'Appel vocal', videoComingSoon: 'Vidéo bientôt',
        voiceEngineTest: 'Test de voix', acceptedYourKnock: 'A accepté votre appel !', reportReasonPrompt: 'Choisissez le motif du signalement :',
        photoNotDelivered: 'Photo non livrée', uploadFailed: 'Échec du téléchargement',
        stylizedNotice: 'Votre photo sera stylisée pour la confidentialité !', moreAvatarsSoon: 'Plus d’avatars bientôt !',
        profileExpiringWarning: 'Profil expire dans {minutes} min !', signInToChat: '🔐 Connectez-vous avec Google pour discuter.',
        uploadRealPhoto: '📷 Téléchargez une vraie photo pour discuter.', newInviteFrom: 'Nouvelle invitation de {name}', user: 'utilisateur',
        partnerMustConfirm: 'Le partenaire doit confirmer pour commencer.', profileInfoHelps: 'Ces infos aident à trouver des partenaires. Les données sont supprimées automatiquement.',
        playing: 'Lecture...', dataStoredNotice: 'Les données sont stockées uniquement dans ce navigateur.',
        ageRestrictionNotice: 'Désolé, le chat est réservé aux plus de 18 ans.',
        free: 'Libre', noActiveChatsDesc: 'Vos discussions apparaîtront ici. Commencez-en une !',
        restrictedDueToReport: 'Restreint suite à un signalement : {reason}', violation: 'Violation',
    },
    zh: {
        genres: '流派', eras: '时代', moods: '情感', effects: '音效', favorites: '收藏夹',
        listeningTo: '正在播放', loadMore: '加载更多',
        visualizer: '可视化', eq: '均衡器', look: '外观', ambience: '氛围', fx: '音效 FX', sleep: '睡眠定时器',
        vizGalaxy: '银河', resetFlat: '重置', sleepTimer: '睡眠定时器', turnOffTimer: '关闭', alarm: '闹钟', on: '开启', off: '关闭', alarm_set: '闹钟设定为', cardColor: '卡片色调', developerNews: '应用提示', interfaceLanguage: '语言',
        findFriends: '找朋友', completeProfile: '完善资料', displayName: '昵称', gender: '性别', male: '男', female: '女', other: '其他', age: '年龄', country: '国家', city: '城市', saveAndEnter: '保存并进入', login: '登录', any: '不限', search: '搜索',
        tutorialWelcome: '欢迎来到 AU Radio', manualSection2: '电台流：核心功能', manualSection3: '睡眠定时：安心休息', manualSection5: '背景氛围：营造氛围',
        mode: '模式', themeDark: '深色', themeLight: '浅色',
        tutorialStep1: '从流派、时代或情感中选择你的氛围。', tutorialStep2: '点击任何电台卡片即可开始收听。', tutorialStep3: '在此设置睡眠定时器或闹钟。', tutorialStep4: '混合雨声或火声。',
        tagline: '全球在线广播播放器', platform: '全球流媒体平台',
        mobileApp: '移动应用', downloadText: '下载', getTheApp: '获取应用', listenOnGo: '随时随地收听 AU Radio',
        scanCamera: '使用手机摄像头扫描', installApp: '安装应用', qrDesc: '打开手机摄像头并对准二维码以启动应用。',
        androidInst: "点击浏览器菜单 (⋮) 并选择“安装应用”或“添加到主屏幕”。",
        iosInst: "在 Safari 中，点击“分享”按钮（带箭头的正方形），向下滚动并选择“添加到主屏幕”。",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: '返回',
        next: '下一步', gotIt: '知道了', manualTitle: '用户手册', manualIntro: '欢迎来到 AU Radio，您的终极广播体验。', whoAreYou: '你是谁？', createProfile: '创建个人资料。', uploadPhoto: '上传照片', saveProfile: '保存', joinCommunity: '加入社区',
        downloader: '音乐下载', rain: '雨声', fire: '火声', spatialAudio: '8D 音频', spatialHint: '使用耳机效果更佳', editProfile: '编辑资料',
        manual: '手册', soundProfiles: '声音配置文件', oneClickSetup: '一键设置',
        vizStageDancer: '舞者', vizTrioDancers: '三人舞', vizJourney: '旅程', vizDigital: '数字', vizNeon: '霓虹', vizRings: '圆环', vizBubbles: '气泡',
        spatialMixer: '空间混合器',
        jazz: '爵士', blues: '布鲁斯', rock: '摇滚', classical: '古典', electronic: '电子', hiphop: '嘻哈', pop: '流行', rnb: 'R&B', reggae: '雷鬼', soul: '灵魂乐', world: '世界音乐',
        '60s': '60年代', '70s': '70年代', '80s': '80年代', '90s': '90年代', '00s': '00年代', '10s': '10年代', '20s': '20年代',
        chill: '放松', energy: '能量', romantic: '浪漫', dark: '夜店',
        nature: '自然', storm: '风暴', ocean: '海洋', forest: '森林',
        vietnamese: '越南语', japanese: '日语', russian: '俄语', spanish: '西班牙语', italian: '意大利语',
        french: '法语', kazakh: '哈萨克语', kyrgyz: '柯尔克孜语', oriental: '东方', chinese: '中文',
        // 国家
        austria: '奥地利', belgium: '比利时', brazil: '巴西', canada: '加拿大', china: '中国',
        france: '法国', germany: '德国', italy: '意大利', japan: '日本', kazakhstan: '哈萨克斯坦',
        kyrgyzstan: '吉尔吉斯斯坦', netherlands: '荷兰', poland: '波兰', russia: '俄罗斯',
        spain: '西班牙', switzerland: '瑞士', turkey: '土耳其', uk: '英国', ukraine: '乌克兰', usa: '美国',
        unitedStates: '美国', australia: '澳大利亚',
        speed: '速度', react: '感应', bright: '亮度', performanceMode: '可视化模式', accentColor: '强调色', reset: '重置',
        searching: '正在搜索...', noTracks: '找不到曲目。', errorTracks: '抓取曲目出错。', loading: '加载中...', download: '下载', searchTracks: '搜索曲目...',
        infiniteTracks: '无限曲目', noAuth: '无需认证', searchLib: '搜索库...', all: '全部', moodChill: '悠闲', moodEnergy: '活力', moodPhonk: 'Phonk', moodJazz: '爵士', moodParty: '派对',
        feedbackTitle: "反馈", writeDev: "写给开发者", rating: "评分", tellUs: "告诉我们如何改进...", sendSuccess: "消息已发送！", manualTooltip: "用户手册", showWhere: "显示方位", helpImprove: "帮助改进 AU Radio。",
        randomMode: '随机模式', randomModeDesc: '下一首将播放随机风格的电台。', ecoMode: '节能模式',
        mastering: "母带与动态", compressor: "压缩器", threshold: "阈值", ratio: "比率", hifiBass: "HiFi 低音", loudness: "响度",
        energySaver: "省电模式", energySaverDesc: "减少电池和 CPU 使用率。音质不变。",
        resetApp: "重置应用", resetConfirm: "确定要重置吗？此操作不可撤销。",
        danceMove: "舞步", switchMove: "切换动作",
        density: '密度', layout: '布局', layoutCenter: '居中', layoutBottom: '底部', glow: '发光', bgOpacity: '背景',
        safeMode: '高稳定性模式', safeModeDesc: '后台运行更干净。', safeModeEnableMsg: '开启高稳定性模式？', safeModeDisableMsg: '关闭高稳定性模式？',
        aboutAU: '关于 AU Radio',
        genresText: '流派',
        privacyPolicy: '隐私政策',
        contactText: '联系我们',
        directoryText: '目录',
        copyRight: '© 2026 AU Radio — 全球在线广播播放器',
    },
    de: {
        genres: 'Genres', eras: 'Ären', moods: 'Stimmungen', effects: 'Effekte', favorites: 'Favoriten',
        listeningTo: 'Läuft gerade', loadMore: 'Mehr laden',
        visualizer: 'Visualisierung', eq: 'Equalizer', look: 'Aussehen', ambience: 'Atmosphäre', fx: 'Effekte FX', sleep: 'Timer',
        vizGalaxy: 'Galaxie', resetFlat: 'Zurücksetzen', sleepTimer: 'Sleep Timer', turnOffTimer: 'Ausschalten', alarm: 'Wecker', on: 'An', off: 'Aus', alarm_set: 'Wecker gestellt auf', cardColor: 'Kartenfarbe', developerNews: 'Tipps', interfaceLanguage: 'Sprache',
        findFriends: 'Freunde finden', completeProfile: 'Profil vervollständigen', displayName: 'Name', gender: 'Geschlecht', male: 'Männlich', female: 'Weiblich', other: 'Andere', age: 'Alter', country: 'Land', city: 'Stadt', saveAndEnter: 'Speichern', login: 'Login', any: 'Alle', search: 'Suchen',
        tutorialWelcome: 'Willkommen bei AU Radio', manualSection2: 'Radio Stream: Das Herz', manualSection3: 'Sleep Timer: Entspannt schlafen', manualSection5: 'Atmosphäre: Ambiente schaffen',
        mode: 'Modus', themeDark: 'Dunkel', themeLight: 'Hell',
        tutorialStep1: 'Wählen Sie Ihren Stil aus Genres, Ären oder Stimmungen.', tutorialStep2: 'Tippen Sie auf eine Karte, um zu hören.', tutorialStep3: 'Stellen Sie Timer oder Wecker.', tutorialStep4: 'Mischen Sie Regen oder Feuer.',
        tagline: 'Globaler Online-Radio-Streaming-Player', platform: 'Globale Streaming-Plattform',
        mobileApp: 'Mobile App', downloadText: 'Herunterladen', getTheApp: 'App herunterladen', listenOnGo: 'Hören Sie AU Radio unterwegs',
        scanCamera: 'Mit der Handykamera scannen', installApp: 'App installieren', qrDesc: 'Öffnen Sie Ihre Handykamera und richten Sie sie auf den QR-Code, um die App zu starten.',
        androidInst: "Tippen Sie auf das Browser-Menü (⋮) und wählen Sie 'App installieren' oder 'Zum Startbildschirm hinzufügen'.",
        iosInst: "Tippen Sie in Safari auf die Schaltfläche 'Teilen' (Quadrat mit Pfeil), scrollen Sie nach unten und wählen Sie 'Zum Home-Bildschirm'.",
        mobileEngine: 'AU RADIOCHAT MOBILE ENGINE', back: 'Zurück',
        next: 'Weiter', gotIt: 'Verstanden', manualTitle: 'Handbuch', manualIntro: 'Willkommen bei AU Radio, Ihrem ultimativen Radio-Erlebnis.', whoAreYou: 'Wer bist du?', createProfile: 'Profil erstellen.', uploadPhoto: 'Foto hochladen', saveProfile: 'Speichern', joinCommunity: 'Beitreten',
        downloader: 'Musik-Downloader', rain: 'Regen', fire: 'Feuer', spatialAudio: '8D Audio', spatialHint: 'Kopfhörer empfohlen', editProfile: 'Profil bearbeiten',
        manual: 'Handbuch', soundProfiles: 'Sound-Profile', oneClickSetup: 'Ein-Klick-Setup',
        vizStageDancer: 'Tänzer', vizTrioDancers: 'Trio-Tänzer', vizJourney: 'Reise', vizDigital: 'Digital', vizNeon: 'Neon', vizRings: 'Ringe', vizBubbles: 'Blasen',
        spatialMixer: 'Räumlicher Mixer',
        jazz: 'Jazz', blues: 'Blues', rock: 'Rock', classical: 'Klassik', electronic: 'Elektronik', hiphop: 'Hip Hop', pop: 'Pop', rnb: 'R&B', reggae: 'Reggae', soul: 'Soul', world: 'Welt',
        '60s': '60er', '70s': '70er', '80s': '80er', '90s': '90er', '00s': '00er', '10s': '10er', '20s': '20er',
        chill: 'Chill', energy: 'Energie', romantic: 'Romantisch', dark: 'Club',
        nature: 'Natur', storm: 'Sturm', ocean: 'Ozean', forest: 'Wald',
        vietnamese: 'Vietnamesisch', japanese: 'Japanisch', russian: 'Russisch', spanish: 'Spanisch', italian: 'Italienisch',
        french: 'Französisch', kazakh: 'Kasachisch', kyrgyz: 'Kirgisisch', oriental: 'Orientalisch', chinese: 'Chinesisch',
        // Länder
        austria: 'Österreich', belgium: 'Belgien', brazil: 'Brasilien', canada: 'Kanada', china: 'China',
        france: 'Frankreich', germany: 'Deutschland', italy: 'Italien', japan: 'Japan', kazakhstan: 'Kasachstan',
        kyrgyzstan: 'Kirgisistan', netherlands: 'Niederlande', poland: 'Polen', russia: 'Russland',
        spain: 'Spanien', switzerland: 'Schweiz', turkey: 'Türkei', uk: 'Großbritannien', ukraine: 'Ukraine', usa: 'Vereinigte Staaten',
        unitedStates: 'Vereinigte Staaten', australia: 'Australien',
        speed: 'Tempo', react: 'Reaktion', bright: 'Helligkeit', performanceMode: 'Visualisierungsmodus', accentColor: 'Akzentfarbe', reset: 'Reset',
        searching: 'Suche...', noTracks: 'Keine Tracks.', errorTracks: 'Fehler beim Laden.', loading: 'Lade...', download: 'Download', searchTracks: 'Tracks suchen...',
        infiniteTracks: 'Infinite Tracks', noAuth: 'Ohne Anmeldung', searchLib: 'Bibliothek durchsuchen...', all: 'Alle', moodChill: 'Chill', moodEnergy: 'Energie', moodPhonk: 'Phonk', moodJazz: 'Jazz', moodParty: 'Party',
        feedbackTitle: "Feedback", writeDev: "Entwickler schreiben", rating: "Bewerten", tellUs: "Ideen zur Verbesserung...", sendSuccess: "Nachricht gesendet!", manualTooltip: "Handbuch", showWhere: "Wo anzeigen", helpImprove: "Helfen Sie uns, AU Radio zu verbessern.",
        randomMode: 'Zufallsmodus', randomModeDesc: 'Spielt zufällige Stationen beim nächsten Titel.', ecoMode: 'Eco-Modus',
        mastering: "Mastering & Dynamik", compressor: "Kompressor", threshold: "Schwellenwert", ratio: "Verhältnis", hifiBass: "HiFi-Bass", loudness: "Lautheit",
        energySaver: "Energiesparmodus", energySaverDesc: "Schont Akku und CPU. Audioqualität bleibt gleich.",
        resetApp: "App zurücksetzen", resetConfirm: "Sind Sie sicher? Dies kann nicht rückgängig gemacht werden.",
        danceMove: "Dance Move", switchMove: "Wechseln",
        density: 'Dichte', layout: 'Layout', layoutCenter: 'Mitte', layoutBottom: 'Unten', glow: 'Glühen', bgOpacity: 'Hintergrund',
        safeMode: 'Stabilitätsmodus', safeModeDesc: 'Sauberer Sound im Hintergrund.', safeModeEnableMsg: 'Stabilitätsmodus aktivieren?', safeModeDisableMsg: 'Stabilitätsmodus deaktivieren?',
        aboutAU: 'Über AU Radio',
        genresText: 'Genres',
        privacyPolicy: 'Datenschutz-Bestimmungen',
        contactText: 'Kontakt',
        directoryText: 'Verzeichnis',
        copyRight: '© 2026 AU Radio — Globaler Online-Radio-Streaming-Player',
    },
};
export const GLOBAL_PRESETS = [
    { 
        id: 'dj', name: 'DJ', ru: 'DJ', 
        eq: [4, 3, 2, 0, -1, -1, 1, 2, 3, 4], // V-shape
        fx: { reverb: 0.05, speed: 1.0 },
        process: { compressorEnabled: true, compressorThreshold: -20, compressorRatio: 4, bassBoost: 5, loudness: 3 },
        theme: 'midnight'
    },
    { 
        id: 'stars', name: 'Stars', ru: 'Stars', 
        eq: [1, 1, 0, 0, 0, 1, 2, 4, 6, 8], // Air/Treble boost
        fx: { reverb: 0.4, speed: 1.0 },
        process: { compressorEnabled: true, compressorThreshold: -15, compressorRatio: 2, bassBoost: 2, loudness: 0 },
        theme: 'frost'
    },
    { 
        id: 'neon', name: 'Neon', ru: 'Neon', 
        eq: [0, 2, 4, 1, 0, 0, 1, 3, 5, 2], // Punchy Upper-Mid
        fx: { reverb: 0.15, speed: 1.0 },
        process: { compressorEnabled: true, compressorThreshold: -18, compressorRatio: 8, bassBoost: 3, loudness: 2 },
        theme: 'cyber'
    },
    { 
        id: 'deep', name: 'Deep', ru: 'Deep', 
        eq: [8, 6, 4, 2, 0, -2, -4, -4, -2, 0], // Sub-bass focus, darker highs
        fx: { reverb: 0.25, speed: 1.0 },
        process: { compressorEnabled: true, compressorThreshold: -12, compressorRatio: 2, bassBoost: 8, loudness: 2 },
        theme: 'volcano'
    },
    { 
        id: 'relax', name: 'Relax', ru: 'Relax', 
        eq: [2, 1, 0, -1, -2, -1, 0, 1, 2, 3], // Soft V-shape, gentle highs
        fx: { reverb: 0.3, speed: 1.0 },
        process: { compressorEnabled: true, compressorThreshold: -20, compressorRatio: 2, bassBoost: 2, loudness: 1 },
        theme: 'emerald', // Calming green
        ambience: { rainVolume: 0.50, fireVolume: 0.30, rainVariant: 'soft' } 
    },
    { 
        id: 'reset', name: 'Reset', ru: 'Сброс', 
        eq: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        fx: { reverb: 0, speed: 1.0 },
        process: { compressorEnabled: false, compressorThreshold: -20, compressorRatio: 2, bassBoost: 0, loudness: 0 },
        theme: 'volcano',
        ambience: { rainVolume: 0, fireVolume: 0, cityVolume: 0, vinylVolume: 0 } // Clear all
    }
];
