"use client"

import { Icon } from "@/components/ui/icon"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      setIsOpen(false)

      setTimeout(() => {
        const headerOffset = window.innerWidth >= 1280 ? 120 : window.innerWidth >= 1024 ? 100 : 90
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }, 300)
    }
  }

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"] as const
    const currentIndex = themes.indexOf(theme as "light" | "dark" | "system")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeIcon = () => {
    if (!mounted) {
      return <Icon name="monitor" size="md" />
    }

    switch (theme) {
      case "light":
        return <Icon name="sun" size="md" />
      case "dark":
        return <Icon name="moon" size="md" />
      default:
        return <Icon name="monitor" size="md" />
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border/70 supports-[backdrop-filter]:bg-background/85 shadow-lg shadow-background/20"
        : "bg-background/60 backdrop-blur-md border-b border-border/30 shadow-sm shadow-background/10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="flex justify-between items-center h-20 lg:h-24 xl:h-28 w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("#hero")}
              className="group flex items-center space-x-2 hover:opacity-90 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-lg gradient-nav-inverted flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white text-sm lg:text-base xl:text-lg font-bold"
                  >
                    W
                  </motion.div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-lg gradient-nav-inverted opacity-20 blur-sm scale-110 group-hover:opacity-30 transition-opacity"></div>
              </motion.div>

              {/* Text */}
              <div className="flex flex-col items-start">
                <motion.div
                  className="flex items-center space-x-1"
                >
                  <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Wade
                  </span>
                  <motion.span
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text-inverted"
                  >
                    Pate
                  </motion.span>
                </motion.div>
                <motion.div
                  className="text-xs lg:text-sm xl:text-base text-muted-foreground font-mono tracking-wider opacity-60 group-hover:opacity-80 transition-opacity"
                >
                  {"{ dev }"}
                </motion.div>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="text-foreground hover:text-primary px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 text-base lg:text-lg xl:text-xl font-medium transition-colors relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={cycleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 lg:p-3 xl:p-4 rounded-lg bg-muted hover:bg-accent transition-colors [&>*]:xl:scale-125 cursor-pointer"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(!isOpen)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(!isOpen)
                }}
                whileTap={{ scale: 0.9 }}
                className="p-2 lg:p-3 rounded-lg bg-muted hover:bg-accent transition-colors touch-manipulation [&>*]:lg:scale-110"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <Icon name="x" size="lg" /> : <Icon name="menu" size="lg" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="px-4 pt-3 pb-4 space-y-2 sm:px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection(item.href)
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection(item.href)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-foreground hover:text-primary hover:bg-accent block px-4 py-3 text-lg font-medium w-full text-left rounded-lg transition-colors touch-manipulation cursor-pointer"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 