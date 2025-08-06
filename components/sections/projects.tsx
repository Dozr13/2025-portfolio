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
  category: string
  metrics?: string[]
  teamSize?: string
  duration?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Request Hub SaaS Platform",
    description: "Enterprise multi-tenant SaaS platform for VC portfolio companies with real-time request management, Linear integration, and admin dashboards. Built in 5 days as a technical assessment.",
    technologies: ["Next.js 15", "TypeScript", "Clerk", "Prisma", "Pusher", "Linear API"],
    liveUrl: "https://request-hub-gamma.vercel.app",
    githubUrl: "https://github.com/Dozr13/request-hub",
    category: "Full-Stack SaaS",
    metrics: ["Multi-tenant architecture", "Real-time updates", "Built in 5 days"],
    teamSize: "Solo Project",
    duration: "5 days",
    featured: true
  },
  {
    title: "ShiftScribe Web Platform",
    description: "Modern web component system for scheduling and workforce management. Built with cutting-edge web technologies for scalable enterprise applications.",
    technologies: ["TypeScript", "Web Components", "Modern CSS", "Progressive Enhancement"],
    liveUrl: null,
    githubUrl: "https://github.com/Dozr13/ShiftScribe-web",
    category: "Web Components",
    metrics: ["Reusable components", "Cross-platform compatibility", "Enterprise ready"],
    teamSize: "Lead Developer",
    duration: "4 months",
    featured: true
  },
  {
    title: "Modern Portfolio Website",
    description: "This very portfolio! Built with Next.js 15, TypeScript, and Framer Motion. Features responsive design, dark mode, database integration, and optimized performance.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Prisma"],
    liveUrl: "https://wadepate.vercel.app",
    githubUrl: "https://github.com/Dozr13/2025-portfolio",
    category: "Portfolio",
    metrics: ["100 Lighthouse score", "Sub-second load times", "Fully responsive"],
    teamSize: "Solo Project",
    duration: "1 month",
    featured: true
  }
]

export const Projects = () => {
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
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              status={project.status}
              index={index}
              category={project.category}
              metrics={project.metrics}
              teamSize={project.teamSize}
              duration={project.duration}
              featured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 