"use client"

import { listSkills } from "@/app/actions/admin/skills"
import type { Skill } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"

interface UseSkillsOptions {
  initialData?: Skill[] | null
}

export function useSkills(options: UseSkillsOptions = {}) {
  const { initialData } = options
  const [skills, setSkills] = useState<Skill[]>(initialData || [])
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('[Skills Hook] Fetching skills from API...')
      const data = await listSkills()
      setSkills(data.skills || [])
      console.log('[Skills Hook] Skills fetched successfully:', data.skills?.length || 0, 'skills')
    } catch (error) {
      console.error('[Skills Hook] Error fetching skills:', error)
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteSkill = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return false

    setDeleting(id)
    try {
      await deleteSkill(id, name)
      setSkills(prev => prev.filter(skill => skill.id !== id))
      return true
    } catch (error) {
      console.error('[Skills Hook] Error deleting skill:', error)
      setError('Failed to delete skill')
      return false
    } finally {
      setDeleting(null)
    }
  }, [])

  const refresh = useCallback(() => {
    fetchSkills()
  }, [fetchSkills])

  // Initial fetch if no initial data
  useEffect(() => {
    if (!initialData) {
      fetchSkills()
    }
  }, [fetchSkills, initialData])

  return {
    skills,
    loading,
    error,
    deleting,
    deleteSkill,
    refresh,
    refetch: fetchSkills
  }
}
