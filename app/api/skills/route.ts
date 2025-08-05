import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Prisma } from '../../../generated/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    
    const where: Prisma.SkillWhereInput = {}
    
    if (featured === "true") {
      where.featured = true
    }
    
    if (category) {
      where.category = category as Prisma.EnumSkillCategoryFilter<"Skill">
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured first
        { order: 'asc' }       // Then by order
      ]
    })

    return NextResponse.json({ skills })
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}