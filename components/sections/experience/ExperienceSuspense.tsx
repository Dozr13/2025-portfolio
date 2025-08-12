"use client"

import { useImmediateHash } from "@/hooks/useImmediateHash"
import { PublicExperience } from "@/lib/types/public"
import { Suspense } from "react"
import { ExperienceClient } from "./ExperienceClient"
import { ExperienceSkeleton } from "./ExperienceSkeleton"



export const ExperienceSuspense = ({ experiences }: { experiences: PublicExperience[] }) => {
  const immediate = useImmediateHash('#experience')

  return (
    <Suspense fallback={<ExperienceSkeleton />}>
      <ExperienceClient experiences={experiences} immediate={immediate} />
    </Suspense>
  )
}