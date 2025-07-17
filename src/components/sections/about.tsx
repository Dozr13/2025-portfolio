"use client"

import { motion } from "framer-motion"
import { Code, Palette, Rocket, Users } from "lucide-react"
import Image from 'next/image'

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code"
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Creating beautiful, user-centered digital experiences"
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and exceptional user experience"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with cross-functional teams"
  }
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate Senior Software Engineer with 6+ years of experience building
            scalable applications. AWS Certified Cloud Practitioner specializing in modern web
            technologies and infrastructure development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Professional Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-start mb-8"
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl overflow-hidden glass border-2 border-primary/20">
                  <Image
                    width={100}
                    height={100}
                    src="/wade-photo.jpg"
                    alt="Wade Pate - Senior Software Engineer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
              </div>
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground">
              Building Digital Experiences
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              With over 6 years of experience in software engineering, I specialize in building
              modern, scalable applications using React, TypeScript, Python, and cloud technologies.
              Currently serving as a Senior Software Engineer, I focus on innovative infrastructure
              construction and engineering leadership.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m passionate about clean, maintainable code and modern development practices.
              As an AWS Certified Cloud Practitioner, I bring expertise in cloud infrastructure
              and enjoy mentoring teams while driving technical innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-xl text-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {highlight.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 