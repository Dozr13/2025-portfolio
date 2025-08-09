"use client"

import { deleteProject, updateProject } from "@/app/actions/admin/projects"
import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout"
import type { ProjectCategory, ProjectStatus } from "@/lib/domain/enums"
import type { Project } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface EditProjectClientProps {
  initialData?: Project | null
}

interface ProjectFormData {
  title: string
  slug: string
  description: string
  longDescription: string
  category: string
  status: string
  featured: boolean
  demoUrl: string
  githubUrl: string
  client: string
  teamSize: string
  role: string
  order: string
}

export const EditProjectClient = ({ initialData }: EditProjectClientProps) => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    category: "WEB_APP",
    status: "COMPLETED",
    featured: false,
    demoUrl: "",
    githubUrl: "",
    client: "",
    teamSize: "",
    role: "",
    order: ""
  })

  console.log('[EditProjectClient] Current form data:', formData)

  // Initialize form data when initialData is available
  useEffect(() => {
    console.log('[EditProjectClient] Initial data received:', initialData)
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        longDescription: initialData.longDescription || "",
        category: initialData.category || "WEB_APP",
        status: initialData.status || "COMPLETED",
        featured: initialData.featured || false,
        demoUrl: initialData.demoUrl || "",
        githubUrl: initialData.githubUrl || "",
        client: initialData.client || "",
        teamSize: initialData.teamSize?.toString() || "",
        role: initialData.role || "",
        order: initialData.order?.toString() || ""
      })
    }
  }, [initialData])

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const updateField = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }

      // Auto-generate slug when title changes
      if (field === 'title') {
        newData.slug = generateSlug(value as string)
      }

      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim()) {
      setError("Project title is required")
      return
    }

    if (!initialData?.id) {
      setError("Project ID is missing")
      return
    }

    setSaving(true)
    try {
      await updateProject({
        id: initialData.id, ...{
          ...formData,
          category: formData.category as ProjectCategory,
          status: formData.status as ProjectStatus,
          teamSize: formData.teamSize ? parseInt(formData.teamSize) : null,
          order: formData.order ? parseInt(formData.order) : null
        }
      })

      router.push("/admin/projects")
    } catch (error) {
      console.error('[Project Edit] Error updating project:', error)
      setError("Failed to update project")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData?.id) return

    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return
    }

    setSaving(true)
    try {
      await deleteProject(initialData.id)
      router.push("/admin/projects")
    } catch (error) {
      console.error('[Project Edit] Error deleting project:', error)
      setError("Failed to delete project")
    } finally {
      setSaving(false)
    }
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <button
            onClick={() => router.push("/admin/projects")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <AdminFormLayout
      title="Edit Project"
      subtitle="Update project information"
      backHref="/admin/projects"
      backLabel="Back to Projects"
      onSubmit={handleSubmit}
      loading={saving}
      loadingText="Saving..."
      submitText="Save Changes"
      disabled={!formData.title}
      actionButtons={
        <button
          type="button"
          onClick={handleDelete}
          disabled={saving}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          Delete Project
        </button>
      }
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="project-url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Brief description of the project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Long Description</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => updateField('longDescription', e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Detailed description of the project"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="WEB_APP">Web App</option>
                <option value="MOBILE_APP">Mobile App</option>
                <option value="API">API</option>
                <option value="LIBRARY">Library</option>
                <option value="TOOL">Tool</option>
                <option value="WEBSITE">Website</option>
                <option value="ECOMMERCE">E-commerce</option>
                <option value="DASHBOARD">Dashboard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="MAINTAINED">Maintained</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => updateField('client', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Client name or company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Team Size</label>
              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) => updateField('teamSize', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Number of team members"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => updateField('role', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your role in the project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => updateField('order', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Display order"
              />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Demo URL</label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => updateField('demoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => updateField('githubUrl', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="featured" className="text-sm">Featured project</label>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </AdminFormLayout>
  )
}
