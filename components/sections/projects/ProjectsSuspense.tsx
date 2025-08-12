"use client"

import { useImmediateHash } from "@/hooks/useImmediateHash"
import { ProjectsSuspenseProps } from "@/lib/types/sections"
import { Suspense } from "react"
import { ProjectsClient } from "./ProjectsClient"
import { ProjectsSkeleton } from "./ProjectsSkeleton"


export const ProjectsSuspense = ({ projects, mode = "preview" }: ProjectsSuspenseProps) => {
  const immediate = useImmediateHash('#projects')

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient projects={projects} mode={mode} immediate={immediate} />
    </Suspense>
  )
}
