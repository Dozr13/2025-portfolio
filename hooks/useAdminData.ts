import { DependencyList, useCallback, useEffect, useState } from 'react'

interface UseAdminDataOptions<T> {
  fetchFn: () => Promise<T>
  dependencies?: DependencyList
  immediate?: boolean
}

export function useAdminData<T>({
  fetchFn,
  dependencies = [],
  immediate = true
}: UseAdminDataOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Invalidate data - triggers a refresh
  const invalidateData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  // Data fetching effect - no auth checks needed since layout handles it
  useEffect(() => {
    const loadData = async () => {
      if (!immediate && refreshTrigger === 0) return

      try {
        setLoading(true)
        setError(null)
        
        const result = await fetchFn()
        setData(result)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger, immediate, ...dependencies])

  return {
    data,
    loading,
    error,
    invalidateData
  }
}