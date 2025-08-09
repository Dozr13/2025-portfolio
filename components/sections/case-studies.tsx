"use client"

import { Icon } from "@/components/ui/icon"
import { CaseStudy } from "@/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"

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
  },

]

export const CaseStudies = () => {
  const featuredStudies = caseStudies.filter(study => study.featured)

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dives into complex technical challenges and the solutions that delivered measurable business impact
          </p>
        </motion.div>

        <div className="space-y-16">
          {featuredStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 border-b border-border">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {study.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Icon name="briefcase" size="sm" />
                        {study.company}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="calendar" size="sm" />
                        {study.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {study.githubUrl && (
                      <Link
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                      >
                        <Icon name="github" size="sm" />
                        View Code
                      </Link>
                    )}
                    {study.liveUrl && (
                      <Link
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="external-link" size="sm" />
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Overview */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
                </div>

                {/* Problem, Solution, Results Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                      The Problem
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                      The Solution
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                      The Results
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                        <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                        <div className="text-xs text-green-500 font-medium">{metric.improvement}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Technical Challenges</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {study.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl p-6 border border-primary/10">
                    <blockquote className="text-foreground font-medium mb-4 text-lg leading-relaxed">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </blockquote>
                    <cite className="not-italic">
                      <div className="font-semibold text-foreground">{study.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
                    </cite>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Solve Your Technical Challenges?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss how I can help architect and implement solutions that drive measurable business results
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start a Conversation
              <Icon name="arrow-right" size="sm" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}