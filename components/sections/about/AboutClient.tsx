'use client'

import { Icon, type IconName } from '@/components/ui'
import { motion } from 'framer-motion'
import Image from 'next/image'

const highlights: {
  icon: IconName
  title: string
  description: string
}[] = [
  {
    icon: 'code',
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and efficient code'
  },
  {
    icon: 'palette',
    title: 'Modern Design',
    description: 'Creating beautiful, user-centered digital experiences'
  },
  {
    icon: 'rocket',
    title: 'Performance',
    description: 'Optimizing for speed and exceptional user experience'
  },
  {
    icon: 'users',
    title: 'Collaboration',
    description: 'Working effectively with cross-functional teams'
  }
]

export const AboutClient = ({ immediate = false }: { immediate?: boolean }) => {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div>
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate Senior Software Engineer with 6+ years of experience building
            scalable applications. AWS Certified Cloud Practitioner specializing in modern web
            technologies and infrastructure development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-8">
                <Image
                  src="/wade-photo.jpg"
                  alt="Wade Pate - Professional headshot"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-80"></div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Building Digital Experiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                With over 6 years of experience in software engineering, I specialize in building
                modern, scalable applications using React, TypeScript, Python, and cloud
                technologies. Currently serving as a Senior Software Engineer, I focus on innovative
                infrastructure construction and engineering leadership.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m passionate about clean, maintainable code and modern development practices.
                As an AWS Certified Cloud Practitioner, I bring expertise in cloud infrastructure
                and enjoy mentoring teams while driving technical innovation.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group p-4 rounded-xl bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon
                        name={highlight.icon}
                        size="md"
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
