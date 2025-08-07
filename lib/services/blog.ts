import { prisma } from '@/lib/config'
import type { BlogPost } from '@/lib/types'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

// Server-side blog posts data fetcher for admin dashboard
export const getServerBlogData = async (filters?: {
  page?: number
  search?: string
  status?: string
}): Promise<{ posts: BlogPost[], pagination: { pages: number, total: number } } | null> => {
  try {
    const headersList = await headers()

    // Try to get token from cookie first (httpOnly cookie set during login)
    const cookieHeader = headersList.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/adminToken=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null

    if (!token) {
      console.log('[Blog Service] No token found in cookies')
      return null
    }

    // Verify token is valid
    const isValid = await isValidToken(token)
    if (!isValid) {
      console.log('[Blog Service] Token validation failed')
      return null
    }

    console.log('[Blog Service] Fetching blog posts directly from database...')

    // Fetch blog posts directly from Prisma
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Filter posts in memory if needed
    let filteredPosts = posts
    if (filters?.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status)
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    const total = filteredPosts.length
    const pages = Math.ceil(total / 10) // Assuming 10 per page

    const blogData = {
      posts: filteredPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        featured: post.featured,
        category: post.category || 'GENERAL',
        tags: post.tags || '',
        readingTime: post.readingTime || 0,
        views: post.views || 0,
        author: post.author || 'Admin',
        publishedAt: post.publishedAt?.toISOString() || null,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        _count: {
          comments: 0 // Not implemented yet
        }
      })),
      pagination: {
        pages,
        total
      }
    }

    console.log('[Blog Service] Blog posts fetched successfully from database')
    return blogData
  } catch (error) {
    console.error('[Blog Service] Error fetching blog data:', error)
    return null
  }
}

// Server-side single blog post data fetcher for edit pages
export const getServerBlogPostData = async (id: string): Promise<BlogPost | null> => {
  try {
    const headersList = await headers()

    // Try to get token from cookie first (httpOnly cookie set during login)
    const cookieHeader = headersList.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/adminToken=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null

    if (!token) {
      console.log('[Blog Service] No token found in cookies')
      return null
    }

    // Verify token is valid
    const isValid = await isValidToken(token)
    if (!isValid) {
      console.log('[Blog Service] Token validation failed')
      return null
    }

    console.log('[Blog Service] Fetching blog post directly from database:', id)

    // Fetch blog post directly from Prisma
    const post = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!post) {
      console.log('[Blog Service] Blog post not found:', id)
      return null
    }

    const blogPostData = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      featured: post.featured,
      category: post.category || 'GENERAL',
      tags: post.tags || '',
      readingTime: post.readingTime || 0,
      views: post.views || 0,
      author: post.author || 'Admin',
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      _count: {
        comments: 0 // Not implemented yet
      }
    }

    console.log('[Blog Service] Blog post fetched successfully from database')
    return blogPostData
  } catch (error) {
    console.error('[Blog Service] Error fetching blog post data:', error)
    return null
  }
}
