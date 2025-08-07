import { Icon } from "@/components/ui/icon"
import type { Project } from "@/lib/types"
import Link from "next/link"

interface ProjectsCardProps {
  project: Project
  onDelete: (id: string, title: string) => void
  deleting: string | null
}

export const ProjectsCard = ({ project, onDelete, deleting }: ProjectsCardProps) => {
  const isDeleting = deleting === project.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "PLANNING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "MAINTAINED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            {project.featured && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{project.category.replace(/_/g, " ")}</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
              {project.status.replace(/_/g, " ")}
            </span>
            {project._count && (
              <>
                <span>•</span>
                <span>{project._count.projectViews} views</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/projects/edit/${project.id}`}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="square-pen" size="sm" />
          </Link>
          <button
            onClick={() => onDelete(project.id, project.title)}
            disabled={isDeleting}
            className="p-2 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
          >
            <Icon name="trash-2" size="sm" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Icon name="external-link" size="xs" />
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Icon name="github" size="xs" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
