import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { EditSkillClient } from "@/components/admin/skills/EditSkillClient"
import { getServerSkillData } from "@/lib/services"

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const initialSkill = await getServerSkillData(resolvedParams.id)

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialSkill ? "Skill not found" : null}
      errorTitle="Skill not found"
      errorMessage="The skill you're looking for doesn't exist"
      backHref="/admin/skills"
      backLabel="Back to Skills"
    >
      <EditSkillClient initialData={initialSkill} />
    </AdminPageWrapper>
  )
}
