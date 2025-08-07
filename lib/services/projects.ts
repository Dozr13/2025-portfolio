import { prisma } from '@/lib/config'
import type { Project } from '@/lib/types'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

interface ProjectsData {
  projects: Project[]
  pagination: {
    pages: number
    total: number
  }
}

export const getServerProjectsData = async (): Promise<ProjectsData | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Projects Service] Invalid or missing token')
      return null
    }

    console.log('[Projects Service] Fetching projects directly from database...')
    
    // Fetch projects directly from Prisma
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            projectViews: true
          }
        }
      }
    })

    const total = await prisma.project.count()
    const pages = Math.ceil(total / 10) // Assuming 10 per page

    const projectsData = {
      projects: projects.map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        status: project.status,
        featured: project.featured,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        _count: project._count
      })),
      pagination: {
        pages,
        total
      }
    }

    console.log('[Projects Service] Projects fetched successfully:', projects.length, 'projects')
    return projectsData
  } catch (error) {
    console.error('[Projects Service] Error fetching projects:', error)
    return null
  }
}

export const getServerProjectData = async (id: string): Promise<Project | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Projects Service] Invalid or missing token')
      return null
    }

    console.log('[Projects Service] Fetching project directly from database:', id)
    
    // Fetch project directly from Prisma
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            projectViews: true
          }
        }
      }
    })

    if (!project) {
      console.log('[Projects Service] Project not found:', id)
      return null
    }

    const projectData = {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      status: project.status,
      featured: project.featured,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      _count: project._count
    }

    console.log('[Projects Service] Project fetched successfully:', project.title)
    return projectData
  } catch (error) {
    console.error('[Projects Service] Error fetching project:', error)
    return null
  }
}
