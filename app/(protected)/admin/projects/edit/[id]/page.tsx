import { getProject } from '@/app/actions/admin/projects'
import { EditProjectClient } from '@/components/admin/projects/EditProjectClient'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { requireAdmin } from '@/lib/auth'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const resolvedParams = await params
  const result = await getProject(resolvedParams.id)
  const initialProject = result?.project ?? null

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialProject ? 'Project not found' : null}
      errorTitle="Project not found"
      errorMessage="The project you're looking for doesn't exist"
      backHref="/admin/projects"
      backLabel="Back to Projects"
    >
      <EditProjectClient initialData={initialProject} />
    </AdminPageWrapper>
  )
}
