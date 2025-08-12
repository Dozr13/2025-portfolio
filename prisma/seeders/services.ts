// Use string literals for categories to avoid importing generated enums in seeds
import type { $Enums, Prisma } from '@/generated/client'
import { prisma } from '@/lib/prisma'

// Services Data
export const services: Array<
  Omit<Prisma.ServiceCreateInput, 'category'> & { category: $Enums.ServiceCategory }
> = [
  {
    name: 'Full-Stack Web Development',
    slug: 'full-stack-web-development',
    description:
      'Complete web application development from concept to deployment, including frontend, backend, and database design.',
    features: JSON.stringify([
      'Custom web application development',
      'Responsive design for all devices',
      'Database design and optimization',
      'API development and integration',
      'Deployment and hosting setup',
      'Performance optimization',
      'SEO optimization',
      'Ongoing maintenance and support'
    ]),
    pricing: 'Starting at $5,000',
    duration: '4-12 weeks',
    category: 'WEB_DEVELOPMENT' as $Enums.ServiceCategory,
    featured: true,
    available: true,
    order: 1
  },
  {
    name: 'E-Commerce Solutions',
    slug: 'ecommerce-solutions',
    description:
      'Custom e-commerce platforms with payment processing, inventory management, and analytics.',
    features: JSON.stringify([
      'Custom e-commerce platform development',
      'Payment gateway integration',
      'Inventory management system',
      'Order processing and fulfillment',
      'Customer management dashboard',
      'Analytics and reporting',
      'Mobile-responsive design',
      'SEO and marketing optimization'
    ]),
    pricing: 'Starting at $8,000',
    duration: '6-16 weeks',
    category: 'WEB_DEVELOPMENT' as $Enums.ServiceCategory,
    featured: true,
    available: true,
    order: 2
  },
  {
    name: 'API Development & Integration',
    slug: 'api-development-integration',
    description:
      'RESTful APIs, GraphQL endpoints, and third-party service integrations for scalable applications.',
    features: JSON.stringify([
      'RESTful API development',
      'GraphQL endpoint creation',
      'Third-party API integration',
      'Authentication and authorization',
      'Rate limiting and security',
      'API documentation',
      'Testing and monitoring',
      'Performance optimization'
    ]),
    pricing: 'Starting at $3,000',
    duration: '2-8 weeks',
    category: 'WEB_DEVELOPMENT' as $Enums.ServiceCategory,
    featured: true,
    available: true,
    order: 3
  },
  {
    name: 'Technical Consulting',
    slug: 'technical-consulting',
    description:
      'Architecture review, performance optimization, and technology strategy consulting.',
    features: JSON.stringify([
      'Technical architecture review',
      'Performance optimization audit',
      'Technology stack recommendations',
      'Code review and best practices',
      'Scalability planning',
      'Security assessment',
      'Team training and mentoring',
      'Strategic technology planning'
    ]),
    pricing: '$150/hour',
    duration: 'Project-based',
    category: 'CONSULTING' as $Enums.ServiceCategory,
    featured: false,
    available: true,
    order: 4
  }
]

export async function seedServices() {
  console.log('Seeding services...')

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }

  console.log('Services seeded successfully')
}
