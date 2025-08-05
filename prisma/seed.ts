import { ContactStatus, Priority, PrismaClient, ProjectCategory, ProjectSkillImportance, ProjectStatus, ServiceCategory, SkillCategory, SkillLevel } from '../generated/client'
import { seedBlog } from '../scripts/seed-blog'

const prisma = new PrismaClient()

// Skills Data
const skills = [
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

// Experience Data
const experiences = [
  {
    company: 'TechCorp Solutions',
    position: 'Senior Full-Stack Developer',
    description: 'Led development of enterprise web applications serving 100K+ users. Architected scalable microservices infrastructure and mentored junior developers.',
    startDate: new Date('2022-03-01'),
    endDate: null,
    current: true,
    location: 'Remote',
    companyUrl: 'https://techcorp.example.com',
    achievements: JSON.stringify([
      'Reduced application load time by 60% through optimization',
      'Led migration from monolith to microservices architecture',
      'Mentored 6 junior developers and established code review practices',
      'Implemented automated testing pipeline reducing bugs by 75%'
    ]),
    technologies: 'React, Next.js, Node.js, PostgreSQL, Docker, AWS',
    featured: true,
    order: 1
  },
  {
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    description: 'Built responsive web applications for a fast-growing fintech startup. Collaborated with design team to create intuitive user experiences.',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2022-02-28'),
    current: false,
    location: 'San Francisco, CA',
    companyUrl: 'https://startupxyz.example.com',
    achievements: JSON.stringify([
      'Developed customer-facing dashboard handling $2M+ in transactions',
      'Improved mobile responsiveness across all platforms',
      'Integrated third-party APIs for payment processing',
      'Reduced customer support tickets by 40% through UX improvements'
    ]),
    technologies: 'React, TypeScript, Tailwind CSS, Node.js, MongoDB',
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

// Projects Data
const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-featured e-commerce platform with inventory management, payment processing, and analytics dashboard.',
    longDescription: 'A comprehensive e-commerce solution built for a growing retail business. Features include real-time inventory tracking, secure payment processing via Stripe, order management system, customer analytics, and mobile-responsive design. The platform handles 1000+ daily transactions and serves customers across multiple regions.',
    category: ProjectCategory.ECOMMERCE,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/wadejp8/ecommerce-platform',
    images: JSON.stringify([
      '/projects/ecommerce-1.jpg',
      '/projects/ecommerce-2.jpg',
      '/projects/ecommerce-3.jpg'
    ]),
    thumbnail: '/projects/ecommerce-thumb.jpg',
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-06-30'),
    client: 'RetailCorp Inc.',
    teamSize: 3,
    role: 'Lead Developer',
    challenges: JSON.stringify([
      'Handling high-volume transactions during peak sales',
      'Integrating multiple payment gateways',
      'Real-time inventory synchronization across channels',
      'Mobile performance optimization'
    ]),
    solutions: JSON.stringify([
      'Implemented Redis caching for improved performance',
      'Built robust API with rate limiting and error handling',
      'Created real-time WebSocket connections for inventory updates',
      'Optimized images and implemented progressive loading'
    ]),
    metrics: JSON.stringify({
      'Daily Transactions': '1000+',
      'Load Time': '< 2s',
      'Uptime': '99.9%',
      'Mobile Performance': '95/100'
    }),
    order: 1
  },
  {
    title: 'Task Management Dashboard',
    slug: 'task-management-dashboard',
    description: 'Real-time collaborative task management application with team analytics and project tracking.',
    longDescription: 'A sophisticated project management tool designed for agile teams. Features drag-and-drop task boards, real-time collaboration, time tracking, team performance analytics, and integration with popular development tools. Used by 500+ team members across multiple organizations.',
    category: ProjectCategory.DASHBOARD,
    status: ProjectStatus.MAINTAINED,
    featured: true,
    demoUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/wadejp8/task-manager',
    images: JSON.stringify([
      '/projects/taskmanager-1.jpg',
      '/projects/taskmanager-2.jpg',
      '/projects/taskmanager-3.jpg'
    ]),
    thumbnail: '/projects/taskmanager-thumb.jpg',
    startDate: new Date('2023-08-01'),
    endDate: new Date('2024-01-15'),
    client: 'Internal Project',
    teamSize: 2,
    role: 'Full-Stack Developer',
    challenges: JSON.stringify([
      'Real-time synchronization across multiple users',
      'Complex permission system for team hierarchies',
      'Data visualization for analytics dashboard',
      'Mobile-first responsive design'
    ]),
    solutions: JSON.stringify([
      'WebSocket implementation with conflict resolution',
      'Role-based access control with granular permissions',
      'Chart.js integration with custom data aggregation',
      'Progressive Web App with offline capabilities'
    ]),
    metrics: JSON.stringify({
      'Active Users': '500+',
      'Real-time Events/sec': '1000+',
      'Data Accuracy': '99.8%',
      'User Satisfaction': '4.8/5'
    }),
    order: 2
  },
  {
    title: 'AI-Powered Analytics API',
    slug: 'ai-analytics-api',
    description: 'RESTful API providing machine learning insights for business data analysis and predictive modeling.',
    longDescription: 'A scalable API service that processes business data to provide actionable insights using machine learning algorithms. Features include predictive analytics, data visualization endpoints, real-time processing, and integration with popular business intelligence tools.',
    category: ProjectCategory.API,
    status: ProjectStatus.COMPLETED,
    featured: true,
    demoUrl: null,
    githubUrl: 'https://github.com/wadejp8/ai-analytics-api',
    images: JSON.stringify([
      '/projects/ai-api-1.jpg',
      '/projects/ai-api-2.jpg'
    ]),
    thumbnail: '/projects/ai-api-thumb.jpg',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-30'),
    client: 'DataTech Solutions',
    teamSize: 4,
    role: 'Backend Lead',
    challenges: JSON.stringify([
      'Processing large datasets efficiently',
      'Model accuracy and performance optimization',
      'API rate limiting and scaling',
      'Data privacy and security compliance'
    ]),
    solutions: JSON.stringify([
      'Implemented async processing with job queues',
      'A/B testing framework for model optimization',
      'Auto-scaling infrastructure with load balancing',
      'End-to-end encryption and GDPR compliance'
    ]),
    metrics: JSON.stringify({
      'API Calls/day': '100K+',
      'Response Time': '< 500ms',
      'Model Accuracy': '94%',
      'Uptime': '99.95%'
    }),
    order: 3
  }
]

// Education Data
const education = [
  {
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: new Date('2015-09-01'),
    endDate: new Date('2019-05-31'),
    current: false,
    gpa: 3.8,
    description: 'Focused on software engineering, algorithms, and web technologies. Graduated Magna Cum Laude.',
    achievements: JSON.stringify([
      'Magna Cum Laude (GPA: 3.8/4.0)',
      'Dean\'s List for 6 semesters',
      'President of Computer Science Club',
      'Winner of Annual Hackathon (2018, 2019)'
    ]),
    featured: true,
    order: 1
  }
]

// Certifications Data
const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2023-03-15'),
    expiryDate: new Date('2026-03-15'),
    credentialId: 'AWS-SAA-123456789',
    credentialUrl: 'https://aws.amazon.com/verification',
    description: 'Validates expertise in designing distributed applications and systems on AWS.',
    featured: true,
    order: 1
  },
  {
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    issueDate: new Date('2023-06-20'),
    expiryDate: new Date('2025-06-20'),
    credentialId: 'GCP-PD-987654321',
    credentialUrl: 'https://cloud.google.com/certification',
    description: 'Demonstrates proficiency in building scalable and reliable applications on Google Cloud.',
    featured: true,
    order: 2
  },
  {
    name: 'Meta Frontend Developer Certificate',
    issuer: 'Meta (Facebook)',
    issueDate: new Date('2022-12-10'),
    expiryDate: null,
    credentialId: 'META-FE-456789123',
    credentialUrl: 'https://coursera.org/verify/meta-frontend',
    description: 'Comprehensive program covering React, JavaScript, and modern frontend development practices.',
    featured: false,
    order: 3
  }
]

// Services Data
const services = [
  {
    name: 'Full-Stack Web Development',
    slug: 'full-stack-web-development',
    description: 'Complete web application development from concept to deployment, including frontend, backend, and database design.',
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
    category: ServiceCategory.WEB_DEVELOPMENT,
    featured: true,
    available: true,
    order: 1
  },
  {
    name: 'E-Commerce Solutions',
    slug: 'ecommerce-solutions',
    description: 'Custom e-commerce platforms with payment processing, inventory management, and analytics.',
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
    category: ServiceCategory.WEB_DEVELOPMENT,
    featured: true,
    available: true,
    order: 2
  },
  {
    name: 'API Development & Integration',
    slug: 'api-development-integration',
    description: 'RESTful APIs, GraphQL endpoints, and third-party service integrations for scalable applications.',
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
    category: ServiceCategory.WEB_DEVELOPMENT,
    featured: true,
    available: true,
    order: 3
  },
  {
    name: 'Technical Consulting',
    slug: 'technical-consulting',
    description: 'Architecture review, performance optimization, and technology strategy consulting.',
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
    category: ServiceCategory.CONSULTING,
    featured: false,
    available: true,
    order: 4
  }
]

// FAQ Data
const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in modern web technologies including React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. I focus on building scalable, performant applications using the latest industry standards.',
    category: 'Technical',
    featured: true,
    order: 1
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and requirements. Simple websites typically take 2-4 weeks, while complex web applications can take 8-16 weeks. I provide detailed timelines during the project planning phase.',
    category: 'Process',
    featured: true,
    order: 2
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes, I offer ongoing maintenance packages that include bug fixes, security updates, performance monitoring, and feature enhancements. Maintenance plans are customized based on your specific needs.',
    category: 'Support',
    featured: true,
    order: 3
  },
  {
    question: 'What is your development process?',
    answer: 'I follow an agile development approach with regular check-ins and updates. The process includes discovery, planning, design, development, testing, deployment, and ongoing support. You\'ll have visibility into progress throughout the project.',
    category: 'Process',
    featured: true,
    order: 4
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Absolutely! I have experience collaborating with in-house teams, other developers, designers, and project managers. I can adapt to your existing workflows and communication tools.',
    category: 'Collaboration',
    featured: false,
    order: 5
  },
  {
    question: 'Do you provide hosting and deployment services?',
    answer: 'Yes, I can handle deployment to various platforms including Vercel, AWS, DigitalOcean, and others. I also provide guidance on hosting options and can set up CI/CD pipelines for automated deployments.',
    category: 'Technical',
    featured: false,
    order: 6
  }
]

// Sample testimonials
const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CTO',
    company: 'TechStartup Inc.',
    email: 'sarah@techstartup.com',
    content: 'Wade delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise helped us launch on time and under budget. The platform has been running flawlessly for over a year.',
    rating: 5,
    featured: true,
    approved: true,
    source: 'Direct Client'
  },
  {
    name: 'Michael Chen',
    title: 'Product Manager',
    company: 'InnovateCorp',
    email: 'michael@innovatecorp.com',
    content: 'Working with Wade was a fantastic experience. He understood our complex requirements and delivered a solution that perfectly fit our needs. His communication throughout the project was excellent.',
    rating: 5,
    featured: true,
    approved: true,
    source: 'LinkedIn'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Founder',
    company: 'GreenTech Solutions',
    email: 'emily@greentech.com',
    content: 'Wade transformed our outdated website into a modern, fast, and user-friendly platform. Our conversion rates increased by 40% after the launch. Highly recommend his services!',
    rating: 5,
    featured: true,
    approved: true,
    source: 'Email'
  }
]

// Sample contacts
const contacts: Array<{
  name: string
  email: string
  subject: string
  message: string
  phone: string
  company: string
  website?: string
  budget: string
  timeline: string
  source: string
  status: ContactStatus
  priority: Priority
}> = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Website Development Inquiry',
    message: 'Hi, I\'m interested in developing a new website for my consulting business. Can we schedule a call to discuss the requirements?',
    phone: '+1-555-0123',
    company: 'Smith Consulting',
    website: 'https://smithconsulting.com',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    source: 'Google Search',
    status: ContactStatus.NEW,
    priority: Priority.MEDIUM
  },
  {
    name: 'Lisa Park',
    email: 'lisa@ecommercestore.com',
    subject: 'E-commerce Platform Development',
    message: 'We need to build a custom e-commerce platform for our growing business. Looking for someone with experience in payment processing and inventory management.',
    phone: '+1-555-0456',
    company: 'Park\'s Online Store',
    budget: '$15,000 - $25,000',
    timeline: '3-4 months',
    source: 'Referral',
    status: ContactStatus.IN_PROGRESS,
    priority: Priority.HIGH
  }
]

async function seedSkills() {
  console.log('🔧 Seeding skills...')
  
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill
    })
  }
  
  console.log(`✅ Seeded ${skills.length} skills`)
}

async function seedExperiences() {
  console.log('💼 Seeding experiences...')
  
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
  
  console.log(`✅ Seeded ${experiences.length} experiences`)
}

async function seedProjects() {
  console.log('🚀 Seeding projects...')
  
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    })
  }
  
  console.log(`✅ Seeded ${projects.length} projects`)
}

async function seedEducation() {
  console.log('🎓 Seeding education...')
  
  for (const edu of education) {
    await prisma.education.upsert({
      where: { 
        institution_degree_field: {
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || ''
        }
      },
      update: edu,
      create: edu
    })
  }
  
  console.log(`✅ Seeded ${education.length} education records`)
}

async function seedCertifications() {
  console.log('📜 Seeding certifications...')
  
  for (const cert of certifications) {
    await prisma.certification.upsert({
      where: { 
        name_issuer: {
          name: cert.name,
          issuer: cert.issuer
        }
      },
      update: cert,
      create: cert
    })
  }
  
  console.log(`✅ Seeded ${certifications.length} certifications`)
}

async function seedServices() {
  console.log('🛠️  Seeding services...')
  
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }
  
  console.log(`✅ Seeded ${services.length} services`)
}

async function seedFAQs() {
  console.log('❓ Seeding FAQs...')
  
  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { question: faq.question },
      update: faq,
      create: faq
    })
  }
  
  console.log(`✅ Seeded ${faqs.length} FAQs`)
}

async function seedTestimonials() {
  console.log('⭐ Seeding testimonials...')
  
  for (const testimonial of testimonials) {
    // Check if testimonial exists by email first
    const existing = await prisma.testimonial.findFirst({
      where: {
        email: testimonial.email,
        name: testimonial.name
      }
    })
    
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: testimonial
      })
    } else {
      await prisma.testimonial.create({
        data: testimonial
      })
    }
  }
  
  console.log(`✅ Seeded ${testimonials.length} testimonials`)
}

async function seedContacts() {
  console.log('📧 Seeding sample contacts...')
  
  for (const contact of contacts) {
    // Check if contact exists by email first
    const existing = await prisma.contact.findFirst({
      where: {
        email: contact.email,
        name: contact.name
      }
    })
    
    if (existing) {
      await prisma.contact.update({
        where: { id: existing.id },
        data: contact
      })
    } else {
      await prisma.contact.create({
        data: contact
      })
    }
  }
  
  console.log(`✅ Seeded ${contacts.length} sample contacts`)
}

async function seedProjectSkills() {
  console.log('🔗 Linking projects with skills...')
  
  // Get all projects and skills
  const allProjects = await prisma.project.findMany()
  const allSkills = await prisma.skill.findMany()
  
  // Project-skill mappings
  const projectSkillMappings = [
    {
      projectSlug: 'ecommerce-platform',
      skills: [
        { name: 'React', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Next.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Node.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Tailwind CSS', importance: ProjectSkillImportance.SECONDARY },
        { name: 'Docker', importance: ProjectSkillImportance.SECONDARY },
        { name: 'Vercel', importance: ProjectSkillImportance.TOOL }
      ]
    },
    {
      projectSlug: 'task-management-dashboard',
      skills: [
        { name: 'React', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Node.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Prisma', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Tailwind CSS', importance: ProjectSkillImportance.SECONDARY },
        { name: 'Docker', importance: ProjectSkillImportance.SECONDARY }
      ]
    },
    {
      projectSlug: 'ai-analytics-api',
      skills: [
        { name: 'Node.js', importance: ProjectSkillImportance.PRIMARY },
        { name: 'TypeScript', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Python', importance: ProjectSkillImportance.PRIMARY },
        { name: 'PostgreSQL', importance: ProjectSkillImportance.PRIMARY },
        { name: 'REST APIs', importance: ProjectSkillImportance.PRIMARY },
        { name: 'Docker', importance: ProjectSkillImportance.SECONDARY },
        { name: 'AWS', importance: ProjectSkillImportance.SECONDARY }
      ]
    }
  ]
  
  for (const mapping of projectSkillMappings) {
    const project = allProjects.find(p => p.slug === mapping.projectSlug)
    if (!project) continue
    
    for (const skillMapping of mapping.skills) {
      const skill = allSkills.find(s => s.name === skillMapping.name)
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
  
  console.log('✅ Linked projects with skills')
}

async function main() {
  console.log('🌱 Starting comprehensive database seeding...\n')
  
  try {
    // Core portfolio data
    await seedSkills()
    await seedExperiences()
    await seedEducation()
    await seedCertifications()
    await seedProjects()
    await seedServices()
    await seedFAQs()
    
    // Link projects with skills (many-to-many)
    await seedProjectSkills()
    
    // Sample data for testing
    await seedTestimonials()
    await seedContacts()
    
    // Seed blog posts (from existing script)
    console.log('📝 Seeding blog posts...')
    await seedBlog()
    
    console.log('\n🎉 Database seeding completed successfully!')
    console.log('📊 Summary:')
    console.log(`   • ${skills.length} skills`)
    console.log(`   • ${experiences.length} work experiences`)
    console.log(`   • ${education.length} education records`)
    console.log(`   • ${certifications.length} certifications`)
    console.log(`   • ${projects.length} projects`)
    console.log(`   • ${services.length} services`)
    console.log(`   • ${faqs.length} FAQs`)
    console.log(`   • ${testimonials.length} testimonials`)
    console.log(`   • ${contacts.length} sample contacts`)
    console.log('   • 3 blog posts')
    console.log('   • Project-skill relationships')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Allow running this script directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main as seedDatabase }
