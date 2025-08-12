'use client'

import { listProjects } from '@/app/actions/admin/projects'
import type { Project } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'

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

      const result = await listProjects({
        page: parseInt(params.page || '1'),
        limit: parseInt(params.limit || '10'),
        status: params.status || null,
        category: params.category || null,
        search: params.search || null
      } as ProjectFilters)
      type ActionProject = {
        id: string
        title: string
        slug: string
        description: string
        longDescription?: string | null
        category: string
        status: string
        featured: boolean
        demoUrl?: string | null
        githubUrl?: string | null
        images?: string | null
        thumbnail?: string | null
        startDate: Date | null
        endDate: Date | null
        client?: string | null
        teamSize?: number | null
        role?: string | null
        challenges?: string | null
        solutions?: string | null
        metrics?: string | null
        order?: number | null
        createdAt: Date
        updatedAt: Date | null
        _count?: { projectViews: number }
      }
      const normalized: ProjectsData = {
        projects: (result.projects as ActionProject[]).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          description: p.description,
          longDescription: p.longDescription ?? null,
          category: p.category,
          status: p.status,
          featured: p.featured,
          demoUrl: p.demoUrl ?? null,
          githubUrl: p.githubUrl ?? null,
          images: p.images ?? null,
          thumbnail: p.thumbnail ?? null,
          startDate: p.startDate ?? null,
          endDate: p.endDate ?? null,
          client: p.client ?? null,
          teamSize: p.teamSize ?? null,
          role: p.role ?? null,
          challenges: p.challenges ?? null,
          solutions: p.solutions ?? null,
          metrics: p.metrics ?? null,
          order: p.order ?? null,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          _count: p._count
        })),
        pagination: result.pagination
      }
      setData(normalized)
    } catch (err) {
      console.error('[useProjects] Error fetching projects:', err)
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProject = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this project?')) return

      setDeleting(id)
      try {
        await deleteProject(id)
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
    },
    [data, fetchProjects]
  )

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
