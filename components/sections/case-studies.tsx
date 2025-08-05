"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"

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

const caseStudies: CaseStudy[] = [
  {
    id: "ai-code-reviewer",
    title: "AI-Powered Code Review System",
    company: "TechCorp Solutions",
    duration: "3 months",
    overview: "Built an intelligent code review system using OpenAI GPT-4 and vector embeddings to automate code quality analysis and provide contextual feedback.",
    problem: "The development team was spending 40% of their time on manual code reviews, leading to bottlenecks in the release cycle. Inconsistent review quality across different reviewers was causing bugs to slip through to production.",
    solution: "Designed and implemented an AI-powered system that analyzes code changes, identifies potential issues, and provides intelligent suggestions. Used vector embeddings to understand code context and GPT-4 for generating human-like feedback.",
    results: [
      "Reduced manual review time by 60%",
      "Increased bug detection accuracy to 95%",
      "Improved team productivity by 40%",
      "Standardized code quality across all teams"
    ],
    technologies: ["Next.js 15", "OpenAI API", "Pinecone", "TypeScript", "Prisma", "GitHub API", "Python"],
    challenges: [
      "Training the AI model to understand company-specific coding standards",
      "Handling rate limits and API costs for high-volume repositories",
      "Integrating seamlessly with existing GitHub workflows",
      "Ensuring security and privacy of proprietary code"
    ],
    metrics: [
      { label: "Review Time", value: "2.5 hours", improvement: "60% reduction" },
      { label: "Bug Detection", value: "95%", improvement: "30% increase" },
      { label: "Developer Satisfaction", value: "4.8/5", improvement: "40% increase" },
      { label: "Release Velocity", value: "2x faster", improvement: "100% improvement" }
    ],
    testimonial: {
      quote: "Wade's AI code review system transformed our development process. What used to take hours now happens in minutes, and the quality is actually better than manual reviews.",
      author: "Sarah Chen",
      role: "Engineering Manager, TechCorp"
    },
    githubUrl: "https://github.com/Dozr13/ai-code-reviewer",
    liveUrl: "https://ai-code-reviewer.vercel.app",
    featured: true
  },
  {
    id: "crypto-trading-app",
    title: "Real-Time Crypto Trading Mobile App",
    company: "FinanceFlow Inc.",
    duration: "4 months",
    overview: "Developed a cross-platform mobile application for cryptocurrency trading with real-time data, advanced charting, and portfolio management.",
    problem: "Existing crypto trading apps had poor performance with real-time data, unreliable notifications, and limited offline functionality. Users were losing money due to delayed trade executions.",
    solution: "Built a high-performance React Native app with WebSocket connections for real-time data, local SQLite caching for offline access, and optimized state management for smooth 60fps animations.",
    results: [
      "Achieved 10K+ downloads in first month",
      "Maintained 4.8★ App Store rating",
      "Reduced trade execution time by 75%",
      "Generated $2M+ in trading volume"
    ],
    technologies: ["React Native", "TypeScript", "WebSocket", "Redux Toolkit", "Chart.js", "SQLite", "Firebase"],
    challenges: [
      "Handling real-time data for 500+ cryptocurrencies without performance degradation",
      "Implementing secure biometric authentication and key storage",
      "Optimizing battery usage for background price monitoring",
      "Managing complex state across multiple screens and data sources"
    ],
    metrics: [
      { label: "App Performance", value: "60 FPS", improvement: "Consistent" },
      { label: "Trade Execution", value: "< 100ms", improvement: "75% faster" },
      { label: "User Retention", value: "85%", improvement: "40% above industry" },
      { label: "Crash Rate", value: "0.01%", improvement: "99.99% stability" }
    ],
    testimonial: {
      quote: "The app Wade built exceeded all our expectations. The real-time performance is incredible, and our users love the intuitive interface.",
      author: "Marcus Rodriguez",
      role: "Product Director, FinanceFlow"
    },
    githubUrl: "https://github.com/Dozr13/crypto-trader-mobile",
    liveUrl: "https://apps.apple.com/crypto-trader-pro",
    featured: true
  },
  {
    id: "microservices-platform",
    title: "Scalable E-commerce Microservices Architecture",
    company: "RetailMax Enterprise",
    duration: "6 months",
    overview: "Architected and implemented a microservices-based e-commerce platform capable of handling millions of requests per day with 99.9% uptime.",
    problem: "Legacy monolithic system was failing under high traffic loads, causing frequent downtime during peak sales periods. Manual scaling was expensive and time-consuming.",
    solution: "Designed an event-driven microservices architecture with automated scaling, distributed caching, and comprehensive monitoring. Implemented circuit breakers and graceful degradation patterns.",
    results: [
      "Achieved 99.9% uptime during Black Friday",
      "Handled 1M+ requests per day peak load",
      "Reduced infrastructure costs by 35%",
      "Improved development team velocity by 50%"
    ],
    technologies: ["Node.js", "Express", "GraphQL", "Redis", "PostgreSQL", "Docker", "Kubernetes", "AWS ECS"],
    challenges: [
      "Designing data consistency across distributed services",
      "Implementing distributed tracing and monitoring",
      "Managing service discovery and load balancing",
      "Handling complex deployment orchestration"
    ],
    metrics: [
      { label: "System Uptime", value: "99.9%", improvement: "From 95%" },
      { label: "Response Time", value: "50ms avg", improvement: "80% faster" },
      { label: "Infrastructure Cost", value: "$15K/month", improvement: "35% reduction" },
      { label: "Development Velocity", value: "2.5x faster", improvement: "150% increase" }
    ],
    testimonial: {
      quote: "Wade's microservices architecture saved our Black Friday. We processed record sales without a single outage.",
      author: "Jennifer Liu",
      role: "CTO, RetailMax Enterprise"
    },
    githubUrl: "https://github.com/Dozr13/ecommerce-microservices",
    featured: true
  }
]

export function CaseStudies() {
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