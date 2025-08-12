'use client'

import { listContacts } from '@/app/actions/admin/contacts'
import { getAdminStats } from '@/app/actions/admin/stats'
import type { AnalyticsData } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'

export interface DashboardStats {
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
  analytics: AnalyticsData & { environment: string; enabled: boolean }
}

export interface RecentContact {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: Date
}

export interface DashboardData {
  stats: DashboardStats
  recentContacts: RecentContact[]
}

export interface UseDashboardOptions {
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
      const [statsData, contactsData] = await Promise.all([
        getAdminStats(),
        listContacts({ page: 1, limit: 20, status: null, search: null })
      ])

      const contacts =
        contactsData && 'contacts' in (contactsData as object)
          ? (
              contactsData as {
                contacts: Array<{
                  id: string
                  name: string
                  email: string
                  subject: string | null
                  status: string
                  createdAt: string | Date
                }>
              }
            ).contacts
          : []
      const recentContacts: RecentContact[] = contacts.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        subject: c.subject ?? '',
        status: c.status,
        createdAt: typeof c.createdAt === 'string' ? new Date(c.createdAt) : new Date(c.createdAt)
      }))
      const dashboardData: DashboardData = {
        stats: statsData as unknown as DashboardStats,
        recentContacts: recentContacts.slice(0, 5)
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
