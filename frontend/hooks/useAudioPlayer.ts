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

  // Initialize global audio element if not present
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";
      audioRef.current = audio;

      // Event Listeners
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onWaiting = () => setIsBuffering(true);
      const onPlaying = () => setIsBuffering(false);
      const onLoadStart = () => setIsLoading(true);
      const onCanPlay = () => setIsLoading(false);
      const onError = () => {
        setError('Playback error');
        setIsLoading(false);
        setIsBuffering(false);
      };

      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('waiting', onWaiting);
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
        audio.removeEventListener('playing', onPlaying);
        audio.removeEventListener('loadstart', onLoadStart);
        audio.removeEventListener('canplay', onCanPlay);
        audio.removeEventListener('error', onError);
      };
    }
  }, []);

  const playStation = useCallback(async (station: Station) => {
    if (!audioRef.current) return;

    // Protection against double click on same station
    if (currentStation?.id === station.id && isPlaying) {
      return;
    }

    try {
      setError(null);
      
      // 1. Fade Out
      audioEngine.prepareForSwitch();
      
      // Artificial delay for smooth transition if needed, 
      // but prepareForSwitch is already async internally in terms of ramping
      await new Promise(resolve => setTimeout(resolve, 100));

      // 2. Change Source
      setCurrentStation(station);
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();

      // 3. Play and Fade In (AudioEngine handles ramping via setVolume)
      await audioRef.current.play();
      audioEngine.setVolume(volume); 
      
    } catch (err) {
      console.error('[useAudioPlayer] Play error:', err);
      setError('Failed to play stream');
    }
  }, [currentStation, isPlaying, volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentStation) return;
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
