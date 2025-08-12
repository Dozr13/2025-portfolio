export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  status: string
  category: string | null
  tags: string | null
  readingTime: number | null
  views: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  author: string
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  _count: {
    comments: number
  }
}

export interface BlogPostFormData {
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
}
