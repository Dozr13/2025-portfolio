'use server'

import { prisma } from '@/lib/config'
import { calculateDuration, safeJsonParse } from '@/lib/utils'

export async function listPublicProjects() {
  const projects = await prisma.project.findMany({
    where: { status: 'COMPLETED', featured: true },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { endDate: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      longDescription: true,
      category: true,
      status: true,
      featured: true,
      demoUrl: true,
      githubUrl: true,
      images: true,
      thumbnail: true,
      startDate: true,
      endDate: true,
      client: true,
      teamSize: true,
      role: true,
      challenges: true,
      solutions: true,
      metrics: true,
      order: true,
      createdAt: true,
      updatedAt: true,
      projectSkills: {
        select: { skill: { select: { name: true, icon: true } }, importance: true },
        orderBy: { importance: 'asc' }
      }
    }
  })

  return projects.map((project) => ({
    ...project,
    images: safeJsonParse<string[]>(project.images, []),
    challenges: safeJsonParse<string[]>(project.challenges, []),
    solutions: safeJsonParse<string[]>(project.solutions, []),
    metrics: safeJsonParse<Record<string, string>>(project.metrics, {}),
    technologies: project.projectSkills.map((ps) => ps.skill.name),
    startDate: project.startDate?.toISOString(),
    endDate: project.endDate?.toISOString(),
    teamSize: project.teamSize
      ? `${project.teamSize} ${project.teamSize === 1 ? 'person' : 'people'}`
      : 'Solo Project',
    duration:
      project.startDate && project.endDate
        ? calculateDuration(project.startDate, project.endDate)
        : 'Ongoing'
  }))
}
