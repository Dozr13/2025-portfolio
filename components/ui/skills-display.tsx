"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Icon, IconName } from './icon'

interface Skill {
  id: string
  name: string
  category: string
  level: string
  years: number
  icon: string
  featured: boolean
  order: number
}

interface SkillsDisplayProps {
  skills: Skill[]
  showCategories?: boolean
  limit?: number
  className?: string
}

const levelColors = {
  EXPERT: 'bg-green-500',
  ADVANCED: 'bg-blue-500',
  INTERMEDIATE: 'bg-yellow-500',
  BEGINNER: 'bg-gray-500'
}

const categoryNames = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
  TOOLS: 'Tools',
  DESIGN: 'Design',
  SOFT_SKILLS: 'Soft Skills'
}

export function SkillsDisplay({
  skills,
  showCategories = true,
  limit,
  className = ""
}: SkillsDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Get skills to display
  const getDisplaySkills = () => {
    let displaySkills = selectedCategory
      ? skillsByCategory[selectedCategory] || []
      : skills

    // Sort by featured first, then by order
    displaySkills = displaySkills.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.order - b.order
    })

    // Apply limit if not showing all
    if (limit && !showAll) {
      displaySkills = displaySkills.slice(0, limit)
    }

    return displaySkills
  }

  const displaySkills = getDisplaySkills()
  const categories = Object.keys(skillsByCategory)
  const hasMore = limit && skills.length > limit && !showAll

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter */}
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${!selectedCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
          >
            All Skills
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {categoryNames[category as keyof typeof categoryNames]} ({skillsByCategory[category].length})
            </button>
          ))}
        </div>
      )}

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {displaySkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {skill.icon ? (
                    <Icon name={skill.icon as IconName} size="sm" className="text-primary" />
                  ) : (
                    <Icon name="code" size="sm" className="text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{skill.name}</h3>
                    {skill.featured && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" title="Featured skill" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${levelColors[skill.level as keyof typeof levelColors]}`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {skill.level.toLowerCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {skill.years}y
                    </span>
                  </div>

                  {showCategories && (
                    <span className="text-xs text-muted-foreground">
                      {categoryNames[skill.category as keyof typeof categoryNames]}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More/Less Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            {showAll ? 'Show Less' : `Show All ${skills.length} Skills`}
          </button>
        </div>
      )}
    </div>
  )
}