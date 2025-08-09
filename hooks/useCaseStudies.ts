"use client"

import { listCaseStudies } from "@/app/actions/admin/case-studies"
import type { CaseStudy } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"

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

export function useCaseStudies(options: UseCaseStudiesOptions = {}) {
  const [data, setData] = useState<CaseStudiesData | null>(options.initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleting] = useState<string | null>(null)

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

  const deleteCaseStudy = useCallback(async () => {
    alert('Case study deletion is managed in code and is not yet supported.')
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
