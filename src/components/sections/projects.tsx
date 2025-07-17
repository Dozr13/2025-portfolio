"use client"

import { ProjectCard } from "@/components/ui/project-card"
import { motion } from "framer-motion"

interface Project {
  title: string
  description: string
  technologies: string[]
  liveUrl: string | null
  githubUrl: string
  status?: string
}

const projects: Project[] = [
  {
    title: "Modern Portfolio Website",
    description: "This very portfolio! Built with Next.js 15, TypeScript, and Framer Motion. Features responsive design, dark mode, and optimized performance.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://wadepate.vercel.app",
    githubUrl: "https://github.com/Dozr13/2025-portfolio"
  },
  {
    title: "HustleForge Platform",
    description: "Full-stack entrepreneurship platform with user authentication, project management, and real-time collaboration features.",
    technologies: ["React", "GraphQL", "Prisma", "Flutter", "Nx"],
    liveUrl: null, // No live demo
    githubUrl: "https://github.com/Dozr13/HustleForge",
    status: "Private Repository"
  },
  {
    title: "ComComs Healthcare",
    description: "Healthcare management system with appointment scheduling, patient records, and secure messaging. Built with modern web technologies.",
    technologies: ["React Native", "TypeScript", "Supabase", "Expo"],
    liveUrl: null,
    githubUrl: "https://github.com/Dozr13/CareConnect",
    status: "Private Repository"
  }
]

export function Projects() {
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 leading-tight pb-1">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I&apos;ve worked on to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              status={project.status}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 