import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Language, ViewMode, CategoryInfo, VisualMode, UIMode } from '../types';
import { GENRES, ERAS, MOODS, EFFECTS } from '../types/constants';
import { XMarkIcon, HeartIcon, MusicNoteIcon, SearchIcon } from './Icons';
import DancingAvatar from './DancingAvatar';
import QRCode from 'qrcode';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isIdleView: boolean;
    language: Language;
    t: any;
    isPlaying: boolean;
    isBuffering: boolean;
    visualMode: VisualMode;
    viewMode: ViewMode;
    selectedCategory: CategoryInfo | null;
    loadCategory: (cat: CategoryInfo | null, mode: ViewMode, closeSidebar?: boolean, resetScroll?: boolean) => void;
    sidebarTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    uiMode: UIMode;
    setUiMode: (mode: UIMode) => void;
    installPrompt?: any;
    onInstall?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, onClose, isIdleView, language, t, isPlaying, isBuffering, visualMode, 
    viewMode, selectedCategory, loadCategory, sidebarTimerRef, uiMode, setUiMode,
    installPrompt, onInstall
}) => {
    const [qrDataUrl, setQrDataUrl] = useState<string>('');

    useEffect(() => {
        QRCode.toDataURL('https://auradiochat.com', {
            width: 80,
            margin: 1,
            color: { dark: '#ffffffcc', light: '#00000000' }
        }).then(url => setQrDataUrl(url)).catch(() => {});
    }, []);

    return (
        <aside className={`fixed inset-y-0 left-0 z-[70] w-72 transform transition-all duration-500 glass-panel flex flex-col bg-[var(--panel-bg)] ${isIdleView ? '-translate-x-full opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 flex items-center justify-between shrink-0">
                <div className="flex flex-col">
                    <Link to="/" className="flex items-center gap-3 group" onClick={() => onClose()}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-xl font-black text-white italic">AU</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-black tracking-tighter text-white leading-none uppercase italic group-hover:text-primary transition-colors">AU Radio</h1>
                        </div>
                    </Link>
                    <span className="text-[9px] font-semibold text-slate-400 tracking-wider mt-0.5 italic opacity-90">
                        V1.1 • {t.platform || 'Global Streaming Platform'}
                    </span>
                </div>
                <DancingAvatar isPlaying={isPlaying && !isBuffering} className="w-12 h-12" visualMode={visualMode} />
                <button onClick={onClose} className="lg:hidden p-2 text-slate-400"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            
            <div className="px-4 pb-4 space-y-4 animate-in slide-in-from-left duration-300">
                <div className="relative group">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text"
                        placeholder={t.searchStations || (language === 'ru' ? 'Поиск станций...' : 'Search stations...')}
                        className="w-full bg-[var(--input-bg)] border border-[var(--panel-border)] rounded-2xl py-3 pl-11 pr-4 text-xs font-medium text-[var(--text-base)] focus:outline-none focus:border-primary/50 transition-all"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value;
                                if (val.trim()) {
                                    loadCategory({ id: 'search', name: val, color: 'from-blue-500 to-cyan-500' } as any, 'genres', true, true);
                                    if (window.innerWidth < 1024) onClose();
                                }
                            }
                        }}
                    />
                </div>

                <div className="flex bg-[var(--input-bg)] p-1.5 rounded-2xl border border-[var(--panel-border)] gap-1">
                    {(['genres', 'eras', 'moods', 'effects'] as const).map(m => (
                        <button 
                            key={m} 
                            onClick={(e) => { e.stopPropagation(); loadCategory(m === 'genres' ? GENRES[0] : m === 'eras' ? ERAS[0] : m === 'moods' ? MOODS[0] : EFFECTS[0], m, true, true); }} 
                            className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${viewMode === m ? 'bg-[var(--selected-item-bg)] text-[var(--text-base)]' : 'text-slate-400'}`}
                        >
                            {t[m]}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); loadCategory(null, 'favorites', true, true); }} 
                    className={`w-full py-3 rounded-2xl text-xs font-black border transition-all ${viewMode === 'favorites' ? 'bg-secondary border-secondary text-white' : 'bg-[var(--input-bg)] text-slate-400'}`}
                >
                    <HeartIcon className="w-4 h-4 inline mr-2" filled={viewMode === 'favorites'} /> {t.favorites}
                </button>
                <div className="hidden md:flex bg-white/5 p-1 rounded-2xl border border-white/5 gap-1">
                    <button 
                        onClick={() => setUiMode('classic')}
                        className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${uiMode === 'classic' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {t.classicView}
                    </button>
                    <button 
                        onClick={() => setUiMode('modern')}
                        className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${uiMode === 'modern' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {t.modernView}
                    </button>
                </div>
            </div>

            <div 
                className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 no-scrollbar"
                onScroll={() => {
                    if (sidebarTimerRef.current) {
                        clearTimeout(sidebarTimerRef.current);
                        sidebarTimerRef.current = setTimeout(() => onClose(), 5000);
                    }
                }}
            >
                {viewMode !== 'favorites' && (viewMode === 'genres' ? GENRES : viewMode === 'eras' ? ERAS : viewMode === 'moods' ? MOODS : EFFECTS).map((cat) => (
                    <button 
                        key={cat.id} 
                        onClick={(e) => { e.stopPropagation(); loadCategory(cat, viewMode, true); }} 
                        className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all ${selectedCategory?.id === cat.id ? 'bg-[var(--selected-item-bg)] font-black' : 'text-slate-400 hover:text-[var(--text-base)]'}`}
                    >
                        {t[cat.id] || cat.name}
                    </button>
                ))}
            </div>

            <div className="p-4 pt-2 border-t border-[var(--panel-border)] hidden md:block space-y-2">
                {installPrompt && (
                    <button
                        onClick={onInstall}
                        className="w-full py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {language === 'ru' ? 'Установить AU Radio' : 'Install AU Radio'}
                    </button>
                )}
                <div className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-white/5 flex items-center gap-3">
                    {qrDataUrl ? (
                        <img src={qrDataUrl} alt="QR" className="w-12 h-12 rounded-lg flex-shrink-0" />
                    ) : (
                        <MusicNoteIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                    <div className="text-left">
                        <p className="text-[10px] uppercase font-bold text-slate-500">{t.platform || 'Streaming'}</p>
                        <p className="text-xs font-black text-slate-400">AU Radio</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
