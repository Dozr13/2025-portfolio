"use client"

import { Icon } from "@/components/ui/icon"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  status: string
  featured: boolean
  demoUrl?: string
  githubUrl?: string
  createdAt: string
  updatedAt: string
  _count: {
    projectViews: number
  }
}

export default function ProjectsManagement() {
  const { user, isLoading: authLoading, isAuthenticated, redirectToLogin } = useAdminAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  console.log("[PROJECTS PAGE] Component state:", {
    authLoading,
    isAuthenticated,
    user: user?.username,
    loading
  })

  // Redirect if not authenticated
  useEffect(() => {
    console.log("[PROJECTS PAGE] Auth effect:", { authLoading, isAuthenticated })
    if (!authLoading && !isAuthenticated) {
      console.log("[PROJECTS PAGE] Not authenticated, redirecting...")
      redirectToLogin()
    }
  }, [authLoading, isAuthenticated, redirectToLogin])

  const fetchProjects = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10"
      })

      if (searchTerm) params.append("search", searchTerm)
      if (statusFilter) params.append("status", statusFilter)
      if (categoryFilter) params.append("category", categoryFilter)

      const response = await fetch(`/api/admin/projects?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, statusFilter, categoryFilter])

  useEffect(() => {
    console.log("[PROJECTS PAGE] Data fetch effect:", { authLoading, isAuthenticated })
    if (!authLoading && isAuthenticated) {
      console.log("[PROJECTS PAGE] Authenticated, fetching projects...")
      fetchProjects()
    }
  }, [authLoading, isAuthenticated, page, searchTerm, statusFilter, categoryFilter, fetchProjects])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })

      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "/admin"
  }

  if (authLoading || loading) {
    console.log("[PROJECTS PAGE] Showing loading state:", { authLoading, loading })
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log("[PROJECTS PAGE] Not authenticated, should redirect...")
    return null // This should not render as useEffect will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Dashboard
              </Link>
              <div className="w-px h-6 bg-border"></div>
              <h1 className="text-2xl font-bold">Projects Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Statuses</option>
            <option value="PLANNING">Planning</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="MAINTAINED">Maintained</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Categories</option>
            <option value="WEB_APP">Web App</option>
            <option value="MOBILE_APP">Mobile App</option>
            <option value="API">API</option>
            <option value="LIBRARY">Library</option>
            <option value="TOOL">Tool</option>
            <option value="WEBSITE">Website</option>
            <option value="ECOMMERCE">E-commerce</option>
            <option value="DASHBOARD">Dashboard</option>
          </select>
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            New Project
          </Link>
        </div>

        {/* Projects Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{project.title}</h3>
                          {project.featured && (
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {project.category.replace(/_/g, " ")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${project.status === "COMPLETED"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : project.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}>
                        {project.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {project._count.projectViews}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Icon name="square-pen" size="sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Icon name="trash-2" size="sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}