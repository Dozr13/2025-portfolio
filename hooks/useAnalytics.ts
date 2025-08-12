'use client'
import { getAdminStats } from '@/app/actions/admin/stats'
import { useAuth } from '@/hooks/useAuth'
import type { StatsData, UseAnalyticsOptions } from '@/lib/types/admin/analytics'
import { useCallback, useEffect, useState } from 'react'

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    autoRefresh = false,
    refreshInterval = 30000,
    /* timeRange = '7d',*/ initialData
  } = options
  const [stats, setStats] = useState<StatsData | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const { validateSession /*, handleAuthError*/ } = useAuth({
    onAuthError: setError
  })

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const sessionOk = await validateSession()
      if (!sessionOk) return

      const data = await getAdminStats()
      setStats(data as unknown as StatsData)
      setLastUpdated(new Date())
      setError(null)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [validateSession])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchStats, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchStats])

  // Initial fetch
  useEffect(() => {
    if (!initialData) {
      fetchStats()
    }
  }, [fetchStats, initialData])

  const refresh = useCallback(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refresh,
    refetch: fetchStats
  }
}
