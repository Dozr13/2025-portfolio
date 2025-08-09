"use client"

import { AdminHeader } from "@/components/admin/shared/AdminHeader"
import { Icon } from "@/components/ui/icon"
import { useBlog } from "@/hooks/useBlog"
import type { BlogPost } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"
import { BlogCard } from "./BlogCard"

interface BlogData {
  posts: BlogPost[]
  pagination: {
    pages: number
    total: number
  }
}

interface BlogContentProps {
  initialData?: BlogData | null
}

export const BlogContent = ({ initialData }: BlogContentProps) => {
  const { posts, pagination, loading, error, deleting, deletePost } = useBlog({ initialData })
  const [searchInput, setSearchInput] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  if (loading && !initialData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Icon name="alert-circle" className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Blog Posts</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Blog Management"
        backHref="/admin/dashboard"
        actions={(
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            New Post
          </Link>
        )}
      />

      <div className="py-8">
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          {/* New Post button moved to header actions */}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="file-text" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Blog Posts</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first blog post.
            </p>
            <Link
              href="/admin/blog/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Icon name="plus" size="sm" />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onDelete={deletePost}
                deleting={deleting}
              />
            ))}
          </div>
        )}

        {/* Pagination Info */}
        {pagination.total > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {posts.length} of {pagination.total} posts
            {pagination.pages > 1 && ` (Page 1 of ${pagination.pages})`}
          </div>
        )}
      </div>
    </div>
  )
}
