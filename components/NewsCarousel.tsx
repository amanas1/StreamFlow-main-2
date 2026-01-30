import React, { useState, useEffect } from 'react';

interface NewsCarouselProps {
  messages: string[];
  isVisible: boolean;
  language: 'en' | 'ru';
}

type FadeState = 'fadeIn' | 'visible' | 'fadeOut' | 'hidden';

const NewsCarousel: React.FC<NewsCarouselProps> = ({ messages, isVisible, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<FadeState>('fadeIn');

  useEffect(() => {
    if (!isVisible || messages.length === 0) return;

    let timer: number;

    switch (fadeState) {
      case 'fadeIn':
        // Fade in for 500ms, then go to visible
        timer = window.setTimeout(() => setFadeState('visible'), 500);
        break;

      case 'visible':
        // Stay visible for 5 seconds, then fade out
        timer = window.setTimeout(() => setFadeState('fadeOut'), 5000);
        break;

      case 'fadeOut':
        // Fade out for 500ms, then go to hidden
        timer = window.setTimeout(() => setFadeState('hidden'), 500);
        break;

      case 'hidden':
        // Stay hidden for 10 seconds, then advance to next message
        timer = window.setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % messages.length);
          setFadeState('fadeIn');
        }, 10000);
        break;
    }

    return () => clearTimeout(timer);
  }, [fadeState, isVisible, messages.length]);

  if (!isVisible || messages.length === 0) return null;

  const currentMessage = messages[currentIndex];

  // Determine opacity based on fade state
  const opacity = fadeState === 'fadeIn' ? 'opacity-0 animate-in fade-in duration-500' 
                : fadeState === 'visible' ? 'opacity-100' 
                : fadeState === 'fadeOut' ? 'opacity-100 animate-out fade-out duration-500'
                : 'opacity-0';

  return (
    <div className="absolute top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary/90 to-secondary/90 text-white py-1.5 shadow-lg backdrop-blur-md transition-transform duration-500">
      <div 
        className={`text-center text-xs md:text-[10px] font-black uppercase tracking-widest px-4 transition-opacity ${opacity}`}
        style={{ maxWidth: '100vw' }}
      >
        <span className="inline-block truncate max-w-full">
          {currentMessage}
        </span>
      </div>
    </div>
  );
};

export default NewsCarousel;
