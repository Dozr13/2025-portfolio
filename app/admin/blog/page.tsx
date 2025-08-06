"use client"

import { useAdminAuthContext } from "@/components/admin/AdminAuthProvider"
import { AdminError, AdminLoading } from "@/components/admin/AdminErrorBoundary"
import { Icon } from "@/components/ui/icon"
import { PostStatus } from "@/generated/client"
import { useAdminSearch } from "@/hooks/useAdminSearch"
import { adminService } from "@/lib/services/admin"
import Link from "next/link"
import { useCallback } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  status: string
  category: string | null
  tags: string | null
  readingTime: number | null
  views: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: string
  featured: boolean
  _count: {
    comments: number
  }
}

interface BlogFilters {
  page: number
  search?: string
  status?: PostStatus | ""
  [key: string]: string | number | boolean | undefined
}

interface BlogData {
  posts: BlogPost[]
  pagination: {
    pages: number
    total: number
  }
}

export default function BlogManagement() {
  const { user, logout } = useAdminAuthContext()

  const fetchPosts = useCallback(async (filters: BlogFilters) => {
    const params: Record<string, string> = {
      page: filters.page.toString(),
      limit: '10'
    }

    if (filters.search) params.search = filters.search
    if (filters.status) params.status = filters.status

    return await adminService.blog.fetchPosts(params)
  }, [])

  const {
    data,
    loading,
    error,
    filters,
    searchInput,
    setSearchInput,
    updateFilter,
    invalidateData
  } = useAdminSearch<BlogData, BlogFilters>({
    fetchFn: fetchPosts,
    initialFilters: { page: 1, search: undefined, status: "" },
    enableCache: false
  })

  const posts = data?.posts || []
  const totalPages = data?.pagination?.pages || 1

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await adminService.blog.deletePost(id)
      invalidateData() // Trigger refresh using invalidation pattern
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  // Clean error/loading states
  if (loading) return <AdminLoading message="Loading posts..." />
  if (error) return <AdminError error={error} onRetry={invalidateData} title="Blog Error" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div>
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

      <div className="py-8">
        <div>
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <select
              value={filters.status || ""}
              onChange={(e) => updateFilter('status', e.target.value as PostStatus | "")}
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
          <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                            {post.excerpt || "No excerpt available"}
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
                Page {filters.page} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateFilter('page', Math.max(1, filters.page - 1))}
                  disabled={filters.page === 1}
                  className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => updateFilter('page', Math.min(totalPages, filters.page + 1))}
                  disabled={filters.page === totalPages}
                  className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}