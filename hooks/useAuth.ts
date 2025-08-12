'use client'

// Client-side session validation via protected endpoint
import { getAdminAuth } from '@/app/actions/admin/auth'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface UseAuthOptions {
  onAuthError?: (message: string) => void
  redirectTo?: string
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter()
  const { onAuthError, redirectTo = '/admin/login' } = options

  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const data = await getAdminAuth()
      if (!data.authenticated) {
        onAuthError?.('Authentication required')
        router.push(redirectTo)
        return false
      }
      return true
    } catch {
      onAuthError?.('Authentication required')
      router.push(redirectTo)
      return false
    }
  }, [onAuthError, redirectTo, router])

  const handleAuthError = useCallback(
    (status: number, message: string) => {
      if (status === 401) {
        const authMessage = 'Authentication required'
        onAuthError?.(authMessage)
        router.push(redirectTo)
      } else {
        onAuthError?.(message)
      }
    },
    [onAuthError, redirectTo, router]
  )

  return {
    validateSession,
    handleAuthError
  }
}
