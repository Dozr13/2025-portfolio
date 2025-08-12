"use client"

import { PublicExperience } from "@/lib/types/public"
import { motion } from "framer-motion"
import { ExperienceTimeline } from "./ExperienceTimeline"

export const ExperienceClient = ({
  experiences,
  immediate = false
}: { experiences: PublicExperience[]; immediate?: boolean }) => {
  const hasItems = experiences && experiences.length > 0
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey and the experiences that shaped my career
          </p>
        </motion.div>

        {!hasItems ? (
          <div className="text-center text-muted-foreground">No experience entries found.</div>
        ) : (
          <ExperienceTimeline experiences={experiences} immediate={immediate} />
        )}
      </div>
    </section>
  )
}
