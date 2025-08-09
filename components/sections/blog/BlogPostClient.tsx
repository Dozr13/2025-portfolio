"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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
  updatedAt: Date | null
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
  // Split into lines and process
  const lines = markdown.split('\n')
  const result: string[] = []
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let currentParagraph: string[] = []

  const processParagraph = (paragraph: string[]) => {
    if (paragraph.length === 0) return

    const text = paragraph.join(' ').trim()
    if (text === '') return

    // Check for headers
    if (text.startsWith('# ')) {
      result.push(`<h1 class="text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight">${text.slice(2)}</h1>`)
    } else if (text.startsWith('## ')) {
      result.push(`<h2 class="text-2xl lg:text-3xl font-semibold mb-6 mt-12 text-foreground leading-tight border-b border-border/30 pb-2">${text.slice(3)}</h2>`)
    } else if (text.startsWith('### ')) {
      result.push(`<h3 class="text-xl lg:text-2xl font-semibold mb-4 mt-8 text-foreground leading-tight">${text.slice(4)}</h3>`)
    } else {
      // Check for lists
      if (text.match(/^\d+\.\s/)) {
        // Ordered list
        result.push(`<ol class="mb-6 ml-6 space-y-2 text-lg lg:text-xl text-foreground/90"><li class="leading-relaxed">${text.replace(/^\d+\.\s/, '')}</li></ol>`)
      } else if (text.match(/^[-*]\s/)) {
        // Unordered list
        result.push(`<ul class="mb-6 ml-6 space-y-2 text-lg lg:text-xl text-foreground/90"><li class="leading-relaxed">${text.replace(/^[-*]\s/, '')}</li></ul>`)
      } else {
        // Regular paragraph
        result.push(`<p class="mb-6 leading-relaxed text-foreground/90 text-lg lg:text-xl">${text}</p>`)
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false
        const codeContent = codeBlockContent.join('\n')
        result.push(`<pre class="bg-muted/50 p-6 rounded-xl overflow-x-auto my-6 border border-border/50 shadow-lg backdrop-blur-sm"><code class="text-sm text-foreground/90 font-mono leading-relaxed">${codeContent}</code></pre>`)
        codeBlockContent = []
      } else {
        // Start of code block
        inCodeBlock = true
        // Process any pending paragraph
        processParagraph(currentParagraph)
        currentParagraph = []
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Handle empty lines (paragraph breaks)
    if (line.trim() === '') {
      processParagraph(currentParagraph)
      currentParagraph = []
      continue
    }

    // Check for headers (single line)
    if (line.startsWith('# ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(`<h1 class="text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight">${line.slice(2)}</h1>`)
    } else if (line.startsWith('## ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(`<h2 class="text-2xl lg:text-3xl font-semibold mb-6 mt-12 text-foreground leading-tight border-b border-border/30 pb-2">${line.slice(3)}</h2>`)
    } else if (line.startsWith('### ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(`<h3 class="text-xl lg:text-2xl font-semibold mb-4 mt-8 text-foreground leading-tight">${line.slice(4)}</h3>`)
    } else {
      // Regular text line
      currentParagraph.push(line)
    }
  }

  // Process any remaining paragraph
  processParagraph(currentParagraph)

  return result.join('\n')
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const tags = post.tags ? post.tags.split(',').filter(tag => tag.trim()) : []
  const htmlContent = markdownToHtml(post.content)

  // Reading progress hook
  const [readingProgress, setReadingProgress] = useState(0)
  const [localViews, setLocalViews] = useState<number>(post.views)

  useEffect(() => {
    // Increment view once per session per slug
    try {
      const key = `viewed_${post.slug}`
      if (typeof window !== 'undefined' && !sessionStorage.getItem(key)) {
        ; (async () => {
          const { incrementBlogView } = await import('@/app/actions/public/blog')
          await incrementBlogView(post.slug)
          sessionStorage.setItem(key, '1')
          setLocalViews((v) => v + 1)
        })().catch(() => { })
      }
    } catch { }

    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [post.slug])

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

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
                  {localViews} views
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
                      className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
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
          <div
            className="prose-headings:scroll-mt-20 prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-0 prose-pre:shadow-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
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