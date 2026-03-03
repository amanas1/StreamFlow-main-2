
import { RadioStation } from '../types';
import { RADIO_BROWSER_MIRRORS } from '../types/constants';

const CACHE_KEY_PREFIX = 'auradiochat_station_cache_v15_strict_dedupe_'; // Strict dedupe bump
const CACHE_TTL_MINUTES = 30;

interface CacheEntry {
    data: RadioStation[];
    timestamp: number; 
}

// HQ Hardcoded Fallback (128k+)
const HARDCODED_STATIONS: RadioStation[] = [];

// Memory Cache to bypass localStorage JSON.parse on every navigation
const MEMORY_CACHE = new Map<string, { data: RadioStation[], expiry: number }>();

const slugify = (text: string) => {
    return text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const mapToGenre = (tags: string, name: string): { genre: string; subGenre: string } => {
    const combined = (tags + ' ' + name).toLowerCase();
    
    // Check specific genres first
    if (combined.includes('hip hop') || combined.includes('hip-hop') || combined.includes('rap')) return { genre: 'Hip-Hop', subGenre: '' };
    if (combined.includes('r&b') || combined.includes('rnb')) return { genre: 'R&B', subGenre: '' };
    if (combined.includes('pop')) return { genre: 'Pop', subGenre: '' };
    if (combined.includes('rock')) return { genre: 'Rock', subGenre: '' };
    if (combined.includes('indie')) return { genre: 'Indie', subGenre: '' };
    if (combined.includes('house') && combined.includes('deep')) return { genre: 'Deep House', subGenre: 'House' };
    if (combined.includes('house')) return { genre: 'House', subGenre: '' };
    if (combined.includes('techno')) return { genre: 'Techno', subGenre: '' };
    if (combined.includes('trance')) return { genre: 'Trance', subGenre: '' };
    if (combined.includes('drum and bass') || combined.includes('dnb') || combined.includes('drum & bass')) return { genre: 'Drum & Bass', subGenre: '' };
    if (combined.includes('jazz')) return { genre: 'Jazz', subGenre: '' };
    if (combined.includes('blues')) return { genre: 'Blues', subGenre: '' };
    if (combined.includes('classical')) return { genre: 'Classical', subGenre: '' };
    if (combined.includes('instrumental')) return { genre: 'Instrumental', subGenre: '' };
    if (combined.includes('lo-fi') || combined.includes('lofi')) return { genre: 'Lo-fi', subGenre: '' };
    if (combined.includes('chillout') || combined.includes('chill out')) return { genre: 'Chillout', subGenre: '' };
    if (combined.includes('lounge')) return { genre: 'Lounge', subGenre: '' };
    if (combined.includes('latin')) return { genre: 'Latin', subGenre: '' };
    if (combined.includes('reggaeton')) return { genre: 'Reggaeton', subGenre: '' };
    if (combined.includes('afrobeat')) return { genre: 'Afrobeat', subGenre: '' };
    if (combined.includes('k-pop') || combined.includes('kpop')) return { genre: 'K-pop', subGenre: 'Pop' };
    if (combined.includes('j-pop') || combined.includes('jpop')) return { genre: 'J-pop', subGenre: 'Pop' };
    if (combined.includes('synthwave')) return { genre: 'Synthwave', subGenre: '' };
    if (combined.includes('80s')) return { genre: '80s', subGenre: '' };
    if (combined.includes('90s')) return { genre: '90s', subGenre: '' };
    if (combined.includes('2000s')) return { genre: '2000s', subGenre: '' };
    if (combined.includes('alternative')) return { genre: 'Alternative', subGenre: '' };
    if (combined.includes('ambient')) return { genre: 'Ambient', subGenre: '' };
    if (combined.includes('funk')) return { genre: 'Funk', subGenre: '' };
    if (combined.includes('disco')) return { genre: 'Disco', subGenre: '' };
    if (combined.includes('soul')) return { genre: 'Soul', subGenre: '' };
    if (combined.includes('edm') || combined.includes('dance')) return { genre: 'EDM', subGenre: '' };

    return { genre: 'Alternative', subGenre: '' }; // Default
};

const getFromCache = (key: string): RadioStation[] | null => {
    const now = Date.now();
    const memMatch = MEMORY_CACHE.get(key);
    if (memMatch && now < memMatch.expiry) return memMatch.data;

    try {
        const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
        if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            if (now - entry.timestamp < CACHE_TTL_MINUTES * 60 * 1000) {
                MEMORY_CACHE.set(key, { data: entry.data, expiry: entry.timestamp + (CACHE_TTL_MINUTES * 60 * 1000) });
                return entry.data;
            }
            localStorage.removeItem(CACHE_KEY_PREFIX + key);
        }
    } catch (e) {
        localStorage.removeItem(CACHE_KEY_PREFIX + key);
    }
    return null;
};

const setToCache = (key: string, data: RadioStation[]) => {
    const now = Date.now();
    try {
        const entry: CacheEntry = { data, timestamp: now };
        localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(entry));
        MEMORY_CACHE.set(key, { data, expiry: now + (CACHE_TTL_MINUTES * 60 * 1000) });
    } catch (e) {}
};

// Update keywords for even stricter exclusion
const RELIGIOUS_KEYWORDS = [
    'islam', 'quran', 'koran', 'muslim', 'sheikh', 'imam', 'allah', 'prophet', 'hadith', 'sunnah', 'mecca', 'medina',
    'religio', 'catholic', 'christian', 'church', 'bible', 'vatican', 'gospel', 'jesus', 'christ', 'pastor', 'shrine',
    'worship', 'prayer', 'spirit', 'orthodox', 'chant', 'sermon', 'messianic', 'torah', 'synagogue', 'buddhist', 'hindu', 'krishna',
    'radio maria', 'esperance', 'ewtn', 'благовест', 'радонеж', 'вера', 'православ', 'ислам', 'коран', 'мечеть', 'церковь', 'евангелие', 'библия',
    '佛教', '道教', '基督教', '伊斯兰教', '传教', '法会', '佛', '经', '福音',
    'phật giáo', 'công giáo', 'tin lành', 'hòa hảo', 'cao đài', 'nhà thờ', 'chùa', 'niệm phật', 'pháp sư',
    'diyanet', 'ilahiler', 'cami', 'hoca', 'müslüman', 'namaz', 'ezan'
];

const NON_MUSIC_KEYWORDS = [
    'news', 'talk', 'politics', 'political', 'government', 'sport', 'debate', 'opinion', 'podcast', 'lecture', 'education',
    'weather', 'traffic', 'finance', 'business', 'economy', 'science', 'history', 'philosophy', 'meditation', 'story',
    'пропаганда', 'политика', 'политик', 'правительство', 'выборы', 'агитация', 'патриот', 'patriot', 'military', 'army', 'война', 'war',
    'новости', 'спорт', 'инфо', 'лекция', 'интервью', 'передача',
    '宣传', '政治', '政府', '共产党', '军队', '新闻', '访谈', '财经', '体育',
    'tin tức', 'thời sự', 'pháp luật', 'quân sự', 'giáo dục', 'thời tiết', 'giao thông',
    'radio parahumans', 'parahumans', 'audiobook'
];

const getQualityScore = (station: any): number => {
    const bitrate = station.bitrate || 0;
    const codec = (station.codec || '').toLowerCase();
    
    // sorting priority: AAC 128 > AAC 96 > MP3 192 > MP3 128 > MP3 96
    if (codec.includes('aac')) {
        if (bitrate >= 128) return 100;
        if (bitrate >= 96) return 90;
        if (bitrate >= 64) return 70;
    } else if (codec.includes('mp3')) {
        if (bitrate >= 256) return 85;
        if (bitrate >= 192) return 80;
        if (bitrate >= 128) return 60;
        if (bitrate >= 96) return 40;
    }
    return bitrate > 0 ? 20 : 0;
};

const fetchFromMirror = async (mirror: string, path: string, query: string): Promise<any[]> => {
    const url = `${mirror}/json/stations/${path}${query}`;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000); // Tighter timeout per mirror
    
    try {
        const response = await fetch(url, {
            mode: 'cors',
            signal: controller.signal,
            headers: { 
                'Accept': 'application/json',
                'User-Agent': 'AURadio/1.1 (https://auradiochat.com; contact@auradiochat.com)'
            }
        });
        clearTimeout(id);
        if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        }
    } catch (e) {
        clearTimeout(id);
    }
    return [];
};

const filterStations = (data: any[], minVotes: number = 10) => {
    if (!Array.isArray(data)) return [];
    
    const uniqueByUuid = new Map<string, RadioStation>();
    const uniqueByUrl = new Map<string, RadioStation>();
    const uniqueByName = new Map<string, RadioStation>();

    data.forEach(apiStation => {
        if (!apiStation || !apiStation.url_resolved) return;
        if (apiStation.lastcheckok !== 1) return;
        
        const n = (apiStation.name || '').toLowerCase();
        const t = (apiStation.tags || '').toLowerCase();
        
        // Music Only (Strict Keywords)
        if (RELIGIOUS_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) return;
        if (NON_MUSIC_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) return;

        // Adaptive Quality Filter
        const codec = (apiStation.codec || '').toLowerCase();
        const isAAC = codec.includes('aac');
        const isSecure = apiStation.url_resolved.charCodeAt(4) === 115;
        
        // Basic Quality Check
        if (apiStation.bitrate > 0 && apiStation.bitrate < 48) return; // Very low
        if (apiStation.votes < minVotes) return;
        if (!isSecure && apiStation.votes < 50) return; // Popular insecure is okay as fallback

        const { genre, subGenre } = mapToGenre(apiStation.tags || '', apiStation.name || '');
        const qualityScore = getQualityScore(apiStation);
        const popularityScore = Math.log10(Math.max(1, apiStation.votes)) * 10;
        
        const station: RadioStation = {
            ...apiStation,
            slug: slugify(apiStation.name) + '-' + apiStation.stationuuid.substring(0, 5),
            genre,
            subGenre,
            qualityScore,
            popularityScore: qualityScore + popularityScore,
            favicon: apiStation.favicon && apiStation.favicon.charCodeAt(4) === 115 ? apiStation.favicon : ''
        };

        const normUrl = apiStation.url_resolved.toLowerCase().replace(/\/$/, '');
        const normName = n.trim();

        if (!uniqueByUuid.has(station.stationuuid) && !uniqueByUrl.has(normUrl) && !uniqueByName.has(normName)) {
            uniqueByUuid.set(station.stationuuid, station);
            uniqueByUrl.set(normUrl, station);
            uniqueByName.set(normName, station);
        }
    });

    return Array.from(uniqueByUuid.values())
        .sort((a, b) => (b as any).popularityScore - (a as any).popularityScore);
};

export const fetchStationsByTag = async (tag: string, limit: number = 200): Promise<RadioStation[]> => {
    const lowerTag = tag.toLowerCase();
    const cacheKey = `tag_v18_hq_${lowerTag}_l${limit}`; // Version bump v18
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const fetchLimit = 800;
        const baseQuery = `?limit=${fetchLimit}&order=votes&reverse=true&hidebroken=true&lastcheckok=1`;
        
        // Parallel Aggregation Strategies
        const searchStrategies = [
            { path: 'search', query: `${baseQuery}&tag=${encodeURIComponent(lowerTag)}` },
            { path: 'search', query: `${baseQuery}&name=${encodeURIComponent(lowerTag)}` },
            { path: `bytag/${encodeURIComponent(lowerTag)}`, query: baseQuery }
        ];
        
        const mirrors = RADIO_BROWSER_MIRRORS;
        const fetchPromises: Promise<any[]>[] = [];
        
        searchStrategies.forEach(strategy => {
            mirrors.forEach(mirror => {
                fetchPromises.push(fetchFromMirror(mirror, strategy.path, strategy.query));
            });
        });

        const results = await Promise.allSettled(fetchPromises);
        const allFetched = results
            .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
            .flatMap(r => r.value);
            
        if (allFetched.length === 0) return [];

        // Progressive filtering
        let filtered = filterStations(allFetched, 15); // Semi-Popular
        
        if (filtered.length < 100) {
            filtered = filterStations(allFetched, 5); // Allow less popular
        }
        
        if (filtered.length < 50) {
            filtered = filterStations(allFetched, 1); // Desperate
        }

        const result = filtered.slice(0, limit);
        if (result.length > 0) setToCache(cacheKey, result);
        return result;
    } catch (e) {
        return [];
    }
};

export const fetchGlobalMusicStations = async (): Promise<RadioStation[]> => {
    const cacheKey = 'global_music_v16_curated';
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const genres = ['pop', 'rock', 'jazz', 'edm', 'hip hop'];
    const results = await Promise.allSettled(genres.map(g => fetchStationsByTag(g, 100)));
    const all = results
        .filter((r): r is PromiseFulfilledResult<RadioStation[]> => r.status === 'fulfilled')
        .flatMap(r => r.value);
    
    // Second pass dedupe
    const seen = new Set();
    const final = all.filter(s => {
        if (seen.has(s.stationuuid)) return false;
        seen.add(s.stationuuid);
        return true;
    }).slice(0, 300);

    if (final.length > 0) setToCache(cacheKey, final);
    return final;
};

export const fetchStationBySlug = async (slug: string): Promise<RadioStation | null> => {
    const global = await fetchGlobalMusicStations();
    const found = global.find(s => s.slug === slug);
    if (found) return found;

    const namePart = slug.split('-').slice(0, -1).join(' ');
    const results = await fetchStationsByTag(namePart, 50);
    return results.find(s => s.slug === slug) || null;
};

export const fetchStationsByUuids = async (uuids: string[]): Promise<RadioStation[]> => {
    if (uuids.length === 0) return [];
    const mirrors = RADIO_BROWSER_MIRRORS.slice(0, 2);
    const fetchPromises = uuids.map(uuid => fetchFromMirror(mirrors[0], `byuuid/${uuid}`, ''));
    const results = await Promise.allSettled(fetchPromises);
    const all = results.filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled').flatMap(r => r.value);
    return filterStations(all, 0);
};

export const fetchStationsByCountry = async (country: string, limit: number = 200): Promise<RadioStation[]> => {
    const cacheKey = `country_v16_${country.toLowerCase()}_l${limit}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const mirrors = RADIO_BROWSER_MIRRORS.slice(0, 3);
    const query = `?limit=500&order=votes&reverse=true&hidebroken=true&lastcheckok=1`;
    const results = await Promise.allSettled(mirrors.map(m => fetchFromMirror(m, `bycountry/${encodeURIComponent(country)}`, query)));
    const all = results.filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled').flatMap(r => r.value);
    
    let filtered = filterStations(all, 50);
    if (filtered.length < 50) filtered = filterStations(all, 10);
    
    const result = filtered.slice(0, limit);
    if (result.length > 0) setToCache(cacheKey, result);
    return result;
};

