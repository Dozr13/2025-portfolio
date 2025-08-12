import { listProjects } from '@/app/actions/admin/projects'
import { ProjectsStreaming } from '@/components/admin/projects/ProjectsStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function ProjectsAdminPage() {
  await requireAdmin()

  const initialProjects = await listProjects({
    page: 1,
    limit: 20,
    status: null,
    category: null,
    search: null
  })

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialProjects ? 'Failed to load projects' : null}
      errorTitle="Projects Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <ProjectsStreaming initialData={initialProjects} />
    </AdminPageWrapper>
  )
}
