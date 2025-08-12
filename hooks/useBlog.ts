'use client'

import { deleteAdminBlogPost, listAdminBlogPosts } from '@/app/actions/admin/blog'
import type { BlogPost } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'

interface BlogData {
  posts: BlogPost[]
  pagination: {
    pages: number
    total: number
  }
}

interface BlogFilters {
  page: number
  search?: string
  status?: string
}

interface UseBlogOptions {
  initialData?: BlogData | null
}

export function useBlog(options: UseBlogOptions = {}) {
  const { initialData } = options
  const [data, setData] = useState<BlogData | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchBlogData = useCallback(async (filters: BlogFilters = { page: 1 }) => {
    try {
      setLoading(true)
      setError(null)

      const params: Record<string, string> = {
        page: filters.page.toString(),
        limit: '10'
      }

      if (filters.search) params.search = filters.search
      if (filters.status) params.status = filters.status

      const response = await listAdminBlogPosts({
        page: parseInt(params.page),
        limit: parseInt(params.limit),
        status: params.status || null,
        search: params.search || null
      } as BlogFilters)
      setData(response as BlogData)
    } catch (error) {
      console.error('[Blog Hook] Error fetching blog data:', error)
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePost = useCallback(
    async (id: string, title: string) => {
      if (!confirm(`Are you sure you want to delete "${title}"?`)) return

      setDeleting(id)
      try {
        await deleteAdminBlogPost(id)

        // Refresh the data after deletion
        if (data) {
          await fetchBlogData({ page: 1 })
        }
      } catch (error) {
        console.error('[Blog Hook] Error deleting post:', error)
        setError('Failed to delete post')
      } finally {
        setDeleting(null)
      }
    },
    [data, fetchBlogData]
  )

  const refresh = useCallback(() => {
    fetchBlogData({ page: 1 })
  }, [fetchBlogData])

  useEffect(() => {
    if (!initialData) {
      fetchBlogData({ page: 1 })
    }
  }, [fetchBlogData, initialData])

  return {
    data,
    posts: data?.posts || [],
    pagination: data?.pagination || { pages: 1, total: 0 },
    loading,
    error,
    deleting,
    deletePost,
    refresh,
    refetch: fetchBlogData
  }
}
