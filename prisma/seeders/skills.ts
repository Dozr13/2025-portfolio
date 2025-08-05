import { PrismaClient, SkillCategory, SkillLevel } from '../../generated/client'

const prisma = new PrismaClient()

// Skills Data
export const skills = [
  // Frontend
  { name: 'React', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 6, icon: 'atom', featured: true, order: 1 },
  { name: 'Next.js', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 4, icon: 'triangle', featured: true, order: 2 },
  { name: 'TypeScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 5, icon: 'code', featured: true, order: 3 },
  { name: 'JavaScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 8, icon: 'code-2', featured: true, order: 4 },
  { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, years: 3, icon: 'palette', featured: true, order: 5 },
  { name: 'React Native', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, years: 3, icon: 'smartphone', featured: false, order: 6 },
  { name: 'Vue.js', category: SkillCategory.FRONTEND, level: SkillLevel.INTERMEDIATE, years: 2, icon: 'layers', featured: false, order: 7 },
  { name: 'Svelte', category: SkillCategory.FRONTEND, level: SkillLevel.INTERMEDIATE, years: 1, icon: 'zap', featured: false, order: 8 },
  
  // Backend
  { name: 'Node.js', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 6, icon: 'server', featured: true, order: 9 },
  { name: 'Python', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, years: 4, icon: 'code', featured: true, order: 10 },
  { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: SkillLevel.EXPERT, years: 5, icon: 'database', featured: true, order: 11 },
  { name: 'Prisma', category: SkillCategory.DATABASE, level: SkillLevel.EXPERT, years: 3, icon: 'layers-3', featured: true, order: 12 },
  { name: 'GraphQL', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, years: 3, icon: 'share-2', featured: false, order: 13 },
  { name: 'REST APIs', category: SkillCategory.BACKEND, level: SkillLevel.EXPERT, years: 6, icon: 'api', featured: true, order: 14 },
  { name: 'MongoDB', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, years: 4, icon: 'database', featured: false, order: 15 },
  { name: 'Redis', category: SkillCategory.DATABASE, level: SkillLevel.INTERMEDIATE, years: 2, icon: 'zap', featured: false, order: 16 },
  
  // DevOps & Tools
  { name: 'Docker', category: SkillCategory.DEVOPS, level: SkillLevel.ADVANCED, years: 4, icon: 'container', featured: true, order: 17 },
  { name: 'AWS', category: SkillCategory.DEVOPS, level: SkillLevel.ADVANCED, years: 4, icon: 'cloud', featured: true, order: 18 },
  { name: 'Vercel', category: SkillCategory.DEVOPS, level: SkillLevel.EXPERT, years: 3, icon: 'triangle', featured: true, order: 19 },
  { name: 'Git', category: SkillCategory.TOOLS, level: SkillLevel.EXPERT, years: 8, icon: 'git-branch', featured: true, order: 20 },
  { name: 'CI/CD', category: SkillCategory.DEVOPS, level: SkillLevel.ADVANCED, years: 3, icon: 'workflow', featured: false, order: 21 },
  { name: 'Kubernetes', category: SkillCategory.DEVOPS, level: SkillLevel.INTERMEDIATE, years: 2, icon: 'layers', featured: false, order: 22 },
  
  // Design & Soft Skills
  { name: 'Figma', category: SkillCategory.DESIGN, level: SkillLevel.ADVANCED, years: 3, icon: 'figma', featured: false, order: 23 },
  { name: 'UI/UX Design', category: SkillCategory.DESIGN, level: SkillLevel.ADVANCED, years: 4, icon: 'paintbrush', featured: true, order: 24 },
  { name: 'Project Management', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.ADVANCED, years: 5, icon: 'calendar', featured: false, order: 25 },
  { name: 'Team Leadership', category: SkillCategory.SOFT_SKILLS, level: SkillLevel.ADVANCED, years: 4, icon: 'users', featured: false, order: 26 }
]

export async function seedSkills() {
  console.log('Seeding skills...')
  
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill
    })
  }
  
  console.log('✓ Skills seeded successfully!')
}