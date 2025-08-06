"use client"

import { useEffect } from "react"
import { useAdminAuthContext } from "./AdminAuthProvider"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isLoading, isAuthenticated, redirectToLogin } = useAdminAuthContext()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin()
    }
  }, [isLoading, isAuthenticated, redirectToLogin])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}