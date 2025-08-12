import { getSkill } from '@/app/actions/admin/skills'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { EditSkillClient } from '@/components/admin/skills/EditSkillClient'
import { requireAdmin } from '@/lib/auth'

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const resolvedParams = await params
  const res = await getSkill(resolvedParams.id)
  const initialSkill = res?.skill ?? null

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialSkill ? 'Skill not found' : null}
      errorTitle="Skill not found"
      errorMessage="The skill you're looking for doesn't exist"
      backHref="/admin/skills"
      backLabel="Back to Skills"
    >
      <EditSkillClient initialData={initialSkill} />
    </AdminPageWrapper>
  )
}
