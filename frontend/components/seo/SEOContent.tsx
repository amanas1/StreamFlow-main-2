import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../../types';
import { TRANSLATIONS as PAGE_TRANSLATIONS } from '../../types/constants';

interface SEOContentProps {
    language: Language;
}

const SEO_QUERY_CLUSTERS: Record<Language, string[]> = {
    en: ['listen radio online', 'free online radio', 'pop radio', 'rock radio', 'jazz radio', 'hip hop radio'],
    ru: ['слушать радио онлайн', 'радио онлайн бесплатно', 'поп радио', 'рок радио', 'диско радио', 'хип хоп радио'],
    es: ['escuchar radio online', 'radio online gratis', 'radio pop', 'radio rock', 'radio jazz'],
    fr: ['écouter la radio en ligne', 'radio en ligne gratuite', 'radio pop', 'radio rock', 'radio jazz'],
    zh: ['在线收听广播', '免费在线广播', '流行广播', '摇滚广播', '爵士广播'],
    de: ['radio online hören', 'radio kostenlos online', 'pop radio', 'rock radio', 'jazz radio']
};

const CENTRAL_ASIA_RU_QUERIES = [
    'радио Казахстан онлайн',
    'радио Узбекистан онлайн',
    'радио Кыргызстан онлайн',
    'радио Таджикистан онлайн',
    'радио Центральная Азия',
    'слушать радио Средняя Азия'
];

const SEOContent: React.FC<SEOContentProps> = ({ language }) => {
    const t = PAGE_TRANSLATIONS[language] || PAGE_TRANSLATIONS.en;
    const queryCluster = SEO_QUERY_CLUSTERS[language] || SEO_QUERY_CLUSTERS.en;

    return (
        <section className="w-full mt-20 pt-20 border-t border-white/5 opacity-80 pb-20">
            <div className="max-w-4xl mx-auto space-y-10 px-4 text-slate-400">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.seoTitle}
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-500">
                        {t.seoIntro}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.seoJazzTitle}</h3>
                        <p className="text-sm leading-relaxed">
                            {t.seoJazzBody}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">{t.seoGlobalTitle}</h3>
                        <p className="text-sm leading-relaxed">
                            {t.seoGlobalBody}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white text-center uppercase tracking-wide">{t.seoWhyTitle}</h3>
                    <p className="text-sm leading-relaxed">
                        {t.seoWhyBody1}
                    </p>
                    <p className="text-sm leading-relaxed">
                        {t.seoWhyBody2}
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                        {language === 'ru' ? 'Популярные поисковые запросы' : 'Popular search topics'}
                    </h3>
                    <p className="text-sm leading-relaxed">
                        {language === 'ru'
                            ? 'AU Radio оптимизирован для запросов о прослушивании радио онлайн, музыкальных жанрах и международных радиостанциях.'
                            : 'AU Radio is optimized for radio streaming searches, genre-based discovery, and global station browsing.'}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {queryCluster.map((query) => (
                            <span key={query} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-bold tracking-wide text-slate-300">
                                {query}
                            </span>
                        ))}
                    </div>
                </div>

                {language === 'ru' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                            Радио для аудитории Центральной Азии
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Для русскоязычной аудитории из Казахстана, Узбекистана, Кыргызстана, Таджикистана и других стран Центральной Азии мы усилили SEO-семантику под локальные запросы, связанные с музыкой, новыми станциями и прослушиванием радио онлайн в браузере.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {CENTRAL_ASIA_RU_QUERIES.map((query) => (
                                <span key={query} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold tracking-wide text-slate-200">
                                    {query}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <Link to="/jazz-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">{t.genresJazz} Radio</Link>
                    <Link to="/rock-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">{t.genresRock} Radio</Link>
                    <Link to="/electronic-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">{t.genresElectronic} Radio</Link>
                    <Link to="/hip-hop-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">{t.genresHiphop} Radio</Link>
                </div>
            </div>
        </section>
    );
};

export default SEOContent;
