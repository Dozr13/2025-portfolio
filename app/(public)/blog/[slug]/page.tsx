import { getBlogPostBySlug } from "@/app/actions/public/blog"
import { BlogPostClient } from "@/components/sections/blog/BlogPostClient"
import { notFound } from "next/navigation"

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const postData = await getBlogPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  // NOTE: Views are incremented via action incrementBlogView when needed

  return <BlogPostClient post={postData} />
}
