"use server"

import { caseStudies as sharedCaseStudies } from "@/lib/data/case-studies"
import type { CaseStudy } from "@/lib/types"
import { ensureAdmin } from "./auth"

export async function listCaseStudies(): Promise<{ caseStudies: CaseStudy[]; pagination: { pages: number; total: number } }> {
  await ensureAdmin()
  // Mirror the hardcoded data from the previous API route
  const caseStudies: CaseStudy[] = sharedCaseStudies

  return {
    caseStudies,
    pagination: {
      pages: 1,
      total: caseStudies.length,
    },
  }
}

export async function deleteCaseStudy(): Promise<never> {
  await ensureAdmin()
  throw new Error("Case study deletion not implemented; managed in code.")
}


