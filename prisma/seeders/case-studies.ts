import { prisma } from '@/lib/config'
import { caseStudies as sharedCaseStudies } from '@/lib/data/case-studies'

export const seedCaseStudies = async () => {
  console.log('Seeding case studies...')

  for (const cs of sharedCaseStudies) {
    await prisma.caseStudy.upsert({
      where: { id: cs.id },
      update: {
        title: cs.title,
        company: cs.company,
        duration: cs.duration,
        overview: cs.overview,
        problem: cs.problem,
        solution: cs.solution,
        results: JSON.stringify(cs.results ?? []),
        technologies: JSON.stringify(cs.technologies ?? []),
        challenges: JSON.stringify(cs.challenges ?? []),
        metrics: JSON.stringify(cs.metrics ?? []),
        testimonial: cs.testimonial ? JSON.stringify(cs.testimonial) : null,
        githubUrl: cs.githubUrl ?? null,
        liveUrl: cs.liveUrl ?? null,
        featured: Boolean(cs.featured)
      },
      create: {
        id: cs.id,
        title: cs.title,
        company: cs.company,
        duration: cs.duration,
        overview: cs.overview,
        problem: cs.problem,
        solution: cs.solution,
        results: JSON.stringify(cs.results ?? []),
        technologies: JSON.stringify(cs.technologies ?? []),
        challenges: JSON.stringify(cs.challenges ?? []),
        metrics: JSON.stringify(cs.metrics ?? []),
        testimonial: cs.testimonial ? JSON.stringify(cs.testimonial) : null,
        githubUrl: cs.githubUrl ?? null,
        liveUrl: cs.liveUrl ?? null,
        featured: Boolean(cs.featured)
      }
    })
  }

  console.log('Case studies seeded successfully')
}
