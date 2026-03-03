import React, { useState } from 'react';
import { RadioStation } from '../types';
import { MusicNoteIcon, HeartIcon } from './Icons';
import { Link } from 'react-router-dom';

interface StationCardProps {
  station: RadioStation;
  isSelected: boolean;
  isFavorite: boolean;
  onPlay: (s: RadioStation) => void;
  onToggleFavorite: (id: string) => void;
  index: number;
}

const StationCard: React.FC<StationCardProps> = React.memo(({ 
  station, isSelected, isFavorite, onPlay, onToggleFavorite, index 
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={() => onPlay(station)} 
      role="button"
      aria-label={`Play ${station.name}`}
      className={`group relative rounded-[2rem] p-5 cursor-pointer transition-all border-2 animate-in fade-in slide-in-from-bottom-3 duration-500 bg-black/60 backdrop-blur-md border-[var(--panel-border)] hover:border-white/20 hover:bg-black/80`}
      style={{ animationDelay: `${(index % 5) * 50}ms` }}
    >
      <div className="flex justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-800/50 relative shadow-inner">
          {!imgLoaded && !imgError && <div className="absolute inset-0 skeleton-loader" />}
          {station.favicon && !imgError ? (
            <img 
              src={station.favicon} 
              alt={station.name} 
              loading="lazy" 
              onLoad={() => setImgLoaded(true)} 
              onError={() => setImgError(true)} 
              className={`w-full h-full object-cover transition-all duration-500 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
            />
          ) : (
            <MusicNoteIcon className="w-6 h-6 text-slate-600" />
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(station.stationuuid); }} 
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`p-2 rounded-full transition-all active:scale-150 ${isFavorite ? 'text-secondary bg-secondary/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
        >
          <HeartIcon className="w-5 h-5" filled={isFavorite} />
        </button>
      </div>
      <Link 
        to={`/station/${station.slug}`}
        onClick={(e) => e.stopPropagation()}
        className={`block font-bold truncate text-sm transition-colors ${isSelected ? 'text-primary' : 'text-[var(--text-base)] group-hover:text-primary'}`}
      >
        {station.name}
      </Link>
      <p className="text-[9px] font-black text-slate-500 mt-1 uppercase tracking-widest truncate">{station.genre || station.tags || 'Music'} • {station.bitrate || 128}K</p>
    </div>
  );
});

export default StationCard;
