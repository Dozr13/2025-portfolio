import { prisma } from "@/lib/config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED"
      },
      orderBy: {
        publishedAt: "desc"
      },
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
        author: true
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}