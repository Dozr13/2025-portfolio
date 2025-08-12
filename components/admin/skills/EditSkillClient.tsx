'use client'

import { deleteSkill, getSkill, updateSkill } from '@/app/actions/admin/skills'
import { AdminFormLayout } from '@/components/admin/forms/AdminFormLayout'
import { SkillFormData, SkillFormFields } from '@/components/admin/forms/SkillFormFields'
import { Button } from '@/components/ui/Button'
import type { SkillCategory, SkillLevel } from '@/lib/domain/enums'
import type { Skill } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface EditSkillClientProps {
  initialData?: Skill | null
}

export const EditSkillClient = ({ initialData }: EditSkillClientProps) => {
  const router = useRouter()
  const [skillData, setSkillData] = useState<Skill | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'FRONTEND',
    level: 'INTERMEDIATE',
    years: '',
    description: '',
    icon: '',
    featured: false,
    order: ''
  })

  // Initialize form data when skill data is available
  useEffect(() => {
    if (skillData) {
      setFormData({
        name: skillData.name || '',
        category: skillData.category || 'FRONTEND',
        level: skillData.level || 'INTERMEDIATE',
        years: skillData.years ? skillData.years.toString() : '',
        description: skillData.description || '',
        icon: skillData.icon || 'no-icon',
        featured: skillData.featured || false,
        order: skillData.order ? skillData.order.toString() : ''
      })
    }
  }, [skillData])

  // Fetch skill data if not provided
  useEffect(() => {
    if (!initialData && skillData?.id) {
      const fetchSkill = async () => {
        try {
          setLoading(true)
          const { skill } = await getSkill(skillData.id)
          // Normalize dates to strings to satisfy UI type expectations
          setSkillData({
            ...skill,
            createdAt:
              typeof skill.createdAt === 'string' ? new Date(skill.createdAt) : skill.createdAt,
            updatedAt:
              typeof skill.updatedAt === 'string' ? new Date(skill.updatedAt) : skill.updatedAt
          } as unknown as Skill)
        } catch (error) {
          console.error('[Skills Edit] Error fetching skill:', error)
          setError('Failed to load skill')
          router.push('/admin/skills')
        } finally {
          setLoading(false)
        }
      }

      fetchSkill()
    }
  }, [initialData, skillData?.id, router])

  const updateField = (field: keyof SkillFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError('Skill name is required')
      return
    }

    if (!skillData?.id) {
      setError('Skill ID not found')
      return
    }

    setSubmitting(true)
    try {
      await updateSkill(skillData.id, {
        name: formData.name,
        category: formData.category as SkillCategory,
        level: formData.level as SkillLevel,
        years: formData.years ? parseInt(formData.years) : null,
        description: formData.description || null,
        icon: formData.icon === 'no-icon' ? null : formData.icon || null,
        featured: formData.featured,
        order: formData.order ? parseInt(formData.order) : null
      })

      router.push('/admin/skills')
    } catch (error) {
      console.error('[Skills Edit] Error updating skill:', error)
      setError('Failed to update skill')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!skillData?.id) return

    if (!confirm(`Are you sure you want to delete "${skillData.name}"?`)) return

    setSubmitting(true)
    try {
      await deleteSkill(skillData.id)
      router.push('/admin/skills')
    } catch (error) {
      console.error('[Skills Edit] Error deleting skill:', error)
      setError('Failed to delete skill')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading skill...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminFormLayout
      title="Edit Skill"
      subtitle={`Update your technical skill: ${skillData?.name || ''}`}
      backHref="/admin/skills"
      backLabel="Back to Skills"
      onSubmit={handleSubmit}
      loading={submitting}
      loadingText="Updating..."
      submitText="Update Skill"
      disabled={!formData.name}
      actionButtons={
        <Button
          type="button"
          onClick={handleDelete}
          disabled={submitting}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Skill
        </Button>
      }
    >
      <SkillFormFields formData={formData} onChange={updateField} showPreview={true} />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </AdminFormLayout>
  )
}
