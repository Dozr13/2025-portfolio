"use client"

import { adminService } from "@/lib/services/admin"
import type { Project } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"

interface ProjectsData {
  projects: Project[]
  pagination: {
    pages: number
    total: number
  }
}

interface ProjectFilters {
  page: number
  search?: string
  status?: string
  category?: string
}

interface UseProjectsOptions {
  initialData?: ProjectsData | null
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [data, setData] = useState<ProjectsData | null>(options.initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchProjects = useCallback(async (filters: ProjectFilters = { page: 1 }) => {
    setLoading(true)
    setError(null)

    try {
      const params: Record<string, string> = {
        page: filters.page.toString(),
        limit: '10'
      }

      if (filters.search) params.search = filters.search
      if (filters.status) params.status = filters.status
      if (filters.category) params.category = filters.category

      const result = await adminService.projects.fetchProjects(params)
      setData(result)
    } catch (err) {
      console.error('[useProjects] Error fetching projects:', err)
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    setDeleting(id)
    try {
      await adminService.projects.delete(id)
      // Refresh the data after deletion
      if (data) {
        await fetchProjects({ page: data.pagination.pages > 1 ? data.pagination.pages : 1 })
      }
    } catch (err) {
      console.error('[useProjects] Error deleting project:', err)
      setError('Failed to delete project')
    } finally {
      setDeleting(null)
    }
  }, [data, fetchProjects])

  // Initial fetch if no initial data
  useEffect(() => {
    if (!options.initialData) {
      fetchProjects()
    }
  }, [fetchProjects, options.initialData])

  return {
    data,
    loading,
    error,
    deleting,
    fetchProjects,
    deleteProject
  }
}
