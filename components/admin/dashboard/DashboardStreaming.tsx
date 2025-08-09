"use client"

import { AdminSuspense } from "@/components/admin/shared/AdminSuspense"
import type { DashboardData } from "@/hooks/useDashboard"
import { DashboardContent } from "./DashboardContent"
import { DashboardSkeleton } from "./DashboardSkeleton"

interface DashboardStreamingProps {
  initialData: DashboardData | null
}

export const DashboardStreaming = ({ initialData }: DashboardStreamingProps) => {
  return (
    <AdminSuspense fallback={<DashboardSkeleton />} message="Loading dashboard data...">
      <DashboardContent initialData={initialData} />
    </AdminSuspense>
  )
}
