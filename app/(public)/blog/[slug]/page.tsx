import { getBlogPostBySlug } from '@/app/actions/public/blog'
import { BlogPostClient } from '@/components/sections/blog/post/BlogPostClient'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const postData = await getBlogPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  return <BlogPostClient post={postData} />
}
