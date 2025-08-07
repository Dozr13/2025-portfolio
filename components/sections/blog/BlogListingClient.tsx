"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

// Public blog post type - only what we need for display
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

interface BlogListingClientProps {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  totalPosts: number
  search: string
}

export function BlogListingClient({
  posts,
  currentPage,
  totalPages,
  totalPosts,
  search
}: BlogListingClientProps) {
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

            {/* Back to Home Button */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:gap-3"
            >
              <Icon name="arrow-right" size="sm" className="rotate-180 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
      </motion.nav>

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
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === currentPage
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
              {search ? `No posts match your search for "${search}"` : 'No blog posts available yet.'}
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
