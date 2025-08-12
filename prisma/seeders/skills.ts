import type { $Enums, Prisma } from '@/generated/client'
import { prisma } from '@/lib/prisma'

export const skills: Array<
  Omit<Prisma.SkillCreateInput, 'category' | 'level'> & {
    category: $Enums.SkillCategory
    level: $Enums.SkillLevel
  }
> = [
  // Frontend
  {
    name: 'React',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 5,
    icon: 'atom',
    featured: true,
    order: 1
  },
  {
    name: 'TypeScript',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 4,
    icon: 'code',
    featured: true,
    order: 2
  },
  {
    name: 'Next.js',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 3,
    icon: 'triangle',
    featured: true,
    order: 3
  },
  {
    name: 'React Native',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 4,
    icon: 'smartphone',
    featured: true,
    order: 4
  },
  {
    name: 'JavaScript',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 5,
    icon: 'code-2',
    featured: true,
    order: 5
  },
  {
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'EXPERT',
    years: 3,
    icon: 'palette',
    featured: true,
    order: 6
  },
  {
    name: 'ShadCN UI',
    category: 'FRONTEND',
    level: 'ADVANCED',
    years: 2,
    icon: 'layout-dashboard',
    featured: true,
    order: 7
  },
  {
    name: 'Material UI',
    category: 'FRONTEND',
    level: 'ADVANCED',
    years: 3,
    icon: 'layers',
    featured: false,
    order: 8
  },

  // Backend
  {
    name: 'Node.js',
    category: 'BACKEND',
    level: 'EXPERT',
    years: 5,
    icon: 'server',
    featured: true,
    order: 9
  },
  {
    name: 'Express',
    category: 'BACKEND',
    level: 'EXPERT',
    years: 4,
    icon: 'server',
    featured: true,
    order: 10
  },
  {
    name: 'GraphQL',
    category: 'BACKEND',
    level: 'EXPERT',
    years: 4,
    icon: 'share-2',
    featured: true,
    order: 11
  },
  {
    name: 'REST APIs',
    category: 'BACKEND',
    level: 'EXPERT',
    years: 5,
    icon: 'api',
    featured: true,
    order: 12
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'DATABASE',
    level: 'EXPERT',
    years: 4,
    icon: 'database',
    featured: true,
    order: 13
  },
  {
    name: 'MongoDB',
    category: 'DATABASE',
    level: 'EXPERT',
    years: 4,
    icon: 'database',
    featured: true,
    order: 14
  },
  {
    name: 'Prisma',
    category: 'DATABASE',
    level: 'ADVANCED',
    years: 2,
    icon: 'layers-3',
    featured: false,
    order: 15
  },

  // Cloud & DevOps
  {
    name: 'AWS',
    category: 'DEVOPS',
    level: 'EXPERT',
    years: 4,
    icon: 'cloud',
    featured: true,
    order: 16
  },
  {
    name: 'Docker',
    category: 'DEVOPS',
    level: 'EXPERT',
    years: 4,
    icon: 'container',
    featured: true,
    order: 17
  },
  {
    name: 'CI/CD',
    category: 'DEVOPS',
    level: 'EXPERT',
    years: 4,
    icon: 'workflow',
    featured: true,
    order: 18
  },
  {
    name: 'Serverless',
    category: 'DEVOPS',
    level: 'ADVANCED',
    years: 3,
    icon: 'cloud',
    featured: false,
    order: 19
  },

  // Tools & Workflow
  {
    name: 'Git',
    category: 'TOOLS',
    level: 'EXPERT',
    years: 5,
    icon: 'git-branch',
    featured: true,
    order: 20
  },
  {
    name: 'GitHub',
    category: 'TOOLS',
    level: 'EXPERT',
    years: 5,
    icon: 'git-branch',
    featured: false,
    order: 21
  },
  {
    name: 'Jira',
    category: 'TOOLS',
    level: 'ADVANCED',
    years: 4,
    icon: 'calendar',
    featured: false,
    order: 22
  },

  // Additional Technologies
  {
    name: 'Flutter',
    category: 'FRONTEND',
    level: 'ADVANCED',
    years: 2,
    icon: 'smartphone',
    featured: false,
    order: 23
  },
  {
    name: 'Firebase',
    category: 'DATABASE',
    level: 'ADVANCED',
    years: 2,
    icon: 'database',
    featured: false,
    order: 24
  },
  {
    name: 'Expo',
    category: 'TOOLS',
    level: 'ADVANCED',
    years: 3,
    icon: 'smartphone',
    featured: false,
    order: 25
  },

  // Leadership & Soft Skills
  {
    name: 'Team Leadership',
    category: 'SOFT_SKILLS',
    level: 'EXPERT',
    years: 3,
    icon: 'users',
    featured: true,
    order: 26
  },
  {
    name: 'Mentoring',
    category: 'SOFT_SKILLS',
    level: 'EXPERT',
    years: 3,
    icon: 'users',
    featured: false,
    order: 27
  },
  {
    name: 'Agile/Scrum',
    category: 'SOFT_SKILLS',
    level: 'EXPERT',
    years: 4,
    icon: 'calendar',
    featured: false,
    order: 28
  },
  {
    name: 'Code Reviews',
    category: 'SOFT_SKILLS',
    level: 'EXPERT',
    years: 4,
    icon: 'code',
    featured: false,
    order: 29
  }
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

  console.log('Skills seeded successfully')
}
