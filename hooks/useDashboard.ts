"use client"

import { useCallback, useEffect, useState } from "react"

interface DashboardStats {
  contacts: {
    total: number
    new: number
    thisWeek: number
  }
  blog: {
    published: number
    drafts: number
    totalViews: number
  }
  analytics: {
    visitors: number
    pageViews: number
    avgTimeOnSite: number
  }
}

interface RecentContact {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: string
}

interface DashboardData {
  stats: DashboardStats
  recentContacts: RecentContact[]
}

interface UseDashboardOptions {
  initialData?: DashboardData | null
}

export function useDashboard(options: UseDashboardOptions = {}) {
  const [data, setData] = useState<DashboardData | null>(options.initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("adminToken")

      const [statsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch("/api/admin/contacts", {
          headers: { "Authorization": `Bearer ${token}` }
        })
      ])

      const [statsData, contactsData] = await Promise.all([
        statsRes.ok ? statsRes.json() : null,
        contactsRes.ok ? contactsRes.json() : null
      ])

      const dashboardData = {
        stats: statsData,
        recentContacts: contactsData?.contacts?.slice(0, 5) || []
      }

      setData(dashboardData)
    } catch (err) {
      console.error('[useDashboard] Error fetching dashboard data:', err)
      setError('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch if no initial data
  useEffect(() => {
    if (!options.initialData) {
      fetchDashboardData()
    }
  }, [fetchDashboardData, options.initialData])

  return {
    data,
    loading,
    error,
    fetchDashboardData
  }
}
