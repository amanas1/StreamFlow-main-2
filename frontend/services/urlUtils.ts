
/**
 * Safely parses a URL string. Returns null if invalid or undefined.
 */
export const safeURL = (url: string | undefined | null, base?: string): URL | null => {
  if (!url) return null;
  try {
    return new URL(url, base || undefined);
  } catch (e) {
    return null;
  }
};

/**
 * Safely extracts the hostname from a URL.
 */
export const safeHostname = (url: string | undefined | null): string => {
  const parsed = safeURL(url);
  return parsed ? parsed.hostname : '';
};
