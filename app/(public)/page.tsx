import { listPublicBlogPosts } from '@/app/actions/public/blog'
import { listPublicCaseStudies } from '@/app/actions/public/case-studies'
import { listExperiences } from '@/app/actions/public/experiences'
import { listPublicProjects } from '@/app/actions/public/projects'
import { listPublicSkills } from '@/app/actions/public/skills'
import { AboutSuspense } from '@/components/sections/about/AboutSuspense'
import { BlogSuspense } from '@/components/sections/blog/BlogSuspense'
import { CaseStudiesSuspense } from '@/components/sections/caseStudies/CaseStudiesSuspense'
import { ContactSuspense } from '@/components/sections/contact/ContactSuspense'
import { ExperienceSuspense } from '@/components/sections/experience/ExperienceSuspense'
import { HeroSuspense } from '@/components/sections/hero/HeroSuspense'
import { ProjectsSuspense } from '@/components/sections/projects/ProjectsSuspense'
import { SkillsSuspense } from '@/components/sections/skills/SkillsSuspense'
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()
  const [projects, blogPosts, skills, experiences, caseStudies] = await Promise.all([
    listPublicProjects(),
    listPublicBlogPosts(),
    listPublicSkills(),
    listExperiences(),
    listPublicCaseStudies()
  ])

  // Transform admin data to public types
  const projectsPublic = projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    status: project.status,
    featured: project.featured,
    demoUrl: project.demoUrl || null,
    githubUrl: project.githubUrl || null
  }))

  // skills for public display
  const skillsPublic = skills
  const experiencesPublic = experiences
  const caseStudiesPublic = caseStudies

  const blogPublic = blogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    category: post.category || '',
    tags: post.tags || '',
    readingTime: post.readingTime || 0,
    views: post.views,
    publishedAt: post.publishedAt?.toISOString() || '',
    author: post.author
  }))

  return (
    <>
      <HeroSuspense />
      <AboutSuspense />
      <SkillsSuspense skills={skillsPublic} mode="preview" />
      <ProjectsSuspense projects={projectsPublic} mode="preview" />
      <CaseStudiesSuspense caseStudies={caseStudiesPublic} />
      <ExperienceSuspense experiences={experiencesPublic} />
      <BlogSuspense posts={blogPublic} />
      <ContactSuspense />
    </>
  )
}
