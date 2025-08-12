'use server'

import { prisma } from '@/lib/config'
import { unstable_noStore as noStore } from 'next/cache'

// Public-facing skills listing. Returns minimal fields needed for display.
export const listPublicSkills = async () => {
  noStore()
  const skills = await prisma.skill.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      category: true,
      level: true,
      years: true,
      icon: true,
      featured: true,
      order: true
    }
  })

  // Normalize nullable fields for the public UI expectations
  return skills.map((skill) => ({
    ...skill,
    years: skill.years ?? 0,
    icon: skill.icon ?? '',
    order: skill.order ?? Number.MAX_SAFE_INTEGER
  }))
}
