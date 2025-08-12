'use client'

import { useImmediateHash } from '@/hooks/useImmediateHash'
import { Suspense } from 'react'
import { ContactClient } from './ContactClient'
import { ContactSkeleton } from './ContactSkeleton'

export const ContactSuspense = () => {
  const immediate = useImmediateHash('#contact')
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactClient immediate={immediate} />
    </Suspense>
  )
}
