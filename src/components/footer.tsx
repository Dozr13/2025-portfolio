"use client"

import { motion } from "framer-motion"
import { Github, Heart, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/Dozr13", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/wadejp8/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:wadejp8@gmail.com", label: "Email" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo/Name */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            {"<WadePate />"}
          </motion.button>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-primary transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:animate-pulse" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Built with{" "}
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
            by Wade Pate. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 