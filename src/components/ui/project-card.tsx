"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  liveUrl: string | null
  githubUrl: string
  status?: string
  index: number
}

export function ProjectCard({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  status,
  index
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-border/80 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col"
    >
      {/* Project Image/Preview - Fixed Height */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon name="external-link" size="xl" />
          </div>
          <p className="text-sm font-medium">Project Preview</p>
        </div>
      </div>

      {/* Card Content - Flexible */}
      <div className="p-6 flex flex-col flex-1">
        {/* Project Title - Fixed Space */}
        <div className="mb-3 min-h-[3.5rem] flex items-start">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>

        {/* Project Description - Fixed Space */}
        <div className="mb-6 min-h-[4.5rem] flex items-start">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Technologies - Fixed Space */}
        <div className="mb-6 min-h-[2.5rem] flex items-start">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - Push to Bottom */}
        <div className="flex gap-3 mt-auto">
          {liveUrl ? (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-1"
            >
              <Icon name="external-link" size="sm" />
              Live Demo
            </motion.a>
          ) : (
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 h-10 bg-muted text-muted-foreground rounded-lg text-sm font-medium flex-1">
              <Icon name="code" size="sm" />
              {status || "Coming Soon"}
            </div>
          )}

          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 h-10 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors flex-1"
          >
            <Icon name="github" size="sm" />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
} 