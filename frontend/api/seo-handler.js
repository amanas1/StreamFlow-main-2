
import fs from 'fs';
import path from 'path';

/**
 * Serverless function to inject dynamic SEO tags into index.html
 * for SPA pages like /radio-russia, /pop-radio, etc.
 */
export default async function handler(req, res) {
    const url = req.url || '/';
    const urlParts = url.split('/').filter(Boolean);
    
    // Supported languages
    const supportedLangs = ['ru', 'es', 'fr', 'de', 'zh'];
    
    let lang = 'en';
    let slug = '';
    
    // Detect lang and slug
    if (urlParts.length > 0) {
        if (supportedLangs.includes(urlParts[0])) {
            lang = urlParts[0];
            slug = urlParts[1] || '';
        } else {
            slug = urlParts[0] || '';
        }
    }

    // Load base index.html
    // In Vercel, files included via includeFiles are often available at these locations
    const possiblePaths = [
        path.join(process.cwd(), 'dist', 'index.html'),
        path.join(process.cwd(), 'frontend', 'dist', 'index.html'),
        path.join(process.cwd(), 'index.html'),
        path.join(__dirname, '..', 'dist', 'index.html')
    ];
    
    let htmlContent = '';
    let foundPath = '';

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            htmlContent = fs.readFileSync(p, 'utf8');
            foundPath = p;
            break;
        }
    }
    
    if (!htmlContent) {
        return res.status(500).send(`Error loading index.html. Paths tried: ${possiblePaths.join(', ')}`);
    }

    res.setHeader('X-SEO-Handler', 'true');
    res.setHeader('X-SEO-Path', foundPath);

    // SEO Configurations (Replicated from DynamicRadioHub.tsx)
    const SEO_SLUG_MAP = {
        "radio-russia": { type: "country", tag: "Russia" },
        "radio-kazakhstan": { type: "country", tag: "Kazakhstan" },
        "radio-ukraine": { type: "country", tag: "Ukraine" },
        "radio-belarus": { type: "country", tag: "Belarus" },
        "radio-uzbekistan": { type: "country", tag: "Uzbekistan" },
        "radio-kyrgyzstan": { type: "country", tag: "Kyrgyzstan" },
        "radio-tajikistan": { type: "country", tag: "Tajikistan" },
        "pop-radio": { type: "genre", tag: "pop" },
        "jazz-radio": { type: "genre", tag: "jazz" },
        "rock-radio": { type: "genre", tag: "rock" },
        "electronic-radio": { type: "genre", tag: "electronic" },
        "hip-hop-radio": { type: "genre", tag: "hip-hop" },
        "lounge-radio": { type: "genre", tag: "lounge" },
        "classical-radio": { type: "genre", tag: "classical" },
        "slushat-radio-online": { type: "landing" },
        "radio-online": { type: "landing" },
        "internet-radio": { type: "landing" },
        "free-online-radio": { type: "landing" },
        "free-internet-radio": { type: "landing" },
        "jazz-radio-russia": { type: "combo", genre: "jazz", country: "Russia" },
        "electronic-radio-germany": { type: "combo", genre: "electronic", country: "Germany" }
    };

    const GENRE_NAMES = {
        pop: { en: "Pop", ru: "Поп", es: "Pop", fr: "Pop", de: "Pop", zh: "流行" },
        jazz: { en: "Jazz", ru: "Джаз", es: "Jazz", fr: "Jazz", de: "Jazz", zh: "爵士" },
        rock: { en: "Rock", ru: "Рок", es: "Rock", fr: "Rock", de: "Rock", zh: "摇滚" },
        electronic: { en: "Electronic", ru: "Электроника", es: "Electrónica", fr: "Électronique", de: "Elektronik", zh: "电子" },
        "hip-hop": { en: "Hip-Hop", ru: "Хип-хоп", es: "Hip Hop", fr: "Hip Hop", de: "Hip Hop", zh: "嘻哈" },
        lounge: { en: "Lounge", ru: "Лаунж", es: "Lounge", fr: "Lounge", de: "Lounge", zh: "休闲" },
        classical: { en: "Classical", ru: "Классика", es: "Clásica", fr: "Classique", de: "Klassik", zh: "古典" }
    };

    const COUNTRY_NAMES = {
        Russia: { en: "Russia", ru: "Россия", es: "Rusia", fr: "Russie", de: "Russland", zh: "俄罗斯" },
        Kazakhstan: { en: "Kazakhstan", ru: "Казахстан", es: "Kazajistán", fr: "Kazakhstan", de: "Kasachstan", zh: "哈萨克斯坦" },
        Ukraine: { en: "Ukraine", ru: "Украина", es: "Ucrania", fr: "Ukraine", de: "Ukraine", zh: "乌克兰" },
        Belarus: { en: "Belarus", ru: "Беларусь", es: "Bielorrusia", fr: "Biélorussie", de: "Belarus", zh: "白俄罗斯" },
        Uzbekistan: { en: "Uzbekistan", ru: "Узбекистан", es: "Uzbekistán", fr: "Ouzbékistan", de: "Usbekistan", zh: "乌兹别克斯坦" },
        Kyrgyzstan: { en: "Kyrgyzstan", ru: "Кыргызстан", es: "Kirguistán", fr: "Kirghizistan", de: "Kirgisistan", zh: "吉尔吉斯斯坦" },
        Tajikistan: { en: "Tajikistan", ru: "Таджикистан", es: "Tayikistán", fr: "Tadjikistan", de: "Tadschikistan", zh: "塔吉克斯坦" },
        Germany: { en: "Germany", ru: "Германия", es: "Alemania", fr: "Allemagne", de: "Deutschland", zh: "德国" }
    };

    const LANDING_TITLES = {
        en: 'Listen to Radio Online Free',
        ru: 'Слушать радио онлайн бесплатно',
        es: 'Escuchar radio en vivo gratis',
        fr: 'Écouter la radio en direct gratuit',
        zh: '在线免费收听广播',
        de: 'Radio online kostenlos hören'
    };

    // Meta Generation
    let title = LANDING_TITLES[lang] || LANDING_TITLES.en;
    let description = 'Listen to thousands of internet radio stations online for free. Best online radio streaming player.';

    const mapping = SEO_SLUG_MAP[slug];
    if (mapping) {
        const gName = mapping.genre ? (GENRE_NAMES[mapping.genre]?.[lang] || mapping.genre) : (mapping.type === 'genre' ? GENRE_NAMES[mapping.tag]?.[lang] : '');
        const cName = mapping.country ? (COUNTRY_NAMES[mapping.country]?.[lang] || mapping.country) : (mapping.type === 'country' ? COUNTRY_NAMES[mapping.tag]?.[lang] : '');
        
        if (mapping.type !== 'landing') {
            if (lang === 'ru') {
                title = mapping.genre && mapping.country ? `${gName} радио ${cName}` : gName ? `Лучшее ${gName} радио` : `Радио ${cName}`;
                description = `Слушайте ${gName || ''} ${cName || ''} радио онлайн. Лучший плеер для интернет-радио.`;
            } else if (lang === 'es') {
                title = mapping.genre && mapping.country ? `Radio ${gName} en ${cName}` : gName ? `Mejor Radio ${gName}` : `Radio en ${cName}`;
                description = `Escucha radio ${gName || ''} ${cName || ''} en vivo. El mejor reproductor de radio online.`;
            } else {
                title = mapping.genre && mapping.country ? `${gName} Radio in ${cName}` : gName ? `Best ${gName} Radio` : `Radio in ${cName}`;
                description = `Listen to ${gName || ''} ${cName || ''} radio stations live. Best online radio streaming player.`;
            }
        }
    }

    const baseUrl = 'https://auradiochat.com';
    const canonicalPath = slug ? `/${slug}` : '/';
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    
    const hreflangs = [`<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`];
    ['en', 'ru', 'es', 'fr', 'de', 'zh'].forEach(l => {
        const href = l === 'en' ? canonicalUrl : `${baseUrl}/${l}${canonicalPath}`;
        hreflangs.push(`<link rel="alternate" hreflang="${l}" href="${href}" />`);
    });

    const metaTags = `
    <title>${title} | AU Radio</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${hreflangs.join('\n    ')}
    `;

    // Inject into head
    const headTagEnd = '</head>';
    const parts = htmlContent.split(headTagEnd);
    if (parts.length === 2) {
        htmlContent = parts[0] + metaTags + headTagEnd + parts[1];
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
    return res.status(200).send(htmlContent);
}
