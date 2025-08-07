"use client"

import { Icon } from "@/components/ui/icon"
import { useProjects } from "@/hooks/useProjects"
import type { Project } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"
import { ProjectsCard } from "./ProjectsCard"

interface ProjectsData {
  projects: Project[]
  pagination: {
    pages: number
    total: number
  }
}

interface ProjectsContentProps {
  initialData?: ProjectsData | null
}

export const ProjectsContent = ({ initialData }: ProjectsContentProps) => {
  const { data, loading, error, deleting, fetchProjects, deleteProject } = useProjects({
    initialData
  })

  const [searchInput, setSearchInput] = useState("")
  const [filters, setFilters] = useState({
    page: 1,
    status: "",
    category: ""
  })

  const projects = data?.projects || []
  const totalPages = data?.pagination?.pages || 1

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setFilters(prev => ({ ...prev, page: 1 }))
    fetchProjects({ ...filters, page: 1, search: value })
  }

  const handleFilterChange = (filter: string, value: string) => {
    setFilters(prev => ({ ...prev, [filter]: value, page: 1 }))
    fetchProjects({ ...filters, [filter]: value, page: 1, search: searchInput })
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
    fetchProjects({ ...filters, page, search: searchInput })
  }

  const handleDelete = (id: string) => {
    deleteProject(id)
  }

  if (loading && !initialData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchProjects()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
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
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
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

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="briefcase" size="lg" className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchInput || filters.status || filters.category
              ? "Try adjusting your search or filters"
              : "Get started by creating your first project"
            }
          </p>
          {!searchInput && !filters.status && !filters.category && (
            <Link
              href="/admin/projects/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectsCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
              deleting={deleting}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {filters.page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, filters.page + 1))}
              disabled={filters.page === totalPages}
              className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
