import { useState, useCallback, useMemo } from 'react';
import { RadioStation, Station } from '../types';
import { fetchStationsByTag, fetchStationsByCountry } from '../services/radioService';

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizeStation = useCallback((s: RadioStation): Station => {
    return {
      id: s.stationuuid,
      name: s.name,
      country: s.country || null,
      genre: s.genre || 'Music',
      bitrate: s.bitrate || 128,
      streamUrl: s.url_resolved,
      favicon: s.favicon,
      slug: s.slug,
      tags: s.tags,
      language: s.language,
      homepage: s.homepage,
      votes: s.votes,
      codec: s.codec,
      countryCode: s.countryCode
    };
  }, []);

  const loadStations = useCallback(async (tag?: string, country?: string) => {
    setLoading(true);
    setError(null);
    try {
      let rawStations: RadioStation[] = [];
      if (country) {
        rawStations = await fetchStationsByCountry(country);
      } else if (tag) {
        rawStations = await fetchStationsByTag(tag);
      }

      // Deduplicate and Normalize
      const seen = new Set<string>();
      const normalized = rawStations
        .filter(s => {
          if (seen.has(s.stationuuid)) return false;
          seen.add(s.stationuuid);
          return true;
        })
        .map(normalizeStation);

      setStations(normalized);
      return normalized;
    } catch (err) {
      console.error('[useStations] Load error:', err);
      setError('Failed to load stations');
    } finally {
      setLoading(false);
    }
  }, [normalizeStation]);

  const filterStationsByCountry = useCallback((stations: Station[], currentPageCountry: string | null) => {
    return stations.map(s => ({
      ...s,
      displayCountry: s.country === currentPageCountry ? null : s.country
    }));
  }, []);

  return { stations, loading, error, loadStations, filterStationsByCountry };
};
