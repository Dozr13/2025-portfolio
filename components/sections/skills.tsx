"use client"

import { motion } from "framer-motion"

const skills = [
  // Frontend & UI
  { name: "React/Next.js", level: 95, category: "Frontend", years: "6+" },
  { name: "TypeScript", level: 95, category: "Frontend", years: "5+" },
  { name: "Tailwind CSS", level: 90, category: "Frontend", years: "4+" },
  { name: "Vue.js/Nuxt", level: 85, category: "Frontend", years: "3+" },
  { name: "Web Components", level: 90, category: "Frontend", years: "4+" },
  { name: "Three.js/WebGL", level: 80, category: "Frontend", years: "2+" },

  // Backend & APIs
  { name: "Node.js/Express", level: 90, category: "Backend", years: "5+" },
  { name: "Python/FastAPI", level: 85, category: "Backend", years: "4+" },
  { name: "GraphQL", level: 88, category: "Backend", years: "3+" },
  { name: "REST APIs", level: 95, category: "Backend", years: "6+" },
  { name: "Microservices", level: 85, category: "Backend", years: "3+" },
  { name: "Serverless", level: 80, category: "Backend", years: "2+" },

  // Databases & Storage
  { name: "PostgreSQL", level: 88, category: "Database", years: "5+" },
  { name: "MongoDB", level: 85, category: "Database", years: "4+" },
  { name: "Redis", level: 82, category: "Database", years: "3+" },
  { name: "Elasticsearch", level: 75, category: "Database", years: "2+" },
  { name: "Prisma/Drizzle", level: 90, category: "Database", years: "3+" },

  // Cloud & DevOps
  { name: "AWS Cloud", level: 88, category: "Cloud", years: "4+" },
  { name: "Docker/K8s", level: 85, category: "DevOps", years: "4+" },
  { name: "GitHub Actions", level: 90, category: "DevOps", years: "4+" },
  { name: "Terraform", level: 78, category: "DevOps", years: "2+" },
  { name: "Monitoring/Logs", level: 80, category: "DevOps", years: "3+" },

  // Mobile & Cross-Platform
  { name: "React Native", level: 85, category: "Mobile", years: "3+" },
  { name: "Flutter", level: 80, category: "Mobile", years: "2+" },
  { name: "PWA Development", level: 88, category: "Mobile", years: "4+" },

  // AI/ML & Data
  { name: "OpenAI API", level: 85, category: "AI/ML", years: "1+" },
  { name: "LangChain", level: 80, category: "AI/ML", years: "1+" },
  { name: "Vector Databases", level: 75, category: "AI/ML", years: "1+" },
  { name: "Data Visualization", level: 82, category: "Data", years: "3+" },

  // Testing & Quality
  { name: "Jest/Vitest", level: 88, category: "Testing", years: "4+" },
  { name: "Cypress/Playwright", level: 85, category: "Testing", years: "3+" },
  { name: "Storybook", level: 82, category: "Testing", years: "3+" },
]

const categories = [
  "Frontend", "Backend", "Database", "Cloud", "DevOps", 
  "Mobile", "AI/ML", "Data", "Testing"
]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div>
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
            Comprehensive technology stack with 30+ technologies across the full development lifecycle
          </p>
        </motion.div>

        {/* Category Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary"
              >
                {category} ({skills.filter(skill => skill.category === category).length})
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full"></div>
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05, 
                        duration: 0.5 
                      }}
                      viewport={{ once: true }}
                      className="glass p-4 rounded-xl hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                            {skill.name}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {skill.years} experience
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3, 
                            duration: 0.8, 
                            ease: "easeOut" 
                          }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 