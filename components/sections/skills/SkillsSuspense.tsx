"use client"

import { SkillsSuspenseProps } from '@/lib/types/sections'
import { Suspense } from "react"
import { SkillsClient } from "./SkillsClient"
import { SkillsSkeleton } from './SkillsSkeleton'

export const SkillsSuspense = ({ skills, mode = "preview" }: SkillsSuspenseProps) => {
  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <SkillsClient skills={skills} mode={mode} />
    </Suspense>
  )
}
