// Project types
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string | null
  category: string
  status: string
  featured: boolean
  demoUrl?: string | null
  githubUrl?: string | null
  images?: string | null
  thumbnail?: string | null
  startDate?: Date | null
  endDate?: Date | null
  client?: string | null
  teamSize?: number | null
  role?: string | null
  challenges?: string | null
  solutions?: string | null
  metrics?: string | null
  order?: number | null
  createdAt: Date
  updatedAt: Date | null
  _count?: {
    projectViews: number
  }
}

export interface ProjectFormData {
  title: string
  slug: string
  description: string
  longDescription?: string
  category: string
  status: string
  featured: boolean
  demoUrl?: string
  githubUrl?: string
  images?: string
  thumbnail?: string
  startDate?: string
  endDate?: string
  client?: string
  teamSize?: number
  role?: string
  challenges?: string
  solutions?: string
  metrics?: string
  order?: number
}
