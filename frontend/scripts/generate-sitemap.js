import fs from 'fs';
import path from 'path';
import https from 'https';

const SITE_URL = 'https://auradiochat.com';
const LANGUAGES = ['en', 'ru', 'es', 'de', 'fr', 'zh'];

// 1. Main routes
const STATIC_ROUTES = [
    '', '/directory', '/slushat-radio-online', '/radio-online', 
    '/internet-radio', '/free-online-radio'
];

// 2. Countries (Step 3: Expanded for CIS + Global)
const SEO_COUNTRIES = [
    'russia', 'kazakhstan', 'ukraine', 'belarus', 'uzbekistan', 'kyrgyzstan', 'tajikistan',
    'united-states', 'germany', 'france', 'spain', 'italy', 'japan', 'brazil',
    'canada', 'australia', 'mexico', 'argentina', 'colombia', 'peru',
    'poland', 'netherlands', 'sweden', 'norway', 'finland', 'denmark',
    'india', 'china', 'south-korea', 'indonesia', 'vietnam', 'thailand',
    'egypt', 'south-africa', 'nigeria', 'kenya', 'morocco', 'turkey',
    'greece', 'portugal', 'switzerland', 'austria', 'belgium', 'ireland',
    'chile', 'venezuela', 'ecuador', 'uruguay', 'bolivia', 'paraguay'
];

// 3. Genres (Step 4)
const SEO_GENRES = [
    'pop', 'rock', 'jazz', 'electronic', 'hip-hop', 'lounge', 'classical', 'world',
    'dance', 'news', 'talk', 'sports', 'country', 'rnb', 'decades', 'folk',
    'ambient', 'blues', 'metal', 'reggae', 'latin', 'gospel', 'soul', 'indie',
    'punk', 'funk', 'techno', 'house', 'trance', 'salsa'
];

const currentDate = new Date().toISOString().split('T')[0];

function generateUrlXml(route, priority) {
    let xml = `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    
    LANGUAGES.forEach(lang => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}/${lang}${route}" />\n`;
    });
    xml += `  </url>\n`;

    // Also include language-specific entries pointing back to x-default
    LANGUAGES.forEach(lang => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/${lang}${route}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${(parseFloat(priority) - 0.1).toFixed(1)}</priority>\n`;
        
        LANGUAGES.forEach(l => {
            xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}${route}" />\n`;
        });
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route}" />\n`;
        xml += `  </url>\n`;
    });
    return xml;
}

function writeSitemapFile(filename, urls) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
    xml += urls;
    xml += `</urlset>\n`;
    const outputPath = path.resolve(process.cwd(), `public/${filename}`);
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Generated ${filename} with ${urls.split('<url>').length - 1} entries.`);
}

async function fetchTopStations() {
    return new Promise((resolve) => {
        // Fetch top 500 stations for sitemap as an initial batch
        https.get('https://all.api.radio-browser.info/json/stations/search?limit=500&order=clickcount&reverse=true', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch(e) {
                    console.error("Error parsing stations", e);
                    resolve([]);
                }
            });
        }).on('error', (e) => {
            console.error("Error fetching stations", e);
            resolve([]);
        });
    });
}

async function generateAll() {
    // 1. Maint Routes
    let mainUrls = STATIC_ROUTES.map(r => generateUrlXml(r, r === '' ? '1.0' : '0.8')).join('');
    writeSitemapFile('sitemap-main.xml', mainUrls);

    // 2. Genres
    let genreUrls = SEO_GENRES.map(g => generateUrlXml(`/${g}-radio`, '0.8')).join('');
    writeSitemapFile('sitemap-genres.xml', genreUrls);

    // 3. Countries
    let countryUrls = SEO_COUNTRIES.map(c => generateUrlXml(`/radio-${c}`, '0.8')).join('');
    writeSitemapFile('sitemap-countries.xml', countryUrls);

    // 4. Combos (Genre + Country) -> 30 x 50 = 1500 combos
    let comboUrls = '';
    for (const genre of SEO_GENRES) {
        for (const country of SEO_COUNTRIES) {
            comboUrls += generateUrlXml(`/${genre}-radio-${country}`, '0.6');
        }
    }
    writeSitemapFile('sitemap-combos.xml', comboUrls);

    // 5. Stations
    const stations = await fetchTopStations();
    let stationUrls = '';
    stations.forEach(s => {
        if (s.stationuuid) {
            // Station routes shouldn't bloat with all language URLs unless needed, but we keep consistency
            stationUrls += generateUrlXml(`/station/${s.stationuuid}`, '0.5');
        }
    });
    if (stationUrls) writeSitemapFile('sitemap-stations.xml', stationUrls);

    // 6. Index
    let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    const sitemaps = ['sitemap-main.xml', 'sitemap-genres.xml', 'sitemap-countries.xml', 'sitemap-combos.xml'];
    if (stations.length > 0) sitemaps.push('sitemap-stations.xml');

    sitemaps.forEach(sm => {
        indexXml += `  <sitemap>\n`;
        indexXml += `    <loc>${SITE_URL}/${sm}</loc>\n`;
        indexXml += `  </sitemap>\n`;
    });
    indexXml += `</sitemapindex>\n`;

    const indexPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    fs.writeFileSync(indexPath, indexXml);
    console.log(`✅ Generated sitemap.xml index referencing ${sitemaps.length} sitemaps.`);
}

generateAll();
