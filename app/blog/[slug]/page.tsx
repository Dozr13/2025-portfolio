import { BlogPostClient } from "@/components/sections/blog/BlogPostClient"
import { prisma } from "@/lib/config"
import { notFound } from "next/navigation"

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch blog post directly from database for public access
  const postData = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      comments: {
        where: { approved: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!postData) {
    notFound()
  }

  // Increment view count
  try {
    await prisma.blogPost.update({
      where: { id: postData.id },
      data: { views: { increment: 1 } }
    })
  } catch (error) {
    console.error('Error updating view count:', error)
  }

  return <BlogPostClient post={postData} />
}
