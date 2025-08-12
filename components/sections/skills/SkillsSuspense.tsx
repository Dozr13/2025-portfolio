'use client'

import { useImmediateHash } from '@/hooks/useImmediateHash'
import { SkillsSuspenseProps } from '@/lib/types/sections'
import { Suspense } from 'react'
import { SkillsClient } from './SkillsClient'
import { SkillsSkeleton } from './SkillsSkeleton'

export const SkillsSuspense = ({ skills, mode = 'preview' }: SkillsSuspenseProps) => {
  const immediate = useImmediateHash('#skills')

  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <SkillsClient skills={skills} mode={mode} immediate={immediate} />
    </Suspense>
  )
}
