"use client"

import { Icon } from "@/components/ui/icon"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProjectData {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  category: string
  status: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string | null
  client: string | null
  teamSize: number | null
  role: string | null
  order: number | null
  createdAt: string
  updatedAt: string
}

export default function EditProject({ params }: { params: { id: string } }) {
  const { user, isLoading: authLoading, isAuthenticated, redirectToLogin } = useAdminAuth()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      redirectToLogin()
    }
  }, [authLoading, isAuthenticated, redirectToLogin])

  // Fetch project data
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchProject()
    }
  }, [authLoading, isAuthenticated, params.id])

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProjectData(data.project)
      } else {
        console.error("Failed to fetch project")
        router.push("/admin/projects")
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      router.push("/admin/projects")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectData) return

    setSaving(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...projectData,
          teamSize: projectData.teamSize || null,
          order: projectData.order || null
        }),
      })

      if (response.ok) {
        router.push("/admin/projects")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to update project")
      }
    } catch (error) {
      console.error("Error updating project:", error)
      alert("Failed to update project")
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof ProjectData, value: string | boolean | number | null) => {
    if (!projectData) return

    setProjectData(prev => prev ? {
      ...prev,
      [field]: value
    } : null)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !projectData) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/projects"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Projects
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold">Edit Project</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title *</label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={projectData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="project-url-slug"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={projectData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                >
                  <option value="WEB_APP">Web Application</option>
                  <option value="MOBILE_APP">Mobile Application</option>
                  <option value="DESKTOP_APP">Desktop Application</option>
                  <option value="API">API/Backend</option>
                  <option value="LIBRARY">Library/Package</option>
                  <option value="TOOL">Tool/Utility</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status *</label>
                <select
                  value={projectData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                >
                  <option value="COMPLETED">Completed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="PLANNED">Planned</option>
                  <option value="ON_HOLD">On Hold</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Short Description *</label>
              <textarea
                value={projectData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Brief description of the project"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <textarea
                value={projectData.longDescription || ""}
                onChange={(e) => updateField("longDescription", e.target.value)}
                rows={6}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Detailed project description, features, technologies used, etc."
              />
            </div>
          </div>

          {/* Links and URLs */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Links & URLs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Demo URL</label>
                <input
                  type="url"
                  value={projectData.demoUrl || ""}
                  onChange={(e) => updateField("demoUrl", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://project-demo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={projectData.githubUrl || ""}
                  onChange={(e) => updateField("githubUrl", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Project Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <input
                  type="text"
                  value={projectData.client || ""}
                  onChange={(e) => updateField("client", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team Size</label>
                <input
                  type="number"
                  value={projectData.teamSize || ""}
                  onChange={(e) => updateField("teamSize", e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="1"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={projectData.order || ""}
                  onChange={(e) => updateField("order", e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="1"
                  min="1"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Your Role</label>
              <input
                type="text"
                value={projectData.role || ""}
                onChange={(e) => updateField("role", e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Full Stack Developer, Frontend Developer, etc."
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Settings</h2>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={projectData.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </label>
              <span className="text-xs text-muted-foreground ml-2">
                (Will be displayed prominently on homepage)
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Project Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>Created: {new Date(projectData.createdAt).toLocaleDateString()}</div>
              <div>Last Updated: {new Date(projectData.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/projects"
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}