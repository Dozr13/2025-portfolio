"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Resource Data Inc.",
    location: "Meridian, Idaho",
    period: "2020 - Present",
    description: "Leading software engineering initiatives and infrastructure development. Specializing in modern web technologies while driving technical innovation and team leadership.",
    achievements: [
      "Led infrastructure modernization projects",
      "Mentored development teams on best practices",
      "Architected scalable application solutions"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Previous Company",
    location: "Remote",
    period: "2018 - 2020",
    description: "Developed and maintained full-stack applications using React, TypeScript, and Python. Focused on creating efficient, scalable solutions for complex business requirements.",
    achievements: [
      "Built multiple production web applications",
      "Implemented automated testing and CI/CD",
      "Optimized application performance"
    ]
  },
  {
    title: "Software Developer",
    company: "DevMountain Bootcamp Graduate",
    location: "Meridian, Idaho",
    period: "2018",
    description: "Completed intensive full-stack development bootcamp. Gained expertise in modern web technologies and software engineering fundamentals.",
    achievements: [
      "Mastered React, Node.js, and databases",
      "Built portfolio of web applications",
      "Transitioned into professional development role"
    ]
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey in software development and the amazing teams I&apos;ve worked with
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
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass p-6 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Calendar className="w-4 h-4" />
                      {experience.period}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {experience.title}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <span className="font-medium">{experience.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {experience.location}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {experience.description}
                    </p>

                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
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