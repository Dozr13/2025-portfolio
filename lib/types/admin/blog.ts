// Blog types
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
  publishedAt: string | null
  createdAt: string
  updatedAt: string
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
