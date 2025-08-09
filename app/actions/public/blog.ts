"use server"

import { prisma } from "@/lib/config"

export async function listPublicBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
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
    },
  })
  return posts
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { comments: { where: { approved: true }, orderBy: { createdAt: "desc" } } },
  })
  if (!post) throw new Error("Post not found")
  await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } })
  return post
}

export async function incrementBlogView(slug: string) {
  if (!slug) throw new Error("slug required")
  await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } })
  return { ok: true }
}


