"use client"

import { AdminSuspense } from "@/components/admin/shared/AdminSuspense"
import { DashboardContent } from "./DashboardContent"
import { DashboardSkeleton } from "./DashboardSkeleton"

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

interface DashboardStreamingProps {
  initialData?: DashboardData | null
}

export const DashboardStreaming = ({ initialData }: DashboardStreamingProps) => {
  return (
    <AdminSuspense fallback={<DashboardSkeleton />} message="Loading dashboard data...">
      <DashboardContent initialData={initialData} />
    </AdminSuspense>
  )
}
