import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyAdminToken } from "../../auth/route"

// GET - Fetch single blog post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      post
    })

  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}

// PUT - Update blog post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Calculate reading time from content
    const readingTime = Math.ceil(data.content.split(/\s+/).length / 200)

    const updatedPost = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags,
        status: data.status,
        featured: data.featured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        readingTime,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      post: updatedPost
    })

  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog post  
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.blogPost.delete({
      where: { id: params.id }
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