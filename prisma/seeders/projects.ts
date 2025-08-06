import { PrismaClient, ProjectCategory, ProjectStatus } from '../../generated/client'

const prisma = new PrismaClient()

export const projects = [
  {
    title: "HustleForge",
    slug: "hustleforge",
    description: "AI productivity dashboard for managing and optimizing income from side hustles. Built using Flutter, TypeScript, GraphQL, and Firebase with ML-enhanced recommendations.",
    longDescription: "An innovative AI-powered productivity dashboard designed to help entrepreneurs and freelancers manage and optimize their side hustles. Features include income tracking, productivity analytics, ML-enhanced recommendations for maximizing earnings, goal setting and progress monitoring, and integrated workflow management. Built with modern technologies for cross-platform compatibility and real-time data synchronization.",
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/Dozr13/hustleforge",
    images: JSON.stringify([
      '/projects/hustleforge-1.jpg',
      '/projects/hustleforge-2.jpg',
      '/projects/hustleforge-3.jpg'
    ]),
    thumbnail: '/projects/hustleforge-thumb.jpg',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-15'),
    client: 'Independent Project',
    teamSize: 1,
    role: 'Solo Full-Stack Developer',
    challenges: JSON.stringify([
      'Cross-platform development with Flutter',
      'Real-time data synchronization across devices',
      'Machine learning integration for recommendations',
      'Complex financial tracking and analytics'
    ]),
    solutions: JSON.stringify([
      'Flutter for native mobile and web deployment',
      'Firebase real-time database for instant sync',
      'TypeScript backend with GraphQL API',
      'Custom ML algorithms for productivity insights'
    ]),
    metrics: JSON.stringify({
      'Platform Support': 'iOS, Android, Web',
      'Real-time Sync': 'Yes',
      'ML Accuracy': '92%',
      'Performance': 'Optimized'
    }),
    order: 1
  },
  {
    title: "ComComs",
    slug: "comcoms",
    description: "Real-time care service marketplace with Stripe payments and geo-listings. Led full-stack development using React Native, Expo, and secure mobile deployment practices.",
    longDescription: "A comprehensive care service marketplace connecting care providers with families in need. Features include real-time messaging, secure payment processing via Stripe, geolocation-based service listings, user verification and rating system, and advanced search and filtering capabilities. Built with focus on security, user experience, and scalable mobile architecture.",
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/Dozr13/comcoms",
    images: JSON.stringify([
      '/projects/comcoms-1.jpg',
      '/projects/comcoms-2.jpg',
      '/projects/comcoms-3.jpg'
    ]),
    thumbnail: '/projects/comcoms-thumb.jpg',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-02-28'),
    client: 'Independent Project',
    teamSize: 1,
    role: 'Lead Full-Stack Developer',
    challenges: JSON.stringify([
      'Real-time messaging infrastructure',
      'Secure payment processing integration',
      'Geolocation accuracy and performance',
      'User trust and verification systems'
    ]),
    solutions: JSON.stringify([
      'React Native with Expo for rapid development',
      'WebSocket implementation for real-time features',
      'Stripe integration with secure tokenization',
      'Comprehensive user verification workflow'
    ]),
    metrics: JSON.stringify({
      'Payment Processing': 'Stripe Secure',
      'Real-time Messaging': 'WebSocket',
      'Mobile Performance': '95+ score',
      'User Verification': 'Multi-step'
    }),
    order: 2
  },
  {
    title: "Request Hub SaaS Platform",
    slug: "request-hub-saas-platform",
    description: "Enterprise multi-tenant SaaS platform for VC portfolio companies with real-time request management, Linear integration, and admin dashboards. Built in 5 days as a technical assessment.",
    longDescription: "A sophisticated enterprise SaaS platform designed for VC portfolio companies to manage requests efficiently. Features include multi-tenant architecture, real-time request tracking, Linear API integration for seamless workflow management, comprehensive admin dashboards, and role-based access control. The platform was architected and built in just 5 days as a technical assessment, showcasing rapid development capabilities while maintaining enterprise-grade quality and security standards.",
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: "https://request-hub-gamma.vercel.app",
    githubUrl: "https://github.com/Dozr13/request-hub",
    images: JSON.stringify([
      '/projects/request-hub-1.jpg',
      '/projects/request-hub-2.jpg',
      '/projects/request-hub-3.jpg'
    ]),
    thumbnail: '/projects/request-hub-thumb.jpg',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-06'),
    client: 'Technical Assessment',
    teamSize: 1,
    role: 'Solo Full-Stack Developer',
    challenges: JSON.stringify([
      'Multi-tenant architecture with data isolation',
      'Real-time updates across different user roles',
      'Linear API integration and webhook handling',
      'Enterprise-grade security in rapid timeframe'
    ]),
    solutions: JSON.stringify([
      'Implemented row-level security with Prisma',
      'Used Pusher for real-time WebSocket connections',
      'Built robust Linear API wrapper with error handling',
      'Clerk authentication with organization management'
    ]),
    metrics: JSON.stringify({
      'Development Time': '5 days',
      'Architecture': 'Multi-tenant',
      'Real-time Features': 'Yes',
      'API Integrations': '3+'
    }),
    order: 3
  },
  {
    title: "Modern Portfolio Website",
    slug: "modern-portfolio-website",
    description: "This very portfolio! Built with Next.js 15, TypeScript, and Framer Motion. Features responsive design, dark mode, database integration, and optimized performance.",
    longDescription: "A modern, high-performance portfolio website showcasing advanced frontend development skills. Built with the latest Next.js 15 features, TypeScript for type safety, and Framer Motion for smooth animations. Features include fully responsive design, dark/light mode switching, Prisma database integration, optimized images and fonts, and comprehensive admin interface for content management.",
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: "https://wadepate.vercel.app",
    githubUrl: "https://github.com/Dozr13/2025-portfolio",
    images: JSON.stringify([
      '/projects/portfolio-1.jpg',
      '/projects/portfolio-2.jpg',
      '/projects/portfolio-3.jpg'
    ]),
    thumbnail: '/projects/portfolio-thumb.jpg',
    startDate: new Date('2024-12-15'),
    endDate: null,
    client: 'Personal Project',
    teamSize: 1,
    role: 'Solo Developer',
    challenges: JSON.stringify([
      'Perfect Lighthouse performance scores',
      'Advanced animation implementation',
      'Database-driven content management',
      'SEO optimization and metadata'
    ]),
    solutions: JSON.stringify([
      'Next.js 15 with optimized App Router',
      'Framer Motion with performance considerations',
      'Prisma with PostgreSQL for content',
      'Comprehensive admin interface built from scratch'
    ]),
    metrics: JSON.stringify({
      'Lighthouse Score': '100',
      'Load Time': '< 1s',
      'Responsive': 'Fully',
      'Admin Interface': 'Full CRUD'
    }),
    order: 4
  }
]

export async function seedProjects() {
  console.log("Seeding projects...")
  
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    })
  }

  console.log("Projects seeded successfully")
}