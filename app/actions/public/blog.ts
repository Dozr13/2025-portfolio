'use server'

import { prisma } from '@/lib/config'
import { estimateReadingTime } from '@/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

export const listPublicBlogPosts = async () => {
  noStore()
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
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
  })
  // Ensure readingTime fallback without loading content on listing
  return posts.map((p) => ({
    ...p,
    readingTime: p.readingTime ?? 5,
    publishedAt: p.publishedAt ?? null
  }))
}

export const getBlogPostBySlug = async (slug: string) => {
  noStore()
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { comments: { where: { approved: true }, orderBy: { createdAt: 'desc' } } }
  })
  if (!post) throw new Error('Post not found')
  await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } })
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags,
    category: post.category,
    author: post.author,
    status: post.status,
    featured: post.featured,
    metaTitle: post.metaTitle ?? null,
    metaDescription: post.metaDescription ?? null,
    readingTime: post.readingTime ?? estimateReadingTime(post.content),
    views: post.views + 1,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : null,
    comments: post.comments.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      website: c.website,
      content: c.content,
      approved: c.approved,
      postId: c.postId,
      parentId: c.parentId,
      createdAt: c.createdAt.toISOString()
    }))
  }
}

export const incrementBlogView = async (slug: string) => {
  if (!slug) throw new Error('slug required')
  await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } })
  return { ok: true }
}
