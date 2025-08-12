export interface PublicExperience {
  id: string
  title: string
  company: string
  location: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string | null
  technologies: string[]
}