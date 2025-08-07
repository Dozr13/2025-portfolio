import { PrismaClient, SkillCategory, SkillLevel } from '../../generated/client'

const prisma = new PrismaClient()

// Skills Data - Aligned with Wade's Resume
export const skills = [
  // Frontend - Core technologies from resume
  { name: 'React', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 5, icon: 'atom', featured: true, order: 1 },
  { name: 'TypeScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 4, icon: 'code', featured: true, order: 2 },
  { name: 'Next.js', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 3, icon: 'triangle', featured: true, order: 3 },
  { name: 'React Native', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 4, icon: 'smartphone', featured: true, order: 4 },
  { name: 'JavaScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 5, icon: 'code-2', featured: true, order: 5 },
  { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 3, icon: 'palette', featured: true, order: 6 },
  { name: 'ShadCN UI', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, years: 2, icon: 'layout-dashboard', featured: true, order: 7 },
  { name: 'Material UI', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, years: 3, icon: 'layers', featured: false, order: 8 },
  
  // Backend - From resume experience
  { name: 'Node.js', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 5, icon: 'server', featured: true, order: 9 },
  { name: 'Express', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 4, icon: 'server', featured: true, order: 10 },
  { name: 'GraphQL', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 4, icon: 'share-2', featured: true, order: 11 },
  { name: 'REST APIs', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 5, icon: 'api', featured: true, order: 12 },
  
  // Databases - From resume
  { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: SkillLevel.EXPERT, years: 4, icon: 'database', featured: true, order: 13 },
  { name: 'MongoDB', category: SkillCategory.DATABASE, level: SkillLevel.EXPERT, years: 4, icon: 'database', featured: true, order: 14 },
  { name: 'Prisma', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, years: 2, icon: 'layers-3', featured: false, order: 15 },
  
  // Cloud & DevOps - AWS Certified
  { name: 'AWS', category: SkillCategory.DEVOPS, level: SkillLevel.EXPERT, years: 4, icon: 'cloud', featured: true, order: 16 },
  { name: 'Docker', category: SkillCategory.DEVOPS, level: SkillLevel.EXPERT, years: 4, icon: 'container', featured: true, order: 17 },
  { name: 'CI/CD', category: SkillCategory.DEVOPS, level: SkillLevel.EXPERT, years: 4, icon: 'workflow', featured: true, order: 18 },
  { name: 'Serverless', category: SkillCategory.DEVOPS, level: SkillLevel.ADVANCED, years: 3, icon: 'cloud', featured: false, order: 19 },
  
  // Tools & Workflow - From resume
  { name: 'Git', category: SkillCategory.TOOLS, level: SkillLevel.EXPERT, years: 5, icon: 'git-branch', featured: true, order: 20 },
  { name: 'GitHub', category: SkillCategory.TOOLS, level: SkillLevel.EXPERT, years: 5, icon: 'git-branch', featured: false, order: 21 },
  { name: 'Jira', category: SkillCategory.TOOLS, level: SkillLevel.ADVANCED, years: 4, icon: 'calendar', featured: false, order: 22 },
  
  // Additional Technologies - From projects
  { name: 'Flutter', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, years: 2, icon: 'smartphone', featured: false, order: 23 },
  { name: 'Firebase', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, years: 2, icon: 'database', featured: false, order: 24 },
  { name: 'Expo', category: SkillCategory.TOOLS, level: SkillLevel.ADVANCED, years: 3, icon: 'smartphone', featured: false, order: 25 },
  
  // Leadership & Soft Skills
  { name: 'Team Leadership', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.EXPERT, years: 3, icon: 'users', featured: true, order: 26 },
  { name: 'Mentoring', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.EXPERT, years: 3, icon: 'users', featured: false, order: 27 },
  { name: 'Agile/Scrum', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.EXPERT, years: 4, icon: 'calendar', featured: false, order: 28 },
  { name: 'Code Reviews', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.EXPERT, years: 4, icon: 'code', featured: false, order: 29 }
]

export async function seedSkills() {
  console.log("Seeding skills...")
  
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill
    })
  }

  console.log("Skills seeded successfully")
}