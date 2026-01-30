import { CategoryInfo, UserProfile, Achievement, PassportData } from './types';
import { CloudIcon, FireIcon, MusicNoteIcon, GlobeIcon, MoonIcon, HeartIcon } from './components/Icons';
import React from 'react';

// Radio browser API mirrors
export const RADIO_BROWSER_MIRRORS = [
    'https://all.api.radio-browser.info/json/stations',
    'https://de1.api.radio-browser.info/json/stations',
    'https://at1.api.radio-browser.info/json/stations',
    'https://nl1.api.radio-browser.info/json/stations',
    'https://fr1.api.radio-browser.info/json/stations',
    'https://uk1.api.radio-browser.info/json/stations'
];

export const DEFAULT_VOLUME = 0.5;

export const GENRES: CategoryInfo[] = [
    { id: 'jazz', name: 'Jazz', color: 'from-amber-400 to-orange-600', description: 'Smooth rhythms and improvisations.' },
    { id: 'blues', name: 'Blues', color: 'from-blue-600 to-indigo-800', description: 'Soulful rhythms and melancholic melodies.' },
    { id: 'rock', name: 'Rock', color: 'from-red-600 to-purple-900', description: 'Energetic beats and powerful guitars.' },
    { id: 'classical', name: 'Classical', color: 'from-blue-200 to-slate-400', description: 'Timeless masterpieces and symphonies.' },
    { id: 'electronic', name: 'Electronic', color: 'from-cyan-400 to-blue-600', description: 'Synthesized sounds and modern beats.' },
    { id: 'hiphop', name: 'Hip Hop', color: 'from-green-400 to-yellow-600', description: 'Rhythmic speech and street culture.' },
    { id: 'pop', name: 'Pop', color: 'from-pink-400 to-rose-600', description: 'Catchy melodies and chart-topping hits.' },
    { id: 'rnb', name: 'R&B', color: 'from-violet-500 to-fuchsia-600', description: 'Rhythm and Blues, soulful and smooth.' },
    { id: 'reggae', name: 'Reggae', color: 'from-green-500 to-yellow-500', description: 'Relaxed Jamaican rhythms and vibes.' },
    { id: 'soul', name: 'Soul', color: 'from-rose-400 to-orange-400', description: 'Deeply emotional vocal music.' },
    { id: 'islamic', name: 'Faith & Religion', color: 'from-emerald-600 to-teal-900', description: 'Spiritual readings, prayers, and religious texts.' }
];

export const ERAS: CategoryInfo[] = [
    { id: '60s', name: '60s', color: 'from-yellow-300 to-orange-500', description: 'The era of peace, love, and rock & roll.' },
    { id: '70s', name: '70s', color: 'from-orange-500 to-red-600', description: 'Disco, funk, and the rise of stadium rock.' },
    { id: '80s', name: '80s', color: 'from-fuchsia-500 to-indigo-600', description: 'Synth-pop, big hair, and MTV classics.' },
    { id: '90s', name: '90s', color: 'from-teal-400 to-blue-500', description: 'Grunge, rave culture, and the golden age of R&B.' },
    { id: '00s', name: '00s', color: 'from-slate-400 to-slate-600', description: 'The digital revolution and fusion genres.' }
];

export const MOODS: CategoryInfo[] = [
    { id: 'chill', name: 'Chill', type: 'mood', color: 'from-blue-400 to-indigo-500', description: 'Relaxing tunes for a peaceful mind.' },
    { id: 'energy', name: 'Energy', type: 'mood', color: 'from-yellow-400 to-orange-500', description: 'Upbeat tracks to get you moving.' },
    { id: 'focus', name: 'Focus', type: 'mood', color: 'from-emerald-400 to-teal-600', description: 'Background music for work and study.' },
    { id: 'romantic', name: 'Romantic', type: 'mood', color: 'from-rose-400 to-pink-600', description: 'Melodies for special moments.' },
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
    { id: 'kavkaz', name: 'Caucasian', type: 'mood', color: 'from-stone-500 to-stone-700', description: 'Music from the Caucasus.' },
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

// Blocked countries - not allowed to access chat
export const BLOCKED_COUNTRIES = [
  'North Korea', 'DPRK', 'Democratic People\'s Republic of Korea',
  'Guatemala',
  'Turkmenistan',
  // Central African countries (except South Africa)
  'Central African Republic', 'Chad', 'Cameroon', 'Republic of the Congo', 'Democratic Republic of the Congo',
  'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe',
  'Burundi', 'Rwanda', 'Uganda', 'South Sudan', 'Sudan',
  'Eritrea', 'Djibouti', 'Somalia',
  'Mali', 'Niger', 'Burkina Faso', 'Mauritania',
  'Liberia', 'Sierra Leone', 'Guinea', 'Guinea-Bissau',
  // Seychelles
  'Seychelles',
  // Pacific Islands
  'Tuvalu', 'Nauru', 'Palau', 'Marshall Islands', 'Micronesia', 
  'Kiribati', 'Tonga', 'Samoa', 'Vanuatu', 'Solomon Islands',
];

export const COUNTRIES_DATA = [
  // Europe
  { name: 'Albania', lat: 41.15, lon: 20.16, cities: ['Tirana', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan'] },
  { name: 'Andorra', lat: 42.54, lon: 1.57, cities: ['Andorra la Vella', 'Escaldes-Engordany', 'Encamp', 'Sant Julià de Lòria'] },
  { name: 'Armenia', lat: 40.06, lon: 45.03, cities: ['Yerevan', 'Gyumri', 'Vanadzor', 'Hrazdan', 'Abovyan'] },
  { name: 'Austria', lat: 47.51, lon: 14.55, cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'] },
  { name: 'Azerbaijan', lat: 40.14, lon: 47.57, cities: ['Baku', 'Ganja', 'Sumgait', 'Mingachevir', 'Lankaran'] },
  { name: 'Belarus', lat: 53.70, lon: 27.95, cities: ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk', 'Grodno'] },
  { name: 'Belgium', lat: 50.50, lon: 4.46, cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'] },
  { name: 'Bosnia and Herzegovina', lat: 43.91, lon: 17.67, cities: ['Sarajevo', 'Banja Luka', 'Tuzla', 'Zenica', 'Mostar'] },
  { name: 'Bulgaria', lat: 42.73, lon: 25.48, cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'] },
  { name: 'Croatia', lat: 45.10, lon: 15.20, cities: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'] },
  { name: 'Cyprus', lat: 35.12, lon: 33.42, cities: ['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos'] },
  { name: 'Czech Republic', lat: 49.81, lon: 15.47, cities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'] },
  { name: 'Czechia', lat: 49.81, lon: 15.47, cities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'] },
  { name: 'Denmark', lat: 56.26, lon: 9.50, cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'] },
  { name: 'Estonia', lat: 58.59, lon: 25.01, cities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve'] },
  { name: 'Finland', lat: 61.92, lon: 25.74, cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu'] },
  { name: 'France', lat: 46.22, lon: 2.21, cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'] },
  { name: 'Georgia', lat: 42.31, lon: 43.35, cities: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi'] },
  { name: 'Germany', lat: 51.16, lon: 10.45, cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'] },
  { name: 'Greece', lat: 39.07, lon: 21.82, cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'] },
  { name: 'Hungary', lat: 47.16, lon: 19.50, cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'] },
  { name: 'Iceland', lat: 64.96, lon: -19.02, cities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Akureyri'] },
  { name: 'Ireland', lat: 53.14, lon: -7.69, cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'] },
  { name: 'Italy', lat: 41.87, lon: 12.56, cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence'] },
  { name: 'Latvia', lat: 56.87, lon: 24.60, cities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala'] },
  { name: 'Liechtenstein', lat: 47.16, lon: 9.55, cities: ['Vaduz', 'Schaan', 'Balzers', 'Triesen'] },
  { name: 'Lithuania', lat: 55.16, lon: 23.88, cities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'] },
  { name: 'Luxembourg', lat: 49.81, lon: 6.12, cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange'] },
  { name: 'Malta', lat: 35.93, lon: 14.37, cities: ['Valletta', 'Birkirkara', 'Qormi', 'Sliema', 'Mosta'] },
  { name: 'Moldova', lat: 47.41, lon: 28.36, cities: ['Chișinău', 'Tiraspol', 'Bălți', 'Bender', 'Rîbnița'] },
  { name: 'Monaco', lat: 43.73, lon: 7.41, cities: ['Monaco', 'Monte Carlo', 'La Condamine'] },
  { name: 'Montenegro', lat: 42.70, lon: 19.37, cities: ['Podgorica', 'Nikšić', 'Pljevlja', 'Bijelo Polje', 'Herceg Novi'] },
  { name: 'Netherlands', lat: 52.13, lon: 5.29, cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'] },
  { name: 'North Macedonia', lat: 41.51, lon: 21.74, cities: ['Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo'] },
  { name: 'Norway', lat: 60.47, lon: 8.46, cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'] },
  { name: 'Poland', lat: 51.91, lon: 19.14, cities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin'] },
  { name: 'Portugal', lat: 39.39, lon: -8.22, cities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'] },
  { name: 'Romania', lat: 45.94, lon: 24.96, cities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'] },
  { name: 'Russia', lat: 61.52, lon: 105.31, cities: ['Moscow', 'Saint Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg', 'Chelyabinsk', 'Samara', 'Krasnodar'] },
  { name: 'San Marino', lat: 43.94, lon: 12.45, cities: ['San Marino', 'Serravalle', 'Borgo Maggiore'] },
  { name: 'Serbia', lat: 44.01, lon: 21.00, cities: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica'] },
  { name: 'Slovakia', lat: 48.66, lon: 19.69, cities: ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica'] },
  { name: 'Slovenia', lat: 46.15, lon: 14.99, cities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper'] },
  { name: 'Spain', lat: 40.46, lon: -3.74, cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'] },
  { name: 'Sweden', lat: 60.12, lon: 18.64, cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'] },
  { name: 'Switzerland', lat: 46.81, lon: 8.22, cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern'] },
  { name: 'Ukraine', lat: 48.37, lon: 31.16, cities: ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Lviv', 'Zaporizhzhia', 'Kryvyi Rih'] },
  { name: 'UK', lat: 55.37, lon: -3.43, cities: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Manchester', 'Leeds', 'Bristol', 'Edinburgh'] },
  { name: 'United Kingdom', lat: 55.37, lon: -3.43, cities: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Manchester', 'Leeds', 'Bristol', 'Edinburgh'] },
  { name: 'Vatican City', lat: 41.90, lon: 12.45, cities: ['Vatican City'] },
  
  // Asia
  { name: 'Afghanistan', lat: 33.93, lon: 67.70, cities: ['Kabul', 'Kandahar', 'Herat', 'Mazar-i-Sharif', 'Jalalabad'] },
  { name: 'Bahrain', lat: 26.02, lon: 50.55, cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'] },
  { name: 'Bangladesh', lat: 23.68, lon: 90.35, cities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'] },
  { name: 'Bhutan', lat: 27.51, lon: 90.43, cities: ['Thimphu', 'Phuntsholing', 'Paro', 'Punakha'] },
  { name: 'Brunei', lat: 4.53, lon: 114.72, cities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong'] },
  { name: 'Cambodia', lat: 12.56, lon: 104.99, cities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville'] },
  { name: 'China', lat: 35.86, lon: 104.19, cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan', 'Xi\'an', 'Hangzhou'] },
  { name: 'Hong Kong', lat: 22.39, lon: 114.10, cities: ['Hong Kong', 'Kowloon', 'Victoria', 'Sha Tin', 'Tuen Mun'] },
  { name: 'India', lat: 20.59, lon: 78.96, cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'] },
  { name: 'Indonesia', lat: -0.78, lon: 113.92, cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar'] },
  { name: 'Iran', lat: 32.42, lon: 53.68, cities: ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Shiraz', 'Tabriz'] },
  { name: 'Iraq', lat: 33.22, lon: 43.67, cities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Sulaymaniyah'] },
  { name: 'Israel', lat: 31.04, lon: 34.85, cities: ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva'] },
  { name: 'Japan', lat: 36.20, lon: 138.25, cities: ['Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Yokohama', 'Kobe', 'Kyoto'] },
  { name: 'Jordan', lat: 30.58, lon: 36.23, cities: ['Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Aqaba'] },
  { name: 'Kazakhstan', lat: 48.01, lon: 66.92, cities: ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe', 'Taraz', 'Pavlodar', 'Ust-Kamenogorsk', 'Semey', 'Atyrau'] },
  { name: 'Kuwait', lat: 29.31, lon: 47.48, cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Farwaniya'] },
  { name: 'Kyrgyzstan', lat: 41.20, lon: 74.76, cities: ['Bishkek', 'Osh', 'Jalal-Abad', 'Karakol', 'Naryn', 'Tokmok'] },
  { name: 'Laos', lat: 19.85, lon: 102.49, cities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang'] },
  { name: 'Lebanon', lat: 33.85, lon: 35.86, cities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Jounieh'] },
  { name: 'Macau', lat: 22.19, lon: 113.54, cities: ['Macau', 'Taipa', 'Coloane'] },
  { name: 'Malaysia', lat: 4.21, lon: 101.97, cities: ['Kuala Lumpur', 'Johor Bahru', 'George Town', 'Ipoh', 'Kuching'] },
  { name: 'Maldives', lat: 3.20, lon: 73.22, cities: ['Malé', 'Addu City', 'Fuvahmulah'] },
  { name: 'Mongolia', lat: 46.86, lon: 103.84, cities: ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Choibalsan'] },
  { name: 'Myanmar', lat: 21.91, lon: 95.95, cities: ['Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Mawlamyine'] },
  { name: 'Nepal', lat: 28.39, lon: 84.12, cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur'] },
  { name: 'Oman', lat: 21.51, lon: 55.92, cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur'] },
  { name: 'Pakistan', lat: 30.37, lon: 69.34, cities: ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Islamabad', 'Multan'] },
  { name: 'Palestine', lat: 31.95, lon: 35.23, cities: ['Gaza', 'Ramallah', 'Hebron', 'Nablus', 'Bethlehem'] },
  { name: 'Philippines', lat: 12.87, lon: 121.77, cities: ['Manila', 'Quezon City', 'Davao', 'Cebu City', 'Zamboanga City'] },
  { name: 'Qatar', lat: 25.35, lon: 51.18, cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal'] },
  { name: 'Saudi Arabia', lat: 23.88, lon: 45.07, cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif'] },
  { name: 'Singapore', lat: 1.35, lon: 103.81, cities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Ang Mo Kio'] },
  { name: 'South Korea', lat: 35.90, lon: 127.76, cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan'] },
  { name: 'Sri Lanka', lat: 7.87, lon: 80.77, cities: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo'] },
  { name: 'Syria', lat: 34.80, lon: 38.99, cities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama'] },
  { name: 'Taiwan', lat: 23.69, lon: 120.96, cities: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hsinchu'] },
  { name: 'Tajikistan', lat: 38.86, lon: 71.27, cities: ['Dushanbe', 'Khujand', 'Kulob', 'Bokhtar', 'Istaravshan'] },
  { name: 'Thailand', lat: 15.87, lon: 100.99, cities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Nakhon Ratchasima'] },
  { name: 'Timor-Leste', lat: -8.87, lon: 125.72, cities: ['Dili', 'Baucau', 'Maliana', 'Suai'] },
  { name: 'Turkey', lat: 38.96, lon: 35.24, cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep'] },
  { name: 'UAE', lat: 23.42, lon: 53.84, cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah'] },
  { name: 'United Arab Emirates', lat: 23.42, lon: 53.84, cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah'] },
  { name: 'Uzbekistan', lat: 41.37, lon: 64.58, cities: ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana'] },
  { name: 'Vietnam', lat: 14.05, lon: 108.27, cities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Nha Trang'] },
  { name: 'Yemen', lat: 15.55, lon: 48.51, cities: ['Sanaa', 'Aden', 'Taiz', 'Hodeidah', 'Mukalla'] },
  
  // Americas
  { name: 'Argentina', lat: -38.41, lon: -63.61, cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata'] },
  { name: 'Bolivia', lat: -16.29, lon: -63.58, cities: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Oruro'] },
  { name: 'Brazil', lat: -14.23, lon: -51.92, cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Curitiba'] },
  { name: 'Canada', lat: 56.13, lon: -106.34, cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg'] },
  { name: 'Chile', lat: -35.67, lon: -71.54, cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'] },
  { name: 'Colombia', lat: 4.57, lon: -74.29, cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'] },
  { name: 'Costa Rica', lat: 9.74, lon: -83.75, cities: ['San José', 'Limón', 'San Francisco', 'Alajuela', 'Heredia'] },
  { name: 'Cuba', lat: 21.52, lon: -77.78, cities: ['Havana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Santa Clara'] },
  { name: 'Dominican Republic', lat: 18.73, lon: -70.16, cities: ['Santo Domingo', 'Santiago', 'San Pedro de Macorís', 'La Romana'] },
  { name: 'Ecuador', lat: -1.83, lon: -78.18, cities: ['Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Machala'] },
  { name: 'El Salvador', lat: 13.79, lon: -88.89, cities: ['San Salvador', 'Santa Ana', 'San Miguel', 'Mejicanos'] },
  { name: 'Honduras', lat: 15.19, lon: -86.24, cities: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba'] },
  { name: 'Jamaica', lat: 18.10, lon: -77.29, cities: ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore'] },
  { name: 'Mexico', lat: 23.63, lon: -102.55, cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Toluca', 'Tijuana', 'León'] },
  { name: 'Nicaragua', lat: 12.86, lon: -85.20, cities: ['Managua', 'León', 'Masaya', 'Matagalpa', 'Chinandega'] },
  { name: 'Panama', lat: 8.53, lon: -80.78, cities: ['Panama City', 'San Miguelito', 'Tocumen', 'David', 'Colón'] },
  { name: 'Paraguay', lat: -23.44, lon: -58.44, cities: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque'] },
  { name: 'Peru', lat: -9.18, lon: -75.01, cities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco'] },
  { name: 'Puerto Rico', lat: 18.22, lon: -66.59, cities: ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas'] },
  { name: 'Trinidad and Tobago', lat: 10.69, lon: -61.22, cities: ['Port of Spain', 'San Fernando', 'Chaguanas', 'Arima'] },
  { name: 'Uruguay', lat: -32.52, lon: -55.76, cities: ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera'] },
  { name: 'USA', lat: 37.09, lon: -95.71, cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Miami'] },
  { name: 'United States', lat: 37.09, lon: -95.71, cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Miami'] },
  { name: 'Venezuela', lat: 6.42, lon: -66.58, cities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'] },
  
  // Africa (Allowed countries - mainly North and South Africa)
  { name: 'Algeria', lat: 28.03, lon: 1.65, cities: ['Algiers', 'Oran', 'Constantine', 'Batna', 'Djelfa'] },
  { name: 'Angola', lat: -11.20, lon: 17.87, cities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'] },
  { name: 'Botswana', lat: -22.32, lon: 24.68, cities: ['Gaborone', 'Francistown', 'Molepolole', 'Serowe'] },
  { name: 'Egypt', lat: 26.82, lon: 30.80, cities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor'] },
  { name: 'Ethiopia', lat: 9.14, lon: 40.48, cities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Gondar', 'Hawassa'] },
  { name: 'Ghana', lat: 7.94, lon: -1.02, cities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast'] },
  { name: 'Ivory Coast', lat: 7.54, lon: -5.54, cities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San-Pédro'] },
  { name: 'Kenya', lat: -0.02, lon: 37.90, cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'] },
  { name: 'Libya', lat: 26.33, lon: 17.22, cities: ['Tripoli', 'Benghazi', 'Misrata', 'Zawiya', 'Khoms'] },
  { name: 'Madagascar', lat: -18.76, lon: 46.86, cities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa'] },
  { name: 'Mauritius', lat: -20.34, lon: 57.55, cities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe'] },
  { name: 'Morocco', lat: 31.79, lon: -7.09, cities: ['Casablanca', 'Rabat', 'Fez', 'Marrakesh', 'Tangier', 'Agadir'] },
  { name: 'Mozambique', lat: -18.66, lon: 35.52, cities: ['Maputo', 'Beira', 'Nampula', 'Chimoio', 'Quelimane'] },
  { name: 'Namibia', lat: -22.95, lon: 18.49, cities: ['Windhoek', 'Walvis Bay', 'Swakopmund', 'Rundu', 'Oshakati'] },
  { name: 'Nigeria', lat: 9.08, lon: 8.67, cities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt', 'Benin City'] },
  { name: 'Senegal', lat: 14.49, lon: -14.45, cities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Saint-Louis'] },
  { name: 'South Africa', lat: -30.56, lon: 22.93, cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'] },
  { name: 'Tanzania', lat: -6.36, lon: 34.88, cities: ['Dar es Salaam', 'Mwanza', 'Zanzibar City', 'Arusha', 'Dodoma'] },
  { name: 'Tunisia', lat: 33.88, lon: 9.53, cities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'] },
  { name: 'Zambia', lat: -13.13, lon: 27.84, cities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Livingstone'] },
  { name: 'Zimbabwe', lat: -19.01, lon: 29.15, cities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'] },
  
  // Oceania
  { name: 'Australia', lat: -25.27, lon: 133.77, cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle'] },
  { name: 'Fiji', lat: -17.71, lon: 178.06, cities: ['Suva', 'Nadi', 'Lautoka', 'Labasa'] },
  { name: 'New Zealand', lat: -40.90, lon: 174.88, cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin'] },
  { name: 'Papua New Guinea', lat: -6.31, lon: 143.95, cities: ['Port Moresby', 'Lae', 'Arawa', 'Mount Hagen'] },
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
  'UAE': { timezones: ['Asia/Dubai'], locales: ['ar-AE', 'ar'], utcOffsetRange: [4, 4] },
  'UK': { timezones: ['Europe/London'], locales: ['en-GB', 'en'], utcOffsetRange: [0, 1] },
  'Ukraine': { timezones: ['Europe/Kiev', 'Europe/Kyiv'], locales: ['uk-UA', 'ru-UA', 'uk'], utcOffsetRange: [2, 3] },
  'USA': { timezones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix'], locales: ['en-US'], utcOffsetRange: [-10, -4] },
  'Uzbekistan': { timezones: ['Asia/Tashkent', 'Asia/Samarkand'], locales: ['uz-UZ', 'ru-UZ', 'uz', 'ru'], utcOffsetRange: [5, 5] },
};

export const DEMO_USERS: UserProfile[] = [
    { id: 'd1', name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=11', age: 22, country: 'Kazakhstan', city: 'Almaty', status: 'online', safetyLevel: 'green', bio: '', gender: 'female', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd2', name: 'Marcus', avatar: 'https://i.pravatar.cc/150?u=12', age: 28, country: 'Germany', city: 'Berlin', status: 'online', safetyLevel: 'green', bio: '', gender: 'male', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd3', name: 'Sofia', avatar: 'https://i.pravatar.cc/150?u=13', age: 24, country: 'France', city: 'Paris', status: 'offline', safetyLevel: 'green', bio: '', gender: 'female', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd4', name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=14', age: 31, country: 'USA', city: 'New York', status: 'online', safetyLevel: 'green', bio: '', gender: 'male', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd5', name: 'Aisha', avatar: 'https://i.pravatar.cc/150?u=15', age: 20, country: 'Kazakhstan', city: 'Astana', status: 'online', safetyLevel: 'green', bio: '', gender: 'female', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd6', name: 'Liam', avatar: 'https://i.pravatar.cc/150?u=16', age: 26, country: 'UK', city: 'London', status: 'offline', safetyLevel: 'green', bio: '', gender: 'male', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd7', name: 'Mika', avatar: 'https://i.pravatar.cc/150?u=17', age: 23, country: 'Japan', city: 'Tokyo', status: 'online', safetyLevel: 'green', bio: '', gender: 'female', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } },
    { id: 'd8', name: 'Kaan', avatar: 'https://i.pravatar.cc/150?u=18', age: 29, country: 'Turkey', city: 'Istanbul', status: 'online', safetyLevel: 'green', bio: '', gender: 'male', blockedUsers: [], hasAgreedToRules: true, filters: { minAge: 18, maxAge: 99, countries: [], languages: [], genders: ['any'], soundEnabled: true }, chatSettings: { notificationsEnabled: true, notificationVolume: 0.8, notificationSound: 'default' } }
];

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

export const NEWS_MESSAGES: Record<string, string[]> = {
    en: [
        "🎛 PRO Tip: Mix 'HiFi Bass' and 'Loudness' in the FX tab to achieve crystal clear studio quality.",
        "🏟 Live Concert Feel: Add 20% 'Reverb' and a touch of 'City' noise to feel like you're in a concert hall.",
        "☕️ Cozy Vibe: Play some Jazz, add 40% 'Vinyl' crackle and 10% 'Fire' for the perfect evening.",
        "🎧 8D Magic: Put on headphones and enable 'Spatial Audio' — feel the music rotate around you.",
        "🔋 Low Battery? Turn on 'Energy Saver' in Visual settings to save power.",
        "🚀 Pump it up: Crank up the 'Compressor' for Electronic and Phonk tracks to get that punchy sound.",
        "🌌 Full Immersion: Double-click the visualizer to enter fullscreen mode.",
        "⚙️ Settings: Rotate phone (landscape) for more features."
    ],
    ru: [
        "🎛 PRO Совет: Смешайте 'HiFi Bass' и 'Loudness' во вкладке FX, чтобы добиться кристально чистого студийного качества.",
        "🏟 Эффект присутствия: Добавьте 20% 'Reverb' и немного шума 'City' — почувствуйте себя в центре концертного зала.",
        "☕️ Ламповая атмосфера: Включите джаз, добавьте 40% 'Vinyl' и 10% 'Fire' для идеального уютного вечера.",
        "🎧 8D Звук: Обязательно наденьте наушники и активируйте 'Spatial Audio' — музыка начнет вращаться вокруг вас.",
        "🔋 Слабая батарея? Включите 'Энергосбережение' в настройках визуала, чтобы продлить жизнь телефона.",
        "🚀 Драйв: Для электроники и фонка выкрутите 'Compressor' — это добавит плотности и кача вашим трекам.",
        "🌌 Полное погружение: Дважды кликните по визуализатору, чтобы развернуть его на весь экран.",
        "⚙️ Настройки: Поверни телефон (ландшафт) — больше функций."
    ]
};

export const TRANSLATIONS: Record<string, any> = {
    en: {
        genres: 'Genres', eras: 'Eras', moods: 'Moods', effects: 'Effects', favorites: 'Favorites',
        listeningTo: 'Listening to', loadMore: 'Load More',
        visualizer: 'Visualizer', eq: 'Equalizer', look: 'Appearance', ambience: 'Ambience', fx: 'Effects FX', sleep: 'Sleep Timer',
        vizGalaxy: 'Galaxy', resetFlat: 'Reset Flat', sleepTimer: 'Sleep Timer', turnOffTimer: 'Turn Off', alarm: 'Alarm', on: 'On', off: 'Off', alarm_set: 'Alarm set to', cardColor: 'Card Tint', developerNews: 'App Tips', interfaceLanguage: 'Language',
        findFriends: 'Find Friends', completeProfile: 'Complete Profile', displayName: 'Display Name', gender: 'Gender', male: 'Male', female: 'Female', other: 'Other', age: 'Age', country: 'Country', city: 'City', saveAndEnter: 'Save & Enter', login: 'Login', any: 'Any', search: 'Search', knock: 'Knock',
        tutorialWelcome: 'Welcome to StreamFlow', manualSection2: 'Radio Stream: The Core', manualSection3: 'Sleep Timer: Rest Easy', manualSection5: 'Ambience: Create Atmosphere', manualSection4: 'Chat: Connect Safely',
        tutorialStep1: 'Choose your vibe from Genres, Eras, or Moods.', tutorialStep2: 'Tap any station card to start listening immediately.', tutorialStep3: 'Set a sleep timer or alarm here.', tutorialStep4: 'Mix ambient sounds like rain or fire.', tutorialStep5: 'Chat securely with others listening now.',
        next: 'Next', gotIt: 'Got it', manualTitle: 'User Manual', manualIntro: 'Welcome to StreamFlow, your ultimate radio experience.', whoAreYou: 'Who are you?', createProfile: 'Create your profile to connect.', uploadPhoto: 'Upload Photo', saveProfile: 'Save Profile', joinCommunity: 'Join Community',
        downloader: 'Music Downloader', rain: 'Rain', spatialAudio: '8D Audio', spatialHint: 'Use headphones for best effect', editProfile: 'Edit Profile',
        vizStageDancer: 'Stage Dancer', vizTrioDancers: 'Trio Dancers', vizJourney: 'Journey', vizDigital: 'Digital', vizNeon: 'Neon', vizRings: 'Rings', vizBubbles: 'Bubbles',
        spatialMixer: 'Spatial Mixer',
        // Category Translations
        jazz: 'Jazz', blues: 'Blues', rock: 'Rock', classical: 'Classical', electronic: 'Electronic', hiphop: 'Hip Hop', pop: 'Pop', islamic: 'Faith & Religion', rnb: 'R&B', reggae: 'Reggae', soul: 'Soul',
        '60s': '60s', '70s': '70s', '80s': '80s', '90s': '90s', '00s': '00s',
        chill: 'Chill', energy: 'Energy', focus: 'Focus', romantic: 'Romantic', dark: 'Club',
        nature: 'Nature', storm: 'Storm', ocean: 'Ocean', forest: 'Forest',
        // World Music
        vietnamese: 'Vietnamese', japanese: 'Japanese', russian: 'Russian', spanish: 'Spanish', italian: 'Italian',
        french: 'French', kazakh: 'Kazakh', kyrgyz: 'Kyrgyz', kavkaz: 'Caucasian', oriental: 'Oriental', chinese: 'Chinese',
        // Missing Translations Added
        speed: 'Speed', react: 'React', bright: 'Bright', performanceMode: 'Visualizer Mode', accentColor: 'Accent Color', reset: 'Reset',
        privateChat: 'PRIVATE CHAT', authTitle: 'Communication Without Borders', authDesc: 'Connect to your personal secure hub. Chat 1-on-1 with mutual consent only. No spam, no noise.', signInGuest: 'Sign in as Guest', online: 'Online', today: 'Today', recording: 'Recording...', send: 'SEND', noUsers: 'No users found', showAll: 'Show All', knocking: 'Knocking', wantsToConnect: 'wants to connect', myDialogs: 'My Dialogs', noChats: 'No chats yet', useDiscovery: "Use 'Discovery Drum' to find people or wait for the Welcome Bot.", photoExpired: '📸 Photo expired', audioExpired: '🎤 Audio expired',
        knockSent: 'Knock Sent!', signInAlert: 'Please sign in via the Chat Panel first.',
        searching: 'Searching databases...', noTracks: 'No tracks found.', errorTracks: 'Error fetching tracks.', loading: 'Loading...', download: 'Download', searchTracks: 'Search tracks...',
        infiniteTracks: 'Infinite Tracks', noAuth: 'No Auth Required', searchLib: 'Search infinite library...', all: 'All', moodChill: 'Chill', moodEnergy: 'Energy', moodPhonk: 'Phonk', moodFocus: 'Focus', moodJazz: 'Jazz', moodParty: 'Party',
        dragRotate: 'Drag to rotate • Click name to play',
        // Feedback
        feedbackTitle: "Feedback",
        writeDev: "Write to Developer",
        rating: "Rate App",
        tellUs: "Tell us what to improve...",
        sendSuccess: "Message sent!",
        manualTooltip: "User Manual",
        showWhere: "Show location",
        helpImprove: "Help us improve StreamFlow.",
        // New
        fpsLimit: 'Save Battery (30 FPS)',
        fpsLimitDesc: 'Reduces smoothness to save battery on weak devices.',
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
        resetConfirm: "Are you sure you want to reset all settings and data? This action cannot be undone."
    },
    ru: {
        genres: 'Жанры', eras: 'Эпохи', moods: 'Настроение', effects: 'Эффекты', favorites: 'Избранное',
        listeningTo: 'В эфире', loadMore: 'Загрузить еще',
        visualizer: 'Визуал', eq: 'Звук', look: 'Стиль', ambience: 'Атмосфера', fx: 'Эффекты', sleep: 'Сон',
        vizGalaxy: 'Космос', resetFlat: 'Сброс', sleepTimer: 'Режим сна', turnOffTimer: 'Отключить', alarm: 'Будильник', on: 'Вкл', off: 'Выкл', alarm_set: 'Разбудить в', cardColor: 'Оттенок блоков', developerNews: 'Советы', interfaceLanguage: 'Язык',
        findFriends: 'Поиск людей', completeProfile: 'Ваш профиль', displayName: 'Ваше имя', gender: 'Пол', male: 'Мужской', female: 'Женский', other: 'Другой', age: 'Возраст', country: 'Страна', city: 'Город', saveAndEnter: 'Войти', login: 'Логин', any: 'Неважно', search: 'Найти', knock: 'Постучаться',
        tutorialWelcome: 'Добро пожаловать', manualSection2: 'Радио: Сердце Эфира', manualSection3: 'Таймер Сна: Отдыхайте', manualSection5: 'Атмосфера: Создайте Уют', manualSection4: 'Чат: Общайтесь Безопасно',
        tutorialStep1: 'Выберите настроение, жанр или эпоху.', tutorialStep2: 'Нажмите на любую станцию, чтобы начать.', tutorialStep3: 'Здесь можно поставить таймер или будильник.', tutorialStep4: 'Смешивайте звуки дождя или огня.', tutorialStep5: 'Безопасный чат с другими слушателями.',
        next: 'Далее', gotIt: 'Понятно', manualTitle: 'Руководство', manualIntro: 'Добро пожаловать в StreamFlow — ваш идеальный радио-опыт.', whoAreYou: 'Кто вы?', createProfile: 'Создайте профиль для общения.', uploadPhoto: 'Загрузить фото', saveProfile: 'Сохранить', joinCommunity: 'Присоединиться',
        downloader: 'Загрузчик Музыки', rain: 'Дождь', spatialAudio: '8D Звук', spatialHint: 'В наушниках лучше', editProfile: 'Ред. Профиль',
        vizStageDancer: 'Танцор', vizTrioDancers: 'Трио', vizJourney: 'Полет', vizDigital: 'Цифра', vizNeon: 'Неон', vizRings: 'Кольца', vizBubbles: 'Пузыри',
        spatialMixer: 'Звуковая Сцена',
        // Category Translations
        jazz: 'Джаз', blues: 'Блюз', rock: 'Рок', classical: 'Классика', electronic: 'Электроника', hiphop: 'Хип-хоп', pop: 'Поп', islamic: 'Религия', rnb: 'R&B', reggae: 'Регги', soul: 'Соул',
        '60s': '60-е', '70s': '70-е', '80s': '80-е', '90s': '90-е', '00s': '00-е',
        chill: 'Чилл', energy: 'Энергия', focus: 'Фокус', romantic: 'Романтика', dark: 'Клуб',
        nature: 'Природа', storm: 'Шторм', ocean: 'Океан', forest: 'Лес',
        // World Music
        vietnamese: 'Вьетнамская', japanese: 'Японская', russian: 'Русская', spanish: 'Испанская', italian: 'Итальянская',
        french: 'Французская', kazakh: 'Казахская', kyrgyz: 'Кыргызская', kavkaz: 'Кавказская', oriental: 'Восточная', chinese: 'Китайская',
        // Missing Translations Added
        speed: 'Скорость', react: 'Реакция', bright: 'Яркость', performanceMode: 'Режим визуализации', accentColor: 'Акцент', reset: 'Сброс',
        privateChat: 'ЛИЧНЫЙ ЧАТ', authTitle: 'Общение без границ', authDesc: 'Ваш безопасный хаб. Общение 1-на-1 только по взаимному согласию. Без спама и шума.', signInGuest: 'Войти как Гость', online: 'Онлайн', сегодня: 'Сегодня', recording: 'Запись...', send: 'ОТПРАВИТЬ', noUsers: 'Никого не найдено', showAll: 'Показать всех', knocking: 'Стучится', wantsToConnect: 'хочет общаться', myDialogs: 'Мои Диалоги', noChats: 'Пока нет чатов', useDiscovery: "Используйте 'Барабан Открытий' или ждите приветствия.", photoExpired: '📸 Фото истекло', audioExpired: '🎤 Аудио истекло',
        knockSent: 'Отправлено!', signInAlert: 'Пожалуйста, сначала войдите через панель чата.',
        searching: 'Поиск в базах...', noTracks: 'Треки не найдены.', errorTracks: 'Ошибка загрузки.', loading: 'Загрузка...', download: 'Скачать', searchTracks: 'Поиск треков...',
        infiniteTracks: 'Бесконечные Треки', noAuth: 'Без регистрации', searchLib: 'Поиск в библиотеке...', all: 'Все', moodChill: 'Чилл', moodEnergy: 'Энергия', moodPhonk: 'Фонк', moodFocus: 'Фокус', moodJazz: 'Джаз', moodParty: 'Вечеринка',
        dragRotate: 'Тяни для вращения • Клик для игры',
        // Feedback
        feedbackTitle: "Отзывы",
        writeDev: "Написать разработчику",
        rating: "Рейтинг",
        tellUs: "Ваши пожелания и замечания...",
        sendSuccess: "Сообщение отправлено!",
        manualTooltip: "Мануал",
        showWhere: "Показать где",
        helpImprove: "Помогите нам улучшить StreamFlow.",
        // New
        fpsLimit: 'Экономия (30 FPS)',
        fpsLimitDesc: 'Снижает плавность для слабых устройств.',
        ecoMode: 'Эко Режим (Звезды)',
        // Mastering
        mastering: "Мастеринг и Динамика",
        compressor: "Компрессор",
        threshold: "Порог",
        ratio: "Сжатие",
        hifiBass: "HiFi Бас",
        loudness: "Глубина (Loud)",
        // Energy Saver
        energySaver: "Энергосбережение",
        energySaverDesc: "Снижает нагрузку на батарею и CPU. Качество звука не меняется.",
        // Global Reset
        resetApp: "Сброс настроек (Reset)",
        resetConfirm: "Вы уверены, что хотите сбросить все настройки и данные приложения? Это действие нельзя отменить."
    }
};