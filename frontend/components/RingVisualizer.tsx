import React, { useEffect, useRef } from 'react';

interface RingVisualizerProps {
    analyserNode: AnalyserNode | null;
    isPlaying: boolean;
    className?: string;
}

export default function RingVisualizer({ analyserNode, isPlaying, className = '' }: RingVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const dataArrayRef = useRef<Uint8Array>(new Uint8Array(0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const rect = parent.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const renderFrame = () => {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, width, height);

            const bufferLength = analyserNode?.frequencyBinCount || 128;
            if (dataArrayRef.current.length !== bufferLength) {
                dataArrayRef.current = new Uint8Array(bufferLength);
            }
            const dataArray = dataArrayRef.current;

            if (isPlaying && analyserNode) {
                analyserNode.getByteFrequencyData(dataArray as any);
            } else {
                // Smooth decay when paused
                for (let i = 0; i < bufferLength; i++) {
                    dataArray[i] = Math.max(0, dataArray[i] - 5);
                }
            }

            const centerX = width / 2;
            const centerY = height / 2;
            const maxRadius = Math.min(width, height) / 2 - 5;
            
            const numRings = 15; // "много колец"
            const time = Date.now() / 1000;

            for (let i = 0; i < numRings; i++) {
                // Sample lower frequencies for better thumping effect
                const freqIndex = Math.floor((i / numRings) * (bufferLength / 4)); 
                const freqVal = dataArray[freqIndex] / 255;
                
                const baseRadius = (maxRadius / numRings) * (i + 1);
                
                // Intense pulse on bass hits
                const pulse = baseRadius + (freqVal * 25) + Math.sin(time * 3 + i * 0.5) * 4;
                
                // Dynamic Neon Colors
                const hue = (time * 80 + i * 25 + freqVal * 50) % 360;
                const lightness = 50 + (freqVal * 25); 
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, Math.max(0.1, pulse), 0, Math.PI * 2);
                
                ctx.lineWidth = 1.5 + (freqVal * 4); 
                
                const opacity = 0.4 + (freqVal * 0.6);
                
                ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}%, ${opacity})`;
                
                // Optional: Add glow effect for "modern" look
                ctx.shadowBlur = 10 * freqVal;
                ctx.shadowColor = `hsla(${hue}, 80%, 50%, ${opacity})`;
                
                ctx.stroke();
            }

            animationRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [analyserNode, isPlaying]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`pointer-events-none relative z-10 ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
