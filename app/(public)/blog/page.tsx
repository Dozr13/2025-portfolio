import { BlogListingClient } from "@/components/sections/blog/BlogListingClient"
import { prisma } from "@/lib/config"

export default async function BlogListingPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const search = params.search || ''
  const limit = 12

  // Fetch blog posts with pagination and search
  const where = {
    status: 'PUBLISHED' as const,
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } }
      ]
    })
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        tags: true,
        readingTime: true,
        views: true,
        publishedAt: true,
        author: true,
        featured: true
      }
    }),
    prisma.blogPost.count({ where })
  ])

  const totalPages = Math.ceil(total / limit)

  // Transform posts to match the expected interface
  const transformedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    category: post.category || '',
    tags: post.tags || '',
    readingTime: post.readingTime || 0,
    views: post.views,
    publishedAt: post.publishedAt?.toISOString() || '',
    author: post.author
  }))

  return (
    <BlogListingClient
      posts={transformedPosts}
      currentPage={page}
      totalPages={totalPages}
      totalPosts={total}
      search={search}
    />
  )
}
