import { NextResponse } from "next/server"
import { verifyAdminToken } from "../auth/route"

// Since case studies are currently hardcoded in the component,
// this API will manage them in a JSON file or could be extended to use database

interface CaseStudy {
  id: string
  title: string
  company: string
  duration: string
  overview: string
  problem: string
  solution: string
  results: string[]
  technologies: string[]
  challenges: string[]
  metrics: {
    label: string
    value: string
    improvement: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export async function GET(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // For now, return the hardcoded case studies
    // In the future, this could read from database or file system
    const caseStudies: CaseStudy[] = [
      {
        id: "request-hub-saas",
        title: "Request Hub - Multi-Tenant SaaS Platform",
        company: "Technical Assessment Project",
        duration: "5 days",
        overview: "Built a complete enterprise-grade SaaS platform for VC portfolio companies with real-time request management, Linear integration, and comprehensive admin dashboards.",
        problem: "VC firms needed a centralized system to manage requests from portfolio companies, track progress, and integrate with existing project management tools. The challenge was to build a production-ready multi-tenant application in just 5 days.",
        solution: "Developed a full-stack SaaS application using Next.js 15 with Clerk authentication, Prisma ORM, real-time updates via Pusher, and Linear API integration. Implemented multi-tenant architecture with proper data isolation and role-based access control.",
        results: [
          "Delivered fully functional SaaS platform in 5 days",
          "Multi-tenant architecture with data isolation",
          "Real-time collaboration features",
          "Seamless Linear integration for project management"
        ],
        technologies: ["Next.js 15", "TypeScript", "Clerk Auth", "Prisma", "Pusher", "Linear API", "Tailwind CSS"],
        challenges: [
          "Implementing secure multi-tenant data isolation",
          "Building real-time collaboration features",
          "Integrating with Linear API for project sync",
          "Creating intuitive admin dashboards with complex permissions"
        ],
        metrics: [
          { label: "Development Time", value: "5 days", improvement: "Rapid delivery" },
          { label: "User Authentication", value: "Multi-tenant", improvement: "Enterprise ready" },
          { label: "Real-time Updates", value: "< 100ms", improvement: "Instant collaboration" },
          { label: "API Integration", value: "Linear", improvement: "Seamless workflow" }
        ],
        testimonial: {
          quote: "Exceptional work delivered in an incredibly short timeframe. The architecture and implementation quality exceeded our expectations for a 5-day project.",
          author: "Technical Assessment Team",
          role: "Senior Engineers"
        },
        githubUrl: "https://github.com/Dozr13/request-hub",
        liveUrl: "https://request-hub-gamma.vercel.app",
        featured: true
      },
      {
        id: "ai-database-migration",
        title: "AI-Powered Database Migration System",
        company: "Open Source Project",
        duration: "2 months",
        overview: "Developed an intelligent PostgreSQL migration tool using Ollama AI to automatically convert stored procedures and optimize database schemas with validation and rollback capabilities.",
        problem: "Legacy database migrations often require manual conversion of stored procedures and complex schema changes, leading to errors and extended downtime. Traditional tools lack intelligence to understand context and optimize performance.",
        solution: "Built an AI-powered migration system that analyzes existing database structures, converts stored procedures intelligently, and provides optimization recommendations. Used Ollama for local AI processing to ensure data privacy and security.",
        results: [
          "Automated complex stored procedure conversions",
          "Reduced migration time by 80%",
          "Zero data loss with comprehensive validation",
          "Open source tool adopted by development teams"
        ],
        technologies: ["Python", "PostgreSQL", "Ollama", "SQL", "Database Migration", "AI/ML"],
        challenges: [
          "Understanding complex legacy stored procedure logic",
          "Ensuring data integrity during schema transformations",
          "Optimizing performance for large-scale databases",
          "Creating rollback mechanisms for failed migrations"
        ],
        metrics: [
          { label: "Migration Speed", value: "80% faster", improvement: "Significant time savings" },
          { label: "Accuracy Rate", value: "95%", improvement: "Highly reliable" },
          { label: "Data Integrity", value: "100%", improvement: "Zero data loss" },
          { label: "Adoption", value: "Open Source", improvement: "Community tool" }
        ],
        testimonial: {
          quote: "This tool saved us weeks of manual migration work. The AI-powered conversion is remarkably accurate and the validation features give us confidence in the process.",
          author: "Database Engineering Team",
          role: "Fortune 500 Company"
        },
        githubUrl: "https://github.com/Dozr13/proc-to-postgres",
        liveUrl: undefined,
        featured: true
      }
    ]

    return NextResponse.json({
      caseStudies,
      total: caseStudies.length
    })

  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json(
    { error: "Case study creation not yet implemented. Currently managed in code." },
    { status: 501 }
  )
}

export async function PATCH(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json(
    { error: "Case study editing not yet implemented. Currently managed in code." },
    { status: 501 }
  )
}

export async function DELETE(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json(
    { error: "Case study deletion not yet implemented. Currently managed in code." },
    { status: 501 }
  )
}