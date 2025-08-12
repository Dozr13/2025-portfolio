'use client'

import { useImmediateHash } from '@/hooks/useImmediateHash'
import { Suspense } from 'react'
import { HeroClient } from './HeroClient'
import { HeroSkeleton } from './HeroSkeleton'

export const HeroSuspense = () => {
  const immediate = useImmediateHash('#hero')
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroClient immediate={immediate} />
    </Suspense>
  )
}
