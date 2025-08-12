'use client'

import { useImmediateHash } from '@/hooks/useImmediateHash'
import { Suspense } from 'react'
import { AboutClient } from './AboutClient'
import { AboutSkeleton } from './AboutSkeleton'

export const AboutSuspense = () => {
  const immediate = useImmediateHash('#about')

  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutClient immediate={immediate} />
    </Suspense>
  )
}
