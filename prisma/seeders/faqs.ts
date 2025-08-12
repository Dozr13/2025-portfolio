import { prisma } from '@/lib/prisma'

// FAQ Data
export const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in modern web technologies including React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. I focus on building scalable, performant applications using the latest industry standards.',
    category: 'Technical',
    featured: true,
    order: 1
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on complexity and requirements. Simple websites typically take 2-4 weeks, while complex web applications can take 8-16 weeks. I provide detailed timelines during the project planning phase.',
    category: 'Process',
    featured: true,
    order: 2
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer:
      'Yes, I offer ongoing maintenance packages that include bug fixes, security updates, performance monitoring, and feature enhancements. Maintenance plans are customized based on your specific needs.',
    category: 'Support',
    featured: true,
    order: 3
  },
  {
    question: 'What is your development process?',
    answer:
      "I follow an agile development approach with regular check-ins and updates. The process includes discovery, planning, design, development, testing, deployment, and ongoing support. You'll have visibility into progress throughout the project.",
    category: 'Process',
    featured: true,
    order: 4
  },
  {
    question: 'Can you work with my existing team?',
    answer:
      'Absolutely! I have experience collaborating with in-house teams, other developers, designers, and project managers. I can adapt to your existing workflows and communication tools.',
    category: 'Collaboration',
    featured: false,
    order: 5
  },
  {
    question: 'Do you provide hosting and deployment services?',
    answer:
      'Yes, I can handle deployment to various platforms including Vercel, AWS, DigitalOcean, and others. I also provide guidance on hosting options and can set up CI/CD pipelines for automated deployments.',
    category: 'Technical',
    featured: false,
    order: 6
  }
]

export async function seedFAQs() {
  console.log('Seeding FAQs...')

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: {
        question: faq.question
      },
      update: faq,
      create: faq
    })
  }

  console.log('FAQs seeded successfully')
}
