"use client"

import { isValidToken } from "@/lib/utils/auth"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface UseAuthOptions {
  onAuthError?: (message: string) => void
  redirectTo?: string
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter()
  const { onAuthError, redirectTo = "/admin" } = options

  const validateAndRedirect = useCallback(async (token: string | null): Promise<boolean> => {
    if (!token || !(await isValidToken(token))) {
      const message = "Authentication required"
      onAuthError?.(message)
      router.push(redirectTo)
      return false
    }
    return true
  }, [onAuthError, redirectTo, router])

  const handleAuthError = useCallback((status: number, message: string) => {
    if (status === 401) {
      const authMessage = "Authentication required"
      onAuthError?.(authMessage)
      router.push(redirectTo)
    } else {
      onAuthError?.(message)
    }
  }, [onAuthError, redirectTo, router])

  return {
    validateAndRedirect,
    handleAuthError
  }
}
