"use client"

import { Icon, type IconName } from "@/components/ui/icon"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const roles = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "AWS Certified Practitioner",
  "React & TypeScript Expert",
  "Infrastructure Leader"
]

const stats: {
  label: string
  value: string
  icon: IconName
}[] = [
    { label: "Years Experience", value: "6+", icon: "briefcase" },
    { label: "Projects Completed", value: "50+", icon: "code" },
    { label: "Technologies", value: "15+", icon: "code" },
  ]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]

    if (!isDeleting) {
      if (displayText.length < role.length) {
        const timer = setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } else if (isDeleting) {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }
  }, [displayText, currentRole, isDeleting])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      const headerOffset = 80
      const elementPosition = aboutSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      const headerOffset = 80
      const elementPosition = projectsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>

      {/* Enhanced floating elements with more variety */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating shapes */}
        {[
          { left: "5%", top: "20%", size: "w-20 h-20 sm:w-32 sm:h-32", shape: "rounded-full" },
          { left: "70%", top: "15%", size: "w-16 h-16 sm:w-24 sm:h-24", shape: "rounded-2xl" },
          { left: "60%", top: "70%", size: "w-20 h-20 sm:w-28 sm:h-28", shape: "rounded-full" },
          { left: "10%", top: "75%", size: "w-14 h-14 sm:w-20 sm:h-20", shape: "rounded-2xl" },
          { left: "75%", top: "55%", size: "w-12 h-12 sm:w-16 sm:h-16", shape: "rounded-full" },
        ].map((element, i) => (
          <motion.div
            key={`large-${i}`}
            className={`absolute ${element.size} ${element.shape} bg-white/10 backdrop-blur-sm border border-white/20`}
            style={{
              left: element.left,
              top: element.top,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Small particle elements */}
        {[
          { left: "15%", top: "25%", duration: 4.5, delay: 0.5 },
          { left: "70%", top: "35%", duration: 6.2, delay: 1.2 },
          { left: "45%", top: "65%", duration: 5.8, delay: 2.1 },
          { left: "25%", top: "85%", duration: 4.8, delay: 0.8 },
          { left: "75%", top: "45%", duration: 7.1, delay: 3.2 },
          { left: "35%", top: "15%", duration: 5.5, delay: 1.8 },
          { left: "60%", top: "75%", duration: 6.5, delay: 2.8 },
          { left: "50%", top: "55%", duration: 4.2, delay: 1.5 },
        ].map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Hero Text */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-1 sm:space-y-2"
              >
                <p className="text-blue-200 font-medium text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                  Senior Software Engineer
                </p>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Wade Pate
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-white/90 min-h-[2rem] xs:min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center lg:justify-start"
              >
                <div className="flex flex-col xs:flex-row items-center xs:items-baseline gap-1 xs:gap-2">
                  <span>I&apos;m a</span>
                  <span className="font-semibold text-blue-200 min-w-[180px] xs:min-w-[200px] text-center xs:text-left">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-5 xs:h-6 sm:h-8 bg-blue-200 ml-1"
                    />
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Transforming complex requirements into elegant solutions with{" "}
                <span className="text-blue-200 font-semibold">6+ years</span> of experience
                in modern web technologies and cloud infrastructure.
              </motion.p>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-white/70 text-sm sm:text-base"
              >
                <Icon name="map-pin" size="sm" className="flex-shrink-0" />
                <span>Meridian, Idaho</span>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Wade_Pate_Resume.pdf"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
              >
                <Icon name="download" size="md" className="group-hover:animate-bounce flex-shrink-0" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-3 sm:space-x-4"
            >
              {([
                { icon: "github" as const, href: "https://github.com/Dozr13", label: "GitHub" },
                { icon: "linkedin" as const, href: "https://www.linkedin.com/in/wadejp8/", label: "LinkedIn" },
                { icon: "mail" as const, href: "mailto:wadejp8@gmail.com", label: "Email" },
              ] as const).map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white/80 hover:text-blue-200 hover:border-blue-200/50 transition-all duration-300 group touch-manipulation"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size="md" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Stats & Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex flex-col items-center space-y-8"
          >
            {/* Profile Image Placeholder - Enhanced */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 rounded-full glass border-2 border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Professional headshot would go here */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full" />
                <div className="relative z-10 text-6xl">👨‍💻</div>

                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 opacity-50"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5))',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'subtract'
                  }}
                />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 gap-4 w-full max-w-sm"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name={stat.icon} size="md" className="text-blue-200" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 sm:gap-2"
        >
          <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wider uppercase">Scroll Down</span>
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 transition-all duration-300 touch-manipulation"
            aria-label="Scroll to about section"
          >
            <Icon name="chevron-down" size="sm" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
} 