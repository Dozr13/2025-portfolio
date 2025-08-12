'use server'

import type { CaseStudy as CaseStudyModel } from '@/generated/client'
import { prisma } from '@/lib/config'
import { safeJsonParse } from '@/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

export const listPublicCaseStudies = async () => {
  noStore()
  const studies = await prisma.caseStudy.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      company: true,
      duration: true,
      overview: true,
      problem: true,
      solution: true,
      results: true,
      technologies: true,
      challenges: true,
      metrics: true,
      testimonial: true,
      githubUrl: true,
      liveUrl: true,
      featured: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return studies.map((s: CaseStudyModel) => ({
    ...s,
    results: safeJsonParse<string[]>(s.results, []),
    technologies: safeJsonParse<string[]>(s.technologies, []),
    challenges: safeJsonParse<string[]>(s.challenges, []),
    metrics: safeJsonParse<{ label: string; value: string; improvement: string }[]>(s.metrics, []),
    testimonial: safeJsonParse<{ quote: string; author: string; role: string }>(
      s.testimonial,
      undefined as unknown as { quote: string; author: string; role: string }
    ),
    githubUrl: s.githubUrl ?? undefined,
    liveUrl: s.liveUrl ?? undefined
  }))
}
