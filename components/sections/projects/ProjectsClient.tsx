"use client"

import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectsClientProps } from "@/lib/types/sections"
import { motion } from "framer-motion"

export const ProjectsClient = ({ projects, mode = "full", immediate = false }: ProjectsClientProps) => {
  const visible = mode === "preview" ? projects.slice(0, 3) : projects
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div>
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          {visible.map((project, index) => (
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
        {mode === "preview" && (
          <div className="text-center mt-10">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
            >
              View all projects
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
