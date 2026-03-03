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
    const particlesRef = useRef<any[]>([]);

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
                width = parent.clientWidth;
                height = parent.clientHeight;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const dataArray = analyserNode ? new Uint8Array(analyserNode.frequencyBinCount) : new Uint8Array(0);

        class Particle {
            x: number;
            y: number;
            baseSize: number;
            size: number;
            speedX: number;
            speedY: number;
            life: number;
            maxLife: number;
            hue: number;
            isPrimary: boolean;
            angle: number;
            radius: number;
            variantAngle: number;

            constructor(w: number, h: number) {
                this.x = w / 2;
                this.y = h / 2;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = (Math.random() * 2 + 0.5) * settings.speed;
                this.speedX = Math.cos(angle) * velocity;
                this.speedY = Math.sin(angle) * velocity;
                
                this.maxLife = Math.random() * 100 + 50;
                this.life = this.maxLife;
                this.isPrimary = Math.random() > 0.5;
                
                this.angle = angle;
                this.radius = Math.random() * 40 + 30;
                this.variantAngle = Math.random() * Math.PI * 2;
                
                this.hue = Math.random() * 360; 
            }

            update(audioIntensity: number, w: number, h: number) {
                this.life -= 0.5;
                
                const beatMod = 1 + (audioIntensity * 1.5);
                
                if (settings.variant === 'stars' || settings.variant === 'bubbles') {
                    this.x += this.speedX * beatMod;
                    this.y += this.speedY * beatMod;
                } else if (settings.variant === 'dust') {
                    this.angle += 0.005 * settings.speed * beatMod * (this.isPrimary ? 1 : -1);
                    this.radius += 0.4 * settings.speed * beatMod;
                    this.x = w / 2 + Math.cos(this.angle) * this.radius;
                    this.y = h / 2 + Math.sin(this.angle) * this.radius;
                } else if (settings.variant === 'neon-rain') {
                    this.y += Math.abs(this.speedY) * 2 * beatMod;
                    if (this.y > h) this.life = 0;
                }

                this.size = this.baseSize + (audioIntensity * this.baseSize * 3);

                if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                    this.reset(w, h);
                }
            }

            reset(w: number, h: number) {
                this.x = settings.variant === 'neon-rain' ? Math.random() * w : w / 2;
                this.y = settings.variant === 'neon-rain' ? 0 : h / 2;
                this.life = this.maxLife;
                this.radius = Math.random() * 40 + 30;
                const angle = Math.random() * Math.PI * 2;
                const velocity = (Math.random() * 2 + 0.5) * settings.speed;
                this.speedX = Math.cos(angle) * velocity;
                this.speedY = Math.sin(angle) * velocity;
            }

            draw(ctx: CanvasRenderingContext2D, opacityMod: number) {
                const opacity = Math.max(0, this.life / this.maxLife) * opacityMod;
                ctx.beginPath();
                
                let colorStr = '';
                if (settings.colorSync) {
                    colorStr = this.isPrimary ? `rgba(188, 111, 241, ${opacity})` : `rgba(255, 0, 124, ${opacity})`; 
                } else {
                    colorStr = `hsla(${this.hue}, 80%, 60%, ${opacity})`;
                }

                ctx.fillStyle = colorStr;
                ctx.strokeStyle = colorStr;
                ctx.lineWidth = 1.5;
                
                if (settings.variant === 'stars') {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.variantAngle);
                    ctx.beginPath();
                    for(let i=0; i<4; i++){
                        ctx.lineTo(0, this.size * 2.5);
                        ctx.rotate(Math.PI / 4);
                        ctx.lineTo(0, this.size * 0.7);
                        ctx.rotate(Math.PI / 4);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                    this.variantAngle += 0.05 * settings.speed;
                } else if (settings.variant === 'bubbles') {
                    ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (settings.variant === 'neon-rain') {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x, this.y - this.size * 4);
                    ctx.stroke();
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        const initParticles = () => {
            particlesRef.current = Array.from({ length: settings.amount }, () => new Particle(width, height));
        };
        initParticles();

        const animate = () => {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, width, height);

            let audioIntensity = 0;
            if (isPlaying && analyserNode) {
                analyserNode.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < 15; i++) sum += dataArray[i];
                audioIntensity = (sum / 15) / 255;
            }

            const activeOpacity = isPlaying ? 1 : 0.2;

            particlesRef.current.forEach(p => {
                p.update(audioIntensity, width, height);
                p.draw(ctx, activeOpacity);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [analyserNode, isPlaying, settings.variant, settings.speed, settings.colorSync]); // Re-init on hard changes

    useEffect(() => {
        // Adjust amount dynamically without resetting everything
        const current = particlesRef.current;
        const canvas = canvasRef.current;
        const w = canvas?.parentElement?.clientWidth || 400;
        const h = canvas?.parentElement?.clientHeight || 400;

        if (current.length < settings.amount) {
            const needed = settings.amount - current.length;
            for(let i=0; i<needed; i++){
                current.push(new (particlesRef.current[0].constructor as any)(w, h)); // Bit hacky but avoids hoisting class
            }
        } else if (current.length > settings.amount) {
            current.length = settings.amount;
        }
    }, [settings.amount]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`pointer-events-none mix-blend-screen absolute inset-0 z-0 ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
