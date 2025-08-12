"use client"

import type { PublicSkill } from "@/lib/types/public"
import type { ViewMode } from "@/lib/types/ui/view"
import { SkillsFull } from "./Full"
import { SkillsPreview } from "./Preview"

export type SkillsDisplayProps = Readonly<{
  skills: PublicSkill[]
  mode?: ViewMode
  className?: string
  showCategories?: boolean
  showAllTab?: boolean
}>

export const SkillsDisplay = ({
  skills,
  mode = "full",
  className,
  showCategories = true,
  showAllTab = true,
}: SkillsDisplayProps) => {
  if (mode === "preview") return <SkillsPreview skills={skills} className={className} />

  return (
    <SkillsFull
      skills={skills}
      className={className}
      showCategories={showCategories}
      showAllTab={showAllTab}
    />
  )
}
