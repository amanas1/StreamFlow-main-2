import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RadioStation, Language, UIMode, ParticleSettings, RingSettings } from '../types';
import { fetchStationBySlug } from '../services/radioService';
import StationCard from './StationCard';
import { TRANSLATIONS } from '../types/constants';
import ParticleVisualizer from './ParticleVisualizer';
import RingVisualizer from './RingVisualizer';
import { audioEngine } from '../services/AudioEngine';

interface StationPageProps {
    language: Language;
    onPlayStation: (station: RadioStation) => void;
    currentStationId?: string;
    isPlaying?: boolean;
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    uiMode: UIMode;
    particleSettings?: ParticleSettings;
    setParticleSettings?: React.Dispatch<React.SetStateAction<ParticleSettings>>;
    ringSettings?: RingSettings;
    setRingSettings?: React.Dispatch<React.SetStateAction<RingSettings>>;
}

const StationPage: React.FC<StationPageProps> = ({ 
    language, onPlayStation, currentStationId, isPlaying, favorites, onToggleFavorite, uiMode, particleSettings, setParticleSettings, ringSettings, setRingSettings 
}) => {
    const { slug } = useParams<{ slug: string }>();
    const [station, setStation] = useState<RadioStation | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
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

    // Auto-hide settings after 20 seconds of inactivity
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (showSettings) {
            timeoutId = setTimeout(() => {
                setShowSettings(false);
            }, 20000);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [showSettings, particleSettings, ringSettings]);

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
                <div className={`relative group mb-8 flex items-center justify-center ${uiMode === 'modern' ? 'w-64 h-64 sm:w-80 sm:h-80' : 'w-64 h-64'}`}>
                    {uiMode === 'modern' ? (
                        <>
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-10 blur-[60px] transition-opacity z-0 pointer-events-none"></div>
                            <RingVisualizer 
                                analyserNode={audioEngine.getAnalyser()} 
                                isPlaying={!!isPlaying}
                                settings={ringSettings}
                                className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-slate-900/40 rounded-full"
                            />
                        </>
                    ) : (
                        <div className="w-40 h-40 relative z-10 shadow-2xl border-4 border-white/10 rounded-3xl bg-slate-800 flex items-center justify-center">
                            <svg className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    )}
                </div>
                <h1 className="text-4xl font-black text-white mb-4 uppercase italic">Station Not Found</h1>
                <p className="text-slate-400 mb-8 max-w-md">The radio station you are looking for might have moved or is no longer available.</p>
                <Link to="/" className="px-6 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wider hover:bg-primary/80 transition-colors">
                    Back to Home
                </Link>
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

            <div className={`mb-12 flex flex-col items-center text-center relative z-10 ${uiMode === 'classic' ? 'pt-10' : ''}`}>
                <div className={`relative group mb-8 flex items-center justify-center ${uiMode === 'modern' ? 'w-64 h-64 sm:w-80 sm:h-80' : 'w-64 h-64'}`}>
                    {uiMode === 'modern' ? (
                        <>
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-10 blur-[60px] transition-opacity z-0 pointer-events-none"></div>
                            <RingVisualizer 
                                analyserNode={audioEngine.getAnalyser()} 
                                isPlaying={!!isPlaying && currentStationId === station.stationuuid} 
                                settings={ringSettings}
                                className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-slate-900/40 rounded-full"
                            />
                        </>
                    ) : (
                        <img 
                            src={station.favicon || 'https://www.google.com/s2/favicons?domain=' + new URL(station.url_resolved).hostname + '&sz=128'} 
                            alt={station.name}
                            className={`w-40 h-40 relative z-10 shadow-2xl border-4 border-white/10 rounded-3xl`}
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/3103/3103181.png'; }}
                        />
                    )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl flex items-center gap-3">
                    {station.name}
                    {station.homepage && (
                        <a href={station.homepage} target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" title="Visit Station Website">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </a>
                    )}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <span className="px-5 py-2 rounded-full bg-primary/20 text-primary uppercase text-xs font-black tracking-widest border border-primary/30 backdrop-blur-md">
                        {station.genre || 'Various'}
                    </span>
                    <span className="px-5 py-2 rounded-full bg-white/10 text-slate-300 uppercase text-xs font-bold tracking-widest border border-white/5 backdrop-blur-md flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {station.country || 'Global'}
                    </span>
                </div>

                <button 
                    onClick={() => onPlayStation(station)}
                    className={`group relative overflow-hidden px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] mb-12 ${
                        isPlaying && currentStationId === station.stationuuid 
                            ? 'bg-white text-black'
                            : 'bg-gradient-to-r from-primary to-secondary text-white'
                    }`}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10 flex items-center gap-3">
                        {isPlaying && currentStationId === station.stationuuid ? (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                                {t.pause}
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                {t.playNow}
                            </>
                        )}
                    </span>
                </button>

                {uiMode === 'modern' && setParticleSettings && particleSettings && (
                    <div className="w-full max-w-sm mx-auto flex flex-col items-center relative z-10">
                        <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="text-xs text-slate-300 hover:text-white uppercase tracking-widest font-bold flex items-center gap-2 transition-colors mb-4 bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 shadow-lg"
                        >                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
                            {t.vizSettings || 'Visualizer Settings'}
                        </button>
                                                {showSettings && (
                                <div className="w-full bg-black/40 backdrop-blur-2xl shadow-2xl border border-white/10 rounded-[2rem] p-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-6">
                                    <div>
                                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{t.starVariant || 'Star Variant'}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['galaxy', 'viz-journey', 'stage-dancer'].map(variant => (
                                                <button 
                                                    key={variant}
                                                    onClick={() => setParticleSettings(s => ({ ...s, variant: variant as any }))}
                                                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${particleSettings.variant === variant ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                                >
                                                    {t[variant === 'viz-journey' ? 'vizJourney' : variant === 'stage-dancer' ? 'vizStageDancer' : 'vizGalaxy'] || variant.replace('-', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.vizDensity || 'Density')}: {particleSettings.amount}</label>
                                        <input 
                                            type="range" 
                                            min="20" max="300" step="10"
                                            value={particleSettings.amount}
                                            onChange={(e) => setParticleSettings(s => ({ ...s, amount: parseInt(e.target.value) }))}
                                            className="w-full accent-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.vizSpeed || 'Speed')}: {particleSettings.speed.toFixed(1)}x</label>
                                        <input 
                                            type="range" 
                                            min="0.1" max="3.0" step="0.1"
                                            value={particleSettings.speed}
                                            onChange={(e) => setParticleSettings(s => ({ ...s, speed: parseFloat(e.target.value) }))}
                                            className="w-full accent-primary"
                                        />
                                    </div>
                                    {ringSettings && setRingSettings && (
                                        <>
                                            <div className="pt-4 border-t border-white/5">
                                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.ringsAmount || 'Rings Amount')}: {ringSettings.amount}</label>
                                                <input 
                                                    type="range" 
                                                    min="5" max="40" step="1"
                                                    value={ringSettings.amount}
                                                    onChange={(e) => setRingSettings(s => ({ ...s, amount: parseInt(e.target.value) }))}
                                                    className="w-full accent-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.ringThickness || 'Ring Thickness')}: {ringSettings.thickness.toFixed(1)}</label>
                                                <input 
                                                    type="range" 
                                                    min="0.5" max="5.0" step="0.5"
                                                    value={ringSettings.thickness}
                                                    onChange={(e) => setRingSettings(s => ({ ...s, thickness: parseFloat(e.target.value) }))}
                                                    className="w-full accent-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.neonBrightness || 'Neon Brightness')}: {ringSettings.brightness}%</label>
                                                <input 
                                                    type="range" 
                                                    min="20" max="100" step="5"
                                                    value={ringSettings.brightness}
                                                    onChange={(e) => setRingSettings(s => ({ ...s, brightness: parseInt(e.target.value) }))}
                                                    className="w-full accent-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block text-left">{(t.contrastGlow || 'Contrast & Glow')}: {ringSettings.contrast ?? 50}%</label>
                                                <input 
                                                    type="range" 
                                                    min="0" max="100" step="5"
                                                    value={ringSettings.contrast ?? 50}
                                                    onChange={(e) => setRingSettings(s => ({ ...s, contrast: parseInt(e.target.value) }))}
                                                    className="w-full accent-primary"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* In Modern view, we remove the boilerplate about text but keep technical info in a cleaner way */}
            <div className={`grid grid-cols-1 ${uiMode === 'classic' ? 'md:grid-cols-2' : ''} gap-12 mt-8 pt-8 border-t border-white/5`}>
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

                <div className={`${uiMode === 'modern' ? 'max-w-md mx-auto w-full bg-black/40 backdrop-blur-2xl shadow-2xl p-8 rounded-[2.5rem] border border-white/10 relative z-10' : 'bg-white/5 rounded-[2.5rem] p-8 border border-white/10'}`}>
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
