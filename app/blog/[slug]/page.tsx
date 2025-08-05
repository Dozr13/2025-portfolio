import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  htmlContent: string | null
  tags: string | null
  category: string | null
  author: string
  status: string
  featured: boolean
  metaTitle: string | null
  metaDescription: string | null
  readingTime: number | null
  views: number
  likes: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  comments: {
    id: string
    name: string
    email: string
    website: string | null
    content: string
    approved: boolean
    postId: string
    parentId: string | null
    createdAt: Date
  }[]
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        comments: {
          where: { approved: true },
          orderBy: { createdAt: "desc" }
        }
      }
    })
    return post
  } catch {
    return null
  }
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Increment view count
  try {
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })
  } catch (error) {
    console.error('Error updating view count:', error)
  }

  return <BlogPostClient post={post} />
}