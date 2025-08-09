import { prisma } from '../../lib/prisma'

/**
 * Clean up sample/fake data from production database
 * This will remove the seed projects that don't match your real portfolio
 */

async function main() {
  console.log('Starting cleanup of sample data...\n')
  
  try {
    // Delete sample projects (these look like seed data, not real projects)
    const sampleProjectSlugs = [
      'ecommerce-platform',
      'task-management-dashboard', 
      'ai-analytics-api'
    ]
    
    console.log('Removing sample projects...')
    for (const slug of sampleProjectSlugs) {
      const deleted = await prisma.project.deleteMany({
        where: { slug }
      })
      if (deleted.count > 0) {
        console.log(`Deleted project: ${slug}`)
      }
    }
    
    // Delete sample testimonials
    console.log('\nRemoving sample testimonials...')
    const sampleTestimonialEmails = [
      'sarah@techstartup.com',
      'michael@innovatecorp.com', 
      'emily@greentech.com'
    ]
    
    for (const email of sampleTestimonialEmails) {
      const deleted = await prisma.testimonial.deleteMany({
        where: { email }
      })
      if (deleted.count > 0) {
        console.log(`Deleted testimonial from: ${email}`)
      }
    }
    
    // Delete sample contacts
    console.log('\nRemoving sample contacts...')
    const sampleContactEmails = [
      'john.smith@example.com',
      'lisa@ecommercestore.com'
    ]
    
    for (const email of sampleContactEmails) {
      const deleted = await prisma.contact.deleteMany({
        where: { email }
      })
      if (deleted.count > 0) {
        console.log(`Deleted contact from: ${email}`)
      }
    }
    
    console.log('\nSample data cleanup completed!')
    console.log('Your database now only contains real data.')
    
  } catch (error) {
    console.error('Cleanup failed:', error)
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

export { main as cleanupSampleData }
