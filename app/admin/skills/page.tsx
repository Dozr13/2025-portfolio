import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { SkillsStreaming } from "@/components/admin/skills/SkillsStreaming"
import { getServerSkillsData } from "@/lib/services"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function SkillsAdminPage() {
  const skillsData = await getServerSkillsData()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!skillsData ? "Failed to load skills" : null}
      errorTitle="Skills Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <SkillsStreaming initialData={skillsData?.skills || undefined} />
    </AdminPageWrapper>
  )
}
