import { listPublicBlogPosts } from "@/app/actions/public/blog"
import { listExperiences } from "@/app/actions/public/experiences"
import { listPublicProjects } from "@/app/actions/public/projects"
import { About } from "@/components/sections/about"
import { BlogSuspense } from "@/components/sections/blog/BlogSuspense"
import { CaseStudies } from "@/components/sections/case-studies"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { ProjectsSuspense } from "@/components/sections/projects/ProjectsSuspense"
import { SkillsSuspense } from "@/components/sections/skills/SkillsSuspense"

export default async function Home() {
  const [projects, , blogPosts] = await Promise.all([
    listPublicProjects(),
    listExperiences(),
    listPublicBlogPosts()
  ])

  // Transform admin data to public types
  const projectsPublic = projects.map(project => ({
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

  // skills section now reads directly via SkillsSuspense

  const blogPublic = blogPosts.map(post => ({
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
      <Hero />
      <About />
      <SkillsSuspense skills={[]} />
      <ProjectsSuspense projects={projectsPublic} />
      <CaseStudies />
      <Experience />
      <BlogSuspense posts={blogPublic} />
      <Contact />
    </>
  )
}
