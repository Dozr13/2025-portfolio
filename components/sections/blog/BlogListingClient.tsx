'use client'

import { Icon } from '@/components/ui/Icon'
import { BlogListingClientProps } from '@/lib/types/sections'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const BlogListingClient = ({
  posts,
  currentPage,
  totalPages,
  totalPosts,
  search
}: BlogListingClientProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(search)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to page 1 when searching
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-title mb-6 leading-tight">
            Technical Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Deep technical insights, tutorials, and thoughts on modern software development
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full px-4 py-3 pl-12 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <Icon
                name="search"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </form>

          {search && (
            <div className="mt-4 text-sm text-muted-foreground">
              Found {totalPosts} post{totalPosts !== 1 ? 's' : ''} for &quot;{search}&quot;
            </div>
          )}
        </motion.div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
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
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

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

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center items-center gap-2"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Icon name="search" size="lg" className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-6">
              {search
                ? `No posts match your search for "${search}"`
                : 'No blog posts available yet.'}
            </p>
            {search && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  router.push('/blog')
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
