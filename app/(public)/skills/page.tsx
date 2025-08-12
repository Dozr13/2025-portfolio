import { listPublicSkills } from '@/app/actions/public/skills'
import { SkillsClient } from '@/components/sections/skills/SkillsClient'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  noStore()
  const skills = await listPublicSkills()

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32">
      <SkillsClient skills={skills} mode="full" />
    </div>
  )
}
