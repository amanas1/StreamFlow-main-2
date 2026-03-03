import React, { useRef, useState, useCallback, useEffect } from 'react';

interface VolumeDrumProps {
  value: number;
  onChange: (v: number) => void;
}

const VolumeDrum: React.FC<VolumeDrumProps> = React.memo(({ value, onChange }) => {
    const drumRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInteraction = useCallback((e: any) => {
        if (!drumRef.current) return;
        const rect = drumRef.current.getBoundingClientRect();
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const pos = (rect.bottom - clientY) / rect.height;
        const newValue = Math.max(0, Math.min(1, pos));
        onChange(newValue);
    }, [onChange]);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleInteraction(e);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        handleInteraction(e);
    };

    useEffect(() => {
        if (!isDragging) return;
        const onMove = (e: MouseEvent | TouchEvent) => {
            handleInteraction(e);
        };
        const onEnd = () => setIsDragging(false);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
    }, [isDragging, handleInteraction]);

    return (
        <div 
            ref={drumRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="relative w-8 h-20 bg-slate-900 rounded-lg border border-white/5 cursor-ns-resize overflow-hidden group shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center select-none translate-z-0"
            style={{ 
                background: 'linear-gradient(90deg, #05080f 0%, #161c2c 35%, #2a354d 50%, #161c2c 65%, #05080f 100%)',
            }}
            title="Volume"
        >
            {/* Depth caps */}
            <div className="absolute top-0 inset-x-0 h-1 bg-black/40 border-b border-white/5 z-20" />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40 border-t border-white/5 z-20" />

            {/* Scale Marks */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-1 pointer-events-none z-10">
                {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className={`h-[1px] bg-white transition-opacity duration-300 ${i % 5 === 0 ? 'w-full opacity-30 shadow-[0_0_2px_rgba(255,255,255,0.4)]' : 'w-2/3 mx-auto opacity-10'}`} />
                ))}
            </div>

            {/* Level Fill */}
            <div 
                className="absolute bottom-0 inset-x-0 bg-primary/10 transition-all duration-75 mix-blend-screen"
                style={{ height: `${value * 100}%` }}
            />

            {/* Indicator */}
            <div 
                className="absolute left-0 right-0 h-0.5 bg-primary z-30 transition-all duration-75"
                style={{ 
                    bottom: `${value * 100}%`, 
                    transform: 'translateY(50%)',
                    boxShadow: '0 0 12px var(--color-primary), 0 0 4px white' 
                }}
            />

            {/* Gloss */}
            <div className="absolute inset-y-0 left-1/4 w-1.5 bg-white/5 blur-sm pointer-events-none" />
            
            {/* Value Label */}
            <div className="absolute inset-x-0 top-1 text-center pointer-events-none z-40 opacity-0 group-hover:opacity-40 transition-opacity">
                <span className="text-[6px] font-black text-white">{Math.round(value * 100)}</span>
            </div>
        </div>
    );
});

export default VolumeDrum;
