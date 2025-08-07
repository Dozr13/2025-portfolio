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

interface BlogPostClientProps {
  post: BlogPost
}

function markdownToHtml(markdown: string): string {
  return markdown
    .split('\n')
    .map(paragraph => {
      if (paragraph.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold mb-6 text-foreground">${paragraph.slice(2)}</h1>`
      }
      if (paragraph.startsWith('## ')) {
        return `<h2 class="text-2xl font-semibold mb-4 mt-8 text-foreground">${paragraph.slice(3)}</h2>`
      }
      if (paragraph.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold mb-3 mt-6 text-foreground">${paragraph.slice(4)}</h3>`
      }
      if (paragraph.startsWith('```')) {
        return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">${paragraph.slice(3)}</code></pre>`
      }
      if (paragraph.trim() === '') {
        return ''
      }
      return `<p class="mb-8 leading-relaxed text-foreground/90 text-lg lg:text-xl">${paragraph.trim()}</p>`
    })
    .join('\n')
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
              href="/blog"
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
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                  <Icon name="calendar" size="sm" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="clock" size="sm" />
                  {post.readingTime || 5} min read
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="eye" size="sm" />
                  {post.views} views
                </span>
                {post.category && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-muted text-muted-foreground rounded-full">
                    {post.category}
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-title leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl lg:text-2xl text-muted-foreground leading-relaxed"
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">By {post.author}</p>
                  <p className="text-sm text-muted-foreground">Software Developer</p>
                </div>
              </motion.div>

              {/* Tags */}
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-wrap gap-2"
                >
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </motion.div>
              )}
            </header>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24"
      >
        <article className="prose prose-lg lg:prose-xl max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        {/* Comments Section */}
        {post.comments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <h3 className="text-2xl font-bold mb-8">Comments ({post.comments.length})</h3>
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-muted/30 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium text-sm">
                      {comment.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{comment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/90">{comment.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}