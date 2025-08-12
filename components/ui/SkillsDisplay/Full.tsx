"use client"
import { Icon, IconName } from "@/components/ui/Icon"
import { SKILL_CATEGORY_NAMES } from "@/lib/constants/skills"
import type { PublicSkill } from "@/lib/types/public"
import { SkillsFullProps } from "@/lib/types/sections"
import { featuredDot, levelDot } from "@/lib/ui"
import { useMemo, useState } from "react"

export const SkillsFull = ({
  skills,
  className = "",
  showCategories = true,
  showAllTab = true,
}: SkillsFullProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [levelFilter, setLevelFilter] = useState<"" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT">("")
  const [sortBy, setSortBy] = useState<"FEATURED" | "NAME">("FEATURED")
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const skillsByCategory = useMemo(() => {
    return skills.reduce((acc, s) => {
      ; (acc[s.category] ??= []).push(s)
      return acc
    }, {} as Record<string, PublicSkill[]>)
  }, [skills])

  const categories = Object.keys(skillsByCategory)

  // Default to first category when the All tab is hidden
  useMemo(() => {
    if (!showAllTab && !selectedCategory) {
      const first = Object.keys(skillsByCategory)[0]
      if (first) setSelectedCategory(first)
    }
  }, [showAllTab, selectedCategory, skillsByCategory])

  // Debounced-ish search via derived memo of input value
  const query = search.trim().toLowerCase()

  const filterAndSort = useMemo(() => {
    const fn = (list: PublicSkill[]) => {
      let res = list
      if (query) {
        res = res.filter(
          (s) => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
        )
      }
      if (levelFilter) res = res.filter((s) => s.level === levelFilter)
      if (sortBy === "FEATURED") {
        res = [...res].sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          const ao = a.order ?? Number.MAX_SAFE_INTEGER
          const bo = b.order ?? Number.MAX_SAFE_INTEGER
          if (ao !== bo) return ao - bo
          return a.name.localeCompare(b.name)
        })
      } else {
        res = [...res].sort((a, b) => a.name.localeCompare(b.name))
      }
      return res
    }
    return fn
  }, [query, levelFilter, sortBy])

  return (
    <div className={`space-y-6 ${className}`}>
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {showAllTab && (
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${!selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              All Skills
            </button>
          )}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {SKILL_CATEGORY_NAMES[category as keyof typeof SKILL_CATEGORY_NAMES]} ({
                skillsByCategory[category].length
              })
            </button>
          ))}
        </div>
      )}

      <div className="sticky top-24 sm:top-28 lg:top-32 z-20 -mx-2 px-2">
        <div className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-xl p-3 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills…"
              className="w-full h-10 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground/70 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search skills"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(levelFilter === lvl ? "" : lvl)}
                className={`px-2.5 py-1.5 text-xs rounded-full border ${levelFilter === lvl
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                aria-pressed={levelFilter === lvl}
              >
                {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground">
              Sort
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "FEATURED" | "NAME")}
              className="h-9 px-2 rounded-md bg-muted text-foreground border border-border focus:outline-none"
            >
              <option value="FEATURED">Featured</option>
              <option value="NAME">A–Z</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSearch("")
              setLevelFilter("")
              setSortBy("FEATURED")
            }}
            className="ml-auto px-3 py-1.5 text-sm rounded-md border border-border bg-muted hover:bg-muted/80"
          >
            Clear
          </button>
        </div>
      </div>

      {Object.keys(skillsByCategory).map((cat) => {
        const isActive = !selectedCategory || selectedCategory === cat
        if (!isActive) return null
        const list = filterAndSort(skillsByCategory[cat])
        if (list.length === 0) return null
        const isCollapsed = collapsed[cat]
        return (
          <div key={cat} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {SKILL_CATEGORY_NAMES[cat as keyof typeof SKILL_CATEGORY_NAMES]} ({list.length})
              </h3>
              <button
                onClick={() => setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }))}
                className="text-xs px-2 py-1 rounded-md border border-border bg-muted hover:bg-muted/80"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            </div>
            {!isCollapsed && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3">
                {list.map((skill) => (
                  <div
                    key={skill.id}
                    className="group bg-card border border-border rounded-lg p-4  hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {skill.icon ? (
                          <Icon name={skill.icon as IconName} size="sm" className="text-primary" />
                        ) : (
                          <Icon name="code" size="sm" className="text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">{skill.name}</h4>
                          {skill.featured && <div className={featuredDot} title="Featured skill" />}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={levelDot({ level: skill.level })} />
                          <span className="text-xs text-muted-foreground capitalize">
                            {skill.level.toLowerCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">• {skill.years ?? 0}y</span>
                        </div>
                        {showCategories && (
                          <span className="text-xs text-muted-foreground">
                            {SKILL_CATEGORY_NAMES[skill.category as keyof typeof SKILL_CATEGORY_NAMES]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
