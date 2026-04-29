
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../types/constants';

interface SEOHeadProps {
    language: Language;
    title?: string;
    description?: string;
    image?: string;
}

const SEO_KEYWORDS: Record<Language, string[]> = {
    en: [
        'listen radio online', 'online radio', 'internet radio', 'radio stations online',
        'free online radio', 'pop radio', 'rock radio', 'jazz radio', 'hip hop radio',
        'electronic radio', 'world radio', 'live radio streaming'
    ],
    ru: [
        'слушать радио онлайн', 'радио онлайн', 'интернет радио', 'слушать радио бесплатно',
        'радиостанции мира', 'поп радио', 'рок радио', 'диско радио', 'хип хоп радио',
        'радио Казахстан', 'радио Узбекистан', 'радио Кыргызстан', 'радио Таджикистан',
        'радио Средняя Азия', 'радио Центральная Азия'
    ],
    es: [
        'escuchar radio online', 'radio online', 'radio por internet', 'emisoras en vivo',
        'radio gratis', 'radio pop', 'radio rock', 'radio jazz', 'radio hip hop'
    ],
    fr: [
        'écouter la radio en ligne', 'radio en ligne', 'radio internet', 'stations radio en direct',
        'radio gratuite', 'radio pop', 'radio rock', 'radio jazz'
    ],
    zh: [
        '在线收听广播', '网络广播', '在线广播电台', '免费网络广播',
        '流行音乐广播', '摇滚广播', '爵士广播', '世界广播'
    ],
    de: [
        'radio online hören', 'internetradio', 'online radiosender', 'radio kostenlos',
        'pop radio', 'rock radio', 'jazz radio', 'hip hop radio'
    ]
};

export const SEOHead: React.FC<SEOHeadProps> = ({ language, title, description, image }) => {
    const location = useLocation();
    
    const baseUrl = 'https://auradiochat.com';
    const currentPath = location.pathname;
    const canonicalUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
    const pathWithoutLang = currentPath.replace(/^\/(en|es|fr|de|ru|zh)(?=\/|$)/, '') || '/';
    const localeMap: Record<Language, string> = {
        en: 'en_US',
        ru: 'ru_RU',
        es: 'es_ES',
        fr: 'fr_FR',
        zh: 'zh_CN',
        de: 'de_DE'
    };
    
    // Default Fallbacks
    const defaultTitle = 'AU Radio – Global Online Radio Streaming Player';
    const defaultDescription = 'AU Radio – Global Online Radio Streaming Platform. Listen to jazz, rock, electronic, hip-hop and world radio stations live. Free international internet radio player with smart chat.';
    const defaultImage = `${baseUrl}/og-image.jpg`;

    const metaTitle = title || defaultTitle;
    const metaDesc = description || defaultDescription;
    const metaImage = image || defaultImage;
    const metaKeywords = SEO_KEYWORDS[language].join(', ');

    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
            
            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="AU Radio" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:locale" content={localeMap[language]} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={metaImage} />
            
            {/* Language Alternates (x-default is handled by sitemap, but good for SEO) */}
            <link rel="alternate" href={`${baseUrl}${pathWithoutLang}`} hrefLang="x-default" />
            <link rel="alternate" href={`${baseUrl}/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="en" />
            <link rel="alternate" href={`${baseUrl}/es${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="es" />
            <link rel="alternate" href={`${baseUrl}/fr${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="fr" />
            <link rel="alternate" href={`${baseUrl}/de${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="de" />
            <link rel="alternate" href={`${baseUrl}/ru${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="ru" />
            <link rel="alternate" href={`${baseUrl}/zh${pathWithoutLang === '/' ? '' : pathWithoutLang}`} hrefLang="zh" />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "AU Radio",
                    "url": baseUrl,
                    "inLanguage": language,
                    "keywords": metaKeywords,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${baseUrl}/directory`,
                        "query-input": "required name=search_term_string"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "AU Radio",
                        "url": baseUrl
                    }
                })}
            </script>
        </Helmet>
    );
};
