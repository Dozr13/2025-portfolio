"use client"

import { Icon } from "@/components/ui/Icon"
import { BlogClientProps } from "@/lib/types/sections"
import { motion } from "framer-motion"
import Link from "next/link"

export const BlogClient = ({ posts, immediate = false }: BlogClientProps) => {
  const featuredPosts = posts.slice(0, 3)

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="relative z-10 text-center p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="clock" size="sm" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="eye" size="sm" />
                    <span>{post.views} views</span>
                  </div>
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">By {post.author}</span>
                  <span className="text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 group-hover:bg-primary/5 transition-colors"
                  aria-label={`Read more about ${post.title}`}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View All Posts
            <Icon name="arrow-right" size="sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
