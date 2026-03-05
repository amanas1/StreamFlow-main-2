import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GENRES, COUNTRIES_DATA, TRANSLATIONS } from '../../types/constants';
import { RadioStation, Language, UIMode } from '../../types';
import { fetchStationsByTag, fetchStationsByCountry, fetchGlobalMusicStations } from '../../services/radioService';
import { HeartIcon } from '../../components/Icons';

interface DynamicHubProps {
    setLanguage: (lang: any) => void;
    onPlay: (station: RadioStation) => void;
    currentStation: RadioStation | null;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    language: Language;
    uiMode: UIMode;
}

const DynamicRadioHub: React.FC<DynamicHubProps> = ({ setLanguage, onPlay, currentStation, favorites, toggleFavorite, language, uiMode }) => {
    const { lang: urlLang, slug } = useParams<{ lang?: string; slug?: string }>();
    const navigate = useNavigate();
    
    // Stations State
    const [stations, setStations] = React.useState<RadioStation[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [visibleCount, setVisibleCount] = React.useState(48);
    const observerRef = React.useRef<HTMLDivElement>(null);
    const loadRequestIdRef = React.useRef(0);
    const isMountedRef = React.useRef(true);

    React.useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    // Normalize Language from URL or prop
    useEffect(() => {
        if (urlLang && ['en', 'es', 'fr', 'de', 'ru', 'zh'].includes(urlLang)) {
            setLanguage(urlLang);
        }
    }, [urlLang, setLanguage]);

    const activeLanguage = (urlLang as Language) || language || 'en';
    const t = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;
    const ui = TRANSLATIONS[activeLanguage] || TRANSLATIONS.en;

    // Parse Slug Strategy
    const pageContext = useMemo(() => {
        if (!slug) return null;
        
        const cleanSlug = slug.toLowerCase();
        
        // 1. Check Genre
        const genre = GENRES.find(g => cleanSlug.includes(g.id) || cleanSlug.includes(g.id.replace('-', '')));
        
        // 2. Check Country
        const country = COUNTRIES_DATA.find(c => {
            const countrySlug = c.name.toLowerCase().replace(/\s+/g, '-');
            return cleanSlug.includes(countrySlug);
        });

        // 3. Static landing check
        const isStaticLanding = ['slushat-radio-online', 'radio-online', 'internet-radio', 'free-online-radio'].includes(cleanSlug);

        if (!genre && !country && !isStaticLanding) return null;

        return { genre, country, originalSlug: slug, isStaticLanding };
    }, [slug]);

    // Helper to translate country names (reusing logic from DirectoryPage)
    const getCountryName = (name: string) => {
        const key = name.toLowerCase().replace(/\s+/g, '');
        let lookupKey = key;
        if (key === 'unitedstates') lookupKey = 'usa';
        if (key === 'unitedkingdom') lookupKey = 'uk';
        if (key === 'czechrepublic') lookupKey = 'czech';
        return ui[lookupKey] || name;
    };

    const getGenreName = (genreId: string) => ui[genreId] || genreId;

    // Fetch Data
    useEffect(() => {
        const rid = ++loadRequestIdRef.current;
        setIsLoading(true);
        setVisibleCount(48);
        setStations([]);

        const loadStations = async () => {
            if (!pageContext) return;
            try {
                let fetched: RadioStation[] = [];
                const apiCountryName = pageContext.country ? pageContext.country.name : '';
                
                if (pageContext.genre && pageContext.country) {
                    let searchTag = pageContext.genre.id;
                    const byTag = await fetchStationsByTag(searchTag, 300);
                    fetched = byTag.filter(s => {
                        const c = (s.country || '').toLowerCase();
                        const target1 = pageContext.country!.name.toLowerCase();
                        return c.includes(target1) || (target1 === 'usa' && c.includes('united states')) || (target1 === 'uk' && c.includes('united kingdom'));
                    });

                    if (fetched.length < 50) {
                        const byCountry = await fetchStationsByCountry(apiCountryName, 300);
                        const genreId = pageContext.genre.id.toLowerCase();
                        const genreName = pageContext.genre.name.toLowerCase();
                        const extra = byCountry.filter(s => {
                            const tags = (s.tags || '').toLowerCase();
                            return tags.includes(genreId) || tags.includes(genreName);
                        });
                        fetched = [...fetched, ...extra];
                    }
                } else if (pageContext.genre) {
                    fetched = await fetchStationsByTag(pageContext.genre.id, 300);
                } else if (pageContext.country) {
                    fetched = await fetchStationsByCountry(apiCountryName, 300);
                } else if (pageContext.isStaticLanding) {
                    fetched = await fetchGlobalMusicStations();
                }
                if (rid === loadRequestIdRef.current && isMountedRef.current) {
                    setStations(fetched);
                    setIsLoading(false);
                }
            } catch (e) {
                if (rid === loadRequestIdRef.current && isMountedRef.current) setIsLoading(false);
            }
        };

        // Safety timeout to prevent stuck skeleton
        const timeoutId = setTimeout(() => {
            if (rid === loadRequestIdRef.current && isMountedRef.current && isLoading) {
                setIsLoading(false);
            }
        }, 8000);

        loadStations();
        return () => {
            clearTimeout(timeoutId);
        };
    }, [pageContext]);

    // Infinite Scroll Implementation
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && stations.length > visibleCount) {
                setVisibleCount(prev => prev + 24);
            }
        }, { threshold: 0.1 });

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [stations.length, visibleCount]);

    const visibleStations = useMemo(() => stations.slice(0, visibleCount), [stations, visibleCount]);

    if (!pageContext) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404 - Not Found</h1>
                <Link to="/" className="text-primary hover:underline">{ui.back || 'Back'}</Link>
            </div>
        );
    }

    const displayGenre = pageContext.genre ? getGenreName(pageContext.genre.id) : '';
    const displayCountry = pageContext.country ? getCountryName(pageContext.country.name) : '';
    
    // Localization of dynamic titles and descriptions
    const localizedData = useMemo(() => {
        const isStaticLanding = pageContext.isStaticLanding;
        const isBoth = pageContext.genre && pageContext.country;
        const isGenre = !!pageContext.genre;
        
        let titles: Record<Language, string>;
        let descriptions: Record<Language, string>;

        if (isStaticLanding) {
            titles = {
                en: 'Listen to Radio Online Free',
                ru: 'Слушать радио онлайн бесплатно',
                es: 'Escuchar radio en vivo gratis',
                fr: 'Écouter la radio en direct gratuit',
                zh: '在线免费收听广播',
                de: 'Radio online kostenlos hören'
            };
            descriptions = {
                en: 'Listen to thousands of internet radio stations online for free. Best online radio streaming player.',
                ru: 'Слушайте тысячи интернет-радиостанций онлайн бесплатно. Лучший плеер для интернет-радио.',
                es: 'Escucha miles de estaciones de radio por internet gratis en vivo. El mejor reproductor de radio online.',
                fr: 'Écoutez des milliers de stations de radio sur internet en direct gratuitement. Le meilleur lecteur radio en ligne.',
                zh: '免费在线收听数千个互联网广播电台。最佳在线广播播放器。',
                de: 'Hören Sie Tausende von Internetradiosendern online kostenlos live. Bester Online-Radio-Streaming-Player.'
            };
        } else {
            titles = {
                en: isBoth ? `${displayGenre} Radio in ${displayCountry}` : isGenre ? `Best ${displayGenre} Radio` : `Radio in ${displayCountry}`,
                ru: isBoth ? `${displayGenre} радио ${displayCountry}` : isGenre ? `Лучшее ${displayGenre} радио` : `Радио ${displayCountry}`,
                es: isBoth ? `Radio ${displayGenre} en ${displayCountry}` : isGenre ? `Mejor Radio ${displayGenre}` : `Radio en ${displayCountry}`,
                fr: isBoth ? `Radio ${displayGenre} en ${displayCountry}` : isGenre ? `Meilleure Radio ${displayGenre}` : `Radio en ${displayCountry}`,
                zh: isBoth ? `${displayCountry}的${displayGenre}广播` : isGenre ? `最佳${displayGenre}广播` : `${displayCountry}的广播`,
                de: isBoth ? `${displayGenre} Radio in ${displayCountry}` : isGenre ? `Bestes ${displayGenre} Radio` : `Radio in ${displayCountry}`
            };

            descriptions = {
                en: `Listen to ${displayGenre} ${displayCountry} radio stations live. Best online radio streaming player.`,
                ru: `Слушайте ${displayGenre} ${displayCountry} радио онлайн. Лучший плеер для интернет-радио.`,
                es: `Escucha radio ${displayGenre} ${displayCountry} en vivo. El mejor reproductor de radio online.`,
                fr: `Écoutez la radio ${displayGenre} ${displayCountry} en direct. Le meilleur lecteur radio en ligne.`,
                zh: `在线收听${displayCountry}${displayGenre}广播。最佳在线广播播放器。`,
                de: `Hören Sie ${displayGenre} ${displayCountry} Radio live. Bester Online-Radio-Streaming-Player.`
            };
        }

        return { 
            title: titles[activeLanguage] || titles.en, 
            desc: descriptions[activeLanguage] || descriptions.en 
        };
    }, [activeLanguage, displayGenre, displayCountry, pageContext]);

    // Extended SEO Text (200-300 words) for various page types
    const seoContent = useMemo(() => {
        const isStaticLanding = pageContext.isStaticLanding;
        
        if (activeLanguage === 'ru') {
            if (isStaticLanding) {
                return `Добро пожаловать на AU Radio — вашу главную платформу для прослушивания тысяч радиостанций со всего мира. Ищете, где слушать радио онлайн бесплатно? Вы попали по адресу. Наш сервис предлагает кристально чистое интернет-радио без необходимости регистрации или скачивания дополнительных программ. Радио онлайн стало неотъемлемой частью повседневной жизни миллионов людей. Будь вы дома, на работе или в дороге, доступ к любимым радиостанциям онлайн позволяет наслаждаться свежими хитами, проверенной классикой поп, рок, EDM и джаз музыки, а также быть в курсе последних мировых новостей. Слушать радио — это отличный способ открывать для себя новые жанры и культуры. Мы объединили лучшие мировые частоты в удобном интерфейсе. Попробуйте наше бесплатное интернет-радио прямо сейчас: выбирайте жанры по настроению, находите станции по странам и добавляйте любимые потоки в Избранное для быстрого доступа. С AU Radio музыка всегда с вами!`;
            }
            if (pageContext.genre && pageContext.country) {
                return `Слушай ${displayGenre} радио ${displayCountry} онлайн в высоком качестве. Любители жанра ${displayGenre} найдут здесь отборные интернет-радиостанции, вещающие лучшие хиты и редкие треки прямой трансляции. Музыкальная культура региона ${displayCountry} подарила миру множество талантов, и теперь вы можете окунуться в эту атмосферу абсолютно бесплатно. Слушать радио онлайн — это прекрасный способ оставаться на волне любимого жанра без долгих поисков в плейлистах. Мы собрали самые популярные эфиры, где играет ${displayGenre}, чтобы вы могли просто нажать плей и наслаждаться. Наше радио бесплатно предоставляет доступ к непрерывному музыкальному потоку 24/7. Откройте для себя новые голоса и ритмы вместе с тысячами других слушателей со всего света на AU Radio.`;
            }
            if (pageContext.genre) {
                return `Слушай лучшее ${displayGenre} радио онлайн бесплатно. Жанр ${displayGenre} завоевал сердца миллионов слушателей по всему миру благодаря своему уникальному звучанию и невероятной энергетике. На AU Radio мы бережно собрали ведущие мировые радиостанции, транслирующие ${displayGenre} 24 часа в сутки. Включайте наше интернет-радио и наслаждайтесь золотыми хитами прошлого, мощными новинками современности и эксклюзивными сетами от лучших диджеев. Радио онлайн открывает безграничные возможности: находите уникальные потоки, изучайте музыкальную культуру разных стран и создавайте свой идеальный плейлист. Радио бесплатно, доступно на любом устройстве и не требует установки приложений. Присоединяйтесь к мировому сообществу меломанов и сделайте музыку частью каждого вашего дня.`;
            }
            if (pageContext.country) {
                return `Слушай радио ${displayCountry} онлайн бесплатно. Откройте для себя богатство музыкальной культуры региона ${displayCountry}. Независимо от ваших предпочтений — поп-музыка, традиционные мотивы, актуальные новости или классический рок — местные радиостанции готовы предложить вам всё самое лучшее. Слушать радио из этой страны стало проще, чем когда-либо. Наш каталог включает сотни станций, вещающих прямо сейчас. Радио онлайн помогает оставаться на связи с родной культурой тем, кто живет за границей, а также знакомит слушателей со всего света с уникальными культурными особенностями. Выбрав интернет-радио на AU Radio, вы получаете доступ к качественному воспроизведению и удобному интерфейсу. Погрузитесь в звуки мира прямо сейчас — радио бесплатно для всех пользователей!`;
            }
        } else {
            // Default English SEO text
            if (isStaticLanding) {
                return `Welcome to AU Radio, your premiere destination to listen radio online for free. Explore thousands of internet radio stations from around the globe directly in your browser. Whether you are searching for online radio streaming of pop, rock, jazz, electronic, or news, we have precisely what you need. Internet radio has revolutionized how we consume audio, offering limitless access to global cultures and sounds. With our platform, tuning into radio stations online is completely effortless and free. No registration, no hidden fees—just pure, uninterrupted free internet radio. Discover new artists, follow top global charts, or relax to classical symphonies. Start streaming now and experience the world of online radio like never before.`;
            }
            if (pageContext.genre && pageContext.country) {
                return `Listen to ${displayGenre} radio from ${displayCountry} online. For fans of ${displayGenre}, this collection offers the finest selection of internet radio stations streaming directly from ${displayCountry}. Experience the unique local flavor of ${displayGenre} as mixed by resident DJs and beloved local presenters. Tuning into radio stations online allows you to explore authentic regional soundscapes seamlessly. Our platform delivers high-quality free internet radio, bringing you closer to the vibrant music scene of ${displayCountry}. Whether you want to listen radio online for background music while working or to actively discover new artists, AU Radio is your gateway to the world's best audio streams.`;
            }
            if (pageContext.genre) {
                return `Discover the best ${displayGenre} radio stations online. The captivating rhythm of ${displayGenre} has a dedicated following globally, and on AU Radio, we've gathered the most popular internet radio streams featuring this style. Tune in to hear legendary classics and cutting-edge exclusive tracks. To listen radio online means exploring an endless catalog of high-quality audio formats. Enhance your daily routine with free internet radio that adapts to your mood and lifestyle. Whether you prefer energetic beats or relaxing melodies, our carefully curated ${displayGenre} category promises a premium listening experience without subscriptions.`;
            }
            if (pageContext.country) {
                return `Listen to the top radio stations from ${displayCountry} online. Dive deep into the vibrant culture and trending music of ${displayCountry} with our extensive collection of local broadcasts. Our internet radio platform provides crystal clear connection to the voices, news, and beats defining the region today. With free internet radio, exploring international scenes is just a click away. Radio stations online have never been more accessible—discover local pop, traditional tunes, talk shows, and underground music. Join thousands of users who choose AU Radio to listen radio online and connect with the heart of ${displayCountry}.`;
            }
        }
        return '';
    }, [activeLanguage, displayGenre, displayCountry, pageContext]);

    // Construct Canonical URL to match strict formats
    const canonicalPath = React.useMemo(() => {
        if (!pageContext) return '';
        if (pageContext.originalSlug) return `/${pageContext.originalSlug}`;
        
        const genreId = pageContext.genre ? pageContext.genre.id : '';
        const countryId = pageContext.country ? pageContext.country.name.toLowerCase().replace(/\s+/g, '-') : '';
        
        if (genreId && countryId) return `/${genreId}-radio-${countryId}`;
        if (genreId) return `/${genreId}-radio`;
        if (countryId) return `/radio-${countryId}`;
        return '/';
    }, [pageContext]);
    const canonicalUrl = activeLanguage === 'en' 
        ? `https://auradiochat.com${canonicalPath}`
        : `https://auradiochat.com/${activeLanguage}${canonicalPath}`;

    const languages: Language[] = ['en', 'ru', 'es', 'fr', 'de', 'zh'];

    const getHreflangUrl = (l: Language) => {
        return l === 'en' ? `https://auradiochat.com${canonicalPath}` : `https://auradiochat.com/${l}${canonicalPath}`;
    };

    const structuredData = React.useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": localizedData.title,
            "description": localizedData.desc,
            "url": canonicalUrl,
            "numberOfItems": stations.length,
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": (stations || []).slice(0, 10).map((s, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "url": `https://auradiochat.com/station/${s.slug}`,
                    "name": s.name
                }))
            }
        };
    }, [localizedData, canonicalUrl, stations, activeLanguage]);

    const faqData = React.useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How to listen radio online?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can listen to radio online directly through your browser on AU Radio. Simply select a station, genre, or country and press play. No downloads or registration required."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is AU Radio free?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, AU Radio is a completely free internet radio platform. Our online radio streaming service offers unlimited access without any subscriptions."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What countries are supported?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We support thousands of radio stations playing online from all over the world, including the USA, UK, Germany, France, Russia, Kazakhstan, and many more."
                    }
                }
            ]
        };
    }, []);

    return (
        <div className="min-h-screen pb-32 pt-10 px-4 md:px-10 animate-in fade-in duration-700">
            <Helmet>
                <title>{localizedData.title} | AU Radio</title>
                <meta name="description" content={localizedData.desc} />
                <link rel="canonical" href={canonicalUrl} />
                
                {/* hreflang Support */}
                {languages.map(l => (
                    <link 
                        key={l} 
                        rel="alternate" 
                        hrefLang={l} 
                        href={getHreflangUrl(l)} 
                    />
                ))}

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:site_name" content="AU Radio" />
                <meta property="og:title" content={`${localizedData.title} | AU Radio`} />
                <meta property="og:description" content={localizedData.desc} />
                <meta property="og:image" content={stations[0]?.favicon || "https://auradiochat.com/og-image.jpg"} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={canonicalUrl} />
                <meta property="twitter:title" content={`${localizedData.title} | AU Radio`} />
                <meta property="twitter:description" content={localizedData.desc} />
                <meta property="twitter:image" content={stations[0]?.favicon || "https://auradiochat.com/og-image.jpg"} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqData)}
                </script>
            </Helmet>

            <nav className="text-xs text-slate-500 mb-8 uppercase tracking-widest flex items-center gap-2">
                <Link to="/" className="hover:text-white">{ui.back || 'Home'}</Link> 
                <span>/</span>
                <span className="text-slate-300">
                    {pageContext.isStaticLanding ? localizedData.title : `${displayGenre} ${displayCountry}`}
                </span>
            </nav>

            <header className="mb-12">
                <h1 className={`${uiMode === 'classic' ? 'text-3xl font-bold' : 'text-4xl md:text-6xl font-black italic tracking-tighter uppercase'} text-white mb-6`}>
                    {pageContext.isStaticLanding ? localizedData.title : (
                        <>{displayGenre} <span className="text-primary">{displayCountry || ''}</span></>
                    )}
                </h1>
                {uiMode === 'classic' && (
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {localizedData.desc}
                    </p>
                )}
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                 {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className="aspect-[1.2] rounded-[2rem] skeleton-loader bg-white/5" />
                 )) : (visibleStations || []).map((station) => (
                    <div 
                        key={station.stationuuid}
                        onClick={() => onPlay(station)}
                        className={`group relative rounded-[2rem] p-5 cursor-pointer transition-all border-2 
                            ${currentStation?.stationuuid === station.stationuuid ? 'border-primary bg-primary/10' : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-black/60'}`}
                    >
                        <div className="flex justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden">
                                {station.favicon ? (
                                    <img 
                                        src={station.favicon} 
                                        alt={station.name} 
                                        className="w-full h-full object-cover" 
                                        loading="lazy"
                                        onError={(e) => e.currentTarget.style.display = 'none'} 
                                    />
                                ) : (
                                    <span className="text-xs">📻</span>
                                )}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(station.stationuuid); }}
                                className={`text-slate-500 hover:text-red-500 ${favorites.includes(station.stationuuid) ? 'text-red-500' : ''}`}
                            >
                                <HeartIcon className="w-5 h-5" filled={favorites.includes(station.stationuuid)} />
                            </button>
                        </div>
                        <h3 className="font-bold text-white truncate">{station.name}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{station.country} • {station.bitrate || 128}k • {station.codec || 'MP3'}</p>
                    </div>
                 ))}
            </div>

            {/* Load More Marker */}
            {!isLoading && stations.length > visibleCount && (
                <div ref={observerRef} className="h-20 flex items-center justify-center mt-8">
                    <div className="animate-pulse flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                    </div>
                </div>
            )}
            
            {!isLoading && stations.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
                    <p className="text-slate-500 font-bold uppercase tracking-widest">{ui.noTracks || 'No stations found'}</p>
                </div>
            )}

            <article className="mt-24 prose prose-invert prose-lg max-w-4xl mx-auto text-slate-400">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{localizedData.title}</h2>
                <div className="leading-relaxed text-sm text-justify">
                    <p>{seoContent}</p>
                </div>
            </article>
        </div>
    );
};

export default DynamicRadioHub;
