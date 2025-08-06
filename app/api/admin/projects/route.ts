import { Prisma } from '@/generated/client'
import { prisma } from "@/lib/config"
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
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    // Build where clause
    const where: Prisma.ProjectWhereInput = {}
    if (status) {
      where.status = status as Prisma.EnumProjectStatusFilter
    }
    if (category) {
      where.category = category as Prisma.EnumProjectCategoryFilter
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { client: { contains: search, mode: "insensitive" } }
      ]
    }

    // Get projects with pagination
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: offset,
        take: limit,
        include: {
          projectSkills: {
            include: {
              skill: true
            }
          },
          _count: {
            select: { projectViews: true }
          }
        }
      }),
      prisma.project.count({ where })
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
      description,
      longDescription,
      category,
      status,
      featured,
      demoUrl,
      githubUrl,
      images,
      thumbnail,
      startDate,
      endDate,
      client,
      teamSize,
      role,
      challenges,
      solutions,
      metrics,
      order
    } = data

    // Basic validation
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Title, description, and category are required" },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug }
    })

    if (existingProject) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 400 }
      )
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        longDescription: longDescription?.trim() || null,
        category,
        status: status || "COMPLETED",
        featured: featured || false,
        demoUrl: demoUrl?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        images: images ? JSON.stringify(images) : null,
        thumbnail: thumbnail?.trim() || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        client: client?.trim() || null,
        teamSize: teamSize || null,
        role: role?.trim() || null,
        challenges: challenges ? JSON.stringify(challenges) : null,
        solutions: solutions ? JSON.stringify(solutions) : null,
        metrics: metrics ? JSON.stringify(metrics) : null,
        order: order || null
      }
    })

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      project
    })

  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
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
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    // Process dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate)
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate)
    }

    // Stringify arrays/objects
    if (updateData.images) {
      updateData.images = JSON.stringify(updateData.images)
    }
    if (updateData.challenges) {
      updateData.challenges = JSON.stringify(updateData.challenges)
    }
    if (updateData.solutions) {
      updateData.solutions = JSON.stringify(updateData.solutions)
    }
    if (updateData.metrics) {
      updateData.metrics = JSON.stringify(updateData.metrics)
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project
    })

  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
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
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}