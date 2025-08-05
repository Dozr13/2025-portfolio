import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { About } from "@/components/sections/about"
import { Blog } from "@/components/sections/blog"
import { CaseStudies } from "@/components/sections/case-studies"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudies />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
