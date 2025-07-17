"use client"

import { motion } from "framer-motion"
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const roles = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "AWS Certified Practitioner",
  "React & TypeScript Expert",
  "Infrastructure Leader"
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const role = roles[currentRole]
    let currentIndex = 0

    if (isTyping) {
      const typingTimer = setInterval(() => {
        if (currentIndex <= role.length) {
          setDisplayText(role.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setIsTyping(false)
            setTimeout(() => {
              setDisplayText("")
              setCurrentRole((prev) => (prev + 1) % roles.length)
              setIsTyping(true)
            }, 500)
          }, 2000)
          clearInterval(typingTimer)
        }
      }, 100)

      return () => clearInterval(typingTimer)
    }
  }, [currentRole, isTyping])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: "10%", top: "20%" },
          { left: "80%", top: "10%" },
          { left: "60%", top: "70%" },
          { left: "20%", top: "80%" },
          { left: "90%", top: "50%" },
          { left: "40%", top: "30%" },
        ].map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Hero Text */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Wade
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 h-8 sm:h-10"
            >
              I&apos;m a{" "}
              <span className="font-semibold text-blue-200">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 sm:h-8 bg-blue-200 ml-1"
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Senior Software Engineer with 6+ years of experience building scalable applications.
              I specialize in modern web technologies and infrastructure, transforming complex requirements into elegant solutions.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View My Work
              </span>
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Wade_Pate_Resume.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/Dozr13", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/wadejp8/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:wadejp8@gmail.com", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-blue-200 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 group-hover:animate-pulse" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/80 hover:text-white transition-colors group"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-8 h-8 group-hover:animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  )
} 