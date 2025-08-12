'use client'

import { ReactNode } from 'react'
import { AdminErrorState } from './AdminErrorState'
import { AdminLoadingState } from './AdminLoadingState'

interface AdminPageWrapperProps {
  loading: boolean
  error?: string | null
  errorTitle?: string
  errorMessage?: string
  backHref?: string
  backLabel?: string
  loadingMessage?: string
  children: ReactNode
}

export function AdminPageWrapper({
  loading,
  error,
  errorTitle = 'Error',
  errorMessage = 'Something went wrong',
  backHref,
  backLabel = 'Go Back',
  loadingMessage = 'Loading...',
  children
}: AdminPageWrapperProps) {
  if (loading) {
    return <AdminLoadingState message={loadingMessage} />
  }

  if (error && backHref) {
    return (
      <AdminErrorState
        title={errorTitle}
        message={errorMessage}
        backHref={backHref}
        backLabel={backLabel}
      />
    )
  }

  return <>{children}</>
}
