import type { PublicSkill } from "@/lib/types/public"

type SkillCategory = PublicSkill["category"]

export const SKILL_CATEGORY_NAMES = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Database",
  DEVOPS: "DevOps",
  TOOLS: "Tools",
  DESIGN: "Design",
  SOFT_SKILLS: "Soft Skills",
} as const satisfies Record<SkillCategory, string>

export const SKILL_CATEGORY_ORDER: readonly SkillCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "TOOLS",
  "DESIGN",
  "SOFT_SKILLS",
] as const

export const PREVIEW_COUNTS = {
  base: 4,
  sm: 8,
  lg: 12,
} as const

export const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
  xl: 1280,
} as const
