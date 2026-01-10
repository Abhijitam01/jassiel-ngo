/**
 * API Client utilities
 * Centralized API calls with error handling, type safety, and caching
 */

import { getCache, setCache, CacheKeys, CACHE_TTL } from "./cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  error: string;
  details?: any;
}

/**
 * Generic API fetch function with error handling and caching
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit & {
    cacheKey?: string;
    cacheTtl?: number;
    useCache?: boolean;
  }
): Promise<ApiResponse<T>> {
  const {
    cacheKey,
    cacheTtl = CACHE_TTL.MEDIUM,
    useCache = true,
    ...fetchOptions
  } = options || {};

  // Try cache first for GET requests
  if (useCache && cacheKey && fetchOptions.method !== "POST" && fetchOptions.method !== "PUT" && fetchOptions.method !== "DELETE") {
    const cached = getCache<T>(cacheKey);
    if (cached) {
      return { data: cached };
    }
  }

  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      return { error: errorData.error || "Request failed" };
    }

    const data = await response.json();
    
    // Cache successful GET responses
    if (useCache && cacheKey && !fetchOptions.method) {
      setCache(cacheKey, data, cacheTtl);
    }

    return { data };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      error:
        error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

/**
 * Fetch causes with filtering
 */
export async function fetchCauses(params?: {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
  useCache?: boolean;
}): Promise<ApiResponse<{ causes: any[]; pagination: any }>> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.set("category", params.category);
  if (params?.status) queryParams.set("status", params.status);
  if (params?.search) queryParams.set("search", params.search);
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());

  const queryString = queryParams.toString();
  const cacheKey = CacheKeys.causes(queryString);

  return apiFetch(`/api/causes?${queryString}`, {
    cacheKey,
    useCache: params?.useCache !== false,
    cacheTtl: CACHE_TTL.MEDIUM,
  });
}

/**
 * Fetch a single cause by slug
 */
export async function fetchCauseBySlug(
  slug: string,
  useCache: boolean = true
): Promise<ApiResponse<{ cause: any }>> {
  return apiFetch(`/api/causes/${slug}`, {
    cacheKey: CacheKeys.cause(slug),
    useCache,
    cacheTtl: CACHE_TTL.LONG,
  });
}

/**
 * Fetch events with filtering
 */
export async function fetchEvents(params?: {
  category?: string;
  status?: string;
  search?: string;
  upcoming?: boolean;
  limit?: number;
  offset?: number;
  useCache?: boolean;
}): Promise<ApiResponse<{ events: any[]; pagination: any }>> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.set("category", params.category);
  if (params?.status) queryParams.set("status", params.status);
  if (params?.search) queryParams.set("search", params.search);
  if (params?.upcoming) queryParams.set("upcoming", "true");
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());

  const queryString = queryParams.toString();
  const cacheKey = CacheKeys.events(queryString);

  return apiFetch(`/api/events?${queryString}`, {
    cacheKey,
    useCache: params?.useCache !== false,
    cacheTtl: CACHE_TTL.MEDIUM,
  });
}

/**
 * Fetch blog posts with filtering
 */
export async function fetchBlogPosts(params?: {
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  useCache?: boolean;
}): Promise<ApiResponse<{ posts: any[]; pagination: any }>> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.set("category", params.category);
  if (params?.tag) queryParams.set("tag", params.tag);
  if (params?.featured) queryParams.set("featured", "true");
  if (params?.search) queryParams.set("search", params.search);
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());

  const queryString = queryParams.toString();
  const cacheKey = CacheKeys.blogPosts(queryString);

  return apiFetch(`/api/blog?${queryString}`, {
    cacheKey,
    useCache: params?.useCache !== false,
    cacheTtl: CACHE_TTL.MEDIUM,
  });
}

/**
 * Fetch user donations
 * Note: API route uses session, no userId parameter needed
 */
export async function fetchUserDonations(
  params?: {
    limit?: number;
    offset?: number;
    status?: string;
    useCache?: boolean;
  }
): Promise<ApiResponse<{ donations: any[]; summary: any; pagination: any }>> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());
  if (params?.status) queryParams.set("status", params.status);

  const queryString = queryParams.toString();
  const url = `/api/dashboard/donations${queryString ? `?${queryString}` : ""}`;

  return apiFetch(url, {
    cacheKey: CacheKeys.userDonations(queryString || "all"),
    useCache: params?.useCache !== false,
    cacheTtl: CACHE_TTL.SHORT, // Short cache for user data
  });
}

/**
 * Fetch user volunteer activities
 * Note: API route uses session, no userId parameter needed
 */
export async function fetchUserVolunteerActivities(
  params?: {
    limit?: number;
    offset?: number;
    status?: string;
    useCache?: boolean;
  }
): Promise<ApiResponse<{ activities: any[]; summary: any; pagination: any }>> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());
  if (params?.status) queryParams.set("status", params.status);

  const queryString = queryParams.toString();
  const url = `/api/dashboard/volunteer${queryString ? `?${queryString}` : ""}`;

  return apiFetch(url, {
    cacheKey: CacheKeys.userVolunteer(queryString || "all"),
    useCache: params?.useCache !== false,
    cacheTtl: CACHE_TTL.SHORT, // Short cache for user data
  });
}

/**
 * Fetch dashboard stats
 */
export async function fetchDashboardStats(
  useCache: boolean = false
): Promise<ApiResponse<{ stats: any; recentDonations: any[]; recentActivities: any[]; upcomingEvents: any[] }>> {
  return apiFetch("/api/dashboard/stats", {
    cacheKey: "dashboard:stats",
    useCache,
    cacheTtl: CACHE_TTL.SHORT,
  });
}

