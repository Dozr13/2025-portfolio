export interface PublicBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string
  readingTime: number
  views: number
  publishedAt: string
  author: string
}

// Full public detail shape used by the blog post page
export interface PublicBlogPostDetail {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  tags: string | null
  category: string | null
  author: string
  status: string
  featured: boolean
  metaTitle: string | null
  metaDescription: string | null
  readingTime: number | null
  views: number
  publishedAt: string | null | Date
  createdAt: string | Date
  updatedAt: string | null | Date
  comments: ReadonlyArray<{
    id: string
    name: string
    email: string
    website: string | null
    content: string
    approved: boolean
    postId: string
    parentId: string | null
    createdAt: string | Date
  }>
}