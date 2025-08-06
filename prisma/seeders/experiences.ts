import { PrismaClient } from '../../generated/client'

const prisma = new PrismaClient()

// Experience Data
export const experiences = [
  {
    company: 'TechCorp Solutions',
    position: 'Senior Full-Stack Developer',
    description: 'Led development of enterprise web applications serving 100K+ users. Architected scalable microservices infrastructure and mentored junior developers.',
    startDate: new Date('2022-03-01'),
    endDate: null,
    current: true,
    location: 'Remote',
    companyUrl: 'https://techcorp.com',
    achievements: JSON.stringify([
      'Reduced application load times by 60% through optimization',
      'Led team of 5 developers on critical platform migration',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Architected microservices handling 1M+ daily requests'
    ]),
    technologies: 'React, Next.js, Node.js, PostgreSQL, AWS, Docker, TypeScript',
    featured: true,
    order: 1
  },
  {
    company: 'Digital Innovation Labs',
    position: 'Full-Stack Developer',
    description: 'Developed modern web applications for fintech and healthcare clients. Specialized in React, Node.js, and cloud infrastructure.',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2022-02-28'),
    current: false,
    location: 'San Francisco, CA',
    companyUrl: 'https://digilabs.com',
    achievements: JSON.stringify([
      'Built HIPAA-compliant patient management system',
      'Developed real-time trading platform processing $10M+ daily',
      'Implemented automated testing reducing bugs by 70%',
      'Mentored 3 junior developers and conducted code reviews'
    ]),
    technologies: 'React, Node.js, Express, MongoDB, AWS, GraphQL, TypeScript',
    featured: true,
    order: 2
  },
  {
    company: 'Freelance',
    position: 'Full-Stack Developer',
    description: 'Provided web development services to various clients including e-commerce, portfolio websites, and business applications.',
    startDate: new Date('2019-01-01'),
    endDate: new Date('2020-05-31'),
    current: false,
    location: 'Remote',
    achievements: JSON.stringify([
      'Delivered 25+ projects with 100% client satisfaction',
      'Specialized in e-commerce and business automation solutions',
      'Built long-term relationships with repeat clients',
      'Expanded skill set across multiple technologies and frameworks'
    ]),
    technologies: 'React, Vue.js, Node.js, PHP, MySQL, WordPress',
    featured: true,
    order: 3
  }
]

export async function seedExperiences() {
  console.log('Seeding experiences...')
  
  for (const experience of experiences) {
    await prisma.experience.upsert({
      where: { 
        company_position: {
          company: experience.company,
          position: experience.position
        }
      },
      update: experience,
      create: experience
    })
  }
  console.log('Experiences seeded successfully')
  
}