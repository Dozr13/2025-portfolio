'use client'

import { Suspense } from 'react'
import { AdminLoadingState } from './AdminLoadingState'

interface AdminSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  message?: string
}

export function AdminSuspense({
  children,
  fallback,
  message = 'Loading data...'
}: AdminSuspenseProps) {
  return (
    <Suspense fallback={fallback || <AdminLoadingState message={message} />}>{children}</Suspense>
  )
}
