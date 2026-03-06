import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Final Serverless SEO Handler
 * Injects Title, Description, Canonical, and Hreflang into app-template.html
 */
export default async function handler(req, res) {
    const url = req.url || '/';
    const cleanPath = url.split('?')[0]; // Remove query params
    const urlParts = cleanPath.split('/').filter(Boolean);
    
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

    // Load base template (ESM safe path resolution)
    // In Vercel, includeFiles places them relative to the function's execution context
    let indexPath = path.join(process.cwd(), 'dist', 'app-template.html');
    let htmlContent = '';
    
    try {
        if (!fs.existsSync(indexPath)) {
            // Try __dirname relative path
            indexPath = path.join(__dirname, '..', 'dist', 'app-template.html');
            if (!fs.existsSync(indexPath)) {
                 // Try root path if running directly in dist
                 indexPath = path.join(process.cwd(), 'app-template.html');
                 if (!fs.existsSync(indexPath)) {
                     // Development or local fallback
                     indexPath = path.join(process.cwd(), 'dist', 'index.html');
                     if (!fs.existsSync(indexPath)) {
                        indexPath = path.join(process.cwd(), 'index.html');
                     }
                 }
            }
        }
        
        if (!fs.existsSync(indexPath)) {
             return res.status(500).send(`Template not found. Paths tried. CWD: ${process.cwd()}, DIRNAME: ${__dirname}`);
        }
        
        htmlContent = fs.readFileSync(indexPath, 'utf8');
    } catch (err) {
        return res.status(500).send(`Error reading template: ${err.message}`);
    }

    // Dynamic Slug Parsing (replaces huge hardcoded maps)
    // Structure examples: 'radio-russia', 'jazz-radio', 'jazz-radio-russia', 'slushat-radio-online'
    
    let isKnownSeo = false;
    let parsedGenre = '';
    let parsedCountry = '';
    let parsedType = ''; // 'genre', 'country', 'combo', 'landing'

    const landingSlugs = ['slushat-radio-online', 'radio-online', 'internet-radio', 'free-online-radio', 'free-internet-radio'];
    
    if (landingSlugs.includes(slug)) {
        isKnownSeo = true;
        parsedType = 'landing';
    } else if (slug.startsWith('radio-')) {
        isKnownSeo = true;
        parsedType = 'country';
        parsedCountry = slug.replace('radio-', '').replace(/-/g, ' ');
    } else if (slug.endsWith('-radio')) {
        isKnownSeo = true;
        parsedType = 'genre';
        parsedGenre = slug.replace('-radio', '').replace(/-/g, ' ');
    } else if (slug.includes('-radio-')) {
        isKnownSeo = true;
        parsedType = 'combo';
        const parts = slug.split('-radio-');
        parsedGenre = parts[0].replace(/-/g, ' ');
        parsedCountry = parts[1].replace(/-/g, ' ');
    }

    // Route Classification
    const VALID_REACT_ROUTES = ['favorites', 'about', 'privacy-policy', 'contact', 'genres', 'directory', 'station'];
    
    let is404 = false;
    let isReactRoute = false;
    let isSeoFallback = false;

    if (!slug || slug === 'index.html') {
        isReactRoute = true; // Home or language root
    } else if (VALID_REACT_ROUTES.includes(slug)) {
        isReactRoute = true;
    } else if (isKnownSeo) {
        // Handled by dynamic parser
    } else if (slug.includes('radio')) {
        isSeoFallback = true;
    } else {
        is404 = true;
    }

    // capitalize helper
    const cap = (str) => str ? str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';

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

    if (isKnownSeo) {
        const gName = cap(parsedGenre);
        const cName = cap(parsedCountry);
        
        if (parsedType !== 'landing') {
            if (lang === 'ru') {
                title = parsedType === 'combo' ? `${gName} радио ${cName}` : parsedType === 'genre' ? `Лучшее ${gName} радио` : `Радио ${cName}`;
                description = `Слушайте ${gName ? gName + ' ' : ''}${cName ? cName + ' ' : ''}радио онлайн. Лучший плеер для интернет-радио.`;
            } else if (lang === 'es') {
                title = parsedType === 'combo' ? `Radio ${gName} en ${cName}` : parsedType === 'genre' ? `Mejor Radio ${gName}` : `Radio en ${cName}`;
                description = `Escucha radio ${gName ? gName + ' ' : ''}${cName ? cName + ' ' : ''}en vivo. El mejor reproductor de radio online.`;
            } else {
                title = parsedType === 'combo' ? `${gName} Radio in ${cName}` : parsedType === 'genre' ? `Best ${gName} Radio` : `Radio in ${cName}`;
                description = `Listen to ${gName ? gName + ' ' : ''}${cName ? cName + ' ' : ''}radio stations live. Best online radio streaming player.`;
            }
        }
    } else if (isSeoFallback) {
        // Fallback for unknown radio slugs
        const fallbackTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        title = fallbackTitle;
        description = `Listen to ${fallbackTitle} radio stations online with AU Radio streaming player.`;
    } else if (is404) {
        title = '404 - Page Not Found';
        description = 'The page you requested does not exist. Listen to live internet radio on AU Radio.';
    }

    const baseUrl = 'https://auradiochat.com';
    
    // Exact requested canonical logic including language path
    const canonicalPath = slug
        ? (lang === 'en' ? `/${slug}` : `/${lang}/${slug}`)
        : (lang === 'en' ? '/' : `/${lang}`);
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    
    // Hreflang logic remains based on the base slug without the requested language
    const baseCanonicalPath = slug ? `/${slug}` : '/';
    const hreflangs = [`<link rel="alternate" hreflang="x-default" href="${baseUrl}${baseCanonicalPath}" />`];
    ['en', 'ru', 'es', 'fr', 'de', 'zh'].forEach(l => {
        const href = l === 'en' ? `${baseUrl}${baseCanonicalPath}` : `${baseUrl}/${l}${baseCanonicalPath}`;
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
    if (parts.length >= 2) {
        htmlContent = parts[0] + metaTags + headTagEnd + parts.slice(1).join(headTagEnd);
    }

    // Inject visible HTML content into body before <div id="root"> exactly once
    const rootTagStart = '<div id="root">';
    if (!htmlContent.includes('class="seo-content"') && !htmlContent.includes('class="error-page"')) {
        const rootParts = htmlContent.split(rootTagStart);
        if (rootParts.length >= 2) {
            let injectedHtml = '';

            if (is404) {
                injectedHtml = `
    <section class="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <a href="/">Return to AU Radio</a>
    </section>
    `;
            } else if (isKnownSeo || isSeoFallback) {
                injectedHtml = `
    <section class="seo-content">
      <h1>${title}</h1>
      <p>${description}</p>
    </section>
    `;
            }
            
            // For valid React routes (!isKnownSeo && !isSeoFallback && !is404),
            // we do NOT inject standard SEO fallback visible text, letting React render naturally.

            htmlContent = rootParts[0] + injectedHtml + rootTagStart + rootParts.slice(1).join(rootTagStart);
        }
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-SEO-Handler', 'active');
    
    if (is404) {
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=60');
        return res.status(404).send(htmlContent);
    } else {
        res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
        return res.status(200).send(htmlContent);
    }
}
