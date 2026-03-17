import { useState, useCallback, useEffect } from 'react';
import { LocationData } from '../types';
import { geolocationService } from '../services/geolocationService';

export const useLocation = () => {
  const [detectedLocation, setDetectedLocation] = useState<LocationData | null>(null);
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'ready' | 'error'>('detecting');

  const triggerLocationDetection = useCallback(async () => {
    if (!detectedLocation) setLocationStatus('detecting');
    
    try {
      const loc = await geolocationService.detectLocation();
      const cached = geolocationService.getCachedLocation();
      
      if (loc && loc.country && loc.country !== 'Unknown') {
        setDetectedLocation(loc);
        geolocationService.saveLocationToCache(loc);
        setLocationStatus('ready');
      } else if (cached && cached.country !== 'Unknown') {
        setDetectedLocation(cached);
        setLocationStatus('ready');
      } else {
        setDetectedLocation({ country: 'Global', city: 'Global', countryCode: 'Global' });
        setLocationStatus('ready');
      }
    } catch (err) {
      console.error('[useLocation] Detection error:', err);
      setLocationStatus('error'); 
    }
  }, [detectedLocation]);

  useEffect(() => {
    triggerLocationDetection();
  }, []);

  return { detectedLocation, locationStatus, triggerLocationDetection };
};
