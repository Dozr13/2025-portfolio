import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface AdminUser {
  username: string
  role: string
}

// 🚨 SINGLETON AUTH STATE - Prevents multiple auth checks
const globalAuthState = {
  isChecking: false,
  isAuthenticated: false,
  user: null as AdminUser | null,
  isLoading: true,
  listeners: new Set<() => void>()
}

const notifyListeners = () => {
  globalAuthState.listeners.forEach(listener => listener())
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(globalAuthState.user)
  const [isLoading, setIsLoading] = useState(globalAuthState.isLoading)
  const [isAuthenticated, setIsAuthenticated] = useState(globalAuthState.isAuthenticated)
  const router = useRouter()

  // 🔄 Subscribe to global auth state changes
  useEffect(() => {
    const updateLocalState = () => {
      setUser(globalAuthState.user)
      setIsLoading(globalAuthState.isLoading)
      setIsAuthenticated(globalAuthState.isAuthenticated)
    }

    globalAuthState.listeners.add(updateLocalState)
    return () => {
      globalAuthState.listeners.delete(updateLocalState)
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      // ⚡ Prevent multiple simultaneous auth checks
      if (globalAuthState.isChecking) {
        console.log("[AUTH] Auth check already in progress, skipping...")
        return
      }

      globalAuthState.isChecking = true
      console.log("[AUTH] Starting authentication check...")
      
      // Add small delay to ensure localStorage is available
      await new Promise(resolve => setTimeout(resolve, 100))
      
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          console.log("[AUTH] Server-side rendering, skipping auth check")
          return
        }

        const token = localStorage.getItem("adminToken")
        const userData = localStorage.getItem("adminUser")

        console.log("[AUTH] Token exists:", !!token)
        console.log("[AUTH] User data exists:", !!userData)
        console.log("[AUTH] Token value:", token ? token.substring(0, 20) + "..." : "null")

        if (!token || !userData) {
          console.log("[AUTH] Missing token or user data")
          globalAuthState.isAuthenticated = false
          globalAuthState.isLoading = false
          globalAuthState.user = null
          notifyListeners()
          return
        }

        console.log("[AUTH] Verifying token with server...")
        // Verify token with server
        const response = await fetch('/api/admin/auth', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log("[AUTH] Server response status:", response.status)
        console.log("[AUTH] Server response ok:", response.ok)

        if (response.ok) {
          const authData = await response.json()
          console.log("[AUTH] Authentication successful for user:", authData.user?.username)
          globalAuthState.user = authData.user
          globalAuthState.isAuthenticated = true
        } else {
          console.log("[AUTH] Server rejected token, clearing storage")
          // Token invalid, clear storage
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminUser")
          globalAuthState.isAuthenticated = false
          globalAuthState.user = null
        }
      } catch (error) {
        console.error('[AUTH] Auth check failed:', error)
        globalAuthState.isAuthenticated = false
        globalAuthState.user = null
      } finally {
        globalAuthState.isLoading = false
        globalAuthState.isChecking = false
        notifyListeners()
      }
    }

    // Only run auth check if not already done
    if (globalAuthState.isLoading && !globalAuthState.isChecking) {
      checkAuth()
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    
    // Update global state
    globalAuthState.user = null
    globalAuthState.isAuthenticated = false
    globalAuthState.isLoading = false
    notifyListeners()
    
    router.push("/admin")
  }

  const redirectToLogin = useCallback(() => {
    console.log("[AUTH] Redirecting to login...")
    router.push("/admin")
  }, [router])

  // Debug current state
  useEffect(() => {
    console.log("[AUTH HOOK] State changed:", { isLoading, isAuthenticated, user: user?.username })
  }, [isLoading, isAuthenticated, user])

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    redirectToLogin
  }
}