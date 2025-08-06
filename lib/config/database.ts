import { PrismaClient } from '@/generated/client'
import { envConfig, getDatabaseConfig } from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseConfig()
    }
  },
  log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (envConfig.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Health check function
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, environment: envConfig.NODE_ENV }
  } catch (error) {
    console.error('Database connection failed:', error)
    return { connected: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Database info for admin dashboard
export async function getDatabaseInfo() {
  try {
    const [
      skillsCount,
      projectsCount,
      experiencesCount,
      contactsCount,
      testimonialsCount
    ] = await Promise.all([
      prisma.skill.count(),
      prisma.project.count(),
      prisma.experience.count(),
      prisma.contact.count(),
      prisma.testimonial.count()
    ])

    return {
      skills: skillsCount,
      projects: projectsCount,
      experiences: experiencesCount,
      contacts: contactsCount,
      testimonials: testimonialsCount,
      environment: envConfig.NODE_ENV,
      database: getDatabaseConfig().includes('localhost') ? 'Local' : 'Neon DB'
    }
  } catch (error) {
    console.error('Failed to get database info:', error)
    throw error
  }
}