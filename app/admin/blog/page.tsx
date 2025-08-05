"use client"

import { Icon } from "@/components/ui/icon"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { blogService } from "@/lib/services/admin"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  status: string
  featured: boolean
  readingTime?: number
  views: number
  publishedAt?: string
  updatedAt: string
  _count: {
    comments: number
  }
}

export default function BlogManagement() {
  const { user, isLoading: authLoading, isAuthenticated, redirectToLogin, logout } = useAdminAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  console.log("[BLOG PAGE] Component state:", {
    authLoading,
    isAuthenticated,
    user: user?.username,
    loading
  })

  // Redirect if not authenticated
  useEffect(() => {
    console.log("[BLOG PAGE] Auth effect:", { authLoading, isAuthenticated })
    if (!authLoading && !isAuthenticated) {
      console.log("[BLOG PAGE] Not authenticated, redirecting...")
      redirectToLogin()
    }
  }, [authLoading, isAuthenticated, redirectToLogin])

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)

      const data = await blogService.fetchPosts({
        page,
        limit: 10,
        search: searchTerm || undefined,
        status: statusFilter || undefined
      })

      setPosts(data.posts)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, statusFilter])

  useEffect(() => {
    console.log("[BLOG PAGE] Data fetch effect:", { authLoading, isAuthenticated })
    if (!authLoading && isAuthenticated) {
      console.log("[BLOG PAGE] Authenticated, fetching posts...")
      fetchPosts()
    }
  }, [authLoading, isAuthenticated, page, searchTerm, statusFilter, fetchPosts])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await blogService.deletePost(id)
      fetchPosts() // Refresh the list
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Dashboard
              </Link>
              <div className="w-px h-6 bg-border"></div>
              <h1 className="text-2xl font-bold">Blog Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            New Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{post.title}</h3>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          {post.readingTime && <span>{post.readingTime} min read</span>}
                          <span>{post._count.comments} comments</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.category || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${post.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : post.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Icon name="square-pen" size="sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Icon name="trash-2" size="sm" />
                        </button>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-blue-500 transition-colors"
                        >
                          <Icon name="external-link" size="sm" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}