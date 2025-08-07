import { About } from "@/components/sections/about"
import { BlogSuspense } from "@/components/sections/blog/BlogSuspense"
import { CaseStudies } from "@/components/sections/case-studies"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { ProjectsSuspense } from "@/components/sections/projects/ProjectsSuspense"
import { SkillsSuspense } from "@/components/sections/skills/SkillsSuspense"
import { getPublicBlogData, getPublicProjectsData, getPublicSkillsData } from "@/lib/services/public"

export default async function Home() {
  // Fetch data server-side using public services (no authentication required)
  const [projectsData, skillsData, blogData] = await Promise.all([
    getPublicProjectsData(),
    getPublicSkillsData(),
    getPublicBlogData()
  ])

  // Transform admin data to public types
  const projects = (projectsData?.projects || []).map(project => ({
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

  const skills = (skillsData || []).map(skill => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    level: skill.level,
    years: skill.years || 0,
    icon: skill.icon || '',
    featured: skill.featured,
    order: skill.order || 0
  }))

  const blogPosts = (blogData?.posts || []).map(post => ({
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
      <SkillsSuspense skills={skills} />
      <ProjectsSuspense projects={projects} />
      <CaseStudies />
      <Experience />
      <BlogSuspense posts={blogPosts} />
      <Contact />
    </>
  )
}
