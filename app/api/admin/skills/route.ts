import { PrismaClient } from '@/generated/client'
import { NextResponse } from 'next/server'
import { verifyAdminToken } from '../auth/route'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const isAuthorized = await verifyAdminToken(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const skills = await prisma.skill.findMany({
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
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

    // Check if skill name already exists
    const existingSkill = await prisma.skill.findUnique({
      where: { name }
    })

    if (existingSkill) {
      return NextResponse.json(
        { error: 'A skill with this name already exists' },
        { status: 400 }
      )
    }

    const skill = await prisma.skill.create({
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

    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}