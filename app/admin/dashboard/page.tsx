import { DashboardStreaming } from "@/components/admin/dashboard/DashboardStreaming"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerDashboardData } from "@/lib/services"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const initialDashboardData = await getServerDashboardData()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialDashboardData ? "Failed to load dashboard" : null}
      errorTitle="Dashboard Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin"
      backLabel="Back to Admin"
    >
      <DashboardStreaming initialData={initialDashboardData} />
    </AdminPageWrapper>
  )
}
