"use client"

import { AdminLoadingState } from "@/components/admin/shared/AdminLoadingState"
import { Suspense } from "react"

interface AdminSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  message?: string
}

export function AdminSuspense({
  children,
  fallback,
  message = "Loading data..."
}: AdminSuspenseProps) {
  return (
    <Suspense fallback={fallback || <AdminLoadingState message={message} />}>
      {children}
    </Suspense>
  )
}
