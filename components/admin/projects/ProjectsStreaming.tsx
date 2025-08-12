'use client'

import { AdminSuspense } from '@/components/admin/shared/AdminSuspense'
import type { Project } from '@/lib/types'
import { ProjectsContent } from './ProjectsContent'
import { ProjectsSkeleton } from './ProjectsSkeleton'

interface ProjectsData {
  projects: Project[]
  pagination: {
    pages: number
    total: number
  }
}

interface ProjectsStreamingProps {
  initialData?: ProjectsData | null
}

export const ProjectsStreaming = ({ initialData }: ProjectsStreamingProps) => {
  return (
    <AdminSuspense fallback={<ProjectsSkeleton />} message="Loading projects data...">
      <ProjectsContent initialData={initialData} />
    </AdminSuspense>
  )
}
