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
    { label: "Projects Delivered", value: "50+", icon: "code" },
    { label: "Tech Stack", value: "15+", icon: "monitor" },
    { label: "AWS Certified", value: "✓", icon: "rocket" },
  ]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full pt-20 lg:pt-24 xl:pt-28">
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

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left max-w-4xl mx-auto lg:mx-0"
          >
            {/* Hero Text */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-1 sm:space-y-2"
              >
                {/* <h1 className="text-base xs:text-4xl sm:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black text-primary leading-tight tracking-tight text-enhanced"> */}
                <h1 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-black text-primary leading-tight tracking-tight text-enhanced">
                  Hi, I&apos;m{" "}
                  <span className="gradient-text-inverted">
                    Wade!
                  </span>
                </h1>
                <p className="text-secondary font-medium text-md sm:text-base lg:text-3xl tracking-wide uppercase">
                  Senior Software Engineer
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base xs:text-lg sm:text-xl lg:text-3xl xl:text-4xl text-primary min-h-[2.5rem] xs:min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] flex items-center justify-center lg:justify-start"
              >
                <div className="flex flex-col xs:flex-row items-center xs:items-baseline gap-1 xs:gap-2">
                  <span>I&apos;m a</span>
                  <span className="font-semibold text-accent min-w-[250px] xs:min-w-[280px] sm:min-w-[320px] text-center xs:text-left">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-6 xs:h-7 sm:h-9 bg-accent ml-1"
                    />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-primary text-enhanced text-base h-16 font-semibold">
                  Transforming complex requirements into elegant solutions with{" "}
                  <span className="text-accent font-bold text-lg sm:text-xl lg:text-3xl">6+ years</span> of experience
                  in modern web technologies and cloud infrastructure.
                </p>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-primary text-sm mt-12 md:mt-0"
              >
                <Icon name="map-pin" size="sm" className="flex-shrink-0 text-primary" />
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
                className="group relative px-6 sm:px-8 py-3 sm:py-4 btn-gradient-inverted text-inverted rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
              >
                <span className="relative z-10 drop-shadow-sm">View My Work</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 gradient-hero-inverted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Wade_Pate_Resume.pdf"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary/30 bg-background/20 backdrop-blur-sm text-primary hover:border-primary hover:bg-primary/10 hover:shadow-lg transition-all duration-300 rounded-full font-semibold text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
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
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass border border-muted flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-all duration-300 group touch-manipulation"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size="md" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Stats - Horizontal Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="lg:hidden flex justify-center gap-4 pt-4"
            >
              {stats.slice(0, 3).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                  className="text-center flex-1 max-w-[5rem]"
                >
                  <div className="w-10 h-10 mx-auto rounded-lg gradient-hero-inverted flex items-center justify-center mb-2">
                    <Icon name={stat.icon} size="sm" className="text-inverted" />
                  </div>
                  <div className="text-lg font-bold text-primary leading-none">{stat.value}</div>
                  <div className="text-xs text-muted leading-tight mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Inline Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isScrolled ? 0 : 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden flex items-center justify-center gap-2 pt-8 mb-4"
            >
              <span className="text-muted text-xs font-medium tracking-wider uppercase">
                Scroll Down
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.button
                  onClick={scrollToAbout}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 rounded-full border border-muted flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300 touch-manipulation"
                  aria-label="Scroll to about section"
                >
                  <Icon name="chevron-down" size="sm" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Stats & Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-2 hidden lg:flex flex-col items-center space-y-6"
          >
            {/* Professional Profile Avatar - Gradient Themed */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative mb-2"
            >
              <div className="w-48 h-48 rounded-full glass gradient-hero-inverted flex items-center justify-center shadow-2xl">
                <div className="text-5xl font-black text-inverted drop-shadow-lg tracking-wider">WP</div>
              </div>
            </motion.div>

            {/* Compact Stats Grid - 2x2 Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 gap-4 w-full max-w-xs"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="glass rounded-xl p-4 border border-muted hover:border-secondary transition-all duration-300 group hover:scale-105"
                >
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 mx-auto rounded-lg gradient-hero-inverted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name={stat.icon} size="sm" className="text-inverted" />
                    </div>
                    <div className="text-2xl font-bold text-primary leading-none">{stat.value}</div>
                    <div className="text-xs text-muted leading-tight font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Professional Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-2 justify-center max-w-xs"
            >
              {[
                { name: "React", color: "from-blue-400 to-blue-600" },
                { name: "TypeScript", color: "from-blue-500 to-blue-700" },
                { name: "AWS", color: "from-orange-400 to-orange-600" },
                { name: "Next.js", color: "from-gray-600 to-gray-800" },
                { name: "Node.js", color: "from-green-400 to-green-600" },
                { name: "Docker", color: "from-cyan-400 to-cyan-600" }
              ].map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  className={`px-3 py-1.5 text-xs font-semibold bg-gradient-to-r ${tech.color} text-white drop-shadow-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator - Large screens only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block absolute bottom-16 sm:bottom-12 lg:bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-primary/80 dark:text-white/80 text-xs sm:text-sm font-medium tracking-wider uppercase bg-background/30 dark:bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-muted">
            Scroll Down
          </span>
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/20 dark:bg-white/15 backdrop-blur-sm border-2 border-muted flex items-center justify-center text-secondary hover:text-primary hover:border-primary hover:bg-background/30 dark:hover:bg-white/20 transition-all duration-300 touch-manipulation shadow-lg"
            aria-label="Scroll to about section"
          >
            <Icon name="chevron-down" size="md" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
} 