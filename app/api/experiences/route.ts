import { prisma } from "@/lib/config"
import { formatPeriod, parseTechnologies, safeJsonParse } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { startDate: 'desc' } // Most recent first
      ],
      select: {
        id: true,
        position: true,
        company: true,
        location: true,
        startDate: true,
        endDate: true,
        current: true,
        description: true,
        technologies: true,
        achievements: true,
        order: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Transform the data to match expected format
    const transformedExperiences = experiences.map(experience => ({
      ...experience,
      // Map position to title for consistency
      title: experience.position,
      // Parse JSON fields using utility functions
      technologies: parseTechnologies(experience.technologies),
      achievements: safeJsonParse<string[]>(experience.achievements, []),
      // Format period
      period: formatPeriod(experience.startDate, experience.endDate, experience.current),
      // Format dates
      startDate: experience.startDate.toISOString(),
      endDate: experience.endDate?.toISOString() || null
    }))

    return NextResponse.json({ experiences: transformedExperiences })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}