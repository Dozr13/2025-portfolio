"use client"

import { useAuth } from "@/hooks/useAuth"
import { useCallback, useEffect, useState } from "react"

interface AnalyticsData {
  pageViews: {
    total: number
    change: number
    data: Array<{ date: string; views: number }>
  }
  topPages: Array<{ path: string; views: number; change: number }>
  referrers: Array<{ source: string; visits: number; percentage: number }>
  countries: Array<{ country: string; visits: number; percentage: number }>
  events: Array<{ event: string; count: number; change: number }>
}

export interface StatsData {
  contacts: { total: number; new: number; thisWeek: number }
  blog: { published: number; drafts: number; totalViews: number }
  analytics: AnalyticsData & { environment: string; enabled: boolean }
  database: {
    skills: number
    projects: number
    experiences: number
    contacts: number
    testimonials: number
    environment: string
    database: string
  }
}

interface UseAnalyticsOptions {
  autoRefresh?: boolean
  refreshInterval?: number
  timeRange?: string
  initialData?: StatsData
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const { autoRefresh = false, refreshInterval = 30000, timeRange = '7d', initialData } = options
  const [stats, setStats] = useState<StatsData | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const { validateAndRedirect, handleAuthError } = useAuth({
    onAuthError: setError
  })

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')

      if (!(await validateAndRedirect(token))) {
        return
      }

      const response = await fetch(`/api/admin/stats?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setLastUpdated(new Date())
        setError(null)
      } else {
        handleAuthError(response.status, "Failed to load analytics")
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setError("Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }, [validateAndRedirect, handleAuthError, timeRange])

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
