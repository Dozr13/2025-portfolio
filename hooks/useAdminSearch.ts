import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAdminData } from './useAdminData'

interface UseAdminSearchOptions<T, F> {
  fetchFn: (filters: F) => Promise<T>
  initialFilters: F
  debounceMs?: number
}

export const useAdminSearch = <T, F extends Record<string, string | number | boolean | undefined>>({
  fetchFn,
  initialFilters,
  debounceMs = 300
}: UseAdminSearchOptions<T, F>) => {
  const [filters, setFilters] = useState<F>(initialFilters)
  const [searchInput, setSearchInput] = useState("")
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput || undefined } as F))
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchInput, debounceMs])

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [filters])

  // Create the fetch function with filters
  const fetchWithFilters = useCallback(
    () => fetchFn(memoizedFilters),
    [fetchFn, memoizedFilters]
  )

  // Use the admin data hook
  const adminData = useAdminData({
    fetchFn: fetchWithFilters,
    dependencies: [memoizedFilters]
  })

  // Update filter helper
  const updateFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters)
    setSearchInput("")
  }, [initialFilters])

  return {
    ...adminData,
    filters,
    searchInput,
    setSearchInput,
    updateFilter,
    clearFilters
  }
}