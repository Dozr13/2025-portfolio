import { prisma } from "@/lib/config"
import { verifyAdminToken } from "@/lib/utils/auth"
import { handleCors } from "@/lib/utils/cors"
import { NextResponse } from "next/server"

export async function OPTIONS() {
  return handleCors()
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params 

    // Verify admin authentication
    const isAuthorized = await verifyAdminToken(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    const skill = await prisma.skill.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }

    return NextResponse.json({ skill })
  } catch (error) {
    console.error('Error fetching skill:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params

    // Verify admin authentication
    const isAuthorized = await verifyAdminToken(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      category,
      level,
      years,
      description,
      icon,
      featured,
      order
    } = body

    // Validate required fields
    if (!name || !category || !level) {
      return NextResponse.json(
        { error: 'Name, category, and level are required' },
        { status: 400 }
      )
    }
 
    // Check if skill exists
    const existingSkill = await prisma.skill.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }

    // Check if name is taken by another skill
    const nameConflict = await prisma.skill.findFirst({
      where: {
        name,
        id: { not: resolvedParams.id }
      }
    })

    if (nameConflict) {
      return NextResponse.json(
        { error: 'A skill with this name already exists' },
        { status: 400 }
      )
    }

    const skill = await prisma.skill.update({
      where: { id: resolvedParams.id },
      data: {
        name,
        category,
        level,
        years: years || null,
        description: description || null,
        icon: icon || null,
        featured: Boolean(featured),
        order: order || null
      }
    })

    return NextResponse.json({ skill })
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    
    // Verify admin authentication
    const isAuthorized = await verifyAdminToken(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    // Check if skill exists
    const existingSkill = await prisma.skill.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }

    await prisma.skill.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}