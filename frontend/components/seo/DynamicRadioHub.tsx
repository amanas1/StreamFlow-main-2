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

const SEO_SLUG_MAP: Record<string, any> = {
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
        if (!slug) return { isStaticLanding: true, originalSlug: 'radio-online' };
        
        const cleanSlug = slug.toLowerCase();
        
        // 1. Check SEO_SLUG_MAP first
        const mapped = SEO_SLUG_MAP[cleanSlug];
        if (mapped) {
            if (mapped.type === 'country') {
                const country = COUNTRIES_DATA.find(c => c.name.toLowerCase() === mapped.tag.toLowerCase());
                return { country, originalSlug: slug };
            }
            if (mapped.type === 'genre') {
                const genre = GENRES.find(g => g.id === mapped.tag);
                return { genre, originalSlug: slug };
            }
            if (mapped.type === 'combo') {
                const genre = GENRES.find(g => g.id === mapped.genre);
                const country = COUNTRIES_DATA.find(c => c.name.toLowerCase() === mapped.country.toLowerCase());
                return { genre, country, originalSlug: slug };
            }
            if (mapped.type === 'landing') {
                return { isStaticLanding: true, originalSlug: slug };
            }
        }

        // 2. Fallback to Dynamic Dynamic Matching
        // Check Genre
        const genre = GENRES.find(g => cleanSlug.includes(g.id) || cleanSlug.includes(g.id.replace('-', '')));
        
        // Check Country
        const country = COUNTRIES_DATA.find(c => {
            const countrySlug = c.name.toLowerCase().replace(/\s+/g, '-');
            return cleanSlug.includes(countrySlug);
        });

        // Static landing check (legacy)
        const isStaticLanding = ['slushat-radio-online', 'radio-online', 'internet-radio', 'free-online-radio'].includes(cleanSlug);

        // Fallback to global if nothing matches (NEVER return null)
        if (!genre && !country && !isStaticLanding) {
            return { isStaticLanding: true, originalSlug: slug };
        }

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

    // Auto-play the first station on first load for better UX
    useEffect(() => {
        if (!currentStation && stations.length > 0 && !isLoading) {
            onPlay(stations[0]);
        }
    }, [stations, isLoading, currentStation, onPlay]);

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
        
        switch (activeLanguage) {
            case 'ru':
                if (isStaticLanding) return `Добро пожаловать на AU Radio — вашу главную платформу для прослушивания тысяч радиостанций со всего мира. Ищете, где слушать радио онлайн бесплатно? Вы попали по адресу. Наш сервис предлагает кристально чистое интернет-радио без необходимости регистрации или скачивания дополнительных программ. Радио онлайн стало неотъемлемой частью повседневной жизни миллионов людей. Будь вы дома, на работе или в дороге, доступ к любимым радиостанциям онлайн позволяет наслаждаться свежими хитами, проверенной классикой поп, рок, EDM и джаз музыки, а также быть в курсе последних мировых новостей. Слушать радио — это отличный способ открывать для себя новые жанры и культуры. Мы объединили лучшие мировые частоты в удобном интерфейсе. Попробуйте наше бесплатное интернет-радио прямо сейчас: выбирайте жанры по настроению, находите станции по странам и добавляйте любимые потоки в Избранное для быстрого доступа. С AU Radio музыка всегда с вами!`;
                if (pageContext.genre && pageContext.country) return `Слушай ${displayGenre} радио ${displayCountry} онлайн в высоком качестве. Любители жанра ${displayGenre} найдут здесь отборные интернет-радиостанции, вещающие лучшие хиты и редкие треки прямой трансляции. Музыкальная культура региона ${displayCountry} подарила миру множество талантов, и теперь вы можете окунуться в эту атмосферу абсолютно бесплатно. Слушать радио онлайн — это прекрасный способ оставаться на волне любимого жанра без долгих поисков в плейлистах. Мы собрали самые популярные эфиры, где играет ${displayGenre}, чтобы вы могли просто нажать плей и наслаждаться. Наше радио бесплатно предоставляет доступ к непрерывному музыкальному потоку 24/7. Откройте для себя новые голоса и ритмы вместе с тысячами других слушателей со всего света на AU Radio.`;
                if (pageContext.genre) return `Слушай лучшее ${displayGenre} радио онлайн бесплатно. Жанр ${displayGenre} завоевал сердца миллионов слушателей по всему миру благодаря своему уникальному звучанию и невероятной энергетике. На AU Radio мы бережно собрали ведущие мировые радиостанции, транслирующие ${displayGenre} 24 часа в сутки. Включайте наше интернет-радио и наслаждайтесь золотыми хитами прошлого, мощными новинками современности и эксклюзивными сетами от лучших диджеев. Радио онлайн открывает безграничные возможности: находите уникальные потоки, изучайте музыкальную культуру разных стран и создавайте свой идеальный плейлист. Радио бесплатно, доступно на любом устройстве и не требует установки приложений. Присоединяйтесь к мировому сообществу меломанов и сделайте музыку частью каждого вашего дня.`;
                if (pageContext.country) return `Слушай радио ${displayCountry} онлайн бесплатно. Откройте для себя богатство музыкальной культуры региона ${displayCountry}. Независимо от ваших предпочтений — поп-музыка, традиционные мотивы, актуальные новости или классический рок — местные радиостанции готовы предложить вам всё самое лучшее. Слушать радио из этой страны стало проще, чем когда-либо. Наш каталог включает сотни станций, вещающих прямо сейчас. Радио онлайн помогает оставаться на связи с родной культурой тем, кто живет за границей, а также знакомит слушателей со всего света с уникальными культурными особенностями. Выбрав интернет-радио на AU Radio, вы получаете доступ к качественному воспроизведению и удобному интерфейсу. Погрузитесь в звуки мира прямо сейчас — радио бесплатно для всех пользователей!`;
                break;
            case 'es':
                if (isStaticLanding) return `Bienvenido a AU Radio, tu destino principal para escuchar radio online gratis. Explora miles de estaciones de radio por internet de todo el mundo directamente en tu navegador. Ya sea que busques streaming de radio online de pop, rock, jazz, electrónica o noticias, tenemos exactamente lo que necesitas. La radio por internet ha revolucionado la forma en que consumimos audio, ofreciendo acceso ilimitado a culturas y sonidos globales. Con nuestra plataforma, sintonizar estaciones de radio online es completamente fácil y gratuito. Sin registro, sin cuotas ocultas: solo pura radio por internet gratis e ininterrumpida. Descubre nuevos artistas, sigue las listas de éxitos mundiales o relájate con sinfonías clásicas. Empieza a reproducir ahora y experimenta el mundo de la radio online como nunca antes.`;
                if (pageContext.genre && pageContext.country) return `Escucha radio ${displayGenre} de ${displayCountry} online. Para los fans de ${displayGenre}, esta colección ofrece la mejor selección de estaciones de radio por internet transmitiendo en directo desde ${displayCountry}. Experimenta el sabor local único de ${displayGenre} mezclado por DJs residentes y queridos presentadores locales. Sintonizar estaciones de radio online te permite explorar paisajes sonoros regionales auténticos sin problemas. Nuestra plataforma ofrece radio por internet gratis de alta calidad, acercándote a la vibrante escena musical de ${displayCountry}. Ya sea que quieras escuchar radio online como música de fondo mientras trabajas o descubrir nuevos artistas activamente, AU Radio es tu puerta de entrada a las mejores transmisiones de audio del mundo.`;
                if (pageContext.genre) return `Descubre las mejores estaciones de radio de ${displayGenre} online. El cautivador ritmo de ${displayGenre} tiene seguidores dedicados a nivel mundial, y en AU Radio, hemos reunido las transmisiones de radio por internet más populares que presentan este estilo. Sintoniza para escuchar clásicos legendarios y pistas exclusivas de vanguardia. Escuchar radio online significa explorar un catálogo infinito de formatos de audio de alta calidad. Mejora tu rutina diaria con radio por internet gratis que se adapta a tu estado de ánimo y estilo de vida. Ya sea que prefieras ritmos enérgicos o melodías relajantes, nuestra categoría ${displayGenre} cuidadosamente seleccionada promete una experiencia de escucha premium sin suscripciones.`;
                if (pageContext.country) return `Escucha las mejores estaciones de radio de ${displayCountry} online. Sumérgete en la vibrante cultura y la música de moda de ${displayCountry} con nuestra extensa colección de transmisiones locales. Nuestra plataforma de radio por internet proporciona una conexión clara a las voces, noticias y ritmos que definen la región de hoy. Con la radio por internet gratis, explorar escenas internacionales está a solo un clic de distancia. Las estaciones de radio online nunca han sido más accesibles: descubre pop local, melodías tradicionales, programas de entrevistas y música underground. Únete a los miles de usuarios que eligen AU Radio para escuchar radio online y conéctate con el corazón de ${displayCountry}.`;
                break;
            case 'fr':
                if (isStaticLanding) return `Bienvenue sur AU Radio, votre destination de choix pour écouter la radio en ligne gratuitement. Explorez des milliers de stations de radio Internet du monde entier directement dans votre navigateur. Que vous recherchiez du streaming de radio en ligne pop, rock, jazz, électronique ou des nouvelles, nous avons exactement ce qu'il vous faut. La radio Internet a révolutionné notre façon de consommer l'audio, offrant un accès illimité aux cultures et aux sons mondiaux. Avec notre plateforme, écouter des stations de radio en ligne est totalement simple et gratuit. Pas d'inscription, pas de frais cachés : juste de la pure radio Internet gratuite en continu. Découvrez de nouveaux artistes, suivez les classements mondiaux ou détendez-vous avec des symphonies classiques. Commencez à écouter maintenant et découvrez le monde de la radio en ligne comme jamais auparavant.`;
                if (pageContext.genre && pageContext.country) return `Écoutez la radio ${displayGenre} de ${displayCountry} en ligne. Pour les fans de ${displayGenre}, cette collection offre la meilleure sélection de stations de radio Internet diffusant en direct depuis ${displayCountry}. Découvrez la saveur locale unique de ${displayGenre} mixée par des DJ résidents et des présentateurs locaux appréciés. L'écoute de stations de radio en ligne vous permet d'explorer des paysages sonores régionaux authentiques en toute fluidité. Notre plateforme propose une radio Internet gratuite de haute qualité, vous rapprochant de la scène musicale dynamique de ${displayCountry}. Que vous souhaitiez écouter la radio en ligne comme musique de fond en travaillant ou pour découvrir activement de nouveaux artistes, AU Radio est votre passerelle vers les meilleures diffusions audio du monde.`;
                if (pageContext.genre) return `Découvrez les meilleures stations de radio ${displayGenre} en ligne. Le rythme captivant de ${displayGenre} a des adeptes dévoués dans le monde entier, et sur AU Radio, nous avons rassemblé les flux de radio Internet les plus populaires présentant ce style. Syntonisez pour écouter des classiques légendaires et des morceaux exclusifs d'avant-garde. Écouter la radio en ligne, c'est explorer un catalogue infini de formats audio de haute qualité. Améliorez votre quotidien avec une radio Internet gratuite qui s'adapte à votre humeur et à votre style de vie. Que vous préfériez les rythmes énergiques ou les mélodies relaxantes, notre catégorie ${displayGenre} soigneusement organisée promet une expérience d'écoute premium sans abonnement.`;
                if (pageContext.country) return `Écoutez les meilleures stations de radio de ${displayCountry} en ligne. Plongez au cœur de la culture dynamique et de la musique tendance de ${displayCountry} avec notre vaste collection d'émissions locales. Notre plateforme de radio Internet offre une connexion d'une clarté cristalline aux voix, aux nouvelles et aux rythmes qui définissent la région aujourd'hui. Avec la radio Internet gratuite, l'exploration des scènes internationales est à portée de clic. Les stations de radio en ligne n'ont jamais été aussi accessibles : découvrez la pop locale, les airs traditionnels, les talk-shows et la musique underground. Rejoignez des milliers d'utilisateurs qui choisissent AU Radio pour écouter la radio en ligne et connectez-vous avec le cœur de ${displayCountry}.`;
                break;
            case 'zh':
                if (isStaticLanding) return `欢迎来到 AU Radio，您免费在线收听广播的首选平台。在浏览器中直接探索世界各地的数千个互联网广播电台。无论您是寻找流行、摇滚、爵士、电子音频还是新闻的在线广播流，我们都能满足您的需求。互联网广播彻底改变了我们消费音频的方式，让您无限接触全球文化和声音。使用我们的平台，收听在线广播电台既轻松又免费。无注册、无隐藏费用——只有纯粹、不间断的免费互联网广播。发现新艺术家、关注全球排行榜或在古典交响乐中放松身心。立即开始播放，体验前所未有的在线广播世界。`;
                if (pageContext.genre && pageContext.country) return `在线收听来自 ${displayCountry} 的 ${displayGenre} 广播。对于 ${displayGenre} 的粉丝来说，该系列提供了直接来自 ${displayCountry} 的精选互联网广播频道。体验驻场 DJ 和当地著名主持人为您呈现的 ${displayGenre} 独特地方风味。收听在线广播电台让您无缝探索原汁原味的地区声音景观。我们的平台提供高质量的免费互联网广播，让您更接近 ${displayCountry} 充满活力的音乐场景。无论您是想在工作时将在线广播作为背景音乐，还是想主动发现新艺术家，AU Radio 都是您获取世界上最佳音频流的门户。`;
                if (pageContext.genre) return `探索最佳的 ${displayGenre} 在线广播电台。${displayGenre} 迷人的节奏在全球拥有众多忠实追随者，在 AU Radio 上，我们汇集了展示这种风格的最受欢迎的互联网广播流。收听那些传奇经典和前沿独家曲目。在线收听广播意味着探索一个无限的高质量音频格式库。用适应您心情和生活方式的免费互联网广播来丰富您的日常生活。无论您偏好动感节拍还是舒缓旋律，我们精心挑选的 ${displayGenre} 类别都承诺提供无需订阅的高级收听体验。`;
                if (pageContext.country) return `在线收听 ${displayCountry} 热门广播电台。借助我们丰富的本地直播合集，深入了解 ${displayCountry} 充满活力的文化和流行音乐。我们的互联网广播平台为您提供极其清晰的本地嗓音、新闻和当今定义该地区的节奏。通过免费互联网广播的连接，探索国际场景只需点击一下即可。在线广播电台从未如此容易触及——发现本地流行音乐、传统旋律、脱口秀和地下音乐。加入数千位选择 AU Radio 在线收听广播的用户的行列，与 ${displayCountry} 的脉搏相连。`;
                break;
            case 'de':
                if (isStaticLanding) return `Willkommen bei AU Radio, Ihrem erstklassigen Ziel, um Radio online kostenlos zu hören. Entdecken Sie Tausende von Internetradiosendern aus der ganzen Welt direkt in Ihrem Browser. Egal, ob Sie nach Online-Radio-Streaming von Pop, Rock, Jazz, Elektronik oder Nachrichten suchen, wir haben genau das, was Sie brauchen. Internetradio hat die Art und Weise, wie wir Audio konsumieren, revolutioniert und bietet unbegrenzten Zugang zu globalen Kulturen und Klängen. Mit unserer Plattform ist das Einstellen von Online-Radiosendern völlig mühelos und kostenlos. Keine Registrierung, keine versteckten Gebühren – einfach nur reines, ununterbrochenes, kostenloses Internetradio. Entdecken Sie neue Künstler, folgen Sie den globalen Charts oder entspannen Sie sich bei klassischen Symphonien. Starten Sie jetzt das Streaming und erleben Sie die Welt des Online-Radios wie nie zuvor.`;
                if (pageContext.genre && pageContext.country) return `Hören Sie ${displayGenre} Radio aus ${displayCountry} online. Für Fans von ${displayGenre} bietet diese Sammlung die beste Auswahl an Internetradiosendern, die direkt aus ${displayCountry} streamen. Erleben Sie das einzigartige lokale Flair von ${displayGenre}, gemischt von Resident-DJs und beliebten lokalen Moderatoren. Das Einschalten von Online-Radiosendern ermöglicht es Ihnen, authentische regionale Klanglandschaften nahtlos zu erkunden. Unsere Plattform liefert hochwertiges, kostenloses Internetradio und bringt Ihnen die lebendige Musikszene von ${displayCountry} näher. Egal, ob Sie Radio online als Hintergrundmusik während der Arbeit hören oder aktiv neue Künstler entdecken möchten, AU Radio ist Ihr Tor zu den besten Audiostreams der Welt.`;
                if (pageContext.genre) return `Entdecken Sie die besten ${displayGenre}-Radiosender online. Der fesselnde Rhythmus von ${displayGenre} hat weltweit eine engagierte Anhängerschaft, und auf AU Radio haben wir die beliebtesten Internet-Radiostreams mit diesem Stil zusammengestellt. Schalten Sie ein, um legendäre Klassiker und hochmoderne exklusive Tracks zu hören. Radio online zu hören bedeutet, einen endlosen Katalog hochwertiger Audioformate zu erkunden. Bereichern Sie Ihren Alltag mit kostenlosem Internetradio, das sich Ihrer Stimmung und Ihrem Lebensstil anpasst. Egal, ob Sie energiegeladene Beats oder entspannende Melodien bevorzugen, unsere sorgfältig kuratierte ${displayGenre}-Kategorie verspricht ein erstklassiges Hörerlebnis ohne Abonnements.`;
                if (pageContext.country) return `Hören Sie die Top-Radiosender aus ${displayCountry} online. Tauchen Sie mit unserer umfangreichen Sammlung lokaler Sendungen tief in die lebhafte Kultur und trendige Musik von ${displayCountry} ein. Unsere Internetradio-Plattform bietet eine kristallklare Verbindung zu den Stimmen, Nachrichten und Beats, die die Region heute definieren. Mit kostenlosem Internetradio ist die Erkundung internationaler Szenen nur einen Klick entfernt. Online-Radiosender waren noch nie so zugänglich – entdecken Sie lokalen Pop, traditionelle Melodien, Talkshows und Underground-Musik. Schließen Sie sich Tausenden von Benutzern an, die AU Radio wählen, um Radio online zu hören und sich mit dem Herzen von ${displayCountry} zu verbinden.`;
                break;
            case 'en':
            default:
                if (isStaticLanding) return `Welcome to AU Radio, your premiere destination to listen radio online for free. Explore thousands of internet radio stations from around the globe directly in your browser. Whether you are searching for online radio streaming of pop, rock, jazz, electronic, or news, we have precisely what you need. Internet radio has revolutionized how we consume audio, offering limitless access to global cultures and sounds. With our platform, tuning into radio stations online is completely effortless and free. No registration, no hidden fees—just pure, uninterrupted free internet radio. Discover new artists, follow top global charts, or relax to classical symphonies. Start streaming now and experience the world of online radio like never before.`;
                if (pageContext.genre && pageContext.country) return `Listen to ${displayGenre} radio from ${displayCountry} online. For fans of ${displayGenre}, this collection offers the finest selection of internet radio stations streaming directly from ${displayCountry}. Experience the unique local flavor of ${displayGenre} as mixed by resident DJs and beloved local presenters. Tuning into radio stations online allows you to explore authentic regional soundscapes seamlessly. Our platform delivers high-quality free internet radio, bringing you closer to the vibrant music scene of ${displayCountry}. Whether you want to listen radio online for background music while working or to actively discover new artists, AU Radio is your gateway to the world's best audio streams.`;
                if (pageContext.genre) return `Discover the best ${displayGenre} radio stations online. The captivating rhythm of ${displayGenre} has a dedicated following globally, and on AU Radio, we've gathered the most popular internet radio streams featuring this style. Tune in to hear legendary classics and cutting-edge exclusive tracks. To listen radio online means exploring an endless catalog of high-quality audio formats. Enhance your daily routine with free internet radio that adapts to your mood and lifestyle. Whether you prefer energetic beats or relaxing melodies, our carefully curated ${displayGenre} category promises a premium listening experience without subscriptions.`;
                if (pageContext.country) return `Listen to the top radio stations from ${displayCountry} online. Dive deep into the vibrant culture and trending music of ${displayCountry} with our extensive collection of local broadcasts. Our internet radio platform provides crystal clear connection to the voices, news, and beats defining the region today. With free internet radio, exploring international scenes is just a click away. Radio stations online have never been more accessible—discover local pop, traditional tunes, talk shows, and underground music. Join thousands of users who choose AU Radio to listen radio online and connect with the heart of ${displayCountry}.`;
                break;
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
    const canonicalUrl = `https://auradiochat.com${canonicalPath}`;

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
                    "url": `https://auradiochat.com/station/${s.stationuuid}`,
                    "name": s.name
                }))
            }
        };
    }, [localizedData, canonicalUrl, stations]);

    const breadcrumbData = React.useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Online Radio",
                    "item": "https://auradiochat.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": localizedData.title,
                    "item": canonicalUrl
                }
            ]
        };
    }, [localizedData, canonicalUrl]);

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
                <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
                
                {/* hreflang Support */}
                {languages.map(l => (
                    <link 
                        key={l} 
                        rel="alternate" 
                        hrefLang={l} 
                        href={l === 'en' ? canonicalUrl : `https://auradiochat.com/${l}${canonicalPath}`}
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
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbData)}
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
                    {pageContext.isStaticLanding ? localizedData.title : (() => {
                        if (pageContext.genre && pageContext.country) return `${displayGenre} Radio in ${displayCountry}`;
                        if (pageContext.genre && !pageContext.country) return `${displayGenre} Radio Stations`;
                        if (pageContext.country && !pageContext.genre) return `Radio Stations in ${displayCountry}`;
                        return localizedData.title;
                    })()}
                </h1>
                {uiMode === 'classic' && (
                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {localizedData.desc}
                    </p>
                )}
            </header>

            <h2 className="sr-only">
                {localizedData.title} – Online Radio Stations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                 {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className="aspect-[1.2] rounded-[2rem] skeleton-loader bg-white/5" />
                 )) : (visibleStations || []).map((station) => (
                    <div 
                        key={station.stationuuid}
                        onClick={() => onPlay(station)}
                        className={`group relative flex items-center p-3 rounded-xl border transition-all cursor-pointer overflow-hidden
                            ${String(currentStation?.stationuuid) === String(station.stationuuid) ? 'border-primary bg-primary/10' : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-black/60'}
                        `}
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
                    {seoContent.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default DynamicRadioHub;
