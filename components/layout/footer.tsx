"use client"

import { Icon, type IconName } from "@/components/ui/icon"
import { motion } from "framer-motion"

const socialLinks: {
  icon: IconName
  href: string
  label: string
}[] = [
    { icon: "github", href: "https://github.com/Dozr13", label: "GitHub" },
    { icon: "linkedin", href: "https://www.linkedin.com/in/wadejp8/", label: "LinkedIn" },
    { icon: "mail", href: "mailto:wadejp8@gmail.com", label: "Email" },
  ]

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo/Name */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            Wade Pate
          </motion.button>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <Icon name={link.icon} size="md" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-sm text-muted-foreground">
            <span>© 2025 Built with</span>
            <Icon
              name="heart"
              size="sm"
              className="mx-1 text-red-500"
              decorative
            />
            <span>by Wade Pate. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 