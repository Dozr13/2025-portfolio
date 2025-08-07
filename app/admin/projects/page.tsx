import { ProjectsStreaming } from "@/components/admin/projects/ProjectsStreaming"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerProjectsData } from "@/lib/services"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function ProjectsAdminPage() {
  const initialProjects = await getServerProjectsData()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialProjects ? "Failed to load projects" : null}
      errorTitle="Projects Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <ProjectsStreaming initialData={initialProjects} />
    </AdminPageWrapper>
  )
}