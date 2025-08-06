import { Prisma } from '@/generated/client'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyAdminToken } from "../auth/route"

export async function GET(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    // Build where clause  
    const where: Prisma.BlogPostWhereInput = {}
    if (status) {
      where.status = status as Prisma.EnumPostStatusFilter
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { tags: { contains: search, mode: "insensitive" } }
      ]
    }

    // Get blog posts with pagination
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: offset,
        take: limit,
        include: {
          _count: {
            select: { comments: true }
          }
        }
      }),
      prisma.blogPost.count({ where })
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      status,
      featured,
      metaTitle,
      metaDescription,
      readingTime
    } = data

    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      )
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        category: category?.trim() || null,
        tags: tags?.trim() || null,
        status: status || "DRAFT",
        featured: featured || false,
        metaTitle: metaTitle?.trim() || title.trim(),
        metaDescription: metaDescription?.trim() || excerpt?.trim() || null,
        readingTime: readingTime || null,
        ...(status === "PUBLISHED" && { publishedAt: new Date() })
      }
    })

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      post
    })

  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      )
    }

    // Update blog post
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.status === "PUBLISHED" && !updateData.publishedAt && { publishedAt: new Date() })
      }
    })

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      post
    })

  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      )
    }

    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}