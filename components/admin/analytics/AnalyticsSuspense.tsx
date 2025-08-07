"use client"

import { AdminLoadingState } from "@/components/admin/shared/AdminLoadingState"
import { Suspense } from "react"

interface AnalyticsSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AnalyticsSuspense({ children, fallback }: AnalyticsSuspenseProps) {
  return (
    <Suspense fallback={fallback || <AdminLoadingState message="Loading analytics data..." />}>
      {children}
    </Suspense>
  )
}
