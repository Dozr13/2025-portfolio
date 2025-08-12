export interface Skill {
  id: string
  name: string
  category: string
  level: string
  years: number | null
  description: string | null
  icon: string | null
  featured: boolean
  order: number | null
  createdAt: Date
  updatedAt: Date | null
}

export interface SkillFormData {
  name: string
  category: string
  level: string
  years: string
  description: string
  icon: string
  featured: boolean
}
