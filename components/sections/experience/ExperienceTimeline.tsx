'use client'

import type { PublicExperience } from '@/lib/types/public'
import { ExperienceItem } from './ExperienceItem'

export type ExperienceTimelineProps = Readonly<{
  experiences: PublicExperience[]
  immediate?: boolean
}>

export const ExperienceTimeline = ({ experiences, immediate = false }: ExperienceTimelineProps) => {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-2">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} index={i} immediate={immediate} />
        ))}
      </div>
    </div>
  )
}
