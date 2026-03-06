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

    // Helper function to generate rich SEO content to prevent Soft 404s
    function generateRichContent(t, d, pType, pGenre, pCountry, l, fallback) {
        let html = `      <h1>${t}</h1>\n      <p>${d}</p>\n`;
        const gName = pGenre ? cap(pGenre) : '';
        const cName = pCountry ? cap(pCountry) : '';
        const fbName = fallback || '';

        if (l === 'ru') {
            html += `      <p>Добро пожаловать на AU Radio — платформу премиум-класса для потокового вещания, где вы можете наслаждаться лучшими музыкальными подборками. Наш глобальный каталог предлагает сотни радиостанций, вещающих круглосуточно. Откройте для себя новые треки, наслаждайтесь любимыми хитами и слушайте музыку в высоком качестве.</p>\n`;
            if (pType === 'genre') {
                html += `      <p>Слушать ${gName} онлайн бесплатно без регистрации. Мы собрали для вас лучшие ${gName} радиостанции, чтобы вы могли погрузиться в атмосферу любимого жанра. Будь то классические хиты или современные новинки, наша платформа обеспечивает непрерывное воспроизведение кристально чистого звука.</p>\n`;
                html += `      <p>Присоединяйтесь к тысячам слушателей и откройте для себя новые грани ${gName} музыки. Наш умный плеер автоматически подстраивается под ваше соединение, а удобный интерфейс позволяет легко находить и сохранять любимые станции в избранное.</p>\n`;
            } else if (pType === 'country') {
                html += `      <p>Ищете радиостанции региона: ${cName}? Вы попали по адресу. Слушайте местные новости, популярные ток-шоу и лучшие музыкальные хиты прямо из ${cName}. Узнавайте первыми о том, что происходит, и наслаждайтесь колоритом местной культуры.</p>\n`;
                html += `      <p>Наша директория постоянно обновляется, чтобы предложить вам самые актуальные и стабильные трансляции из ${cName}. Просто выберите станцию из списка и наслаждайтесь эфиром мгновенно, с любого устройства.</p>\n`;
            } else if (pType === 'combo') {
                html += `      <p>Лучшая комбинация: ${gName} музыка и трансляции из региона ${cName}. Эта страница создана специально для ценителей жанра, желающих слушать локальные станции. Погрузитесь в уникальное звучание и наслаждайтесь качественным аудио потоком без перерывов.</p>\n`;
                html += `      <p>Вне зависимости от того, ищете ли вы расслабляющий фон для работы или зажигательные ритмы для вечеринки, станции региона ${cName} в жанре ${gName} не оставят вас равнодушными. Наслаждайтесь бесплатным доступом ко всем функциям AU Radio.</p>\n`;
            } else {
                html += `      <p>Изучайте огромную коллекцию интернет-радио со всего мира. Мы предлагаем удобный поиск, категоризацию по жанрам и странам, а также быструю загрузку потоков. Музыка без границ всегда доступна для вас на AU Radio.</p>\n`;
                html += `      <p>Слушайте тысячи бесплатных онлайн-радиостанций с кристально чистым звуком. Сохраняйте любимые эфиры, открывайте для себя новые станции ежедневно и наслаждайтесь музыкой любого настроения и эпохи вместе с нами.</p>\n`;
            }
        } else if (l === 'es') {
            html += `      <p>Bienvenido a AU Radio, una plataforma de transmisión premium donde puedes disfrutar de las mejores selecciones musicales. Nuestro directorio global ofrece cientos de estaciones de radio que transmiten las 24 horas del día. Descubre nuevas pistas, disfruta de tus éxitos favoritos y escucha música en alta calidad.</p>\n`;
            if (pType === 'genre') {
                html += `      <p>Escucha ${gName} en línea gratis sin registrarte. Hemos recopilado las mejores estaciones de radio de ${gName} para que puedas sumergirte en la atmósfera de tu género favorito. Ya sean éxitos clásicos o nuevos lanzamientos, nuestra plataforma garantiza una reproducción continua con un sonido cristalino.</p>\n`;
                html += `      <p>Únete a miles de oyentes y descubre nuevas facetas de la música ${gName}. Nuestro reproductor inteligente se adapta automáticamente a tu conexión, y la interfaz intuitiva facilita la búsqueda y el guardado de tus estaciones favoritas.</p>\n`;
            } else if (pType === 'country') {
                html += `      <p>¿Buscas estaciones de radio de la región: ${cName}? Estás en el lugar correcto. Escucha noticias locales, programas de entrevistas populares y los mejores éxitos musicales directamente desde ${cName}. Sé el primero en saber lo que sucede y disfruta del sabor de la cultura local.</p>\n`;
                html += `      <p>Nuestro directorio se actualiza constantemente para ofrecerte las transmisiones más relevantes y estables de ${cName}. Simplemente selecciona una estación de la lista y disfruta de la transmisión al instante, desde cualquier dispositivo.</p>\n`;
            } else if (pType === 'combo') {
                html += `      <p>La mejor combinación: música ${gName} y transmisiones de la región de ${cName}. Esta página fue creada especialmente para los conocedores del género que desean escuchar emisoras locales. Sumérgete en un sonido único y disfruta de una transmisión de audio de alta calidad sin interrupciones.</p>\n`;
                html += `      <p>Ya sea que busques un fondo relajante para trabajar o ritmos enérgicos para una fiesta, las estaciones de ${cName} en el género de ${gName} no te dejarán indiferente. Disfruta de acceso gratuito a todas las funciones de AU Radio.</p>\n`;
            } else {
                html += `      <p>Explora una gran colección de radio por Internet de todo el mundo. Ofrecemos búsqueda conveniente, categorización por géneros y países, y carga rápida de transmisiones. La música sin fronteras siempre está disponible para ti en AU Radio.</p>\n`;
                html += `      <p>Escucha miles de estaciones de radio en línea gratuitas con un sonido cristalino. Guarda tus transmisiones favoritas, descubre nuevas estaciones todos los días y disfruta de música de cualquier estado de ánimo y época con nosotros.</p>\n`;
            }
        } else {
            // English and fallback
            html += `      <p>Welcome to AU Radio, a premium streaming platform where you can enjoy the best musical selections. Our global directory offers hundreds of radio stations broadcasting 24/7. Discover new tracks, enjoy your favorite hits, and listen to high-quality audio streaming seamlessly.</p>\n`;
            if (pType === 'genre') {
                html += `      <p>Listen to ${gName} online for free without registration. We have collected the best ${gName} radio stations so you can immerse yourself in the atmosphere of your favorite genre. Whether it's classical hits or modern releases, our platform ensures continuous playback with crystal-clear sound quality.</p>\n`;
                html += `      <p>Join thousands of listeners and discover new facets of ${gName} music. Our smart player automatically adjusts to your network connection, and the user-friendly interface makes it incredibly easy to find and save your favorite stations for later.</p>\n`;
            } else if (pType === 'country') {
                html += `      <p>Looking for radio stations from ${cName}? You have come to the right place. Listen to local news, popular talk shows, and the greatest musical hits directly from ${cName}. Be the first to know what is happening and enjoy the rich flavor of local culture.</p>\n`;
                html += `      <p>Our comprehensive directory is constantly updated to offer you the most relevant and stable broadcasts from ${cName}. Simply select a station from the list below and enjoy instant live broadcasting on any device, anywhere in the world.</p>\n`;
            } else if (pType === 'combo') {
                html += `      <p>The perfect blend: ${gName} music combined with live broadcasts from ${cName}. This page is specially curated for connoisseurs of the genre who want to listen to authentic local stations. Dive into a unique listening experience with high-quality, uninterrupted audio streaming.</p>\n`;
                html += `      <p>Whether you need a relaxing background for work or energetic beats for a party, the ${cName} stations playing ${gName} will perfectly match your mood. Enjoy free and unlimited access to all features provided by the AU Radio platform.</p>\n`;
            } else {
                const targetName = fbName || "internet radio";
                html += `      <p>Explore a massive collection of ${targetName} stations from across the globe. We offer a convenient search engine, intuitive categorization by genres and countries, and incredibly fast stream loading times. Music without borders is always accessible to you on AU Radio.</p>\n`;
                html += `      <p>Listen to thousands of free online radio stations with crystal-clear sound. Save your favorite broadcasts, discover new stations everyday, and enjoy music from any era and for any mood. Start your auditory journey with us right now.</p>\n`;
            }
        }

        return html;
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
                const fallbackTitleText = isSeoFallback ? title : '';
                const richContent = generateRichContent(title, description, parsedType, parsedGenre, parsedCountry, lang, fallbackTitleText);
                injectedHtml = `
    <section class="seo-content">
${richContent}    </section>
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
