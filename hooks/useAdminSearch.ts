import { useCallback, useEffect, useMemo, useState } from 'react'
import { createCacheKey, useAdminCache } from './useAdminCache'
import { useAdminData } from './useAdminData'

interface UseAdminSearchOptions<T, F> {
  fetchFn: (filters: F) => Promise<T>
  initialFilters: F
  debounceMs?: number
  entity?: string // For caching
  ttl?: number
  enableCache?: boolean
}

export const useAdminSearch = <T, F extends Record<string, string | number | boolean | undefined>>({
  fetchFn,
  initialFilters,
  debounceMs = 300,
  entity,
  ttl = 2 * 60 * 1000, // 2 minutes for search results
  enableCache = true
}: UseAdminSearchOptions<T, F>) => {
  const [filters, setFilters] = useState<F>(initialFilters)
  const [searchInput, setSearchInput] = useState('')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput || undefined }) as F)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchInput, debounceMs])

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [filters])

  // Generate cache key if caching is enabled and entity is provided
  const cacheKey = useMemo(() => {
    if (!enableCache || !entity) return null
    return createCacheKey(entity, 'list', memoizedFilters)
  }, [enableCache, entity, memoizedFilters])

  // Set up caching if enabled
  const cache = useAdminCache<T>(cacheKey || '', {
    ttl,
    enabled: enableCache && !!cacheKey
  })

  // Enhanced fetch function with caching
  const fetchWithFiltersAndCache = useCallback(async (): Promise<T> => {
    // Check cache first if enabled
    if (enableCache && cacheKey) {
      const cachedData = cache.get()
      if (cachedData) {
        return cachedData
      }
    }

    // Fetch fresh data
    const result = await fetchFn(memoizedFilters)

    // Cache the result if caching is enabled
    if (enableCache && cacheKey) {
      cache.set(result)
    }

    return result
  }, [fetchFn, memoizedFilters, enableCache, cacheKey, cache])

  // Use the admin data hook
  const adminData = useAdminData({
    fetchFn: fetchWithFiltersAndCache,
    dependencies: [memoizedFilters]
  })

  // Enhanced invalidate function that also clears cache
  const invalidateData = useCallback(() => {
    if (enableCache && cacheKey) {
      cache.invalidate()
    }
    adminData.invalidateData()
  }, [enableCache, cacheKey, cache, adminData])

  // Update filter helper
  const updateFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters)
    setSearchInput('')
  }, [initialFilters])

  return {
    ...adminData,
    filters,
    searchInput,
    setSearchInput,
    updateFilter,
    clearFilters,
    invalidateData,
    isFromCache: enableCache && cacheKey ? cache.hasData : false
  }
}
