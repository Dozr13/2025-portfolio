import { NewSkillClient } from '@/components/admin/skills/NewSkillClient'
import { requireAdmin } from '@/lib/auth'

export default async function NewSkillPage() {
  await requireAdmin()

  return <NewSkillClient />
}
