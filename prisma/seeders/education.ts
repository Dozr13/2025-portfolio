import { PrismaClient } from '../../generated/client'

const prisma = new PrismaClient()

// Education Data - Aligned with Wade's Resume
export const education = [
  {
    institution: 'DevMountain',
    degree: 'Certificate',
    field: 'Web Developers Program',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-04-30'),
    current: false,
    gpa: null,
    description: 'Intensive coding bootcamp focused on full-stack web development, covering modern technologies like React, Node.js, and database management.',
    achievements: JSON.stringify([
      'Completed intensive 16-week full-stack web development program',
      'Built multiple full-stack applications using React, Node.js, and PostgreSQL',
      'Learned modern development practices including Git, testing, and deployment',
      'Collaborated on team projects using Agile methodologies'
    ]),
    featured: true,
    order: 1
  }
]

export async function seedEducation() {
  console.log("Seeding education...")
  
  for (const edu of education) {
    await prisma.education.upsert({
      where: { 
        institution_degree_field: {
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field
        }
      },
      update: edu,
      create: edu
    })
  }

  console.log("Education seeded successfully")
}