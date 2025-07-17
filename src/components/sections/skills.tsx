"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "React/Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 95, category: "Language" },
  { name: "Python", level: 85, category: "Language" },
  { name: "AWS Cloud", level: 85, category: "Cloud" },
  { name: "PostgreSQL", level: 80, category: "Database" },
  { name: "Web Components", level: 90, category: "Frontend" },
]

// const categories = ["Frontend", "Language", "Cloud", "Database"]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are the technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-primary font-medium">
                    {skill.category}
                  </span>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 