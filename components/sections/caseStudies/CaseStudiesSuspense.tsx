'use client'

import { useImmediateHash } from '@/hooks/useImmediateHash'
import { PublicCaseStudy } from '@/lib/types/public'
import { Suspense } from 'react'
import { CaseStudiesClient } from './CaseStudiesClient'
import { CaseStudiesSkeleton } from './CaseStudiesSkeleton'

export const CaseStudiesSuspense = ({ caseStudies }: { caseStudies: PublicCaseStudy[] }) => {
  const immediate = useImmediateHash('#case-studies')

  return (
    <Suspense fallback={<CaseStudiesSkeleton />}>
      <CaseStudiesClient caseStudies={caseStudies} immediate={immediate} />
    </Suspense>
  )
}
