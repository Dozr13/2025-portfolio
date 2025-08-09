import { getAdminStats } from '@/app/actions/admin/stats'
import { AnalyticsStreaming } from '@/components/admin/analytics/AnalyticsStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { requireAdmin } from '@/lib/auth'

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function AdminAnalytics() {
  await requireAdmin()
  const initialStats = await getAdminStats()
  // Ensure database is non-null to satisfy StatsData type
  const safeStats = initialStats && initialStats.database
    ? initialStats
    : (initialStats ? { ...initialStats, database: { skills: 0, projects: 0, experiences: 0, contacts: 0, testimonials: 0, environment: initialStats.analytics.environment as string, database: initialStats.analytics.environment as string } } : null)

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialStats ? "Failed to load analytics" : null}
      errorTitle="Analytics Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <AnalyticsStreaming initialData={safeStats || undefined} />
    </AdminPageWrapper>
  )
}