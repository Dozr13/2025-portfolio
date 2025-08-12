'use client'

import { AdminSuspense } from '@/components/admin/shared/AdminSuspense'
import { StatsData } from '@/lib/types/admin/analytics'
import { AnalyticsContent } from './AnalyticsContent'
import { AnalyticsSkeleton } from './AnalyticsSkeleton'

export const AnalyticsStreaming = ({ initialData }: { initialData?: StatsData }) => {
  return (
    <AdminSuspense fallback={<AnalyticsSkeleton />} message="Loading analytics data...">
      <AnalyticsContent initialData={initialData} />
    </AdminSuspense>
  )
}
