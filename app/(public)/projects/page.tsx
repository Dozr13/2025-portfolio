import { listPublicProjects } from '@/app/actions/public/projects'
import { ProjectsSuspense } from '@/components/sections/projects/ProjectsSuspense'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  noStore()
  const projects = await listPublicProjects()

  const projectsPublic = projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    status: p.status,
    featured: p.featured,
    demoUrl: p.demoUrl || null,
    githubUrl: p.githubUrl || null
  }))

  return (
    <div className="container mx-auto pt-14 sm:pt-16 lg:pt-20">
      <ProjectsSuspense projects={projectsPublic} mode="full" />
    </div>
  )
}
