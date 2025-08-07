import { Icon, IconName } from "@/components/ui/icon"
import type { Skill } from "@/lib/types"
import Link from "next/link"

interface SkillsCardProps {
  skill: Skill
  onDelete: (id: string, name: string) => void
  deleting: string | null
}

export const SkillsCard = ({ skill, onDelete, deleting }: SkillsCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      FRONTEND: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      BACKEND: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      DATABASE: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      DEVOPS: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      TOOLS: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      DESIGN: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      SOFT_SKILLS: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  const getLevelColor = (level: string) => {
    const colors = {
      BEGINNER: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      INTERMEDIATE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      ADVANCED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      EXPERT: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
              <Icon name={skill.icon as IconName} className="h-4 w-4 text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-semibold">{skill.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(skill.category)}`}>
                {skill.category.replace('_', ' ')}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>
          </div>
        </div>
        {skill.featured && (
          <Icon name="check-circle" className="h-4 w-4 text-yellow-500" />
        )}
      </div>

      {skill.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {skill.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {skill.years ? `${skill.years} years` : 'No experience specified'}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/skills/edit/${skill.id}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="square-pen" className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(skill.id, skill.name)}
            disabled={deleting === skill.id}
            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            <Icon
              name={deleting === skill.id ? "loader" : "trash-2"}
              className={`h-4 w-4 ${deleting === skill.id ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
