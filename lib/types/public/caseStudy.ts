export type PublicCaseStudy = Readonly<{
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
  metrics: ReadonlyArray<{ label: string; value: string; improvement: string }>
  testimonial?: { quote: string; author: string; role: string }
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
}>
