"use client"

import { ProjectCard } from "@/components/ui/project-card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  category: string
  status: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string | null
  images: string[]
  thumbnail: string | null
  startDate: string
  endDate: string | null
  client: string | null
  teamSize: string | null
  role: string | null
  challenges: string[]
  solutions: string[]
  metrics: Record<string, string>
  order: number
  technologies: string[]
  duration: string
}
// Hook to fetch projects from API
function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || [])
      })
      .catch(error => {
        console.error('Failed to fetch projects:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { projects, loading }
}

export const Projects = () => {
  const { projects, loading } = useProjects()

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I&apos;ve worked on to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              liveUrl={project.demoUrl}
              githubUrl={project.githubUrl || ''}
              status={project.status}
              index={index}
              category={project.category}
              metrics={Object.keys(project.metrics || {})}
              teamSize={project.teamSize || undefined}
              duration={project.duration}
              featured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 