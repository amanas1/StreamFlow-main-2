import React from 'react';
import DancingAvatar from './DancingAvatar';
import VolumeDrum from './VolumeDrum';
import { 
  PreviousIcon, PlayIcon, PauseIcon, LoadingIcon, NextIcon, 
  HeartIcon, ShuffleIcon, ShareIcon, AdjustmentsIcon, XMarkIcon, VolumeIcon 
} from './Icons';
import { RadioStation, Language, VisualizerVariant, CategoryInfo, VisualizerSettings, VisualMode, UIMode } from '../types';
import { GLOBAL_PRESETS } from '../types/constants';

interface PlayerBarProps {
    isIdleView: boolean;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    isPlaying: boolean;
    isBuffering: boolean;
    visualMode: VisualMode;
    visualizerVariant: VisualizerVariant;
    setVisualizerVariant: (v: VisualizerVariant) => void;
    selectedCategory: CategoryInfo | null;
    currentStation: RadioStation | null;
    language: Language;
    setLanguage: (l: Language) => void;
    t: any;
    toolsOpen: boolean;
    setToolsOpen: (open: boolean) => void;
    shareOpen: boolean;
    setShareOpen: (open: boolean) => void;
    activePresetId: string;
    handleApplyPreset: (id: string) => void;
    VISUALIZERS_LIST: any[];
    handlePreviousStation: () => void;
    handleNextStation: () => void;
    togglePlay: () => void;
    playButtonRef: React.RefObject<HTMLButtonElement>;
    locationStatus: string;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isRandomMode: boolean;
    setIsRandomMode: (mode: boolean) => void;
    volume: number;
    setVolume: (v: number) => void;
    uiMode: UIMode;
    setUiMode: (mode: UIMode) => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({
    isIdleView, sidebarOpen, setSidebarOpen, isPlaying, isBuffering, visualMode,
    visualizerVariant, setVisualizerVariant, selectedCategory, currentStation,
    language, setLanguage, t, toolsOpen, setToolsOpen, shareOpen, setShareOpen,
    activePresetId, handleApplyPreset, VISUALIZERS_LIST, handlePreviousStation,
    handleNextStation, togglePlay, playButtonRef, locationStatus, favorites,
    toggleFavorite, isRandomMode, setIsRandomMode, volume, setVolume, uiMode, setUiMode
}) => {
    return (
        <div className={`absolute bottom-2 md:bottom-8 left-0 right-0 px-2 md:px-10 transition-all duration-700 ease-in-out z-20 ${isIdleView ? 'opacity-0 translate-y-20 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'}`}>
            <div className={`pointer-events-auto w-full md:w-full md:max-w-[1440px] mx-auto rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-6 flex flex-col md:flex-row items-center shadow-2xl transition-all duration-500 ${uiMode === 'modern' ? 'bg-black/40 backdrop-blur-2xl border border-white/10' : 'bg-[var(--player-bar-bg)] border-2 border-[var(--panel-border)]'}`}>
                
                {/* ROW 1: STATION INFO (Mobile Only) */}
                <div className="flex md:hidden items-center gap-3 mb-2 relative z-10 w-full pr-16 bg-black/20 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
                    <div className="w-14 h-14 shrink-0 relative transition-transform active:scale-95 group cursor-pointer" onClick={() => setSidebarOpen(true)}>
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                            <DancingAvatar isPlaying={isPlaying && !isBuffering} className="w-full h-full" visualMode={visualMode} />
                        </div>
                    </div>
                    
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <div className="flex items-center">
                            <h4 className="font-black text-sm leading-tight truncate text-slate-100 uppercase tracking-wider">
                                {selectedCategory 
                                    ? (t[selectedCategory.id] || selectedCategory.name) 
                                    : (currentStation?.tags?.[0] || (currentStation?.name ? 'Radio' : 'Stream'))}
                            </h4>
                            <div className="flex items-center bg-white/10 rounded-md p-0.5 border border-white/5 ml-4">
                                <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-all ${language === 'en' ? 'bg-primary text-white shadow-sm' : 'text-slate-400'}`}>EN</button>
                                <button onClick={() => setLanguage('ru')} className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-all ${language === 'ru' ? 'bg-primary text-white shadow-sm' : 'text-slate-400'}`}>RU</button>
                            </div>
                        </div>
                        {isBuffering && <p className="text-[9px] text-primary font-black uppercase tracking-widest leading-tight mt-0.5">Buffering...</p>}
                    </div>

                    <div className="flex items-center gap-1 absolute right-1.5 top-1/2 -translate-y-1/2">
                        <button onClick={() => setShareOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/10 rounded-full"><ShareIcon className="w-4 h-4" /></button>
                        <button onClick={() => setToolsOpen(!toolsOpen)} className={`p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/10 rounded-full`}><AdjustmentsIcon className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* ROW 2 (Mobile Only): PRESETS */}
                <div className="flex md:hidden w-full overflow-x-auto no-scrollbar gap-1 pb-2 mb-1 mask-linear-fade pr-12">
                    <button
                        onClick={() => handleApplyPreset('reset')}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 border flex items-center gap-1 ${activePresetId === 'reset' ? 'bg-slate-700 text-white border-slate-600' : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'}`}
                    >
                        <XMarkIcon className="w-3 h-3" />
                        <span>{t.reset || 'Reset'}</span>
                    </button>
                    {GLOBAL_PRESETS.filter(p => p.id !== 'reset').map(preset => (
                        <button key={preset.id} onClick={() => handleApplyPreset(preset.id)} className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 border ${activePresetId === preset.id ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/10'}`}>{preset.name}</button>
                    ))}
                </div>

                {/* ROW 2.5 (Mobile Only): VISUALIZERS */}
                <div className="flex md:hidden w-full overflow-x-auto no-scrollbar gap-1 pb-2 mb-1 mask-linear-fade pr-12">
                    {VISUALIZERS_LIST.map(viz => (
                        <button key={viz.id} onClick={() => setVisualizerVariant(viz.id)} className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 border ${visualizerVariant === viz.id ? 'bg-purple-500 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                            <span className={visualizerVariant === viz.id ? 'shimmering-text-active' : 'shimmering-text'}>{t[viz.labelKey] || viz.id}</span>
                        </button>
                    ))}
                </div>

                {/* ROW 3: CONTROLS */}
                <div className="flex items-center justify-between w-full md:w-auto md:gap-4 z-10 px-2 md:px-0 md:mx-4">
                    <div className="flex items-center gap-2 md:gap-6">
                        <button onClick={() => setToolsOpen(!toolsOpen)} className="p-2 transition-all hover:scale-110 active:scale-95 group" title={t.visualizer}>
                            <div className="w-5 h-5 flex gap-0.5 items-end justify-center">
                                <div className="w-1 h-3 bg-gradient-to-t from-green-400 to-blue-500 rounded-full animate-[bounce_1s_infinite]"></div>
                                <div className="w-1 h-5 bg-gradient-to-t from-purple-400 to-pink-500 rounded-full animate-[bounce_1.2s_infinite]"></div>
                                <div className="w-1 h-2 bg-gradient-to-t from-yellow-400 to-red-500 rounded-full animate-[bounce_0.8s_infinite]"></div>
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button onClick={handlePreviousStation} className="p-2 text-slate-400 hover:text-white transition-colors"><PreviousIcon className="w-6 h-6" /></button>
                        <button ref={playButtonRef} onClick={togglePlay} className={`w-14 h-14 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center text-black shadow-xl hover:scale-105 transition-all mx-1 duration-75 relative overflow-hidden group ${isPlaying ? 'bg-white' : 'bg-white/90'}`}>
                            {isBuffering || locationStatus === 'detecting' ? <LoadingIcon className="animate-spin w-6 h-6 text-primary" /> : isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-1" />}
                            {locationStatus === 'detecting' && <div className="absolute top-1 right-2 text-[8px] animate-pulse">🛰️</div>}
                            {locationStatus === 'error' && <div className="absolute top-1 right-2 text-[8px] text-red-500" title="Location detection failed">⚠️</div>}
                        </button>
                        <button onClick={handleNextStation} className="p-2 text-slate-400 hover:text-white transition-colors"><NextIcon className="w-6 h-6" /></button>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button onClick={(e) => { e.stopPropagation(); if(currentStation) toggleFavorite(currentStation.stationuuid); }} className={`p-2 transition-all duration-300 hover:scale-110 ${currentStation && favorites.includes(currentStation.stationuuid) ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-slate-400 hover:text-white'}`} disabled={!currentStation}>
                            <HeartIcon className={`w-6 h-6 ${currentStation && favorites.includes(currentStation.stationuuid) ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => setIsRandomMode(!isRandomMode)} className={`p-2 transition-all hover:scale-110 active:scale-95 ${isRandomMode ? 'text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'text-slate-400 hover:text-white'}`} title={t.randomMode}><ShuffleIcon className="w-5 h-5" /></button>
                        
                        <div className="hidden 2xl:flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-xl border border-white/5">
                                {GLOBAL_PRESETS.map(preset => (
                                    <button key={preset.id} onClick={() => handleApplyPreset(preset.id)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${activePresetId === preset.id ? 'bg-primary text-black shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] scale-105' : 'text-slate-500 hover:text-white hover:bg-white/10'}`}>{preset.name}</button>
                                ))}
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-xl border border-white/5">
                                {VISUALIZERS_LIST.map(viz => (
                                    <button key={viz.id} onClick={() => setVisualizerVariant(viz.id)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${visualizerVariant === viz.id ? 'bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105' : 'text-slate-500 hover:text-white hover:bg-white/10'}`}>
                                        <span className={visualizerVariant === viz.id ? 'shimmering-text-active' : 'shimmering-text'}>{t[viz.labelKey] || viz.id}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 3: DESKTOP EXTRAS */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-2 md:gap-4 z-10 pr-6 md:pr-2">
                    {!sidebarOpen && (
                        <div className="hidden md:block w-14 h-14 group cursor-pointer transition-all hover:scale-110 active:scale-95 mr-1" onClick={() => setSidebarOpen(true)} title="Show Sidebar">
                            <DancingAvatar isPlaying={isPlaying && !isBuffering} className="w-full h-full" visualMode={visualMode} />
                        </div>
                    )}
                    <button onClick={() => setShareOpen(true)} className="p-2 text-slate-400 hover:text-primary transition-colors hover:scale-110" title="Share"><ShareIcon className="w-5 h-5" /></button>
                    <button onClick={() => setToolsOpen(!toolsOpen)} className={`p-2.5 text-[var(--text-base)] hover:text-primary transition-colors ${isIdleView ? 'hidden' : ''}`}><AdjustmentsIcon className="w-6 h-6" /></button>
                    <div className="flex items-center gap-3 ml-2">
                        <VolumeIcon className="w-5 h-5 text-slate-400" />
                        <VolumeDrum value={volume} onChange={setVolume} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerBar;
