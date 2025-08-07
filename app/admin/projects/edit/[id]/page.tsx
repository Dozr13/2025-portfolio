import { EditProjectClient } from "@/components/admin/projects/EditProjectClient"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerProjectData } from "@/lib/services"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const initialProject = await getServerProjectData(resolvedParams.id)

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialProject ? "Project not found" : null}
      errorTitle="Project not found"
      errorMessage="The project you're looking for doesn't exist"
      backHref="/admin/projects"
      backLabel="Back to Projects"
    >
      <EditProjectClient initialData={initialProject} />
    </AdminPageWrapper>
  )
}
