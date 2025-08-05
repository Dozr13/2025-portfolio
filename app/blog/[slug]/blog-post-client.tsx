"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  htmlContent: string | null
  tags: string | null
  category: string | null
  author: string
  status: string
  featured: boolean
  metaTitle: string | null
  metaDescription: string | null
  readingTime: number | null
  views: number
  likes: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  comments: {
    id: string
    name: string
    email: string
    website: string | null
    content: string
    approved: boolean
    postId: string
    parentId: string | null
    createdAt: Date
  }[]
}

// Enhanced markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers with gradient styling
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl lg:text-3xl font-bold mt-12 mb-6 gradient-text">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl lg:text-4xl font-bold mt-16 mb-8 gradient-text">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl lg:text-5xl font-bold mt-20 mb-10 gradient-text">$1</h1>')

    // Enhanced code blocks with better styling
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'text'
      return `
        <div class="my-10 rounded-2xl border border-border bg-slate-950 overflow-hidden shadow-2xl">
          <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
            <div class="flex items-center gap-3">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-sm font-medium text-slate-300 uppercase tracking-wider">${language}</span>
            </div>
            <button class="text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-1 rounded-md hover:bg-slate-700">
              Copy
            </button>
          </div>
          <pre class="p-8 overflow-x-auto text-sm lg:text-base text-slate-100 leading-relaxed"><code class="font-mono">${code.trim()}</code></pre>
        </div>
      `
    })

    // Enhanced inline code
    .replace(/`([^`]+)`/g, '<code class="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm lg:text-base font-mono border border-primary/20">$1</code>')

    // Bold and italic with better styling
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="italic text-foreground/90">$1</em>')

    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')

    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/30 rounded-r-lg italic text-foreground/90 text-lg">$1</blockquote>')

    // Convert line breaks and create paragraphs
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim() === '') return ''
      if (paragraph.includes('<h') || paragraph.includes('<div') || paragraph.includes('<pre') || paragraph.includes('<blockquote')) {
        return paragraph
      }
      return `<p class="mb-8 leading-relaxed text-foreground/90 text-lg lg:text-xl">${paragraph.trim()}</p>`
    })
    .join('\n')
}

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const tags = post.tags ? post.tags.split(',').filter(tag => tag.trim()) : []
  const htmlContent = markdownToHtml(post.content)

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <motion.div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center font-bold text-primary-foreground text-lg lg:text-xl xl:text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                >
                  W
                </motion.div>
              </motion.div>
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-1">
                  <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Wade
                  </span>
                  <span className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text-inverted">
                    Pate
                  </span>
                </div>
                <div className="text-xs lg:text-sm xl:text-base text-muted-foreground font-mono tracking-wider opacity-60 group-hover:opacity-80 transition-opacity">
                  {"{ dev }"}
                </div>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/#about" className="text-foreground hover:text-primary px-4 py-3 text-base lg:text-lg font-medium transition-colors relative group">
                About
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link href="/#projects" className="text-foreground hover:text-primary px-4 py-3 text-base lg:text-lg font-medium transition-colors relative group">
                Projects
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link href="/#blog" className="text-primary px-4 py-3 text-base lg:text-lg font-medium transition-colors relative group">
                Blog
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link href="/#contact" className="text-foreground hover:text-primary px-4 py-3 text-base lg:text-lg font-medium transition-colors relative group">
                Contact
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </div>

            {/* Back to Blog Button */}
            <Link
              href="/#blog"
              className="group inline-flex items-center gap-2 text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:gap-3"
            >
              <Icon name="arrow-right" size="sm" className="rotate-180 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-muted/20 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <header className="space-y-8">
              {/* Metadata */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 text-sm lg:text-base text-muted-foreground"
              >
                {post.category && (
                  <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary rounded-full font-medium border border-primary/20 backdrop-blur-sm">
                    {post.category}
                  </span>
                )}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt.toISOString()} className="flex items-center gap-2">
                    <Icon name="calendar" size="sm" className="text-primary" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </time>
                )}
                {post.readingTime && (
                  <span className="flex items-center gap-2">
                    <Icon name="clock" size="sm" className="text-primary" />
                    {post.readingTime} min read
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Icon name="eye" size="sm" className="text-primary" />
                  {post.views.toLocaleString()} views
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-title leading-tight pb-2"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl"
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-4 pt-6"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg lg:text-xl shadow-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg lg:text-xl">{post.author}</p>
                  <p className="text-muted-foreground lg:text-lg">Senior Software Engineer</p>
                </div>
              </motion.div>
            </header>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24"
      >
        <div className="max-w-4xl mx-auto">
          <article
            className="prose prose-lg lg:prose-xl max-w-none prose-headings:gradient-text-title prose-headings:font-bold prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-950 prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:rounded-r prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-16 pt-8 border-t border-border"
            >
              <h3 className="text-2xl font-bold gradient-text mb-8">Topics</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.span
                    key={tag.trim()}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    className="px-4 py-2 bg-gradient-to-r from-muted to-muted/50 text-foreground rounded-full text-sm lg:text-base font-medium hover:from-primary/10 hover:to-purple-500/10 hover:text-primary transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
                  >
                    #{tag.trim()}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/#blog"
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Icon name="arrow-right" size="sm" className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  More Articles
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 border border-border rounded-xl font-semibold text-lg hover:bg-accent hover:border-primary/30 transition-all duration-300"
                >
                  Discuss This Article
                  <Icon name="arrow-right" size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}