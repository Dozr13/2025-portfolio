import { PrismaClient, Project, ProjectSkillImportance, Skill } from '../generated/client'
import '../lib/config'; // Load environment configuration
import { envConfig } from '../lib/config'
import { seedBlog } from '../scripts/database/seed-blog'
import { seedCertifications } from './seeders/certifications'
import { seedContacts } from './seeders/contacts'
import { seedEducation } from './seeders/education'
import { seedExperiences } from './seeders/experiences'
import { seedFAQs } from './seeders/faqs'
import { seedProjects } from './seeders/projects'
import { seedServices } from './seeders/services'
import { seedSkills } from './seeders/skills'
import { seedTestimonials } from './seeders/testimonials'

const prisma = new PrismaClient()

// Project-Skills relationship seeding
async function seedProjectSkills() {
  console.log("Seeding project skills...")
  
  // Get all projects and skills
  const allProjects = await prisma.project.findMany()
  const allSkills = await prisma.skill.findMany()
  
  // Project-skill mappings based on  projects
  const projectSkillMappings = [
    {
      projectSlug: 'hustleforge',
      skills: [
        { name: 'Flutter', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'GraphQL', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Firebase', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Node.js', importance: ProjectSkillImportance.SECONDARY }
      ]
    },
    {
      projectSlug: 'comcoms',
      skills: [
        { name: 'React Native', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Expo', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Node.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.SECONDARY }
      ]
    },
    {
      projectSlug: 'request-hub-saas-platform',
      skills: [
        { name: 'Next.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'React', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Prisma', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Tailwind CSS', importance: ProjectSkillImportance.SECONDARY }
      ]
    },
    {
      projectSlug: 'modern-portfolio-website',
      skills: [
        { name: 'Next.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'React', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Tailwind CSS', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Prisma', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.PRIMARY }
      ]
    }
  ]
  
  for (const mapping of projectSkillMappings) {
    const project = allProjects.find((p: Project) => p.slug === mapping.projectSlug)
    if (!project) continue
    
    for (const skillMapping of mapping.skills) {
      const skill = allSkills.find((s: Skill) => s.name === skillMapping.name)
      if (!skill) continue
      
      await prisma.projectSkill.upsert({
        where: {
          projectId_skillId: {
            projectId: project.id,
            skillId: skill.id
          }
        },
        update: {
          importance: skillMapping.importance
        },
        create: {
          projectId: project.id,
          skillId: skill.id,
          importance: skillMapping.importance
        }
      })
    }
  }
  
  console.log("Project skills seeded successfully")
}

// Main seeding function
async function main() {
  try {
    console.log('Starting database seeding...')
    
    // Core portfolio data (always seed these)
    await seedSkills()
    await seedExperiences()
    await seedEducation()
    await seedCertifications()
    await seedProjects()
    await seedServices()
    await seedFAQs()
    
    // Link projects with skills (many-to-many)
    await seedProjectSkills()
    
    // Sample data for testing (only in development)
    if (envConfig.ENABLE_SAMPLE_DATA) {
      console.log('Seeding sample data (development environment)...')
    await seedTestimonials()
    await seedContacts()
    await seedBlog()
    } else {
      console.log('Production environment - skipping sample data')
    }
    
    console.log('Database seeding completed successfully!')
    
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Export the main function for use in other scripts
export { main as seedDatabase }

// Allow running this script directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}