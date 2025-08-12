'use client'

import type { PublicExperience } from '@/lib/types/public'
import { formatPeriod } from '@/lib/utils'
import { motion } from 'framer-motion'

export type ExperienceItemProps = Readonly<{
  exp: PublicExperience
  index: number
  immediate?: boolean
}>

export const ExperienceItem = ({ exp, index, immediate = false }: ExperienceItemProps) => {
  const sideIsLeft = index % 2 === 0
  const period = formatPeriod(
    new Date(exp.startDate),
    exp.endDate ? new Date(exp.endDate) : null,
    exp.current
  )

  return (
    <div className="relative py-8">
      {/* Timeline dot (center) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10">
        <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
      </div>

      <div className={`md:flex ${sideIsLeft ? 'md:justify-start' : 'md:justify-end'}`}>
        <motion.article
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70 border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow md:w-[calc(50%-1.25rem)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h3 className="text-xl font-semibold text-foreground truncate">{exp.title}</h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{period}</span>
          </div>
          <div className="text-muted-foreground mb-4">
            {exp.company}
            {exp.location ? ` • ${exp.location}` : ''}
          </div>
          {exp.description && (
            <p className="text-foreground/90 mb-4 leading-relaxed">{exp.description}</p>
          )}
          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, idx) => (
                <span
                  key={`${exp.id}-tech-${idx}`}
                  className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </div>
  )
}
