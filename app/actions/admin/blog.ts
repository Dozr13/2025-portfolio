"use server"

import type { Prisma } from "@/generated/client"
import { prisma } from "@/lib/config/database"
import type { PostStatus } from "@/lib/domain/enums"
import { z } from "zod"
import { ensureAdmin } from "./auth"

export async function listAdminBlogPosts(params: { page?: number; limit?: number; status?: string | null; search?: string | null }) {
  await ensureAdmin()
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const offset = (page - 1) * limit

  const where: Prisma.BlogPostWhereInput = {}
  if (params.status) where.status = params.status as Prisma.EnumPostStatusFilter
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { content: { contains: params.search, mode: "insensitive" } },
      { category: { contains: params.search, mode: "insensitive" } },
      { tags: { contains: params.search, mode: "insensitive" } },
    ]
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ where, orderBy: { updatedAt: "desc" }, skip: offset, take: limit, include: { _count: { select: { comments: true } } } }),
    prisma.blogPost.count({ where }),
  ])

  return { posts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }
}

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category: z.string().optional(),
  tags: z.string().optional(),
  status: z.string().optional(),
  featured: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  readingTime: z.number().optional(),
})

export async function createAdminBlogPost(data: unknown) {
  await ensureAdmin()
  const parsed = createPostSchema.parse(data)

  const existing = await prisma.blogPost.findUnique({ where: { slug: parsed.slug } })
  if (existing) throw new Error("A post with this slug already exists")

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.title.trim(),
      slug: parsed.slug.trim(),
      excerpt: parsed.excerpt?.trim() || null,
      content: parsed.content.trim(),
      category: parsed.category?.trim() || null,
      tags: parsed.tags?.trim() || null,
      status: (parsed.status as PostStatus) || ("DRAFT" as PostStatus),
      featured: parsed.featured || false,
      metaTitle: parsed.metaTitle?.trim() || parsed.title.trim(),
      metaDescription: parsed.metaDescription?.trim() || parsed.excerpt?.trim() || null,
      readingTime: parsed.readingTime || null,
      ...(parsed.status === "PUBLISHED" && { publishedAt: new Date() }),
    },
  })

  return { success: true as const, message: "Blog post created successfully", post }
}

const updatePostSchema = createPostSchema.partial().extend({ id: z.string().min(1) })

export async function updateAdminBlogPost(input: unknown) {
  await ensureAdmin()
  const { id, ...updateData } = updatePostSchema.parse(input)

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(updateData.title && { title: updateData.title.trim() }),
      ...(updateData.slug && { slug: updateData.slug.trim() }),
      ...(updateData.excerpt !== undefined && { excerpt: updateData.excerpt?.trim() || null }),
      ...(updateData.content && { content: updateData.content.trim() }),
      ...(updateData.category !== undefined && { category: updateData.category?.trim() || null }),
      ...(updateData.tags !== undefined && { tags: updateData.tags?.trim() || null }),
      ...(updateData.status && { status: updateData.status as PostStatus }),
      ...(updateData.featured !== undefined && { featured: updateData.featured }),
      ...(updateData.metaTitle !== undefined && { metaTitle: updateData.metaTitle?.trim() || null }),
      ...(updateData.metaDescription !== undefined && { metaDescription: updateData.metaDescription?.trim() || null }),
      ...(updateData.readingTime !== undefined && { readingTime: updateData.readingTime }),
      ...(updateData.status === "PUBLISHED" && { publishedAt: new Date() }),
    },
  })
  return { success: true as const, message: "Blog post updated successfully", post }
}

export async function getAdminBlogPost(id: string) {
  await ensureAdmin()
  const post = await prisma.blogPost.findUnique({ where: { id }, include: { _count: { select: { comments: true } } } })
  if (!post) throw new Error("Blog post not found")
  return { success: true as const, post }
}

export async function deleteAdminBlogPost(id: string) {
  await ensureAdmin()
  await prisma.blogPost.delete({ where: { id } })
  return { success: true as const, message: "Blog post deleted successfully" }
}


