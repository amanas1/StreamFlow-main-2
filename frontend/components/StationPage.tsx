import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RadioStation, Language, UIMode } from '../types';
import { fetchStationBySlug } from '../services/radioService';
import StationCard from './StationCard';
import { TRANSLATIONS } from '../types/constants';

interface StationPageProps {
    language: Language;
    onPlayStation: (station: RadioStation) => void;
    currentStationId?: string;
    isPlaying?: boolean;
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    uiMode: UIMode;
}

const StationPage: React.FC<StationPageProps> = ({ 
    language, onPlayStation, currentStationId, isPlaying, favorites, onToggleFavorite, uiMode 
}) => {
    const { slug } = useParams<{ slug: string }>();
    const [station, setStation] = useState<RadioStation | null>(null);
    const [loading, setLoading] = useState(true);
    const t = TRANSLATIONS[language];

    useEffect(() => {
        if (slug) {
            setLoading(true);
            fetchStationBySlug(slug).then(s => {
                setStation(s);
                setLoading(false);
                // Optionally auto-play if found
                // if (s) onPlayStation(s);
            }).catch(() => setLoading(false));
        }
    }, [slug, onPlayStation]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t.loading}</p>
            </div>
        );
    }

    if (!station) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h1 className="text-4xl font-black text-white mb-4 uppercase italic">Station Not Found</h1>
                <p className="text-slate-400 mb-8 max-w-md">The radio station you are looking for might have moved or is no longer available.</p>
                <Link to="/" className="px-8 py-4 bg-primary text-white font-black rounded-2xl uppercase italic hover:scale-105 transition-transform">Back to Home</Link>
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RadioStation",
        "name": station.name,
        "url": `https://auradiochat.com/station/${station.slug}`,
        "description": `Listen to ${station.name} live on AU Radio. High quality ${station.genre} music streaming.`,
        "genre": station.genre,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": station.countryCode || "Global"
        },
        "image": station.favicon || "https://auradiochat.com/og-image.png"
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Helmet>
                <title>{`${station.name} – ${t.listenNow} | AU Radio`}</title>
                <meta name="description" content={`${t.listenNow} ${station.name} online. High-quality ${station.genre} and ${station.subGenre} music stream. No registration required.`} />
                <meta property="og:title" content={`${station.name} – AU Radio`} />
                <meta property="og:description" content={`Streaming ${station.genre} music from ${station.country || 'around the world'}.`} />
                <meta property="og:image" content={station.favicon || "https://auradiochat.com/og-image.png"} />
                <link rel="canonical" href={`https://auradiochat.com/station/${station.slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <div className={`mb-12 flex flex-col items-center text-center ${uiMode === 'classic' ? 'pt-10' : ''}`}>
                <div className="relative group mb-8">
                    {uiMode === 'modern' && (
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"></div>
                    )}
                    <img 
                        src={station.favicon || 'https://www.google.com/s2/favicons?domain=' + new URL(station.url_resolved).hostname + '&sz=128'} 
                        alt={station.name}
                        className={`w-32 h-32 relative z-10 shadow-2xl border-4 border-white/10 ${uiMode === 'classic' ? 'rounded-3xl' : 'rounded-[2rem]'}`}
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/3103/3103181.png'; }}
                    />
                </div>

                <h1 className={`text-white mb-2 uppercase italic tracking-tighter ${uiMode === 'classic' ? 'text-4xl font-bold' : 'text-5xl font-black'}`}>{station.name}</h1>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-primary tracking-widest">{station.genre}</span>
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest">{station.country}</span>
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-widest">{station.bitrate} KBPS</span>
                </div>

                <button 
                    onClick={() => onPlayStation(station)}
                    className={`group relative flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-primary to-secondary shadow-[0_0_50px_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 transition-all ${uiMode === 'classic' ? 'rounded-2xl' : 'rounded-[2rem]'}`}
                >
                    <div className="text-white">
                        {currentStationId === station.stationuuid && isPlaying ? (
                             <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                             <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </div>
                    <span className="text-xl font-black text-white uppercase italic tracking-wider">
                        {currentStationId === station.stationuuid && isPlaying ? t.playingNow : t.listenNow}
                    </span>
                </button>
            </div>

            {/* In Modern view, we remove the boilerplate about text but keep technical info in a cleaner way */}
            <div className={`grid grid-cols-1 ${uiMode === 'classic' ? 'md:grid-cols-2' : ''} gap-12 mt-16 pt-16 border-t border-white/5`}>
                {uiMode === 'classic' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic">{t.aboutStation}</h2>
                        <p className="text-slate-400 leading-relaxed">
                            {station.name} — {language === 'ru' ? 'популярная радиостанция, вещающая из' : 'popular radio station broadcasting from'} {station.country}. 
                            {language === 'ru' ? 'Специализируется на' : 'Specializing in'} {station.genre} {language === 'ru' ? 'и предлагает качественный аудиопоток для слушателей по всему миру.' : 'and offering high-quality audio stream for listeners worldwide.'}
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <button 
                                onClick={() => onToggleFavorite(station.stationuuid)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${favorites.includes(station.stationuuid) ? 'bg-rose-500/20 border-rose-500/50 text-rose-500' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
                            >
                                <svg className={`w-5 h-5 ${favorites.includes(station.stationuuid) ? 'fill-current' : 'none'} stroke-current`} viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>
                                <span className="text-xs font-bold uppercase">{favorites.includes(station.stationuuid) ? t.favorited : t.addToFavorites}</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className={`${uiMode === 'modern' ? 'max-w-md mx-auto w-full' : ''} bg-white/5 rounded-[2.5rem] p-8 border border-white/10`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-white uppercase italic">{t.technicalInfo}</h3>
                        {uiMode === 'modern' && (
                             <button 
                                onClick={() => onToggleFavorite(station.stationuuid)}
                                className={`p-2 rounded-full border transition-all ${favorites.includes(station.stationuuid) ? 'bg-rose-500/20 border-rose-500/50 text-rose-500' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
                            >
                                <svg className={`w-5 h-5 ${favorites.includes(station.stationuuid) ? 'fill-current' : 'none'} stroke-current`} viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[10px] uppercase font-bold text-slate-500">{t.bitrate}</span>
                            <span className="text-sm font-black text-slate-300">{station.bitrate} kbps</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[10px] uppercase font-bold text-slate-500">{t.codec}</span>
                            <span className="text-sm font-black text-slate-300">{(station as any).codec || 'MP3'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[10px] uppercase font-bold text-slate-500">{t.votes}</span>
                            <span className="text-sm font-black text-slate-300">{station.votes}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">{t.status}</span>
                            <span className="text-xs font-black text-green-500 uppercase">{t.online}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 pt-12 text-center">
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    {t.discoverMore}
                </Link>
            </div>
        </div>
    );
};

export default StationPage;
