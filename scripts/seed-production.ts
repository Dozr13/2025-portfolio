import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

/**
 * Production-safe seeding script
 * 
 * This script only seeds essential structural data and skips:
 * - Sample testimonials
 * - Sample contacts
 * - Sample blog posts
 * 
 * All operations use upsert to safely update existing data
 */

async function main() {
  console.log('Starting production-safe database seeding...\n')
  
  try {
    // Import the main seed function but with production flag
    process.env.NODE_ENV = 'production'
    
    // Import and run the main seeding logic
    const { seedDatabase } = await import('../prisma/seed')
    await seedDatabase()
    
    console.log('\nProduction seeding completed successfully!')
    console.log('Your personal portfolio data has been safely updated.')
    
  } catch (error) {
    console.error('Production seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Allow running this script directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main as seedProductionDatabase }
