import { useState, useCallback, useRef, useEffect } from 'react';
import { Station } from '../types';
import { audioEngine } from '../services/AudioEngine';

export const useAudioPlayer = () => {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stallRecoveryTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize global audio element if not present
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.preload = "none"; // Optimize: Don't preload until needed
      audioRef.current = audio;

      // Event Listeners
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      
      const onWaiting = () => {
        setIsBuffering(true);
        // Start stall recovery timer
        if (stallRecoveryTimer.current) clearTimeout(stallRecoveryTimer.current);
        stallRecoveryTimer.current = setTimeout(() => {
          if (audioRef.current && audioRef.current.readyState < 3 && !audioRef.current.paused) {
            console.warn('[useAudioPlayer] Stream stalled. Auto-recovering...');
            const src = audioRef.current.src;
            audioRef.current.src = '';
            audioRef.current.load();
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.src = src;
                audioRef.current.load();
                audioRef.current.play().catch(e => console.error('Recovery play failed:', e));
              }
            }, 100);
          }
        }, 8000); // 8 seconds before forcing a reconnect
      };

      const onPlaying = () => {
        setIsBuffering(false);
        if (stallRecoveryTimer.current) clearTimeout(stallRecoveryTimer.current);
      };
      
      const onLoadStart = () => setIsLoading(true);
      const onCanPlay = () => setIsLoading(false);
      
      const onError = () => {
        console.error('[useAudioPlayer] Audio playback error', audio.error);
        setError('Playback error');
        setIsLoading(false);
        setIsBuffering(false);
        if (stallRecoveryTimer.current) clearTimeout(stallRecoveryTimer.current);
        
        // Auto-recovery for Network Errors (e.g. dropped connection)
        if (audio.error && (audio.error.code === 2 || audio.error.code === 3 || audio.error.code === 4)) {
           console.warn('[useAudioPlayer] Attempting error recovery...');
           setTimeout(() => {
             if (audioRef.current && currentStation) {
                 const src = audioRef.current.src;
                 audioRef.current.src = '';
                 audioRef.current.load();
                 setTimeout(() => {
                    if (audioRef.current) {
                        // Append cache-buster to bypass dead cached connections
                        const urlObj = new URL(currentStation.streamUrl);
                        urlObj.searchParams.set('t', Date.now().toString());
                        audioRef.current.src = urlObj.toString();
                        audioRef.current.load();
                        audioRef.current.play().catch(() => {});
                    }
                 }, 200);
             }
           }, 3000);
        }
      };

      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('waiting', onWaiting);
      audio.addEventListener('stalled', onWaiting); // Treat stalled like waiting
      audio.addEventListener('playing', onPlaying);
      audio.addEventListener('loadstart', onLoadStart);
      audio.addEventListener('canplay', onCanPlay);
      audio.addEventListener('error', onError);

      // Connect to AudioEngine
      audioEngine.init(audio);

      return () => {
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('waiting', onWaiting);
        audio.removeEventListener('stalled', onWaiting);
        audio.removeEventListener('playing', onPlaying);
        audio.removeEventListener('loadstart', onLoadStart);
        audio.removeEventListener('canplay', onCanPlay);
        audio.removeEventListener('error', onError);
        if (stallRecoveryTimer.current) clearTimeout(stallRecoveryTimer.current);
      };
    }
  }, [currentStation]); // Re-bind if we need currentStation in error handler

  const playStation = useCallback(async (station: Station) => {
    if (!audioRef.current) return;

    // Protection against double click on same station
    if (currentStation?.id === station.id && isPlaying) {
      return;
    }

    try {
      setError(null);
      
      // Synchronously resume to preserve user gesture token
      audioEngine.resume().catch(console.warn);
      
      // 1. Fade Out
      audioEngine.prepareForSwitch();
      
      // Artificial delay for smooth transition if needed, 
      // but prepareForSwitch is already async internally in terms of ramping
      await new Promise(resolve => setTimeout(resolve, 100));

      // 2. Change Source (Force flush old buffer)
      setCurrentStation(station);
      audioRef.current.removeAttribute('src'); // Completely remove previous src
      audioRef.current.load(); // Flush internal buffer
      
      setTimeout(async () => {
          if (!audioRef.current) return;
          audioRef.current.src = station.streamUrl;
          audioRef.current.load();

          // 3. Play and Fade In (AudioEngine handles ramping via setVolume)
          try {
             await audioRef.current.play();
             audioEngine.setVolume(volume); 
          } catch (e: any) {
             console.error('[useAudioPlayer] Playback aborted or failed:', e);
             if (e.name !== 'NotAllowedError') {
                 setError('Failed to play stream');
             }
          }
      }, 50);
      
    } catch (err) {
      console.error('[useAudioPlayer] Play error:', err);
      setError('Failed to play stream');
    }
  }, [currentStation, isPlaying, volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentStation) return;
    
    // Synchronous resume to preserve user gesture token
    audioEngine.resume().catch(console.warn);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  }, [isPlaying, currentStation]);

  const setGlobalVolume = useCallback((val: number) => {
    setVolume(val);
    audioEngine.setVolume(val);
  }, []);

  return {
    currentStation,
    isPlaying,
    isLoading,
    isBuffering,
    error,
    volume,
    playStation,
    togglePlay,
    setVolume: setGlobalVolume
  };
};
