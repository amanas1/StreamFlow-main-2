
export interface RadioStation {
  changeuuid: string;
  stationuuid: string;
  name: string;
  slug: string; // New field for /station/{slug}
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  genre: string; // Map from tags
  subGenre?: string; // Optional sub-category
  country: string;
  countryCode?: string;
  state: string;
  language: string;
  votes: number;
  codec: string;
  bitrate: number;
  popularityScore: number; // For ranking
  isFeatured?: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  color: string;
  type?: 'genre' | 'era' | 'mood' | 'effect';
  description?: string;
}

export type ViewMode = 'genres' | 'eras' | 'moods' | 'effects' | 'favorites'; 

export type VisualizerVariant = 'segmented' | 'rainbow-lines' | 'galaxy' | 'mixed-rings' | 'bubbles' | 'stage-dancer' | 'trio-dancers' | 'viz-journey';

export type VisualMode = 'high' | 'medium' | 'low';
export type UIMode = 'classic' | 'modern';
export type ParticleVariant = 'galaxy' | 'viz-journey' | 'stage-dancer';

export interface ParticleSettings {
  variant: ParticleVariant;
  amount: number; // 50 to 300
  speed: number;  // 0.5 to 2.0
  colorSync: boolean; // Sync with theme primary/secondary
}

export interface RingSettings {
  amount: number; // Number of rings (e.g. 5 to 30)
  thickness: number; // Line width (e.g. 0.5 to 5)
  brightness: number; // Brightness boost (e.g. 0 to 100)
}

export interface VisualizerSettings {
  scaleX: number;
  scaleY: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  opacity: number;
  speed: number;
  autoIdle: boolean;
  performanceMode: boolean;
  danceArmIntensity?: number;
  danceLegIntensity?: number;
  danceHeadIntensity?: number;
  fpsLimit?: boolean;
  isDisabled?: boolean; // Deprecated in favor of energySaver, kept for compatibility if needed
  energySaver: boolean; // New Energy Saver Mode
  barDensity?: number; // 0.5 to 2.0 multiplier
  vizAlignment?: 'center' | 'bottom';
  glowIntensity?: number; // 0 to 2
  bgOpacity?: number; // 0 to 0.8
}

export interface FxSettings {
  reverb: number; // 0 to 1
  speed: number; // 0.8 to 1.2
}

export interface AudioProcessSettings {
  compressorEnabled: boolean;
  compressorThreshold: number; // -100 to 0
  compressorRatio: number; // 1 to 20
  bassBoost: number; // 0 to 20 (dB)
  loudness: number; // 0 to 20 (dB)
}

export type ThemeName = 
  | 'default' 
  | 'emerald' 
  | 'midnight' 
  | 'cyber' 
  | 'volcano' 
  | 'ocean' 
  | 'sakura' 
  | 'gold' 
  | 'frost' 
  | 'forest';

export type BaseTheme = 'dark' | 'light' | 'auto';
export type Language = 'en' | 'ru' | 'es' | 'fr' | 'zh' | 'de';


export interface UserProfile {
  id: string;
  name: string;
}


export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string; 
  coverUrl: string; 
  duration: number; 
  tags: string[];
}

export interface AmbienceState {
  rainVolume: number;
  rainVariant: 'soft' | 'roof'; 
  fireVolume: number;
  cityVolume: number;
  vinylVolume: number;
  is8DEnabled: boolean;
  spatialSpeed: number; 
}

export interface PassportData {
  countriesVisited: string[];
  totalListeningMinutes: number;
  nightListeningMinutes: number;
  stationsFavorited: number;
  unlockedAchievements: string[];
  level: number;
}

export interface Achievement {
  id: string;
  icon: string;
  titleKey: string;
  descKey: string;
  condition: (data: PassportData) => boolean;
}

export interface BottleMessage {
  id: string;
  text: string;
  senderName: string;
  senderCountry: string;
  timestamp: number;
  isFound: boolean;
}

export interface AlarmConfig {
  enabled: boolean;
  time: string; 
  days: number[]; 
}


export interface LocationData {
  country: string;
  city: string;
  countryCode?: string;
  region?: string;
  lat?: number;
  lon?: number;
  ip?: string;
}
