export interface CaseStudy {
  id: string
  title: string
  company: string
  duration: string
  overview: string
  problem: string
  solution: string
  results: string[]
  technologies: string[]
  challenges: string[]
  metrics: {
    label: string
    value: string
    improvement: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CaseStudyFormData {
  title: string
  company: string
  duration: string
  overview: string
  problem: string
  solution: string
  results: string
  technologies: string
  challenges: string
  metrics: string
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

