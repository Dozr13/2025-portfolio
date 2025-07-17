"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "ShiftScribe Web Component",
    description: "Modern web component built with TypeScript for scheduling and shift management. Features clean architecture and reusable component design patterns.",
    technologies: ["TypeScript", "Web Components", "HTML", "CSS"],
    image: "/api/placeholder/600/400",
    demo: "https://wadepate.com",
    github: "https://github.com/Dozr13/ShiftScribe-web"
  },
  {
    title: "Proc-to-Postgres Pipeline",
    description: "Python-based data processing pipeline for PostgreSQL integration. Demonstrates expertise in database operations and data transformation workflows.",
    technologies: ["Python", "PostgreSQL", "Data Processing"],
    image: "/api/placeholder/600/400",
    demo: "https://wadepate.com",
    github: "https://github.com/Dozr13/proc-to-postgres"
  },
  {
    title: "ByteSmith Code Platform",
    description: "TypeScript-powered coding platform and company website. Showcases modern frontend development with clean, scalable architecture.",
    technologies: ["TypeScript", "React", "Web Development"],
    image: "/api/placeholder/600/400",
    demo: "https://wadepate.com",
    github: "https://github.com/Dozr13/bytesmith-code"
  }
]

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Project Preview</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 