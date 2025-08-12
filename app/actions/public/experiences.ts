'use server'

import { prisma } from '@/lib/config'
import { formatPeriod, parseTechnologies, safeJsonParse } from '@/lib/utils'

export async function listExperiences() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ startDate: 'desc' }],
    select: {
      id: true,
      position: true,
      company: true,
      location: true,
      startDate: true,
      endDate: true,
      current: true,
      description: true,
      technologies: true,
      achievements: true,
      order: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return experiences.map((experience) => ({
    ...experience,
    title: experience.position,
    technologies: parseTechnologies(experience.technologies),
    achievements: safeJsonParse<string[]>(experience.achievements, []),
    period: formatPeriod(experience.startDate, experience.endDate, experience.current),
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString() || null
  }))
}
