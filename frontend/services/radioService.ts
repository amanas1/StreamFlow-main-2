import { RadioStation } from '../types';
import { RADIO_BROWSER_MIRRORS } from '../types/constants';

const CACHE_KEY_PREFIX = 'auradiochat_station_cache_v20_hq_';
const CACHE_TTL_MINUTES = 30;

interface CacheEntry {
    data: RadioStation[];
    timestamp: number; 
}

const MEMORY_CACHE = new Map<string, { data: RadioStation[], expiry: number }>();

const slugify = (text: string | undefined | null) => {
    return (text || '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const mapToGenre = (tags: string, name: string): { genre: string; subGenre: string } => {
    const combined = (tags + ' ' + name).toLowerCase();
    
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

    return { genre: 'Alternative', subGenre: '' };
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
    if (!Array.isArray(data)) return // Protection against crash
    const now = Date.now();
    try {
        const entry: CacheEntry = { data, timestamp: now };
        localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(entry));
        MEMORY_CACHE.set(key, { data, expiry: now + (CACHE_TTL_MINUTES * 60 * 1000) });
    } catch (e) {}
};

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
    'weather', 'traffic', 'finance', 'business', 'economy', 'science', 'history', ' философия', 'philosophy', 'meditation', 'story',
    'пропаганда', 'политика', 'политик', 'правительство', 'выборы', 'агитация', 'патриот', 'patriot', 'military', 'army', 'война', 'war',
    'новости', 'спорт', 'инфо', 'лекция', 'интервью', 'передача',
    '宣传', '政治', '政府', '共产党', '军队', '新闻', '访谈', '财经', '体育',
    'tin tức', 'thời sự', 'pháp luật', 'quân sự', 'giáo dục', 'thời tiết', 'giao thông',
    'radio parahumans', 'parahumans', 'audiobook'
];

const fetchFromMirror = async (mirror: string, path: string, query: string): Promise<any[]> => {
    const url = `${mirror}/json/stations/${path}${query}`;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    
    try {
        const response = await fetch(url, {
            mode: 'cors',
            signal: controller.signal,
            headers: { 
                'Accept': 'application/json',
                'User-Agent': 'AURadio/2.0 (https://auradiochat.com; contact@auradiochat.com)'
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

const filterStations = (data: any[]): RadioStation[] => {
    if (!Array.isArray(data)) return [];
    
    // 2. Объединение и нормализация станций
    const uniqueStations = new Map<string, RadioStation>();

    data.forEach(apiStation => {
        if (!apiStation || !apiStation.url_resolved) return;
        
        // 3. Фильтр качества потока (min 64 kbps + lastcheckok = 1)
        const bitrate = Number(apiStation.bitrate || 0);
        if (!apiStation.bitrate || bitrate < 64) return;
        if (apiStation.lastcheckok !== 1) return;

        // 5. Исключение плохих потоков (pls, asx)
        const codec = (apiStation.codec || '').toLowerCase();
        const urlLower = apiStation.url_resolved.toLowerCase();
        if (codec.includes('pls') || codec.includes('asx') || urlLower.endsWith('.pls') || urlLower.endsWith('.asx')) return;

        // 6. Фильтрация нежелательного контента (Music only)
        const n = (apiStation.name || '').toLowerCase();
        const t = (apiStation.tags || '').toLowerCase();
        
        if (RELIGIOUS_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) return;
        if (NON_MUSIC_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) return;

        const { genre, subGenre } = mapToGenre(apiStation.tags || '', apiStation.name || '');
        
        // Sorting score to prioritize AAC/MP3 + Bitrate
        let formatMultiplier = 1;
        if (codec.includes('aac')) formatMultiplier = 1.5;
        if (codec.includes('ogg')) formatMultiplier = 1.2;
        const qualityScore = bitrate * formatMultiplier;

        const station: RadioStation = {
            ...apiStation,
            slug: slugify(apiStation.name) + '-' + apiStation.stationuuid.substring(0, 5),
            genre,
            subGenre,
            qualityScore,
            popularityScore: apiStation.votes || 0,
            favicon: apiStation.favicon && apiStation.favicon.charCodeAt(4) === 115 ? apiStation.favicon : ''
        };

        // Deduplication using exact unique keys (User requested: stationuuid, url_resolved, name)
        const nTrim = n.trim();
        const dedupeKey = `${station.stationuuid}_${urlLower}_${nTrim}`;

        if (!uniqueStations.has(dedupeKey)) {
            uniqueStations.set(dedupeKey, station);
        }
    });

    const result = Array.from(uniqueStations.values());

    // 4. Предпочтение более качественных потоков
    return result.sort((a, b) => {
        const bitA = Number(a.bitrate || 0);
        const bitB = Number(b.bitrate || 0);
        return bitB - bitA; // Highest bitrate first
    });
};

export const fetchStationsByTag = async (tag: string, limit: number = 100): Promise<RadioStation[]> => {
    const lowerTag = tag.toLowerCase();
    const cacheKey = `tag_v21_hq_${lowerTag}_l${limit}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const fetchLimit = limit > 100 ? limit + 50 : 150; 
        const baseQuery = `?limit=${fetchLimit}&order=clickcount&reverse=true&hidebroken=true`;
        
        // Optimized search strategies
        let searchTags = [lowerTag];
        if (lowerTag.includes('hip')) searchTags.push('hip-hop', 'rap');
        if (lowerTag.includes('jazz')) searchTags.push('smooth-jazz');

        const searchStrategies: {path: string, query: string}[] = [
            { path: `bytag/${encodeURIComponent(lowerTag)}`, query: baseQuery },
            { path: 'search', query: `${baseQuery}&tag=${encodeURIComponent(lowerTag)}` }
        ];
        
        const mirrors = RADIO_BROWSER_MIRRORS.slice(0, 2); // Use top 2 mirrors for speed
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

        const filtered = filterStations(allFetched) || [];
        const result = filtered.slice(0, limit);
        
        if (result.length > 0) setToCache(cacheKey, result);
        return result;
    } catch (e) {
        return [];
    }
};

export const fetchRelatedStations = async (station: RadioStation, limit: number = 10): Promise<RadioStation[]> => {
    if (!station || !station.tags) return [];
    try {
        const firstTag = station.tags.split(',')[0].trim();
        const results = await fetchStationsByTag(firstTag, limit + 5);
        // Filter out the current station
        return (results || [])
            .filter(s => s.stationuuid !== station.stationuuid)
            .slice(0, limit);
    } catch (e) {
        return [];
    }
};

export const fetchGlobalMusicStations = async (): Promise<RadioStation[]> => {
    const cacheKey = 'global_music_v20_strict';
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const genres = ['pop', 'rock', 'jazz', 'edm', 'hip-hop'];
        const results = await Promise.allSettled(genres.map(g => fetchStationsByTag(g, 100)));
        const all = results
            .filter((r): r is PromiseFulfilledResult<RadioStation[]> => r.status === 'fulfilled')
            .flatMap(r => r.value);
        
        // Second pass deduplication to combine cross-genre repeats
        const seen = new Set();
        const final = all.filter(s => {
            if (seen.has(s.stationuuid)) return false;
            seen.add(s.stationuuid);
            return true;
        }).slice(0, 300);

        if (final.length > 0) setToCache(cacheKey, final);
        return final || [];
    } catch (e) {
        return [];
    }
};

export const fetchStationBySlug = async (slug: string): Promise<RadioStation | null> => {
    try {
        const global = await fetchGlobalMusicStations();
        const found = global.find(s => s.slug === slug);
        if (found) return found;

        const namePart = slug.split('-').slice(0, -1).join(' ');
        const results = await fetchStationsByTag(namePart, 50);
        return results.find(s => s.slug === slug) || null;
    } catch (e) {
        return null;
    }
};

export const fetchStationsByUuids = async (uuids: string[]): Promise<RadioStation[]> => {
    if (!uuids || uuids.length === 0) return [];
    try {
        const mirrors = RADIO_BROWSER_MIRRORS;
        const fetchPromises = uuids.map(uuid => {
             // Hit multiple mirrors for reliability, grab the first successful one
             return mirrors.map(mirror => fetchFromMirror(mirror, `byuuid/${uuid}`, ''));
        }).flat();
        
        const results = await Promise.allSettled(fetchPromises);
        const all = results
            .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
            .flatMap(r => r.value);
            
        return filterStations(all) || [];
    } catch (e) {
        return [];
    }
};

export const fetchStationsByCountry = async (country: string, limit: number = 100): Promise<RadioStation[]> => {
    if (!country) return [];
    const cacheKey = `country_v21_${country.toLowerCase()}_l${limit}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData && cachedData.length > 0) return cachedData;

    try {
        const mirrors = RADIO_BROWSER_MIRRORS.slice(0, 2);
        const query = `?limit=${limit + 50}&order=clickcount&reverse=true&hidebroken=true`;
        
        const fetchPromises = mirrors.map(m => fetchFromMirror(m, `bycountry/${encodeURIComponent(country)}`, query));
        const results = await Promise.allSettled(fetchPromises);
        const all = results
            .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
            .flatMap(r => r.value);
            
        const filtered = filterStations(all) || [];
        const result = filtered.slice(0, limit);
        
        if (result.length > 0) setToCache(cacheKey, result);
        return result;
    } catch (e) {
        return [];
    }
};
