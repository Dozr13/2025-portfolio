export type PublicSkill = Readonly<{
  id: string
  name: string
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'TOOLS' | 'DESIGN' | 'SOFT_SKILLS'
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  years: number | null
  icon: string | null
  featured: boolean
  order: number | null
}>