import { prisma } from "@/lib/config"
import { calculateDuration, safeJsonParse } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'COMPLETED', // Only show completed projects on public site
        featured: true // Only show featured projects
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { endDate: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        longDescription: true,
        category: true,
        status: true,
        featured: true,
        demoUrl: true,
        githubUrl: true,
        images: true,
        thumbnail: true,
        startDate: true,
        endDate: true,
        client: true,
        teamSize: true,
        role: true,
        challenges: true,
        solutions: true,
        metrics: true,
        order: true,
        createdAt: true,
        updatedAt: true,
        projectSkills: {
          select: {
            skill: {
              select: {
                name: true,
                icon: true
              }
            },
            importance: true
          },
          orderBy: {
            importance: 'asc' // PRIMARY first, then SECONDARY
          }
        }
      }
    })

    // Transform the data to match expected format
    const transformedProjects = projects.map(project => ({
      ...project,
      // Parse JSON fields using utility functions
      images: safeJsonParse<string[]>(project.images, []),
      challenges: safeJsonParse<string[]>(project.challenges, []),
      solutions: safeJsonParse<string[]>(project.solutions, []),
      metrics: safeJsonParse<Record<string, string>>(project.metrics, {}),
      // Extract technologies from projectSkills
      technologies: project.projectSkills.map(ps => ps.skill.name),
      // Format dates
      startDate: project.startDate?.toISOString(),
      endDate: project.endDate?.toISOString(),
      // Format team size as string
      teamSize: project.teamSize ? `${project.teamSize} ${project.teamSize === 1 ? 'person' : 'people'}` : 'Solo Project',
      // Calculate duration
      duration: project.startDate && project.endDate 
        ? calculateDuration(project.startDate, project.endDate)
        : 'Ongoing'
    }))

    return NextResponse.json({ projects: transformedProjects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}