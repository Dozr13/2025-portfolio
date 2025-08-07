"use client"

import { Icon } from "@/components/ui/icon"
import { useSkills } from "@/hooks/useSkills"
import type { Skill } from "@/lib/types"
import Link from "next/link"
import { SkillsCard } from "./SkillsCard"

interface SkillsContentProps {
  initialData?: Skill[] | null
}

export const SkillsContent = ({ initialData }: SkillsContentProps) => {
  const { skills, loading, error, deleting, deleteSkill } = useSkills({ initialData })

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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="alert-circle" className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Skills</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
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
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Icon name="plus" className="h-4 w-4 mr-2" />
              Add Skill
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {skills.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="code" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No skills yet</h3>
            <p className="text-muted-foreground mb-6">Get started by adding your first technical skill</p>
            <Link
              href="/admin/skills/new"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Icon name="plus" className="h-4 w-4 mr-2" />
              Add Your First Skill
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillsCard
                key={skill.id}
                skill={skill}
                onDelete={deleteSkill}
                deleting={deleting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
