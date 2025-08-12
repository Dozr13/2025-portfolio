'use client'

import { Icon, IconName } from '@/components/ui/Icon'
import { BREAKPOINTS, PREVIEW_COUNTS, SKILL_CATEGORY_NAMES } from '@/lib/constants'
import type { PublicSkill } from '@/lib/types/public'
import { SkillsPreviewProps } from '@/lib/types/sections'
import { featuredDot, levelDot } from '@/lib/ui'
import { useEffect, useMemo, useState } from 'react'

export const SkillsPreview = ({ skills, className = '' }: SkillsPreviewProps) => {
  const [count, setCount] = useState<number>(PREVIEW_COUNTS.sm)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w >= BREAKPOINTS.xl) setCount(PREVIEW_COUNTS.lg)
      else if (w >= BREAKPOINTS.sm) setCount(PREVIEW_COUNTS.sm)
      else setCount(PREVIEW_COUNTS.base)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const grouped = useMemo(() => {
    const byCat = skills.reduce(
      (acc, s) => {
        ;(acc[s.category] ??= []).push(s)
        return acc
      },
      {} as Record<string, PublicSkill[]>
    )
    const categories = Object.keys(byCat).sort((a, b) =>
      SKILL_CATEGORY_NAMES[a as keyof typeof SKILL_CATEGORY_NAMES].localeCompare(
        SKILL_CATEGORY_NAMES[b as keyof typeof SKILL_CATEGORY_NAMES]
      )
    )
    const buckets = categories.map((cat) =>
      [...byCat[cat]].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        const ao = a.order ?? Number.MAX_SAFE_INTEGER
        const bo = b.order ?? Number.MAX_SAFE_INTEGER
        if (ao !== bo) return ao - bo
        return a.name.localeCompare(b.name)
      })
    )
    return buckets
  }, [skills])

  const picked = useMemo(() => {
    const result: PublicSkill[] = []
    if (grouped.length === 0) return result
    const indices = new Array(grouped.length).fill(0)
    let cursor = 0
    while (result.length < count) {
      let progressed = false
      for (let k = 0; k < grouped.length && result.length < count; k++) {
        const idx = (cursor + k) % grouped.length
        const bucket = grouped[idx]
        const pos = indices[idx]
        if (pos < bucket.length) {
          result.push(bucket[pos])
          indices[idx] = pos + 1
          progressed = true
        }
      }
      if (!progressed) break
      cursor++
    }
    return result
  }, [grouped, count])

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3 ${className}`}
    >
      {picked.map((skill) => (
        <div
          key={skill.id}
          className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all"
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
                {skill.featured && (
                  <div className="w-2 h-2 bg-primary rounded-full" title="Featured skill" />
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={levelDot({ level: skill.level })} />
                {skill.featured && <span className={featuredDot} title="Featured skill" />}
                <span className="text-xs text-muted-foreground capitalize">
                  {skill.level.toLowerCase()}
                </span>
                <span className="text-xs text-muted-foreground">• {skill.years ?? 0}y</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
