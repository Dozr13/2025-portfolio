'use server'

import type { CaseStudy as CaseStudyModel } from '@/generated/client'
import { prisma } from '@/lib/config'
import { safeJsonParse } from '@/lib/utils'
import { z } from 'zod'
import { ensureAdmin } from './auth'

export const listCaseStudies = async () => {
  await ensureAdmin()
  const items = await prisma.caseStudy.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }]
  })
  return {
    caseStudies: items.map((s: CaseStudyModel) => ({
      id: s.id,
      title: s.title,
      company: s.company,
      duration: s.duration,
      overview: s.overview,
      problem: s.problem,
      solution: s.solution,
      results: safeJsonParse<string[]>(s.results, []),
      technologies: safeJsonParse<string[]>(s.technologies, []),
      challenges: safeJsonParse<string[]>(s.challenges, []),
      metrics: safeJsonParse<{ label: string; value: string; improvement: string }[]>(
        s.metrics,
        []
      ),
      testimonial: safeJsonParse<{ quote: string; author: string; role: string }>(
        s.testimonial,
        undefined as unknown as { quote: string; author: string; role: string }
      ),
      githubUrl: s.githubUrl ?? undefined,
      liveUrl: s.liveUrl ?? undefined,
      featured: s.featured,
      createdAt: s.createdAt?.toISOString?.(),
      updatedAt: s.updatedAt?.toISOString?.()
    })),
    pagination: { pages: 1, total: items.length }
  }
}

const caseStudySchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  duration: z.string().min(1),
  overview: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  results: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  metrics: z
    .array(z.object({ label: z.string(), value: z.string(), improvement: z.string() }))
    .optional(),
  testimonial: z.object({ quote: z.string(), author: z.string(), role: z.string() }).optional(),
  githubUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  liveUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  featured: z.boolean().optional()
})

export const createCaseStudy = async (input: unknown) => {
  await ensureAdmin()
  const data = caseStudySchema.parse(input)
  const created = await prisma.caseStudy.create({
    data: {
      title: data.title,
      company: data.company,
      duration: data.duration,
      overview: data.overview,
      problem: data.problem,
      solution: data.solution,
      results: JSON.stringify(data.results ?? []),
      technologies: JSON.stringify(data.technologies ?? []),
      challenges: JSON.stringify(data.challenges ?? []),
      metrics: JSON.stringify(data.metrics ?? []),
      testimonial: data.testimonial ? JSON.stringify(data.testimonial) : null,
      githubUrl: data.githubUrl ?? null,
      liveUrl: data.liveUrl ?? null,
      featured: Boolean(data.featured)
    }
  })
  return { caseStudy: created }
}

export const updateCaseStudy = async (id: string, input: unknown) => {
  await ensureAdmin()
  const data = caseStudySchema.partial().parse(input)
  const updated = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.company && { company: data.company }),
      ...(data.duration && { duration: data.duration }),
      ...(data.overview && { overview: data.overview }),
      ...(data.problem && { problem: data.problem }),
      ...(data.solution && { solution: data.solution }),
      ...(data.results && { results: JSON.stringify(data.results) }),
      ...(data.technologies && { technologies: JSON.stringify(data.technologies) }),
      ...(data.challenges && { challenges: JSON.stringify(data.challenges) }),
      ...(data.metrics && { metrics: JSON.stringify(data.metrics) }),
      ...(data.testimonial && { testimonial: JSON.stringify(data.testimonial) }),
      ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl ?? null }),
      ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl ?? null }),
      ...(data.featured !== undefined && { featured: data.featured })
    }
  })
  return { caseStudy: updated }
}

export const deleteCaseStudy = async (id: string) => {
  await ensureAdmin()
  await prisma.caseStudy.delete({ where: { id } })
  return { message: 'Case study deleted' }
}
