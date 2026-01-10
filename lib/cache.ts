/**
 * Cache utilities
 * Client-side caching for API responses
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<any>>();

/**
 * Set cache entry with TTL
 */
export function setCache<T>(
  key: string,
  data: T,
  ttlMs: number = 5 * 60 * 1000 // 5 minutes default
): void {
  const now = Date.now();
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + ttlMs,
  });
}

/**
 * Get cache entry if valid
 */
export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Clear cache entry
 */
export function clearCache(key: string): void {
  cache.delete(key);
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clear();
}

/**
 * Cache key generators
 */
export const CacheKeys = {
  causes: (params?: string) => `causes:${params || "all"}`,
  cause: (slug: string) => `cause:${slug}`,
  events: (params?: string) => `events:${params || "all"}`,
  event: (slug: string) => `event:${slug}`,
  blogPosts: (params?: string) => `blog:${params || "all"}`,
  blogPost: (slug: string) => `blogPost:${slug}`,
  userDonations: (userId: string) => `donations:${userId}`,
  userVolunteer: (userId: string) => `volunteer:${userId}`,
};

/**
 * Cache TTL constants (in milliseconds)
 */
export const CACHE_TTL = {
  SHORT: 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;

