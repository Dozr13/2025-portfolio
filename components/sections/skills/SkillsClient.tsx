'use client'

import { SkillsDisplay } from '@/components/ui/skillsDisplay'
import { SkillsClientProps } from '@/lib/types/sections'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const SkillsClient = ({ skills, mode = 'full', immediate = false }: SkillsClientProps) => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology stack with {skills.length}+ technologies across the full
            development lifecycle
          </p>
        </motion.div>

        <SkillsDisplay
          skills={skills}
          showCategories={true}
          mode={mode}
          showAllTab={mode !== 'preview'}
          className="max-w-7xl mx-auto"
        />

        {mode === 'preview' && (
          <div className="text-center mt-8">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
            >
              See all skills
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
