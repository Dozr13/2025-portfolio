import { prisma } from '@/lib/prisma'

// Experience Data
export const experiences = [
  {
    company: 'Resource Data',
    position: 'Senior Software Engineer',
    description:
      'Architected AWS cloud solutions, improved data accuracy by 40%, and built scalable Node.js pipelines for reconciling multi-gigabyte datasets across SQL/NoSQL platforms.',
    startDate: new Date('2023-08-01'),
    endDate: null,
    current: true,
    location: 'Boise, ID',
    companyUrl: 'https://resourcedata.com',
    achievements: JSON.stringify([
      'Architected AWS cloud solutions, improving data accuracy by 40% and increasing system resiliency',
      'Built scalable Node.js pipelines for reconciling multi-gigabyte datasets across SQL/NoSQL platforms',
      'Reduced latency in distributed services through system architecture redesign',
      'Refactored legacy JavaScript into clean, typed TypeScript monorepos, improving dev efficiency and consistency',
      'Mentored junior devs and conducted code reviews to enforce scalable design patterns',
      'Led internal migration to TypeScript, reducing bugs and onboarding time'
    ]),
    technologies: 'AWS, Node.js, TypeScript, PostgreSQL, MongoDB, Docker, CI/CD, GraphQL',
    featured: true,
    order: 1
  },
  {
    company: 'In Time Tec',
    position: 'Software Engineer',
    description:
      'Delivered global WPF desktop app, cutting sales review time by 80% and modernizing legacy workflows. Boosted enterprise performance by 30% via framework upgrades.',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2023-04-30'),
    current: false,
    location: 'Meridian, ID',
    companyUrl: 'https://intimetec.com',
    achievements: JSON.stringify([
      'Delivered global WPF desktop app, cutting sales review time by 80% and modernizing legacy workflows',
      'Boosted enterprise performance by 30% via framework upgrades and technical debt reduction',
      'Elevated UX by 75% through responsive design and WCAG-compliant interfaces',
      'Led cross-team initiatives to improve development processes and code quality',
      'Implemented modern development practices including automated testing and CI/CD'
    ]),
    technologies:
      'TypeScript, React, Node.js, PostgreSQL, MongoDB, Docker, CI/CD, GraphQL, C#, WPF, .NET, SQL Server',
    featured: true,
    order: 2
  },
  {
    company: 'Freelance',
    position: 'Full-Stack Developer',
    description:
      'Provided web development services to various clients including e-commerce, portfolio websites, and business applications.	',
    startDate: new Date('2020-05-01'),
    endDate: null,
    current: false,
    location: 'Remote',
    companyUrl: 'https://intimetec.com',
    achievements: JSON.stringify([
      'Delivered 25+ projects with 100% client satisfaction',
      'Specialized in e-commerce and business automation solutions',
      'Built long-term relationships with repeat clients',
      'Expanded skill set across multiple technologies and frameworks'
    ]),
    technologies:
      'React, Vue.js, Node.js, PHP, MySQL, PostgreSQL, Flutter, Dart, Python, Go, MongoDB, Docker, CI/CD, GraphQL',
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
