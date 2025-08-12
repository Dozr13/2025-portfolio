export interface PublicProject {
  id: string
  title: string
  slug: string
  description: string
  category: string
  status: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string | null
}
