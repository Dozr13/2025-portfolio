import { useCallback, useEffect, useRef, useState } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  key: string
}

interface CacheConfig {
  defaultTTL: number
  maxSize: number
}

const createAdminCache = (config: CacheConfig = { defaultTTL: 5 * 60 * 1000, maxSize: 100 }) => {
  const cache = new Map<string, CacheEntry<unknown>>()
  const subscribers = new Map<string, Set<() => void>>()

  const isExpired = (entry: CacheEntry<unknown>, ttl?: number): boolean => {
    const maxAge = ttl || config.defaultTTL
    return Date.now() - entry.timestamp > maxAge
  }

  const evictOldest = (): void => {
    if (cache.size >= config.maxSize) {
      const oldestKey = Array.from(cache.keys())[0]
      cache.delete(oldestKey)
      subscribers.delete(oldestKey)
    }
  }

  const get = <T>(key: string, ttl?: number): T | null => {
    const entry = cache.get(key)
    if (!entry || isExpired(entry, ttl)) {
      cache.delete(key)
      return null
    }
    return entry.data as T
  }

  const set = <T>(key: string, data: T): void => {
    evictOldest()
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      key
    }
    
    cache.set(key, entry as CacheEntry<unknown>)
    
    // Notify subscribers
    const keySubscribers = subscribers.get(key)
    keySubscribers?.forEach(callback => callback())
  }

  const invalidate = (key: string): void => {
    cache.delete(key)
    
    // Notify subscribers
    const keySubscribers = subscribers.get(key)
    keySubscribers?.forEach(callback => callback())
  }

  const invalidatePattern = (pattern: RegExp): void => {
    const keysToInvalidate = Array.from(cache.keys()).filter(key => pattern.test(key))
    keysToInvalidate.forEach(key => invalidate(key))
  }

  const subscribe = (key: string, callback: () => void): (() => void) => {
    if (!subscribers.has(key)) {
      subscribers.set(key, new Set())
    }
    
    subscribers.get(key)!.add(callback)
    
    // Return unsubscribe function
    return () => {
      const keySubscribers = subscribers.get(key)
      if (keySubscribers) {
        keySubscribers.delete(callback)
        if (keySubscribers.size === 0) {
          subscribers.delete(key)
        }
      }
    }
  }

  const clear = (): void => {
    cache.clear()
    subscribers.clear()
  }

  const getStats = () => ({
    size: cache.size,
    keys: Array.from(cache.keys()),
    hitRate: 0 // Could be enhanced to track hit/miss ratio
  })

  return {
    get,
    set,
    invalidate,
    invalidatePattern,
    subscribe,
    clear,
    getStats
  }
}

// Global cache instance
const adminCache = createAdminCache({
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 100
})

// Modern hook for cache management
interface UseAdminCacheOptions {
  ttl?: number
  enabled?: boolean
}

export const useAdminCache = <T>(
  key: string, 
  options: UseAdminCacheOptions = {}
) => {
  const { ttl, enabled = true } = options
  const [, forceUpdate] = useState({})
  const forceUpdateRef = useRef(() => forceUpdate({}))

  // Subscribe to cache changes for this key
  useEffect(() => {
    if (!enabled) return

    const unsubscribe = adminCache.subscribe(key, forceUpdateRef.current)
    return unsubscribe
  }, [key, enabled])

  const get = useCallback((): T | null => {
    if (!enabled) return null
    return adminCache.get<T>(key, ttl)
  }, [key, ttl, enabled])

  const set = useCallback((data: T) => {
    if (enabled) {
      adminCache.set(key, data)
    }
  }, [key, enabled])

  const invalidate = useCallback(() => {
    adminCache.invalidate(key)
  }, [key])

  const invalidatePattern = useCallback((pattern: RegExp) => {
    adminCache.invalidatePattern(pattern)
  }, [])

  return {
    get,
    set,
    invalidate,
    invalidatePattern,
    hasData: enabled ? adminCache.get<T>(key, ttl) !== null : false
  }
}

// Helper function to generate cache keys
  export const createCacheKey = (
  entity: string, 
  operation: string, 
  params?: Record<string, unknown>
): string => {
  const paramString = params ? JSON.stringify(params) : ''
  return `${entity}:${operation}:${paramString}`
}

// Pre-built cache invalidation patterns
export const cachePatterns = {
  // Invalidate all data for an entity
  entity: (entity: string) => new RegExp(`^${entity}:`),
  
  // Invalidate all list operations for an entity
  lists: (entity: string) => new RegExp(`^${entity}:list:`),
  
  // Invalidate specific item and its related lists
  item: (entity: string, id: string) => new RegExp(`^${entity}:(get:.*"id":"${id}"|list:)`),
} as const

export { adminCache }
