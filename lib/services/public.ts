import { prisma } from "@/lib/config"

// Public service functions for server-side data fetching
// These don't require authentication and fetch data directly from the database

export const getPublicProjectsData = async () => {
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

    return { projects }
  } catch (error) {
    console.error('[Public Projects Service] Error fetching projects:', error)
    return { projects: [] }
  }
}

export const getPublicSkillsData = async () => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        featured: true // Only show featured skills on public site
      },
      orderBy: [
        { featured: 'desc' }, // Featured first
        { order: 'asc' }       // Then by order
      ]
    })

    return skills
  } catch (error) {
    console.error('[Public Skills Service] Error fetching skills:', error)
    return []
  }
}

export const getPublicBlogData = async () => {
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

    return { posts }
  } catch (error) {
    console.error('[Public Blog Service] Error fetching blog posts:', error)
    return { posts: [] }
  }
}
