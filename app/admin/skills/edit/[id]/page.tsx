"use client"

import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout"
import { SkillFormData, SkillFormFields } from "@/components/admin/forms/SkillFormFields"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { Icon } from "@/components/ui/icon"
import { SkillCategory, SkillLevel } from '@/generated/client'
import { adminService } from "@/lib/services/admin"
import { use, useEffect, useState } from "react"

interface SkillData {
  id: string
  name: string
  category: string
  level: string
  years: number | null
  description: string | null
  icon: string | null
  featured: boolean
  order: number | null
}

export default function EditSkill({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [skillData, setSkillData] = useState<SkillData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    category: "FRONTEND",
    level: "INTERMEDIATE",
    years: "",
    description: "",
    icon: "",
    featured: false,
    order: ""
  })

  // Fetch skill data once on mount
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true)
        const data = await adminService.skills.fetchOne(resolvedParams.id)
        const skill = (data as { skill: SkillData }).skill
        setSkillData(skill)

        // Update form data with fetched skill
        setFormData({
          name: skill.name || "",
          category: skill.category || "FRONTEND",
          level: skill.level || "INTERMEDIATE",
          years: skill.years ? skill.years.toString() : "",
          description: skill.description || "",
          icon: skill.icon || "no-icon",
          featured: skill.featured || false,
          order: skill.order ? skill.order.toString() : ""
        })
      } catch (error) {
        console.error('Error fetching skill:', error)
        setError('Failed to load skill')
        window.location.href = '/admin/skills'
      } finally {
        setLoading(false)
      }
    }

    fetchSkill()
  }, [resolvedParams.id])

  const updateField = (field: keyof SkillFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError("Skill name is required")
      return
    }

    setSubmitting(true)
    try {
      await adminService.skills.updateSkill(resolvedParams.id, {
        name: formData.name,
        category: formData.category as SkillCategory,
        level: formData.level as SkillLevel,
        years: formData.years ? parseInt(formData.years) : null,
        description: formData.description || null,
        icon: formData.icon === "no-icon" ? null : formData.icon || null,
        featured: formData.featured,
        order: formData.order ? parseInt(formData.order) : null
      })

      window.location.href = "/admin/skills"
    } catch (error) {
      console.error("Error updating skill:", error)
      setError("Failed to update skill")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!skillData) return

    if (confirm(`Are you sure you want to delete "${skillData.name}"?`)) {
      try {
        await fetch(`/api/admin/skills/${resolvedParams.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        })
        window.location.href = '/admin/skills'
      } catch (error) {
        console.error('Error deleting skill:', error)
        alert('Failed to delete skill')
      }
    }
  }

  return (
    <AdminPageWrapper
      loading={loading}
      loadingMessage="Loading Skill to Edit..."
      error={!skillData ? "Skill not found" : null}
      errorTitle="Skill not found"
      errorMessage="The skill you're looking for doesn't exist"
      backHref="/admin/skills"
      backLabel="Back to Skills"
    >
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
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 px-4 py-2 flex items-center gap-2"
          >
            <Icon name="trash-2" className="h-4 w-4" />
            Delete Skill
          </button>
        }
      >
        <SkillFormFields
          formData={formData}
          onChange={updateField}
          showPreview={true}
        />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </AdminFormLayout>
    </AdminPageWrapper>
  )
}