'use client'

import { listCaseStudies } from '@/app/actions/admin/case-studies'
import type { CaseStudy } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'

interface CaseStudiesData {
  caseStudies: CaseStudy[]
  pagination: {
    pages: number
    total: number
  }
}

interface CaseStudyFilters {
  page: number
  search?: string
  featured?: string
}

interface UseCaseStudiesOptions {
  initialData?: CaseStudiesData | null
}

export const useCaseStudies = (options: UseCaseStudiesOptions = {}) => {
  const [data, setData] = useState<CaseStudiesData>(
    options.initialData || { caseStudies: [], pagination: { pages: 0, total: 0 } }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchCaseStudies = useCallback(async (filters: CaseStudyFilters = { page: 1 }) => {
    setLoading(true)
    setError(null)

    try {
      const params: Record<string, string> = {
        page: filters.page.toString(),
        limit: '10'
      }
      if (filters.search) params.search = filters.search
      if (filters.featured) params.featured = filters.featured

      const result = await listCaseStudies()
      setData(result)
    } catch (err) {
      console.error('[useCaseStudies] Error fetching case studies:', err)
      setError('Failed to fetch case studies')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCaseStudy = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return false

    setDeleting(id)
    try {
      await deleteCaseStudy(id, name)
      setData((prev) => ({
        ...prev,
        caseStudies: prev.caseStudies.filter((cs) => cs.id !== id)
      }))
      return true
    } catch (error) {
      console.error('[Case Studies Hook] Error deleting case study:', error)
      setError('Failed to delete case study')
      return false
    } finally {
      setDeleting(null)
    }
  }, [])

  useEffect(() => {
    if (!options.initialData) {
      fetchCaseStudies()
    }
  }, [fetchCaseStudies, options.initialData])

  return {
    data,
    loading,
    error,
    deleting,
    fetchCaseStudies,
    deleteCaseStudy
  }
}
