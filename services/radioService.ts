
import { RadioStation } from '../types';
import { RADIO_BROWSER_MIRRORS } from '../constants';

const CACHE_KEY_PREFIX = 'auradiochat_station_cache_v15_strict_dedupe_'; // Strict dedupe bump
const CACHE_TTL_MINUTES = 30;

interface CacheEntry {
    data: RadioStation[];
    timestamp: number; 
}

// HQ Hardcoded Fallback (128k+)
const HARDCODED_STATIONS: RadioStation[] = [];

const WORLD_MUSIC_TAGS = ['vietnamese', 'vietnam', 'japanese', 'russian', 'spanish', 'italian', 'french', 'kazakh', 'kyrgyz', 'oriental', 'chinese'];

const getFromCache = (key: string): RadioStation[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
        if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            const now = Date.now();
            if (now - entry.timestamp < CACHE_TTL_MINUTES * 60 * 1000) {
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
    try {
        const entry: CacheEntry = { data, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(entry));
    } catch (e) {}
};

const promiseAny = <T>(promises: Promise<T>[]): Promise<T> => {
    return new Promise((resolve, reject) => {
        let rejectedCount = 0;
        const errors: any[] = [];
        if (promises.length === 0) {
            return reject(new Error("No promises provided"));
        }
        promises.forEach((p, i) => {
            p.then(resolve).catch(err => {
                errors[i] = err;
                rejectedCount++;
                if (rejectedCount === promises.length) {
                    reject(new Error("All mirrors failed"));
                }
            });
        });
    });
};

const fetchAcrossMirrorsFast = async (path: string, urlParams: string): Promise<RadioStation[]> => {
    const query = urlParams ? `?${urlParams}` : '';
    
    // First Pass: 8 second timeout (increased from 4s)
    const tryFetch = async (mirrors: string[], timeoutMs: number) => {
        const fetchPromises = mirrors.map(async (baseUrl) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs); 

            try {
                const response = await fetch(`${baseUrl}/${path}${query}`, {
                    mode: 'cors',
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                });
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error('Mirror status not OK');
                return await response.json();
            } catch (err) {
                clearTimeout(timeoutId);
                throw err;
            }
        });
        return await promiseAny(fetchPromises);
    };

    try {
        return await tryFetch(RADIO_BROWSER_MIRRORS, 8000);
    } catch (e) {
        console.warn("Primary fetch failed, retrying with fallback mirrors/timeout...");
        // Retry with same mirrors but slightly longer timeout or different logic if needed. 
        // For now, simple retry.
        try {
             // Wait 500ms before retry
             await new Promise(r => setTimeout(r, 500));
             return await tryFetch(RADIO_BROWSER_MIRRORS, 10000);
        } catch (retryErr) {
             throw new Error("Station source unavailable after retry");
        }
    }
};

const filterStations = (data: RadioStation[], currentTag?: string) => {
    if (!Array.isArray(data)) return [];
    
    const uniqueStations = new Map();
    const len = data.length;

    const BLOCKED_NAMES = [
        "تفسير بن عثيمين رحمه الله", "صور из жизни сподвижников", "Classic Vinyl HD",
        "Adroit Jazz Underground", "Спокойное радио", "PerfectMoods", "Easy FM",
        "106.5 Kiss FM", "Pure Ibiza Radio", "HappyHardcore.com", "Test", "Stream",
        "My Radio", "Radio Marca", "Abdulbasit", "Test Stream", "Generic Radio",
        ".977 Smooth Jazz", "Exclusively Led Zeppelin", "Sunshine Live - Die 90er",
        "Sunshine Live - Techno", "Mixadance FM", "90s90s HipHop & Rap",
        "Comedy Radio new link", "RTL2", "Mix (Medellín) 89.9 FM",
        "the wave - relaxing radio", "Islom.uz", "Radio Felicidad", "80s80s",
        "90s90s Hits", "90s90s Dance HQ", "MIX Ciudad de México", "Sunshine Live - Classics",
        "KISS FM", "Kiss FM", "Sunshine Live - Focus", "Bons Tempos FM",
        "Technolovers - PSYTRANCE", "Radio Caprice - Dark Psytrance",
        "DrGnu - Metallica", "80s80s Dark Wave", "Radio RECORD", "Deeper Radio",
        "Deep Vibes Radio", "Radio ZAYCEV", "Zaycev.FM"
    ];

    const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const isWorldMusic = currentTag && WORLD_MUSIC_TAGS.includes(currentTag);
    const isVietnamese = currentTag === 'vietnamese' || currentTag === 'vietnam';
    const isKyrgyz = currentTag === 'kyrgyz';
    
    for (let i = 0; i < len; i++) {
      const station = data[i];
      if (!station || !station.url_resolved) continue;

      // 1. HQ CHECK: Bitrate & Stability
      // Optimized for Mobile: Allow 64kbps+ if AAC, 128kbps+ for others.
      // High bitrates (320k) are prone to buffering in background.
      const codec = (station.codec || '').toLowerCase();
      const isAAC = codec.includes('aac');
      const minBitrate = isAAC ? 64 : 128;
      if (station.bitrate > 0 && station.bitrate < minBitrate) continue;

      // 2. QUALITY CHECK: Test Streams & Bad Names
      const nameLower = station.name.toLowerCase();
      if (nameLower.includes('test') || nameLower.length < 3) continue;

      // 3. Permanent Blocklist
      if (BLOCKED_NAMES.some(n => station.name.includes(n))) continue;

      // 4. Strict Religious Filtering (Applied to ALL categories)
      const t = (station.tags || '').toLowerCase();
      const n = station.name.toLowerCase();

      // Extended Religious Keyword List - blocks all religious content
      const RELIGIOUS_KEYWORDS = [
          'islam', 'quran', 'koran', 'muslim', 'sheikh', 'imam', 'allah', 'prophet', 'hadith', 'sunnah', 'mecca', 'medina', // Islamic
          'religio', 'catholic', 'christian', 'church', 'bible', 'vatican', 'gospel', 'jesus', 'christ', 'pastor', 'shrine', // Christian
          'worship', 'prayer', 'spirit', 'orthodox', 'chant', 'sermon', 'messianic', 'torah', 'synagogue', 'buddhist', 'hindu', 'krishna', // Other religious
          'radio maria', 'esperance', 'ewtn', 'благовест', 'радонеж', 'вера', 'православ', 'ислам', 'коран', 'мечеть', 'церковь', 'евангелие', 'библия', // Specific & RU
          '佛教', '道教', '基督教', '伊斯兰教', '传教', '法会', '佛', '经', '福音', // Chinese Religious
          'phật giáo', 'công giáo', 'tin lành', 'hòa hảo', 'cao đài', 'nhà thờ', 'chùa', 'niệm phật', 'pháp sư', // Vietnamese Religious
          'diyanet', 'ilahiler', 'cami', 'hoca', 'müslüman', 'namaz', 'ezan', // Turkish Religious
          'قرآن', 'إسلام', 'صلاة', 'دين', 'دعاء', 'خطبة', 'شيخ', 'إمام', // Arabic Religious
          'พุทธ', 'วัด', 'ธรรมะ', 'บทสวด', 'ฟังธรรม', // Thai Religious
          'եկեղեցի', 'աստվածաշունչ', 'քրիստոնեական', 'ეკლესია', 'მართლმადიდებლური', 'məscid', 'минарет', 'проповедь', 'шариат' // Caucasian Religious
      ];

      // Propaganda and Politics Keyword List
      const PROPAGANDA_KEYWORDS = [
          'propaganda', 'politics', 'political', 'government', 'gov', 'parliament', 'election', 'voter', 'activist',
          'пропаганда', 'политика', 'политик', 'правительство', 'выборы', 'агитация', 'патриот', 'patriot', 'military', 'army', 'война', 'war',
          'sputnik', 'rt radio', 'vesti fm', 'вести фм', 'голос америки', 'радио свобода',
          '宣传', '政治', '政府', '共产党', '军队', // Chinese Propaganda
          'tuyên truyền', 'chính trị', 'đảng', 'nhà nước', 'quốc hội', 'vtv', 'vov' // Vietnamese Propaganda/State
      ];

      const ADULT_KEYWORDS = [
          'sex', 'porn', 'xxx', 'adult', 'erotic', 'ero', 'naked', 'nudity', 'hardcore', 'hentai', 'fetish',
          'секс', 'порно', 'эротика', 'постель'
      ];

      if (RELIGIOUS_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) {
          console.log(`[FILTER] Blocking religious content in '${currentTag}': ${station.name}`);
          continue;
      }

      if (PROPAGANDA_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) {
          console.log(`[FILTER] Blocking propaganda/political content in '${currentTag}': ${station.name}`);
          continue;
      }

      if (ADULT_KEYWORDS.some(kw => t.includes(kw) || n.includes(kw))) {
          console.log(`[FILTER] Blocking adult content: ${station.name}`);
          continue;
      }
     // Strict Arabic Character Check for non-Oriental categories
          if (currentTag !== 'oriental' && ARABIC_CHAR_REGEX.test(station.name)) {
              console.log(`[FILTER] Skipping Arabic name in musical category '${currentTag}': ${station.name}`);
              continue;
          }

      // WORLD MUSIC CLEANUP (No Talk/News)
      if (isWorldMusic) {
          const t = (station.tags || '').toLowerCase();
          const n = station.name.toLowerCase();

          // Vietnamese Exception
          if (isVietnamese) {
              if (t.includes('tin tức') || n.includes('tin tức') || t.includes('news') || t.includes('talk') || t.includes('thời sự') || t.includes('phát thanh')) continue;
          } 
          // Kyrgyz Exception
          else if (isKyrgyz) {
              if ((t.includes('news') || t.includes('talk')) && !t.includes('pop') && !t.includes('music') && !t.includes('hit')) continue;
          }
          else {
              // General cleanup for other world music
              if (t.includes('news') || t.includes('talk') || t.includes('politics') || t.includes('sport') ||
                  t.includes('新闻') || t.includes('访谈') || t.includes('财经') || t.includes('体育') ||
                  t.includes('tin tức') || t.includes('thời sự') || t.includes('pháp luật') || t.includes('quân sự') ||
                  t.includes('haber') || t.includes('siyaset') || t.includes('konuşma') || // Turkish
                  t.includes('أخبار') || t.includes('سياسة') || t.includes('ثقافة') || // Arabic
                  t.includes('ข่าว') || t.includes('คุย') || t.includes('การเมือง') // Thai
                  ) continue;
          }
      }

      // STRICT CLEANUP FOR CLASSICAL CATEGORY (Specific non-religious talk)
      if (currentTag === 'classical') {
          const t = (station.tags || '').toLowerCase();
          if (t.includes('news') || t.includes('talk') || t.includes('speech') || t.includes('conversation') || t.includes('politics')) continue;
      }

      // Cleanup for "Love Songs" (No talk/news/podcasts)
      if (currentTag === 'love') {
          const t = (station.tags || '').toLowerCase();
          if (t.includes('news') || t.includes('talk') || t.includes('podcast') || t.includes('drama') || t.includes('story')) continue;
      }

      // Cleanup for "Slow/Soft" (Aggressive talk/news block)
      if (currentTag === 'slow') {
          const t = (station.tags || '').toLowerCase();
          if (t.includes('news') || t.includes('talk') || t.includes('politics') || t.includes('conversation') || t.includes('radio drama')) continue;
      }
      
      const url = station.url_resolved;
      if (url.charCodeAt(4) !== 115) continue; // Must be https
      
      const stationCodec = (station.codec || '').toLowerCase();
      const isBrowserCompatible = 
        stationCodec.includes('mp3') || 
        stationCodec.includes('aac') || 
        url.includes('.mp3') || 
        url.includes('.aac') ||
        stationCodec === '';

      if (isBrowserCompatible) {
        // 5. LOW QUALITY NOISE CHECK: No favicon + low votes (in popular categories)
        if (!station.favicon && station.votes < 50 && currentTag && ['pop', 'jazz', 'rock', 'dance', 'classical', 'relax', 'electronic'].includes(currentTag)) {
            continue;
        }

        // AGGRESSIVE DEDUPLICATION
        // 1. Normalize URL: remove protocol, www, port, trailing slashes, and common stream markers
        const normalizedUrl = url.toLowerCase()
            .replace(/^https?:\/\/(www\.)?/, '')
            .replace(/:[0-9]+/, '')
            .split('?')[0].split('#')[0]
            .replace(/\/$/, '')
            .replace(/\/(stream|listen|high|low|mobile|radio|play|live)$/, '')
            .replace(/\.(mp3|aac|m3u8|pls|m3u)$/, '');
            
        // 2. Normalize Name: lowercase, alphanumeric only
        const normalizedName = station.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        const dedupeKey = `${normalizedUrl}`;

        const existingByUrl = uniqueStations.get(dedupeKey);
        const existingByName = Array.from(uniqueStations.values()).find(s => s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedName);
        
        const existing = existingByUrl || existingByName;

        if (!existing) {
            uniqueStations.set(dedupeKey, station);
        } else {
            // Keep the better quality/popularity version
            if (station.votes > existing.votes || (station.bitrate > existing.bitrate && station.votes > existing.votes * 0.5) || (!!station.favicon && !existing.favicon)) {
                if (existingByUrl) uniqueStations.delete(dedupeKey);
                // If it was found by name, we need to find its URL key to delete it
                const oldKey = Array.from(uniqueStations.keys()).find(k => uniqueStations.get(k) === existing);
                if (oldKey) uniqueStations.delete(oldKey);
                
                uniqueStations.set(dedupeKey, station);
            }
        }
      }
    }

    return Array.from(uniqueStations.values())
        .sort((a: any, b: any) => {
            // PRIMARY SORT: Codec Stability (AAC/AAC+ is better for mobile)
            const aCodec = (a.codec || '').toLowerCase();
            const bCodec = (b.codec || '').toLowerCase();
            const aIsAAC = aCodec.includes('aac');
            const bIsAAC = bCodec.includes('aac');
            
            if (aIsAAC && !bIsAAC) return -1;
            if (!aIsAAC && bIsAAC) return 1;

            // SECONDARY SORT: Bitrate Sweet-spot (64-128k for stability)
            const aInSweetSpot = a.bitrate >= 64 && a.bitrate <= 128;
            const bInSweetSpot = b.bitrate >= 64 && b.bitrate <= 128;
            
            if (aInSweetSpot && !bInSweetSpot) return -1;
            if (!aInSweetSpot && bInSweetSpot) return 1;
            
            // TERTIARY SORT: Absolute Bitrate
            const bitrateDiff = b.bitrate - a.bitrate;
            if (bitrateDiff !== 0) return bitrateDiff;
            
            // FINAL SORT: Popularity
            return b.votes - a.votes;
        }) as RadioStation[];
};

export const fetchStationsByTag = async (tag: string, limit: number = 100): Promise<RadioStation[]> => {
  let lowerTag = tag.toLowerCase();
  
  if (lowerTag === 'vietnamese') {
      lowerTag = 'vietnam';
  }

  const cacheKey = `tag_v12_hq_${lowerTag}_l${limit}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    let data: RadioStation[] = [];
    const fetchLimit = Math.max(20, Math.ceil(limit * 4));
    
    // REQUEST HQ: Add lastcheckok=1 and bitrateMin=128 for HARD cleanup
    const urlParams = `limit=${fetchLimit}&order=votes&reverse=true&hidebroken=true&bitrateMin=128&lastcheckok=1`;

    if (lowerTag === 'vietnam') {
        const [countryData, musicData, radioData, vpopData, boleroData] = await Promise.all([
            fetchAcrossMirrorsFast(`bycountry/vietnam`, urlParams),
            fetchAcrossMirrorsFast(`byname/âm nhạc`, urlParams), 
            fetchAcrossMirrorsFast(`bytag/v-pop`, urlParams),      
            fetchAcrossMirrorsFast(`bytag/vpop`, urlParams),      
            fetchAcrossMirrorsFast(`bytag/bolero`, urlParams)      
        ]);
        data = [...countryData, ...musicData, ...radioData, ...vpopData, ...boleroData];
    } 
    else if (lowerTag === 'kyrgyz') {
        const [countryData, nameData, bishkekData, obonData] = await Promise.all([
            fetchAcrossMirrorsFast(`bycountry/kyrgyzstan`, urlParams),
            fetchAcrossMirrorsFast(`byname/кыргыз`, urlParams),
            fetchAcrossMirrorsFast(`byname/bishkek`, urlParams),
            fetchAcrossMirrorsFast(`byname/obon`, urlParams)
        ]);
        data = [...countryData, ...nameData, ...bishkekData, ...obonData];
    }
    else if (lowerTag === 'oriental') {
        const [orientalData, turkishData, arabicData, thaiData, meData, tpopData, arabesqueData] = await Promise.all([
            fetchAcrossMirrorsFast(`bytag/oriental`, urlParams),
            fetchAcrossMirrorsFast(`bytag/turkish`, urlParams),
            fetchAcrossMirrorsFast(`bytag/arabic`, urlParams),
            fetchAcrossMirrorsFast(`bytag/thai`, urlParams),
            fetchAcrossMirrorsFast(`bytag/middle east`, urlParams),
            fetchAcrossMirrorsFast(`bytag/t-pop`, urlParams),
            fetchAcrossMirrorsFast(`bytag/arabesque`, urlParams)
        ]);
        data = [...orientalData, ...turkishData, ...arabicData, ...thaiData, ...meData, ...tpopData, ...arabesqueData];
    }
    else if (lowerTag === 'chinese') {
        const [tagData, cpopData, countryData, mandoData, cantoData] = await Promise.all([
            fetchAcrossMirrorsFast(`bytag/chinese`, urlParams),
            fetchAcrossMirrorsFast(`bytag/c-pop`, urlParams),
            fetchAcrossMirrorsFast(`bycountry/china`, urlParams),
            fetchAcrossMirrorsFast(`bytag/mandopop`, urlParams),
            fetchAcrossMirrorsFast(`bytag/cantopop`, urlParams)
        ]);
        data = [...tagData, ...cpopData, ...countryData, ...mandoData, ...cantoData];
    }
    else if (lowerTag === 'love') {
        const [loveData, balladData, softData, romanticData] = await Promise.all([
            fetchAcrossMirrorsFast(`bytag/love`, urlParams),
            fetchAcrossMirrorsFast(`bytag/ballads`, urlParams),
            fetchAcrossMirrorsFast(`bytag/soft`, urlParams),
            fetchAcrossMirrorsFast(`bytag/romantic`, urlParams)
        ]);
        data = [...loveData, ...balladData, ...softData, ...romanticData];
    }
    else if (lowerTag === 'slow') {
        const [slowData, chillData, calmData, acousticsData] = await Promise.all([
            fetchAcrossMirrorsFast(`bytag/slow`, urlParams),
            fetchAcrossMirrorsFast(`bytag/chill`, urlParams),
            fetchAcrossMirrorsFast(`bytag/calm`, urlParams),
            fetchAcrossMirrorsFast(`bytag/acoustic`, urlParams)
        ]);
        data = [...slowData, ...chillData, ...calmData, ...acousticsData];
    }
    else {
        data = await fetchAcrossMirrorsFast(`bytag/${lowerTag}`, urlParams);
    }
    
    let result = filterStations(data, lowerTag).slice(0, limit);
    
    const hardcoded = HARDCODED_STATIONS.filter(s => s.tags.includes(lowerTag) || (lowerTag === 'nature' && s.name.includes('Nature')));
    if (hardcoded.length > 0) {
        const newStations = hardcoded.filter(h => !result.some(r => r.url_resolved === h.url_resolved));
        result = [...newStations, ...result];
    }
    
    if (result.length > 0) {
        setToCache(cacheKey, result);
    }
    return result;
  } catch (error) {
    const hardcoded = HARDCODED_STATIONS.filter(s => s.tags.includes(lowerTag));
    if (hardcoded.length > 0) return hardcoded;
    
    return [];
  }
};

export const fetchStationsByUuids = async (uuids: string[]): Promise<RadioStation[]> => {
    if (uuids.length === 0) return [];
    const cacheKey = `uuids_v12_hq_${uuids.sort().join('_')}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const fetchPromises = uuids.slice(0, 15).map(uuid => 
            fetchAcrossMirrorsFast(`byuuid/${uuid}`, '')
        );
        const results = await Promise.all(fetchPromises);
        const result = filterStations(results.flat());
        
        const allHardcoded = [...HARDCODED_STATIONS];
        const hardcodedFavs = allHardcoded.filter(s => uuids.includes(s.stationuuid));
        
        if (hardcodedFavs.length > 0) {
             const combined = [...hardcodedFavs, ...result.filter(r => !hardcodedFavs.some(h => h.url_resolved === r.url_resolved))];
             setToCache(cacheKey, combined);
             return combined;
        }

        setToCache(cacheKey, result);
        return result;
    } catch (error) {
        const allHardcoded = [...HARDCODED_STATIONS];
        const hardcodedFavs = allHardcoded.filter(s => uuids.includes(s.stationuuid));
        if (hardcodedFavs.length > 0) return hardcodedFavs;
        return [];
    }
};
