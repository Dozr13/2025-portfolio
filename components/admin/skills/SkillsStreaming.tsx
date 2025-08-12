'use client'

import { AdminSuspense } from '@/components/admin/shared/AdminSuspense'
import type { Skill } from '@/lib/types'
import { SkillsContent } from './SkillsContent'
import { SkillsSkeleton } from './SkillsSkeleton'

interface SkillsStreamingProps {
  initialData?: Skill[] | null
}

export function SkillsStreaming({ initialData }: SkillsStreamingProps) {
  return (
    <AdminSuspense fallback={<SkillsSkeleton />} message="Loading skills data...">
      <SkillsContent initialData={initialData} />
    </AdminSuspense>
  )
}
