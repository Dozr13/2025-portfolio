"use client"

import { ProjectCard } from "@/components/ui/project-card"
import { motion } from "framer-motion"

// Public project type - only what we need for display
interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  status: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string | null
}

interface ProjectsClientProps {
  projects: Project[]
}

export const ProjectsClient = ({ projects }: ProjectsClientProps) => {
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
              technologies={[]} // TODO: Add technologies from project skills
              liveUrl={project.demoUrl || ''}
              githubUrl={project.githubUrl || ''}
              status={project.status}
              index={index}
              category={project.category}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
