"use client"

import { Icon, IconName } from "@/components/ui/icon"
import { adminService } from "@/lib/services/admin"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Skill {
  id: string
  name: string
  category: string
  level: string
  years: number | null
  description: string | null
  icon: string | null
  featured: boolean
  order: number | null
  createdAt: string
  updatedAt: string
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const data = await adminService.skills.fetchSkills()
      setSkills(data.skills || [])
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    setDeleting(id)
    try {
      await adminService.skills.deleteSkill(id)
      setSkills(skills.filter(skill => skill.id !== id))
    } catch (error) {
      console.error('Error deleting skill:', error)
      alert('Failed to delete skill')
    } finally {
      setDeleting(null)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      FRONTEND: 'bg-blue-100 text-blue-800',
      BACKEND: 'bg-green-100 text-green-800',
      DATABASE: 'bg-purple-100 text-purple-800',
      DEVOPS: 'bg-orange-100 text-orange-800',
      TOOLS: 'bg-gray-100 text-gray-800',
      DESIGN: 'bg-pink-100 text-pink-800',
      SOFT_SKILLS: 'bg-indigo-100 text-indigo-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getLevelColor = (level: string) => {
    const colors = {
      BEGINNER: 'bg-red-100 text-red-800',
      INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
      ADVANCED: 'bg-blue-100 text-blue-800',
      EXPERT: 'bg-green-100 text-green-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="loader" className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
                <Icon name="arrow-left" className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Skills Management</h1>
                <p className="text-muted-foreground">Manage your technical skills and expertise</p>
              </div>
            </div>
            <Link
              href="/admin/skills/new"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              <Icon name="plus" className="h-4 w-4" />
              Add Skill
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {skills.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="code" className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No skills yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first technical skill</p>
            <Link
              href="/admin/skills/new"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 inline-flex items-center gap-2"
            >
              <Icon name="plus" className="h-4 w-4" />
              Add Your First Skill
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {skill.icon && (
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={skill.icon as IconName} size="sm" className="text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      {skill.years && (
                        <p className="text-sm text-muted-foreground">{skill.years} years</p>
                      )}
                    </div>
                  </div>
                  {skill.featured && (
                    <div className="w-2 h-2 bg-primary rounded-full" title="Featured skill" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(skill.category)}`}>
                    {skill.category.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                {skill.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{skill.description}</p>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Link
                    href={`/admin/skills/edit/${skill.id}`}
                    className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                  >
                    <Icon name="square-pen" size="xs" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id, skill.name)}
                    disabled={deleting === skill.id}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 disabled:opacity-50"
                  >
                    {deleting === skill.id ? (
                      <Icon name="loader" size="xs" className="animate-spin" />
                    ) : (
                      <Icon name="trash-2" size="xs" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}