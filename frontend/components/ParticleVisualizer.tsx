import React, { useEffect, useRef } from 'react';
import { ParticleSettings } from '../types';

interface ParticleVisualizerProps {
    analyserNode: AnalyserNode | null;
    isPlaying: boolean;
    settings: ParticleSettings;
    className?: string;
}

export default function ParticleVisualizer({ analyserNode, isPlaying, settings, className = '' }: ParticleVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const starsRef = useRef<any[]>([]);
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
                
                // Cap DPR for performance
                let scaleFactor = Math.min(dpr, 1.5);

                canvas.width = width * scaleFactor;
                canvas.height = height * scaleFactor;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(scaleFactor, scaleFactor);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const initParticles = () => {
             starsRef.current = Array.from({ length: settings.amount }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                phase: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.5 * settings.speed,
                vy: (Math.random() - 0.5) * 0.5 * settings.speed,
                hueOffset: Math.random() * 360
             }));
        };
        initParticles();

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
                dataArray.fill(0);
            }

            const animationSpeed = settings.speed;
            const time = Date.now() / 1000 * animationSpeed;
            const beat = dataArray[4] / 255; // Bass kick

            starsRef.current.forEach((s, i) => {
                // Movement (Galaxy style drifting)
                s.x += s.vx * (1 + beat * 2);
                s.y += s.vy * (1 + beat * 2);
                
                // Wrap around screen
                if (s.x < 0) s.x = width;
                if (s.x > width) s.x = 0;
                if (s.y < 0) s.y = height;
                if (s.y > height) s.y = 0;

                const flicker = Math.sin(time * 5 + s.phase) * 0.5 + 0.5;
                const opacity = Math.min(1, 0.2 + 0.8 * flicker + beat * 0.5);
                const freqIndex = Math.floor((i / settings.amount) * (bufferLength / 2));
                const freqVal = dataArray[freqIndex] / 255;
                
                // Dynamic colors like reference 'galaxy'
                let pulseSize = s.size * (1 + freqVal * 2);

                if (settings.colorSync) {
                    const hue = (freqIndex * 5 + time * 20) % 360;
                    ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${opacity})`;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(renderFrame);
        };

        renderFrame();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [analyserNode, isPlaying, settings.amount, settings.speed, settings.colorSync]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`pointer-events-none mix-blend-screen absolute inset-0 z-0 ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
