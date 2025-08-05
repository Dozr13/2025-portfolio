"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string
  readingTime: number
  views: number
  publishedAt: string
  author: string
}

// Hook to fetch blog posts from API
function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err)
        setLoading(false)
      })
  }, [])

  return { posts, loading }
}

export function Blog() {
  const { posts: blogPosts, loading } = useBlogPosts()

  // Featured posts are the first 3 posts
  const featuredPosts = blogPosts.slice(0, 3)

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Technical Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep technical insights, tutorials, and thoughts on modern software development
          </p>
        </motion.div>

        {/* Featured Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-border/80 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {/* Card Header */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
                  {post.category}
                </div>
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="file-text" size="xl" />
                  </div>
                  <p className="text-sm font-medium">{post.readingTime} min read</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.split(',').slice(0, 3).map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </time>
                  <div className="flex items-center gap-1">
                    <Icon name="eye" size="sm" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                  Read Article
                  <Icon name="arrow-right" size="sm" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-background rounded-2xl border border-border p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to discuss these topics?
            </h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always interested in deep technical conversations and collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get In Touch
                <Icon name="arrow-right" size="sm" />
              </Link>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}