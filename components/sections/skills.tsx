"use client"

import { SkillsDisplay } from "@/components/ui/skills-display"
import { skillsService } from "@/lib/services/public"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillsService.fetchSkills()
        setSkills(data.skills)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology stack with {skills.length}+ technologies across the full development lifecycle
          </p>
        </motion.div>

        <SkillsDisplay
          skills={skills}
          showCategories={true}
          limit={12}
          className="max-w-7xl mx-auto"
        />
      </div>
    </section>
  )
} 