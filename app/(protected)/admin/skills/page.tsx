import { listSkills } from '@/app/actions/admin/skills'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { SkillsStreaming } from '@/components/admin/skills/SkillsStreaming'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function SkillsAdminPage() {
  await requireAdmin()

  const result = await listSkills()
  const skillsData = result?.skills || []

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!skillsData ? 'Failed to load skills' : null}
      errorTitle="Skills Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <SkillsStreaming initialData={skillsData || undefined} />
    </AdminPageWrapper>
  )
}
