import { AnalyticsStreaming } from '@/components/admin/analytics/AnalyticsStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { getServerAnalyticsData } from '@/lib/services/analytics'

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function AdminAnalytics() {
  const initialStats = await getServerAnalyticsData()

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
      <AnalyticsStreaming initialData={initialStats || undefined} />
    </AdminPageWrapper>
  )
}