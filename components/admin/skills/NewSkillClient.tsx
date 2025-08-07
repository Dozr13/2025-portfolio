"use client"

import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout"
import { SkillFormData, SkillFormFields } from "@/components/admin/forms/SkillFormFields"
import { SkillCategory, SkillLevel } from '@/generated/client'
import { useAdminForm } from "@/hooks/useAdminForm"
import { adminService } from "@/lib/services/admin"
import { useRouter } from "next/navigation"

export const NewSkillClient = () => {
  const router = useRouter()

  const initialData: SkillFormData = {
    name: "",
    category: "FRONTEND",
    level: "INTERMEDIATE",
    years: "",
    description: "",
    icon: "",
    featured: false,
    order: ""
  }

  const handleSubmit = async (data: SkillFormData) => {
    await adminService.skills.createSkill({
      name: data.name,
      category: data.category as SkillCategory,
      level: data.level as SkillLevel,
      years: data.years ? parseInt(data.years) : null,
      description: data.description || null,
      icon: data.icon === "no-icon" ? null : data.icon || null,
      featured: data.featured,
      order: data.order ? parseInt(data.order) : null
    })

    router.push("/admin/skills")
  }

  const validateData = (data: SkillFormData): string | null => {
    if (!data.name.trim()) {
      return "Skill name is required"
    }
    return null
  }

  const { formData, updateField, handleSubmit: onSubmit, loading, error } = useAdminForm({
    initialData,
    onSubmit: handleSubmit,
    validateData
  })

  return (
    <AdminFormLayout
      title="Add New Skill"
      subtitle="Add a new technical skill to your portfolio"
      backHref="/admin/skills"
      backLabel="Back to Skills"
      onSubmit={onSubmit}
      loading={loading}
      loadingText="Creating..."
      submitText="Create Skill"
      disabled={!formData.name}
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
  )
}
