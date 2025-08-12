'use client'
import { Icon } from '@/components/ui/Icon'
import { useReadingProgress } from '@/hooks/useReadingProgress'
import type { PublicBlogPostDetail } from '@/lib/types/public'
import { markdownToHtml } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ReadingProgressBar } from './ReadingProgressBar'

export function BlogPostClient({ post }: { post: PublicBlogPostDetail }) {
  const tags = useMemo(
    () =>
      post.tags
        ? post.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    [post.tags]
  )

  const htmlContent = markdownToHtml(post.content)

  const readingProgress = useReadingProgress()
  const [localViews, setLocalViews] = useState<number>(post.views)

  useEffect(() => {
    try {
      const key = `viewed_${post.slug}`
      if (typeof window !== 'undefined' && !sessionStorage.getItem(key)) {
        ;(async () => {
          const { incrementBlogView } = await import('@/app/actions/public/blog')
          await incrementBlogView(post.slug)
          sessionStorage.setItem(key, '1')
          setLocalViews((v) => v + 1)
        })().catch(() => {})
      }
    } catch {}

    return
  }, [post.slug])

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={readingProgress} />

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
                  {post.readingTime ?? 5} min read
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
