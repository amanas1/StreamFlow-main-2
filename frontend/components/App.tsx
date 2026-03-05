import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RadioStation, CategoryInfo, ViewMode, ThemeName, BaseTheme, Language, VisualizerVariant, VisualizerSettings, AmbienceState, PassportData, BottleMessage, AlarmConfig, FxSettings, AudioProcessSettings, UIMode, ParticleSettings, RingSettings } from '../types';
import { GENRES, ERAS, MOODS, EFFECTS, DEFAULT_VOLUME, TRANSLATIONS, ACHIEVEMENTS_LIST, GLOBAL_PRESETS } from '../types/constants';
import { fetchStationsByTag, fetchStationsByUuids } from '../services/radioService';
const generateUUID = () => Math.random().toString(36).substring(2, 11);
import { audioEngine } from '../services/AudioEngine';
import AudioVisualizer from './AudioVisualizer';
import ParticleVisualizer from './ParticleVisualizer';
import DancingAvatar from './DancingAvatar';
import RainEffect from './RainEffect';
import FireEffect from './FireEffect';
import { geolocationService, LocationData } from '../services/geolocationService';
import { 
  PauseIcon, VolumeIcon, LoadingIcon, MusicNoteIcon, HeartIcon, MenuIcon, AdjustmentsIcon,
  PlayIcon, ChatBubbleIcon, NextIcon, PreviousIcon, XMarkIcon, DownloadIcon,
  SwatchIcon, EnvelopeIcon, LifeBuoyIcon, ShuffleIcon, PlusIcon, ShareIcon, // Using PlusIcon as placeholder for EQ if needed, or AdjustmentsIcon
  QuestionMarkCircleIcon, RocketIcon
} from './Icons';

import { SEOHead } from './seo/SEOHead';
import SEOContent from './seo/SEOContent';
import { AboutPage, PrivacyPage, ContactPage, GenresPage } from './seo/StaticPages';
import { JazzRadioPage, RockRadioPage, ElectronicRadioPage, HipHopRadioPage } from './seo/GenrePages';
import DynamicRadioHub from './seo/DynamicRadioHub';
import { DirectoryPage } from './seo/DirectoryPage';

// Modular Components
import StationCard from './StationCard';
import VolumeDrum from './VolumeDrum';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import StationPage from './StationPage';

const THEME_COLORS: Record<ThemeName, { primary: string; secondary: string }> = {
  default: { primary: '#bc6ff1', secondary: '#f038ff' },
  emerald: { primary: '#00ff9f', secondary: '#00b8ff' },
  midnight: { primary: '#4d4dff', secondary: '#a64dff' },
  cyber: { primary: '#ff00ff', secondary: '#00ffff' },
  volcano: { primary: '#ff3c00', secondary: '#ffcc00' },
  ocean: { primary: '#00d2ff', secondary: '#3a7bd5' },
  sakura: { primary: '#ff758c', secondary: '#ff7eb3' },
  gold: { primary: '#ffcc33', secondary: '#cc9900' },
  frost: { primary: '#74ebd5', secondary: '#acb6e5' },
  forest: { primary: '#a8ff78', secondary: '#78ffd6' },
};

const DEFAULT_VIZ_SETTINGS: VisualizerSettings = {
  scaleX: 1,
  scaleY: 1.1,
  brightness: 100,
  contrast: 130,
  saturation: 120,
  hue: 0,
  opacity: 1,
  speed: 0.6,
  autoIdle: true,
  performanceMode: true,
  energySaver: false,
  barDensity: 2.8,
  vizAlignment: 'bottom',
  glowIntensity: 1.7,
  bgOpacity: 0.7
};

const NEON_DEFAULT_SETTINGS: VisualizerSettings = {
  scaleX: 1,
  scaleY: 1.1,
  brightness: 100,
  contrast: 100,
  saturation: 120,
  hue: 0,
  opacity: 1,
  speed: 2.0,
  autoIdle: true,
  performanceMode: true,
  energySaver: false,
  barDensity: 2.6,
  vizAlignment: 'bottom',
  glowIntensity: 1.3,
  bgOpacity: 0.7
};

const VISUALIZERS_LIST: { id: VisualizerVariant; labelKey: string; defaults?: VisualizerSettings }[] = [
    { id: 'segmented', labelKey: 'vizDigital' },
    { id: 'rainbow-lines', labelKey: 'vizNeon', defaults: NEON_DEFAULT_SETTINGS },
    { id: 'galaxy', labelKey: 'vizGalaxy' },
    { id: 'mixed-rings', labelKey: 'vizRings' },
    { id: 'bubbles', labelKey: 'vizBubbles' },
    { id: 'stage-dancer', labelKey: 'vizStageDancer' },
    { id: 'trio-dancers', labelKey: 'vizTrioDancers' },
    { id: 'viz-journey', labelKey: 'vizJourney' },
];

const INITIAL_CHUNK = 48; 
const PAGE_SIZE = 24;
const TRICKLE_STEP = 12;
const AUTO_TRICKLE_LIMIT = 48;

// Replaced with more reliable direct MP3 links
const AMBIENCE_URLS = {
    rain_soft: '/kamin.mp3',
    rain_roof: '/kamin.mp3',
    fire: '/kamin.mp3',
    city: '/kamin.mp3',
    vinyl: '/kamin.mp3'
};

const ToolsPanel = React.lazy(() => import('./ToolsPanel'));
const ManualModal = React.lazy(() => import('./ManualModal'));
const FeedbackModal = React.lazy(() => import('./FeedbackModal'));
const ShareModal = React.lazy(() => import('./ShareModal'));
import ErrorBoundary from './ErrorBoundary';

const COUNTRY_FLAGS: Record<string, string> = {
  'Kazakhstan': '🇰🇿', 'KZ': '🇰🇿',
  'Russia': '🇷🇺', 'RU': '🇷🇺',
  'United States': '🇺🇸', 'US': '🇺🇸', 'USA': '🇺🇸',
  'Uzbekistan': '🇺🇿', 'UZ': '🇺🇿',
  'Ukraine': '🇺🇦', 'UA': '🇺🇦',
  'Germany': '🇩🇪', 'DE': '🇩🇪',
  'France': '🇫🇷', 'FR': '🇫🇷',
  'China': '🇨🇳', 'CN': '🇨🇳',
  'Japan': '🇯🇵', 'JP': '🇯🇵',
  'United Kingdom': '🇬🇧', 'UK': '🇬🇧', 'GB': '🇬🇧',
  'Kyrgyzstan': '🇰🇬', 'KG': '🇰🇬',
  'Turkey': '🇹🇷', 'TR': '🇹🇷',
  'United Arab Emirates': '🇦🇪', 'UAE': '🇦🇪', 'AE': '🇦🇪',
  'Global': '🌍'
};

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  'KZ': { en: 'Kazakhstan', ru: 'Казахстан', es: 'Kazajistán', fr: 'Kazakhstan', zh: '哈萨克斯坦', de: 'Kasachstan' },
  'Kazakhstan': { en: 'Kazakhstan', ru: 'Казахстан', es: 'Kazajistán', fr: 'Kazakhstan', zh: '哈萨克斯坦', de: 'Kasachstan' },
  'RU': { en: 'Russia', ru: 'Россия', es: 'Rusia', fr: 'Russie', zh: '俄罗斯', de: 'Russland' },
  'Russia': { en: 'Russia', ru: 'Россия', es: 'Rusia', fr: 'Russie', zh: '俄罗斯', de: 'Russland' },
  'US': { en: 'United States', ru: 'США', es: 'EE. UU.', fr: 'États-Unis', zh: '美国', de: 'USA' },
  'USA': { en: 'United States', ru: 'США', es: 'EE. UU.', fr: 'États-Unis', zh: '美国', de: 'USA' },
  'United States': { en: 'United States', ru: 'США', es: 'EE. UU.', fr: 'États-Unis', zh: '美国', de: 'USA' },
  'UZ': { en: 'Uzbekistan', ru: 'Узбекистан', es: 'Uzbekistán', fr: 'Ouzbékistan', zh: '乌兹别克斯坦', de: 'Usbekistan' },
  'UA': { en: 'Ukraine', ru: 'Украина', es: 'Ucrania', fr: 'Ukraine', zh: '乌克兰', de: 'Ukraine' },
  'DE': { en: 'Germany', ru: 'Германия', es: 'Alemania', fr: 'Allemagne', zh: 'Deutschland', de: 'Deutschland' },
  'TR': { en: 'Turkey', ru: 'Турция', es: 'Turquía', fr: 'Turquie', zh: '土耳其', de: 'Türkei' },
  'UK': { en: 'United Kingdom', ru: 'Великобритания', es: 'Reino Unido', fr: 'Royaume-Uni', zh: '英国', de: 'Großbritannien' },
  'United Kingdom': { en: 'United Kingdom', ru: 'Великобритания', es: 'Reino Unido', fr: 'Royaume-Uni', zh: '英国', de: 'Großbritannien' },
  'UAE': { en: 'United Arab Emirates', ru: 'ОАЭ', es: 'EAU', fr: 'Émirats Arabes Unis', zh: '阿联酋', de: 'VAE' },
  'United Arab Emirates': { en: 'United Arab Emirates', ru: 'ОАЭ', es: 'EAU', fr: 'Émirats Arabes Unis', zh: '阿联酋', de: 'VAE' },
  'Global': { en: 'Global', ru: 'Весь мир', es: 'Global', fr: 'Global', zh: '全球', de: 'Weltweit' }
};

function getCountryName(code: string, lang: Language): string {
    const map = COUNTRY_NAMES[code] || COUNTRY_NAMES[code.toUpperCase()];
    return map ? (map[lang] || map['en']) : code;
}

function getCountryFlag(country: string): string {
    return COUNTRY_FLAGS[country] || COUNTRY_FLAGS[country.toUpperCase()] || '🌍';
}

/**
 * VolumeDrum Component
 * A vertical cylindrical volume control with a graduation scale.
 */

export default function App(): React.JSX.Element {
  const navigate = useNavigate();
  // Remove useAuth
  // const { user, logout, isAuthorized, showLoginModal, setShowLoginModal } = useAuth();
  
  // Storage Migration: AU Radio -> AU Radio
  useEffect(() => {
    const migrateStorage = () => {
       const keysToMigrate = [
           'user_profile', 'language', 'random_mode', 'favorites', 
           'theme', 'base_theme', 'visualizer_variant', 'viz_settings',
           'ambience_state', 'passport_data', 'alarm_config', 'fx_settings',
           'audio_process_settings', 'tools_open_count'
       ];
       
       let migratedCount = 0;
       
       keysToMigrate.forEach(key => {
           const oldKey = `streamflow_${key}`;
           const newKey = `auradiochat_${key}`;
           const oldData = localStorage.getItem(oldKey);
           
           if (oldData && !localStorage.getItem(newKey)) {
               localStorage.setItem(newKey, oldData);
               localStorage.removeItem(oldKey); // Optional: keep or remove
               migratedCount++;
           }
       });
       
       if (migratedCount > 0) {
           console.log(`[Rebranding] Migrated ${migratedCount} keys from AU Radio to AU Radio.`);
       }
    };
    
    migrateStorage();
  }, []);

  // Radio State
  const [viewMode, setViewMode] = useState<ViewMode>('genres');
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(GENRES[0]);
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_CHUNK);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);

  // AI State
  const [isAiCurating, setIsAiCurating] = useState(false);
  const [aiNotification, setAiNotification] = useState<string | null>(null);

  // Common Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  // UI State
  const [toolsOpen, setToolsOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/favorites') {
        loadCategory(null, 'favorites', true, true);
    } else if (location.pathname === '/genres') {
        // Just ensure we are in a genre-like mode if we navigate here, 
        // though GenresPage has its own content.
    }
  }, [location.pathname]);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const sidebarTimerRef = useRef<NodeJS.Timeout | null>(null);


  const handleApplyPreset = (presetId: string) => {
      const preset = GLOBAL_PRESETS.find(p => p.id === presetId);
      if (!preset) return;

      setActivePresetId(presetId);
      
      // Apply Theme
      if (preset.theme) {
        setCurrentTheme(preset.theme as ThemeName);
      }
      
      // Apply EQ
      setEqGains(preset.eq);
      
      // Apply FX
      setFxSettings(prev => ({ ...prev, ...preset.fx }));
      
      // Apply Dynamics
      setAudioEnhancements(prev => ({ ...prev, ...preset.process }));

      // Apply Ambience
      // @ts-ignore - Validating existence of property on runtime object
      if (preset.ambience) {
          // @ts-ignore
          setAmbience(prev => ({ ...prev, ...preset.ambience }));
      }
  };


  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const [sleepTimer, setSleepTimer] = useState<number | null>(null); 
  const [eqGains, setEqGains] = useState<number[]>(new Array(10).fill(0));
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auradiochat_current_theme') as ThemeName;
      if (saved) return saved;
    }
    return 'volcano';
  });
  const [baseTheme, setBaseTheme] = useState<BaseTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auradiochat_base_theme') as BaseTheme;
      if (saved) return saved;
    }
    return 'dark';
  });
  const [customCardColor, setCustomCardColor] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auradiochat_language') as Language;
      if (saved) return saved;
      
      const cached = geolocationService.getCachedLocation();
      if (cached && cached.country) {
        const ruCountries = ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Armenia', 'Azerbaijan', 'Georgia', 'Moldova'];
        if (ruCountries.includes(cached.country)) return 'ru';
      }
    }
    return 'ru';
  });

  const [uiMode, setUiMode] = useState<UIMode>(() => {
      const saved = localStorage.getItem('auradiochat_ui_mode') as UIMode;
      return saved === 'modern' ? 'modern' : 'classic';
  });

  const currentStationRef = useRef<RadioStation | null>(null);

  const handleUiModeChange = useCallback((mode: UIMode) => {
      setUiMode(mode);
      localStorage.setItem('auradiochat_ui_mode', mode);

      if (mode === 'modern' && currentStationRef.current) {
          navigate(`/station/${currentStationRef.current.slug}`);
      } else if (mode === 'classic') {
          navigate('/');
      }
      if (window.innerWidth < 1024) setSidebarOpen(false);
  }, [navigate, currentStationRef]);
  const [visualizerVariant, setVisualizerVariant] = useState<VisualizerVariant>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('auradiochat_visualizer_variant') as VisualizerVariant;
        if (saved) return saved;
    }
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 'stage-dancer';
    return 'rainbow-lines';
  });

  const DEFAULT_PARTICLE_SETTINGS: ParticleSettings = { variant: 'galaxy', amount: 120, speed: 1.0, colorSync: true };
  const [particleSettings, setParticleSettings] = useState<ParticleSettings>(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('auradiochat_particle_settings');
          if (saved) return JSON.parse(saved);
      }
      return DEFAULT_PARTICLE_SETTINGS;
  });

  useEffect(() => {
      localStorage.setItem('auradiochat_particle_settings', JSON.stringify(particleSettings));
  }, [particleSettings]);

  const DEFAULT_RING_SETTINGS: RingSettings = { amount: 15, thickness: 1.0, brightness: 50 };
  const [ringSettings, setRingSettings] = useState<RingSettings>(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('auradiochat_ring_settings');
          if (saved) return JSON.parse(saved);
      }
      return DEFAULT_RING_SETTINGS;
  });

  useEffect(() => {
      localStorage.setItem('auradiochat_ring_settings', JSON.stringify(ringSettings));
  }, [ringSettings]);

  const [vizSettingsMap, setVizSettingsMap] = useState<Record<string, VisualizerSettings>>(() => {
    const defaultSettings: Record<string, VisualizerSettings> = {};
    VISUALIZERS_LIST.forEach(v => {
        defaultSettings[v.id] = v.defaults || DEFAULT_VIZ_SETTINGS;
    });

    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('auradiochat_viz_settings_v3');
        if (saved) return JSON.parse(saved);
        
        // Migration from old single setting
        const oldSaved = localStorage.getItem('auradiochat_viz_settings');
        const savedVariant = localStorage.getItem('auradiochat_visualizer_variant') as VisualizerVariant || 'rainbow-lines';
        
        if (oldSaved) {
            try {
                const parsed = JSON.parse(oldSaved);
                defaultSettings[savedVariant] = parsed;
            } catch(e) {}
        }
        
        if (window.innerWidth < 768) {
            defaultSettings[savedVariant] = { ...defaultSettings[savedVariant], energySaver: true, performanceMode: false };
        }
    }
    return defaultSettings;
  });

  const vizSettings = useMemo(() => vizSettingsMap[visualizerVariant] || DEFAULT_VIZ_SETTINGS, [vizSettingsMap, visualizerVariant]);
  
  const setVizSettings = useCallback((newVal: VisualizerSettings | ((prev: VisualizerSettings) => VisualizerSettings)) => {
      setVizSettingsMap(prev => {
          const current = prev[visualizerVariant] || DEFAULT_VIZ_SETTINGS;
          const updated = typeof newVal === 'function' ? (newVal as any)(current) : newVal;
          return { ...prev, [visualizerVariant]: updated };
      });
  }, [visualizerVariant]);
  const [danceStyle, setDanceStyle] = useState<number>(1);
  const [autoDance, setAutoDance] = useState(false);

  useEffect(() => {
    if (!autoDance) return;
    const interval = setInterval(() => {
        setDanceStyle(prev => prev >= 3 ? 1 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoDance]);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isRandomMode, setIsRandomMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auradiochat_random_mode');
      if (saved !== null) return saved === 'true';
    }
    return true; 
  });
  const [isIdleView, setIsIdleView] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [fxSettings, setFxSettings] = useState<FxSettings>({ reverb: 0, speed: 1.0 });
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [audioEnhancements, setAudioEnhancements] = useState<AudioProcessSettings>({
      compressorEnabled: false,
      compressorThreshold: -24,
      compressorRatio: 12,
      bassBoost: 0,
      loudness: 0
  });

  const [detectedLocation, setDetectedLocation] = useState<LocationData | null>(null);
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'ready' | 'error'>('detecting');
  const [isGlobalLightsOn, setIsGlobalLightsOn] = useState(false);
  
  // Automatic Safe Mode logic
  const [isAppVisible, setIsAppVisible] = useState(true);
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024; // PWA/Mobile threshold
  }, []);

  const isSafeMode = useMemo(() => isMobile && !isAppVisible, [isMobile, isAppVisible]);
  const [isBackgroundOptimized, setIsBackgroundOptimized] = useState(true);

  // User ID (for stats/etc)
  const [currentUserId] = useState(() => {
    const saved = localStorage.getItem('auradiochat_user_id');
    if (saved) return saved;
    const newId = `u-${generateUUID()}`;
    localStorage.setItem('auradiochat_user_id', newId);
    return newId;
  });

  const [ambience, setAmbience] = useState<AmbienceState>({ 
      rainVolume: 0, rainVariant: 'soft', fireVolume: 0, cityVolume: 0, vinylVolume: 0, is8DEnabled: false, spatialSpeed: 1 
  });
  const [passport, setPassport] = useState<PassportData>(() => { try { return JSON.parse(localStorage.getItem('auradiochat_passport') || '') } catch { return { countriesVisited: [], totalListeningMinutes: 0, nightListeningMinutes: 0, stationsFavorited: 0, unlockedAchievements: [], level: 1 } } });
  const [alarm, setAlarm] = useState<AlarmConfig>({ enabled: false, time: '08:00', days: [1,2,3,4,5] });

  // Derived state for visual mode based on settings
  const visualMode = useMemo(() => {
      if (vizSettings.energySaver) return 'low';
      if (vizSettings.performanceMode) return 'medium';
      return 'high';
  }, [vizSettings.energySaver, vizSettings.performanceMode]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const ambienceRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const pannerIntervalRef = useRef<number | null>(null);
  const loadRequestIdRef = useRef<number>(0);
  const sleepIntervalRef = useRef<number | null>(null);
  const trickleTimerRef = useRef<number | null>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadTimeoutRef = useRef<number | null>(null);
  const stationsRef = useRef<RadioStation[]>([]);

  const isPlayingRef = useRef(false);
  const isRandomModeRef = useRef(false);
  const isMountedRef = useRef(true);
  const handleNextStationRef = useRef<() => void>(() => {});
  const handlePreviousStationRef = useRef<() => void>(() => {});
  const handlePlayStationRef = useRef<(s: RadioStation) => void>(() => {});
  const togglePlayRef = useRef<() => void>(() => {});

  const t = TRANSLATIONS[language];


  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Sidebar Automation (Mobile & Desktop)
  useEffect(() => {
    const resetHideTimer = () => {
      if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
      
      const width = window.innerWidth;
      const isMobile = width < 1024;
      
      if (sidebarOpen) {
        // Desktop: 60s, Mobile: 5s
        const hideDelay = isMobile ? 5000 : 60000;
        sidebarTimerRef.current = setTimeout(() => {
          setSidebarOpen(false);
        }, hideDelay);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Auto-show when mouse near left edge
      if (!sidebarOpen && e.clientX < 20) {
        setSidebarOpen(true);
      }
      resetHideTimer();
    };

    resetHideTimer();

    // Event listeners
    window.addEventListener('touchstart', resetHideTimer);
    window.addEventListener('click', resetHideTimer);
    window.addEventListener('scroll', resetHideTimer);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', resetHideTimer);
    window.addEventListener('resize', resetHideTimer);

    return () => {
      if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
      window.removeEventListener('touchstart', resetHideTimer);
      window.removeEventListener('click', resetHideTimer);
      window.removeEventListener('scroll', resetHideTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', resetHideTimer);
      window.removeEventListener('resize', resetHideTimer);
    };
  }, [sidebarOpen]);

  // Idempotent Audio Engine Initialization
  const initAudioContextFn = useCallback(async () => {
    if (!audioRef.current) return;
    try {
        await audioEngine.init(audioRef.current);
        audioEngine.setVolume(volume);
        audioEngine.setFX(fxSettings.reverb);
        audioEngine.setSafeMode(isSafeMode);
    } catch (e) {
        console.error("Audio Engine Init Failed", e);
    }
  }, [volume, fxSettings.reverb, isSafeMode]);
  
  const initAudioContext = initAudioContextFn; 

  // Engine Synchronizers
  useEffect(() => {
    audioEngine.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    audioEngine.setFX(fxSettings.reverb); 
    if (audioRef.current) {
        audioRef.current.playbackRate = fxSettings.speed;
    }
  }, [fxSettings]);

  useEffect(() => {
    audioEngine.setSafeMode(isSafeMode);
  }, [isSafeMode]);

  // Handle visibility change for suspension
  useEffect(() => {
      const handleVisChange = () => {
          const hidden = document.hidden;
          setIsAppVisible(!hidden);
          if (hidden && !isPlaying) {
              audioEngine.suspend();
          } else if (!hidden) {
              audioEngine.resume();
          }
      };
      document.addEventListener('visibilitychange', handleVisChange);
      return () => document.removeEventListener('visibilitychange', handleVisChange);
  }, [isPlaying]);

  useEffect(() => {
    let suspendTimer: NodeJS.Timeout;
    if (!isPlaying) {
        suspendTimer = setTimeout(() => {
            audioEngine.suspend();
        }, 10000);
    }
    return () => clearTimeout(suspendTimer);
  }, [isPlaying]);

  useEffect(() => {
    if (sleepTimer !== null && sleepTimer > 0) {
      sleepIntervalRef.current = window.setInterval(() => {
        setSleepTimer((prev) => {
          if (prev !== null && prev > 0) {
            const next = prev - 1;
            if (next <= 0) {
              setIsPlaying(false);
              if (audioRef.current) audioRef.current.pause();
              return null;
            }
            return next;
          }
          return null;
        });
      }, 60000); 
    } else {
      if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
    }
    return () => { if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current); };
  }, [sleepTimer]);

  const triggerLocationDetection = useCallback(async () => {
    console.log('[GEO] Triggering detection...');
    if (!detectedLocation) setLocationStatus('detecting'); // Only show loading if we don't have data
    
    try {
      const loc = await geolocationService.detectLocation();
      const cached = geolocationService.getCachedLocation();
      console.log('[GEO] Detection result:', loc);
      
      if (loc && loc.country && loc.country !== 'Unknown') {
        console.log('[GEO] Valid location found, setting state:', loc);
        setDetectedLocation(loc);
        geolocationService.saveLocationToCache(loc);
        setLocationStatus('ready');
      } else if (cached && cached.country !== 'Unknown') {
        console.log('[GEO] Fallback to cached location:', cached);
        // Only update if we don't have a valid location already (or it matches cache)
        setDetectedLocation(prev => prev?.country && prev.country !== 'Unknown' ? prev : cached);
        setLocationStatus('ready');
      } else {
        console.log('[GEO] Ultimate fallback to Global');
        // CRITICAL FIX: Only set to Global if we have NOTHING else. 
        // If we already have a valid location in state (from a race condition or previous call), KEEP IT.
        setDetectedLocation(prev => {
            if (prev?.country && prev.country !== 'Unknown') {
                console.log('[GEO] Keeping existing valid location instead of resetting to Global:', prev);
                return prev;
            }
            return { country: 'Global', city: 'Global', countryCode: 'Global' };
        });
        setLocationStatus('ready');
      }

      // Auto-switch language logic remains...
      if (!localStorage.getItem('auradiochat_language')) {
         // ... (keep existing logic)
         const target = loc?.country || cached?.country;
         if (target && ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Uzbekistan'].includes(target)) {
             setLanguage('ru');
         }
      }

    } catch (err) {
      console.error('[GEO] Silent detection error:', err);
      setLocationStatus('ready'); 
    }
  }, []);

  useEffect(() => {
    triggerLocationDetection();
  }, [triggerLocationDetection]);

  const handlePlayStation = useCallback((station: RadioStation) => {
    const rid = ++loadRequestIdRef.current;
    currentStationRef.current = station; 
    
    setTimeout(() => {
        if (rid !== loadRequestIdRef.current) return;
        if (visualizerRef.current) {
            visualizerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (mainContentRef.current) {
            mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);

    audioEngine.prepareForSwitch();
    initAudioContext();
    audioEngine.resume();
    
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);

    if (isMountedRef.current) {
        setCurrentStation(station);
        setIsPlaying(true);
        
        // Navigation logic for Modern UI
        if (uiMode === 'modern') {
            navigate(`/station/${station.slug}`);
        }
        setIsBuffering(true);
    }
    
    if (audioRef.current) {
        audioRef.current.src = station.url_resolved;
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.playbackRate = fxSettings.speed; 
        audioRef.current.play().catch(() => {});

        loadTimeoutRef.current = window.setTimeout(() => {
            if (rid !== loadRequestIdRef.current) return;
            console.warn(`[RADIO] Station ${station.name} is too slow. Filtering and skipping.`);
            
            if (isMountedRef.current) {
                setStations(prev => {
                    const currentIndex = prev.findIndex(s => s.stationuuid === station.stationuuid);
                    const newList = prev.filter(s => s.stationuuid !== station.stationuuid);
                    
                    if (newList.length > 0) {
                        const nextIndex = currentIndex % newList.length;
                        setTimeout(() => handlePlayStation(newList[nextIndex]), 10);
                    }
                    return newList;
                });
                
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = "";
                }
                setIsPlaying(false);
                setIsBuffering(false);
            }
        }, 3000);
    }
  }, [initAudioContext, fxSettings.speed, uiMode, navigate]);
  // Removed language from dependency because we no longer use it for notifications here

  useEffect(() => {
    const checkAlarm = setInterval(() => {
      if (alarm.enabled) {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const currentDay = now.getDay();
        
        if (currentTime === alarm.time && alarm.days.includes(currentDay)) {
           if (!isPlaying && stations.length > 0) {
             handlePlayStation(currentStation || stations[0]);
           }
        }
      }
    }, 1000);
    return () => clearInterval(checkAlarm);
  }, [alarm, isPlaying, currentStation, stations, handlePlayStation]);

  // Idle View Removed as per request
  useEffect(() => {
    // Legacy cleanup
    setIsIdleView(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    if (!currentStation) {
        if (stations.length) handlePlayStation(stations[0]);
        return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      initAudioContext(); // Ensure context is ready/resumed
      await audioEngine.resume();
      audioRef.current.play().catch(() => {});
    }
  }, [currentStation, isPlaying, handlePlayStation, stations]);

    // Persistence and Effects
    useEffect(() => {
        localStorage.setItem('auradiochat_random_mode', isRandomMode.toString());
    }, [isRandomMode]);

    const handleNextStation = useCallback(async () => {
      if (isRandomMode) {
          // RANDOM MODE LOGIC: Pick a random safe category
          const safeGenres = GENRES;
          const safeMoods = MOODS;
          const safeEras = ERAS;
          // Combine all "safe" categories
          const allSafe = [...safeGenres, ...safeMoods, ...safeEras];
          const randomCat = allSafe[Math.floor(Math.random() * allSafe.length)];
          
          setIsLoading(true);
          try {
              const randomStations = await fetchStationsByTag(randomCat.id, 20);
              if (randomStations.length > 0) {
                  const randomStation = randomStations[Math.floor(Math.random() * randomStations.length)];
                  handlePlayStation(randomStation);
                  // Optionally update categories to reflect where we are
                  setSelectedCategory(randomCat);
                  setStations(randomStations);
                  // Determine mode
                  if (GENRES.some(g => g.id === randomCat.id)) setViewMode('genres');
                  else if (MOODS.some(m => m.id === randomCat.id)) setViewMode('moods');
                  else setViewMode('eras');
              }
          } catch (e) {
              console.error('Failed to fetch random station', e);
          } finally {
              setIsLoading(false);
          }
          return;
      }

      if (!stations.length) return;
      const currentIndex = currentStation ? stations.findIndex(s => s.stationuuid === currentStation.stationuuid) : -1;
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % stations.length;
      handlePlayStation(stations[nextIndex]);
    }, [stations, currentStation, handlePlayStation, isRandomMode]);

  // Play Button Visualization Effect
  useEffect(() => {
    let animationFrame: number;
    
    // Helper to get theme color
    const getThemeColor = () => {
        // Map theme names to hex colors
        const colors: Record<string, string> = {
            'neon': '#f472b6', // pink-400
            'ocean': '#38bdf8', // sky-400
            'forest': '#4ade80', // green-400
            'sunset': '#fb923c', // orange-400
            'midnight': '#818cf8', // indigo-400
            'default': '#fbcfe8'
        };
        return colors[currentTheme] || '#ffffff';
    };

    const animateButton = () => {
        if (!playButtonRef.current) return;
        
        if (isPlaying && !isBuffering) {
            // Simulate audio reactivity (since we don't have direct access to the main analyser node here without context refactoring)
            // We use a combination of sine waves to create a "breathing" + "jitter" effect that looks like music
            const time = Date.now() / 150;
            const beat = Math.sin(time) * 0.5 + 0.5; // 0 to 1 pulsing
            const jitter = Math.random() * 0.3; // Random noise
            
            const scale = 1 + (beat * 0.05) + (jitter * 0.02); // Scale between 1.0 and 1.1 (уменьшено)
            const glowSize = 5 + (beat * 8) + (jitter * 5); // Shadow between 5px and 18px (уменьшено)
            const color = getThemeColor();
            
            playButtonRef.current.style.transform = `scale(${scale})`;
            playButtonRef.current.style.boxShadow = `0 0 ${glowSize}px ${color}80`; // Добавлен 80 для 50% opacity
            playButtonRef.current.style.borderColor = color;
        } else {
            playButtonRef.current.style.transform = 'scale(1)';
            playButtonRef.current.style.boxShadow = 'none';
        }
        
        animationFrame = requestAnimationFrame(animateButton);
    };

    if (isPlaying) {
        animationFrame = requestAnimationFrame(animateButton);
    } else if (playButtonRef.current) {
        playButtonRef.current.style.transform = 'scale(1)';
        playButtonRef.current.style.boxShadow = 'none';
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, isBuffering, currentTheme]);

  const handlePreviousStation = useCallback(() => {
      if (!stations.length) return;
      const currentIndex = currentStation ? stations.findIndex(s => s.stationuuid === currentStation.stationuuid) : -1;
      const prevIndex = currentIndex === -1 ? stations.length - 1 : (currentIndex - 1 + stations.length) % stations.length;
      handlePlayStation(stations[prevIndex]);
  }, [stations, currentStation, handlePlayStation]);

  useEffect(() => {
    if (isLoading) return;
    if (stations.length > visibleCount && visibleCount < AUTO_TRICKLE_LIMIT) {
      trickleTimerRef.current = window.setTimeout(() => { setVisibleCount(prev => Math.min(prev + TRICKLE_STEP, stations.length)); }, 180); 
    }
    return () => { if (trickleTimerRef.current) clearTimeout(trickleTimerRef.current); };
  }, [isLoading, stations.length, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isLoading && stations.length > visibleCount) {
                setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, stations.length));
            }
        },
        { threshold: 0.1 }
    );
    if (loaderRef.current) {
        observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading, stations.length, visibleCount]);

  useEffect(() => {
    let angle = 0;
    let pannerInterval: number;
    
    if (ambience.is8DEnabled) {
        pannerInterval = window.setInterval(() => {
           angle += 0.02 * ambience.spatialSpeed;
           audioEngine.setSpatialPan(Math.sin(angle));
        }, 30);
    } else {
        audioEngine.setSpatialPan(0);
    }
    return () => { if (pannerInterval) clearInterval(pannerInterval); };
  }, [ambience.is8DEnabled, ambience.spatialSpeed]);

  useEffect(() => {
      ['rain', 'fire', 'city', 'vinyl'].forEach(key => {
          let url = '';
          if (key === 'rain') {
              const rawUrl = ambience.rainVariant === 'roof' ? AMBIENCE_URLS.rain_roof : AMBIENCE_URLS.rain_soft;
              url = rawUrl.startsWith('http') ? rawUrl : new URL(rawUrl, window.location.origin).href;
          } else {
              const rawUrl = (AMBIENCE_URLS as any)[key];
              url = rawUrl.startsWith('http') ? rawUrl : new URL(rawUrl, window.location.origin).href;
          }
          let el = ambienceRefs.current[key];
          if (!el) { 
              el = new Audio(url); 
              el.loop = true; 
              el.preload = "auto";
              if (url.includes('stream')) { el.crossOrigin = "anonymous"; }
              ambienceRefs.current[key] = el; 
          } else {
              const currentSrc = new URL(el.src, window.location.origin).pathname;
              const targetSrc = url.startsWith('http') ? url : (url.startsWith('/') ? url : '/' + url);
              
              if (currentSrc !== targetSrc && el.src !== url) {
                  const wasPlaying = !el.paused;
                  el.src = url;
                  if (wasPlaying) el.play().catch(e => console.error(`[AMBIENCE] Resume failed for ${key}`, e));
              }
          }
          const vol = (ambience as any)[`${key}Volume`]; 
          el.volume = vol;
          if (vol > 0 && el.paused) {
              console.log(`[AMBIENCE] Playing ${key} from ${el.src}`);
              el.play().catch(e => console.error(`Ambience ${key} failed to play:`, e));
          } else if (vol === 0 && !el.paused) {
              el.pause();
          }
      });
  }, [ambience.rainVolume, ambience.rainVariant, ambience.fireVolume, ambience.cityVolume, ambience.vinylVolume]);

  useEffect(() => { audioEngine.setEQ(eqGains); }, [eqGains]);
  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  
  useEffect(() => {
    if (baseTheme === 'light') { document.body.classList.add('light-mode'); } else { document.body.classList.remove('light-mode'); }
    const colors = THEME_COLORS[currentTheme];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    if (customCardColor) {
        const opacity = baseTheme === 'light' ? 0.9 : 0.20; 
        const panelOpacity = baseTheme === 'light' ? 0.98 : 0.25; 
        const inputOpacity = baseTheme === 'light' ? 0.3 : 0.15;
        const borderOpacity = 0.2;
        root.style.setProperty('--card-bg', `rgba(${customCardColor}, ${opacity})`);
        root.style.setProperty('--panel-bg', `rgba(${customCardColor}, ${panelOpacity})`);
        root.style.setProperty('--input-bg', `rgba(${customCardColor}, ${inputOpacity})`);
        root.style.setProperty('--card-border', `rgba(${customCardColor}, ${borderOpacity})`);
        root.style.setProperty('--panel-border', `rgba(${customCardColor}, ${borderOpacity})`);
    } else {
        root.style.removeProperty('--card-bg'); root.style.removeProperty('--panel-bg'); root.style.removeProperty('--input-bg'); root.style.removeProperty('--card-border'); root.style.removeProperty('--panel-border');
    }
    localStorage.setItem('auradiochat_current_theme', currentTheme);
    localStorage.setItem('auradiochat_base_theme', baseTheme);
  }, [currentTheme, baseTheme, customCardColor]);
  useEffect(() => {
    localStorage.setItem('auradiochat_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('auradiochat_visualizer_variant', visualizerVariant);
  }, [visualizerVariant]);

  useEffect(() => {
    localStorage.setItem('auradiochat_viz_settings_v3', JSON.stringify(vizSettingsMap));
  }, [vizSettingsMap]);

  useEffect(() => {
    localStorage.setItem('auradiochat_random_mode', isRandomMode.toString());
  }, [isRandomMode]);

  
  const dedupeStations = (data: RadioStation[]) => {
    // Service already dedupes aggressively, this is just a safety pass for UUID-based fetches
    const seen = new Set();
    return data.filter(s => {
      if (!s.stationuuid || seen.has(s.stationuuid)) return false;
      seen.add(s.stationuuid);
      return true;
    });
  };

  // Sync refs for stable handlers
  useEffect(() => { stationsRef.current = stations; }, [stations]);
  useEffect(() => { currentStationRef.current = currentStation; }, [currentStation]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { isRandomModeRef.current = isRandomMode; }, [isRandomMode]);
  useEffect(() => { handleNextStationRef.current = handleNextStation; }, [handleNextStation]);
  useEffect(() => { handlePreviousStationRef.current = handlePreviousStation; }, [handlePreviousStation]);
  useEffect(() => { handlePlayStationRef.current = handlePlayStation; }, [handlePlayStation]);
  useEffect(() => { togglePlayRef.current = togglePlay; }, [togglePlay]);

  // Consolidate Media Session Logic for maximum cross-device compatibility
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    // 1. Update Metadata
    if (currentStation) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentStation.name,
        artist: currentStation.tags || 'AU Radio Radio',
        album: 'AU Radio Live',
        artwork: [
          { src: currentStation.favicon || '/logo192.png', sizes: '96x96', type: 'image/png' },
          { src: currentStation.favicon || '/logo128.png', sizes: '128x128', type: 'image/png' },
          { src: currentStation.favicon || '/logo192.png', sizes: '192x192', type: 'image/png' },
          { src: currentStation.favicon || '/logo512.png', sizes: '512x512', type: 'image/png' },
        ]
      });
    }

    // 2. Set Playback State with fallback check
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [currentStation, isPlaying]);

  // Persistent Media Session Handlers (registered once)
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    const handlers: Record<string, MediaSessionActionHandler> = {
      play: async () => {
          console.log('[MediaSession] Play Triggered');
          await audioEngine.resume();
          if (togglePlayRef.current) togglePlayRef.current();
      },
      pause: () => {
          console.log('[MediaSession] Pause Triggered');
          if (togglePlayRef.current) togglePlayRef.current();
      },
      stop: () => {
          console.log('[MediaSession] Stop Triggered');
          if (audioRef.current) {
              audioRef.current.pause();
              setIsPlaying(false);
          }
      },
      nexttrack: () => {
          console.log('[MediaSession] Next Track Triggered');
          if (isRandomModeRef.current) handleNextStationRef.current();
          else {
              const s = stationsRef.current;
              const c = currentStationRef.current;
              if (s.length > 0) {
                  const idx = c ? s.findIndex(st => st.stationuuid === c.stationuuid) : -1;
                  const next = (idx + 1) % s.length;
                  handlePlayStationRef.current(s[next]);
              }
          }
      },
      previoustrack: () => {
          console.log('[MediaSession] Previous Track Triggered');
          const s = stationsRef.current;
          const c = currentStationRef.current;
          if (s.length > 0) {
              const idx = c ? s.findIndex(st => st.stationuuid === c.stationuuid) : -1;
              const prev = (idx - 1 + s.length) % s.length;
              handlePlayStationRef.current(s[prev]);
          }
      }
    };

    // Also map seek actions to prev/next for car/headset compatibility
    handlers.seekbackward = handlers.previoustrack;
    handlers.seekforward = handlers.nexttrack;

    Object.entries(handlers).forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action as MediaSessionAction, handler);
      } catch (e) {
        // Some browsers don't support all actions
      }
    });

    return () => {
        isMountedRef.current = false;
        Object.keys(handlers).forEach(action => {
            try { navigator.mediaSession.setActionHandler(action as MediaSessionAction, null); } catch(e){}
        });
        audioEngine.suspend();
    };
  }, []); // Only once


  const loadCategory = useCallback(async (category: CategoryInfo | null, mode: ViewMode, autoPlay: boolean = false, isModeSwitch: boolean = false) => { 
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        if (isModeSwitch) {
            // Explicitly set 5s timer for category switches to ensure it doesn't close immediately
            if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
            sidebarTimerRef.current = setTimeout(() => {
                setSidebarOpen(false);
            }, 5000);
        } else {
            // Style selection: close immediately
            if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
            setSidebarOpen(false);
            // Scroll to top after sidebar closes
            setTimeout(() => {
                if (mainContentRef.current) mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 300);
        }
    }
    const rid = ++loadRequestIdRef.current;
    
    // Clear previous state for a fresh start
    setViewMode(mode); 
    setSelectedCategory(category); 
    setIsLoading(true); 
    setVisibleCount(INITIAL_CHUNK); 
    setStations([]);
    setIsAiCurating(false); 
    
    try {
      if (mode === 'favorites') {
        const savedFavs = localStorage.getItem('auradiochat_favorites');
        const favUuids = savedFavs ? JSON.parse(savedFavs) : [];
        const data = favUuids.length ? await fetchStationsByUuids(favUuids) : [];
        const dedupedPrev = dedupeStations(data);
        if (rid === loadRequestIdRef.current && isMountedRef.current) { 
            setStations(dedupedPrev); 
            setIsLoading(false); 
            if (dedupedPrev.length > 0 && autoPlay) handlePlayStation(dedupedPrev[0]); 
        }
      } else if (category) {
        // Parallel fetch strategy
        fetchStationsByTag(category.id, 300).then(data => { 
            if (rid !== loadRequestIdRef.current || !isMountedRef.current) return;
            
            const deduped = dedupeStations(data);
            setStations(deduped);
            setIsLoading(false);
            
            if (deduped.length > 0 && autoPlay) {
                handlePlayStation(deduped[0]);
            }
        }).catch(err => {
            if (rid === loadRequestIdRef.current && isMountedRef.current) {
                setIsLoading(false);
            }
        });
        
        // Timeout safety
        setTimeout(() => {
            if (rid === loadRequestIdRef.current && isMountedRef.current && isLoading) {
                setIsLoading(false);
            }
        }, 8000);
      }
    } catch (e) { if (rid === loadRequestIdRef.current && isMountedRef.current) setIsLoading(false); }
  }, [handlePlayStation]);

  // Initial Load - Only once
  useEffect(() => { 
    const initialGenre = GENRES.find(g => g.id === 'hiphop') || GENRES[0];
    loadCategory(initialGenre, 'genres', false); 
  }, []); 

  
  useEffect(() => {
    if (!sidebarOpen && sidebarTimerRef.current) {
        clearTimeout(sidebarTimerRef.current);
        sidebarTimerRef.current = null;
    }
  }, [sidebarOpen]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(p => { const n = p.includes(id) ? p.filter(fid => fid !== id) : [...p, id]; localStorage.setItem('auradiochat_favorites', JSON.stringify(n)); return n; });
  }, []);
  



  const handleShowFeature = (featureId: string) => {
      setManualOpen(false);
  };
  
  const visibleStations = useMemo(() => stations.slice(0, visibleCount), [stations, visibleCount]);

  const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
      const { lang } = useParams<{ lang: string }>();
      useEffect(() => {
          if (lang && ['en', 'es', 'fr', 'de', 'ru', 'zh'].includes(lang)) {
              setLanguage(lang as Language);
          }
      }, [lang]);
      return <>{children}</>;
  };

  const renderHome = () => (
    <>
        <Helmet>
            <title>AU Radio – Global Online Radio Streaming Player</title>
            <meta name="description" content="AU Radio – Global Online Radio Streaming Platform. Listen to jazz, rock, electronic, hip-hop and world radio stations live. Free international internet radio player with smart chat." />
            <link rel="canonical" href="https://auradiochat.com/" />
        </Helmet>
        {selectedCategory && viewMode !== 'favorites' && (
            <div ref={visualizerRef} className="mb-8">
                <div className="p-10 h-56 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-end animated-player-border">
                    <div className={`absolute inset-0 bg-gradient-to-r ${selectedCategory.color} opacity-20 mix-blend-overlay`}></div>
                    <div className="absolute inset-x-0 bottom-0 top-0 z-0 opacity-40"><AudioVisualizer analyserNode={audioEngine.getAnalyser()} isPlaying={isPlaying} variant={visualizerVariant} settings={vizSettings} visualMode={visualMode} danceStyle={danceStyle} /></div>
                    {/* Category name removed for clean visualizer look */}
                </div>
                {/* Trust Line */}
                <div className="text-center mt-4 opacity-0 animate-in fade-in slide-in-from-top-2 duration-700 delay-300 fill-mode-forwards">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">24/7 Live Streaming • Global Stations • No Installation Required</p>
                </div>
            </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 pb-32">
            {isLoading || isAiCurating ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="aspect-[1.2] rounded-[2rem] skeleton-loader"></div>) : (
                visibleStations.map((station, index) => (
                    <StationCard key={station.stationuuid} station={station} index={index} isSelected={currentStation?.stationuuid === station.stationuuid} isFavorite={favorites.includes(station.stationuuid)} onPlay={handlePlayStation} onToggleFavorite={toggleFavorite} />
                ))
            )}
        </div>
        {!isLoading && !isAiCurating && stations.length > visibleCount && (
            <div ref={loaderRef} className="h-20 flex items-center justify-center relative z-10 opacity-30">
                <div className="animate-pulse flex space-x-1"><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div><div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div></div>
            </div>
        )}
        <SEOContent language={language} />
    </>
  );


  return (
    <ErrorBoundary>
    <div className={`relative flex h-screen font-sans overflow-hidden bg-[var(--base-bg)] text-[var(--text-base)] transition-all duration-700`}>
      <SEOHead language={language} />
      <RainEffect intensity={ambience.rainVolume} />
      <FireEffect intensity={ambience.fireVolume} />
      {/* Global Dimming Overlay for "Stage Mode" */}
      <div className={`absolute inset-0 bg-black/80 z-[80] transition-opacity duration-1000 pointer-events-none ${isGlobalLightsOn ? 'opacity-100' : 'opacity-0'}`} />
      <audio 
        ref={audioRef} 
        crossOrigin="anonymous"
        preload="auto"
        playsInline
        webkit-playsinline="true"
        onPlay={() => {
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        }}
        onPlaying={() => { 
            if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
            setIsBuffering(false); 
            setIsPlaying(true); 
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        }} 
        onPause={() => {
            if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
            setIsPlaying(false);
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
        }} 
        onWaiting={() => setIsBuffering(true)} 
        onEnded={() => { 
            if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
            if (audioRef.current) { audioRef.current.load(); audioRef.current.play().catch(() => {}); } 
        }} 
        onError={() => {
            if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
        }}
      />
      

      {(window.innerWidth < 1024 && sidebarOpen) && ( <div className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300" onClick={() => setSidebarOpen(false)} /> )}

      <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          isIdleView={isIdleView} 
          language={language} 
          t={t} 
          isPlaying={isPlaying} 
          isBuffering={isBuffering} 
          visualMode={visualMode} 
          viewMode={viewMode} 
          selectedCategory={selectedCategory} 
          loadCategory={loadCategory} 
          sidebarTimerRef={sidebarTimerRef} 
          uiMode={uiMode}
          setUiMode={handleUiModeChange}
      />

      <motion.main 
        className={`flex-1 flex flex-col min-w-0 relative ${sidebarOpen ? 'md:ml-72' : 'ml-0'} transition-[margin] duration-500`}
        animate={{ 
            scale: 1, 
            filter: 'brightness(1) blur(0px)',
            borderRadius: '0px'
        }}
        transition={{ duration: 0.28, ease: [0.25, 0.8, 0.25, 1] }}
        style={{ transformOrigin: 'center center' }}
      >
        
        {/* Global Particles for Modern StationPage */}
        {uiMode === 'modern' && particleSettings && location.pathname.includes('/station/') && (
            <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
                <ParticleVisualizer 
                    analyserNode={audioEngine.getAnalyser()} 
                    isPlaying={isPlaying} 
                    settings={particleSettings}
                    className="w-full h-full"
                />
            </div>
        )}

        <header className={`h-20 flex items-center px-4 md:px-10 justify-between shrink-0 transition-all duration-500 z-10 ${isIdleView ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              aria-label="Open Menu"
              className="p-2 text-[var(--text-base)] hover:text-primary transition-colors flex items-center justify-center"
              title={t.manualTooltip}
            >
              <MenuIcon className="w-7 h-7" />
            </button>
            {/* Mobile Online Counter */}
            <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm ml-1">
                <span className="text-xs animate-spin-slow">🌍</span>
                <span className="text-[11px] font-black text-primary tracking-tighter">
                    1
                </span>
            </div>

            {/* Listening text hidden on mobile, visible on desktop */}
            <div className="hidden md:flex text-slate-400 text-sm font-medium tracking-wide items-center gap-3">
                <span className="whitespace-nowrap">{t.listeningTo}</span>
                <span className="text-[var(--text-base)] font-black uppercase tracking-widest">
                    {viewMode === 'favorites' ? t.favorites : (selectedCategory ? (t[selectedCategory.id] || selectedCategory.name) : 'Radio')}
                </span>
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm animate-in fade-in zoom-in duration-500 ml-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.05em] flex items-center gap-2">
                        {language === 'ru' ? 'СЕЙЧАС СЛУШАЕТ' : 'LISTENING NOW'}
                        <span className="text-sm">{getCountryFlag(detectedLocation?.countryCode || 'KZ')}</span>
                        <span className="text-primary">*{ (detectedLocation?.country || getCountryName('KZ', language)).toUpperCase() }*</span>
                        <span className="text-white/10">-</span> 
                        {language === 'ru' ? 'ОНЛАЙН' : 'ONLINE'} 1
                    </span>
                </div>
            </div>


            {/* Action icons - Tighter gap for mobile */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* AI Curation Button Removed */}
              {/* Online Counter - Smart Ticker Mode Removed/Consolidated */}
            </div>
          </div>
          
          <div className="flex items-center shrink-0 gap-1 md:gap-4">
            {/* Language Switcher - Hidden on mobile, Visible on desktop */}
            <div className="hidden sm:flex items-center bg-white/5 rounded-full p-1 border border-white/5 gap-1">
                {(['en', 'ru', 'es', 'fr', 'zh', 'de'] as Language[]).map((lang) => (
                    <button 
                        key={lang}
                        onClick={() => setLanguage(lang)} 
                        className={`w-7 h-7 flex items-center justify-center text-[10px] font-black rounded-full transition-all ${language === lang ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        title={lang.toUpperCase()}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Online Counter moved elsewhere */}

            {/* Super-chat label with arrow */}
            <button 
                onClick={() => setToolsOpen(!toolsOpen)} 
                className={`p-2 rounded-full relative hover:scale-110 transition-transform shrink-0 z-50 ${toolsOpen ? 'text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'text-slate-400 hover:text-white'}`}
                title={t.tools}
            >
                <RocketIcon className="w-6 h-6" />
            </button>

            <button 
                onClick={() => setFeedbackOpen(true)} 
                className={`p-2 rounded-full relative hover:scale-110 transition-transform shrink-0 z-50 ${feedbackOpen ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                title={t.feedback}
            >
                <EnvelopeIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <div ref={mainContentRef} className={`flex-1 overflow-y-auto px-6 md:px-10 no-scrollbar transition-all duration-500 ${isIdleView ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <Routes>
                <Route path="/" element={renderHome()} />
                <Route path="/:lang" element={<LanguageWrapper>{renderHome()}</LanguageWrapper>} />
                <Route path="/radio/:slug" element={<DynamicRadioHub setLanguage={setLanguage} onPlay={handlePlayStation} currentStation={currentStation} favorites={favorites} toggleFavorite={toggleFavorite} language={language} uiMode={uiMode} />} />
                <Route path="/:lang/radio/:slug" element={<DynamicRadioHub setLanguage={setLanguage} onPlay={handlePlayStation} currentStation={currentStation} favorites={favorites} toggleFavorite={toggleFavorite} language={language} uiMode={uiMode} />} />
                <Route path="/favorites" element={
                    <>
                        <Helmet>
                            <title>My Favorite Radio Stations – AU Radio</title>
                            <meta name="description" content="Access your personally curated list of global radio stations. Your favorite jazz, rock Park, and electronic streams in one place." />
                        </Helmet>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 pb-32">
                            {isLoading ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="aspect-[1.2] rounded-[2rem] skeleton-loader"></div>) : (
                                visibleStations.map((station, index) => (
                                    <StationCard key={station.stationuuid} station={station} index={index} isSelected={currentStation?.stationuuid === station.stationuuid} isFavorite={favorites.includes(station.stationuuid)} onPlay={handlePlayStation} onToggleFavorite={toggleFavorite} />
                                ))
                            )}
                            {visibleStations.length === 0 && !isLoading && (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">No favorites yet</p>
                                    <Link to="/" className="px-6 py-3 bg-primary/20 text-primary rounded-xl font-black uppercase tracking-tighter hover:bg-primary/30 transition-all">Explore Stations</Link>
                                </div>
                            )}
                        </div>
                    </>
                } />
                <Route path="/about" element={<AboutPage language={language} />} />
                <Route path="/privacy-policy" element={<PrivacyPage language={language} />} />
                <Route path="/contact" element={<ContactPage language={language} />} />
                <Route path="/genres" element={<GenresPage language={language} />} />
                <Route path="/jazz-radio" element={<JazzRadioPage language={language} />} />
                <Route path="/rock-radio" element={<RockRadioPage language={language} />} />
                <Route path="/electronic-radio" element={<ElectronicRadioPage language={language} />} />
                <Route path="/hip-hop-radio" element={<HipHopRadioPage language={language} />} />
                <Route path="/directory" element={<DirectoryPage language={language} />} />
                <Route path="/station/:slug" element={
                    <StationPage 
                        language={language} 
                        onPlayStation={handlePlayStation} 
                        currentStationId={currentStation?.stationuuid}
                        isPlaying={isPlaying}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        uiMode={uiMode}
                        particleSettings={particleSettings}
                        setParticleSettings={setParticleSettings}
                        ringSettings={ringSettings}
                        setRingSettings={setRingSettings}
                    />
                } />
            </Routes>
                <footer className="w-full pb-64 pt-20 flex flex-col items-center justify-center gap-10 opacity-80 z-0 relative border-t border-white/5 mt-20">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <Link to="/about" className="hover:text-white transition-colors">{t.aboutAU}</Link>
                            <span className="text-slate-800">•</span>
                            <Link to="/genres" className="hover:text-white transition-colors">{t.genresText}</Link>
                            <span className="text-slate-800">•</span>
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t.privacyPolicy}</Link>
                            <span className="text-slate-800">•</span>
                            <Link to="/contact" className="hover:text-white transition-colors">{t.contactText}</Link>
                            <span className="text-slate-800">•</span>
                            <Link to="/directory" className="hover:text-white transition-colors">{t.directoryText}</Link>
                        </div>
                        <div className="w-16 h-px bg-slate-800"></div>
                        <p className="text-[10px] text-slate-600 font-bold tracking-widest text-center px-4">
                            {t.copyRight}
                        </p>
                    </div>
                </footer>
        </div>

        {/* Idle View Removed */}

        <PlayerBar 
            isIdleView={isIdleView} 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            isPlaying={isPlaying} 
            isBuffering={isBuffering} 
            visualMode={visualMode} 
            visualizerVariant={visualizerVariant} 
            setVisualizerVariant={setVisualizerVariant} 
            selectedCategory={selectedCategory} 
            currentStation={currentStation} 
            language={language} 
            setLanguage={setLanguage} 
            t={t} 
            toolsOpen={toolsOpen} 
            setToolsOpen={setToolsOpen} 
            shareOpen={shareOpen} 
            setShareOpen={setShareOpen} 
            activePresetId={activePresetId} 
            handleApplyPreset={handleApplyPreset} 
            VISUALIZERS_LIST={VISUALIZERS_LIST} 
            handlePreviousStation={handlePreviousStation} 
            handleNextStation={handleNextStation} 
            togglePlay={togglePlay} 
            playButtonRef={playButtonRef} 
            locationStatus={locationStatus} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            isRandomMode={isRandomMode} 
            setIsRandomMode={setIsRandomMode} 
            volume={volume} 
            setVolume={setVolume} 
            uiMode={uiMode}
            setUiMode={setUiMode}
        />

        <Suspense fallback={null}>
            <ToolsPanel 
                isOpen={toolsOpen} 
                onClose={() => setToolsOpen(false)} 
                eqGains={eqGains} 
                setEqGain={(i, v) => setEqGains(p => { const n = [...p]; n[i] = v; return n; })} 
                onSetEqValues={(vals) => setEqGains(vals)} 
                sleepTimer={sleepTimer} 
                setSleepTimer={setSleepTimer} 
                currentTheme={currentTheme} 
                setTheme={setCurrentTheme} 
                baseTheme={baseTheme} 
                setBaseTheme={setBaseTheme} 
                language={language} 
                setLanguage={setLanguage} 
                visualizerVariant={visualizerVariant} setVisualizerVariant={setVisualizerVariant} 
              vizSettings={vizSettings} setVizSettings={setVizSettings}
              danceStyle={danceStyle} setDanceStyle={setDanceStyle}
              autoDance={autoDance} setAutoDance={setAutoDance}
              randomMode={isRandomMode} setRandomMode={setIsRandomMode}
              onStartTutorial={() => { setToolsOpen(false); }} 
              onOpenManual={() => { setToolsOpen(false); setManualOpen(true); }} 
              onOpenProfile={() => { setToolsOpen(false); /* Chat removed */ }} 
                ambience={ambience} 
                setAmbience={setAmbience} 
                passport={passport} 
                alarm={alarm} 
                setAlarm={setAlarm} 
                onThrowBottle={() => {}} 
                onCheckBottle={() => null} 
                customCardColor={customCardColor} 
                setCustomCardColor={setCustomCardColor} 
                fxSettings={fxSettings} 
                setFxSettings={setFxSettings} 
                audioEnhancements={audioEnhancements} 
                setAudioEnhancements={setAudioEnhancements}
                onGlobalReset={() => { if(window.confirm(t.resetConfirm)){ localStorage.clear(); window.location.reload(); } }}
            />
        </Suspense>
        <Suspense fallback={null}><ManualModal isOpen={manualOpen} onClose={() => setManualOpen(false)} language={language} onShowFeature={handleShowFeature} /></Suspense>
        <Suspense fallback={null}><FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} language={language} currentUserId={currentUserId} /></Suspense>

      </motion.main>

      <Suspense fallback={null}>
        <ShareModal 
            isOpen={shareOpen} 
            onClose={() => setShareOpen(false)} 
        />
      </Suspense>


    </div>
    </ErrorBoundary>
  );
}