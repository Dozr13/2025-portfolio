"use client"
import { Icon, IconName } from "@/components/ui/icon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { adminService } from "@/lib/services/admin"
import Link from "next/link"
import { useState } from "react"
import { SkillCategory, SkillLevel } from '../../../../generated/client'

export default function NewSkill() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "FRONTEND",
    level: "INTERMEDIATE",
    years: "",
    description: "",
    icon: "",
    featured: false,
    order: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await adminService.skills.createSkill({
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
      console.error("Error creating skill:", error)
      alert("Failed to create skill")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const skillCategories = [
    { value: "FRONTEND", label: "Frontend" },
    { value: "BACKEND", label: "Backend" },
    { value: "DATABASE", label: "Database" },
    { value: "DEVOPS", label: "DevOps" },
    { value: "TOOLS", label: "Tools" },
    { value: "DESIGN", label: "Design" },
    { value: "SOFT_SKILLS", label: "Soft Skills" }
  ]

  const skillLevels = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
    { value: "EXPERT", label: "Expert" }
  ]

  const availableIcons = [
    { value: "code", label: "Code (Generic)" },
    { value: "atom", label: "React" },
    { value: "triangle", label: "Next.js" },
    { value: "code-2", label: "JavaScript" },
    { value: "server", label: "Server/Backend" },
    { value: "database", label: "Database" },
    { value: "cloud", label: "Cloud" },
    { value: "container", label: "Docker" },
    { value: "git-branch", label: "Git" },
    { value: "smartphone", label: "Mobile" },
    { value: "layers", label: "Layers/Vue" },
    { value: "layers-3", label: "Prisma" },
    { value: "zap", label: "Fast/Svelte" },
    { value: "share-2", label: "GraphQL" },
    { value: "workflow", label: "CI/CD" },
    { value: "figma", label: "Figma" },
    { value: "paintbrush", label: "Design" },
    { value: "palette", label: "Colors/CSS" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/skills" className="text-muted-foreground hover:text-foreground">
              <Icon name="arrow-left" className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Add New Skill</h1>
              <p className="text-muted-foreground">Add a new technical skill to your portfolio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., React, Python, Docker"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium mb-2">
                  Skill Level *
                </label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="years" className="block text-sm font-medium mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="years"
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  placeholder="e.g., 3"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="icon" className="block text-sm font-medium mb-2">
                  Icon
                </label>
                <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-icon">No icon</SelectItem>
                    {availableIcons.map(icon => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <div className="flex items-center gap-2">
                          <Icon name={icon.value as IconName} size="sm" />
                          {icon.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 1 (lower = shows first)"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of your experience with this skill"
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded border-border focus:ring-primary/50"
                />
                <span className="text-sm font-medium">Featured skill (show prominently)</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          {(formData.name || formData.icon) && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-background border border-border rounded-lg p-4 max-w-sm">
                <div className="flex items-start gap-3">
                  {formData.icon && (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={formData.icon as IconName} size="sm" className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{formData.name || "Skill Name"}</h4>
                      {formData.featured && (
                        <div className="w-2 h-2 bg-primary rounded-full" title="Featured skill" />
                      )}
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {formData.category.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {formData.level}
                      </span>
                    </div>
                    {formData.years && (
                      <p className="text-sm text-muted-foreground">{formData.years} years experience</p>
                    )}
                    {formData.description && (
                      <p className="text-sm text-muted-foreground mt-2">{formData.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || !formData.name}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="loader" className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Icon name="plus" className="h-4 w-4" />
                  Create Skill
                </>
              )}
            </button>
            <Link
              href="/admin/skills"
              className="text-muted-foreground hover:text-foreground px-4 py-2"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}