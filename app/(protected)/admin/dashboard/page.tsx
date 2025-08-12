import { listContacts } from '@/app/actions/admin/contacts'
import { getAdminStats } from '@/app/actions/admin/stats'
import { DashboardStreaming } from '@/components/admin/dashboard/DashboardStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  await requireAdmin()

  const [stats, contacts] = await Promise.all([
    getAdminStats(),
    listContacts({ page: 1, limit: 20, status: null, search: null })
  ])
  const initialDashboardData =
    stats && contacts
      ? {
          stats,
          recentContacts: (contacts.contacts || []).slice(0, 5).map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            subject: c.subject ?? '',
            status: c.status,
            createdAt: c.createdAt
          }))
        }
      : null

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialDashboardData ? 'Failed to load dashboard' : null}
      errorTitle="Dashboard Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin"
      backLabel="Back to Admin"
    >
      <DashboardStreaming initialData={initialDashboardData} />
    </AdminPageWrapper>
  )
}
