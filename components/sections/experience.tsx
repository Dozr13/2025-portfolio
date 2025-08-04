"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    location: "Remote",
    description: "Leading development of scalable web applications and mentoring junior developers.",
    achievements: [
      "Architected microservices infrastructure serving 100K+ users",
      "Reduced application load time by 60% through optimization",
      "Led team of 5 developers in agile environment",
      "Implemented CI/CD pipeline reducing deployment time by 80%"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations",
    period: "2020 - 2022",
    location: "San Francisco, CA",
    description: "Developed and maintained full-stack applications using modern technologies.",
    achievements: [
      "Built responsive web applications using React and Node.js",
      "Integrated third-party APIs and payment systems",
      "Improved code quality through test-driven development",
      "Collaborated with UX/UI team to enhance user experience"
    ]
  },
  {
    title: "Software Developer",
    company: "StartupXYZ",
    period: "2019 - 2020",
    location: "Austin, TX",
    description: "Contributed to product development and learned modern web technologies.",
    achievements: [
      "Developed features for customer-facing web application",
      "Participated in code reviews and team planning sessions",
      "Learned React, TypeScript, and cloud technologies",
      "Transitioned into professional development role"
    ]
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Icon name="calendar" size="sm" />
                      <span>{experience.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {experience.title}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <span className="font-medium">{experience.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Icon name="map-pin" size="xs" />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {experience.description}
                    </p>

                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 