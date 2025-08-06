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

// Global function to refresh auth state
export const refreshAuthState = async () => {
  console.log("[AUTH] Manual auth refresh triggered...")
  
  if (typeof window === 'undefined') {
    console.log("[AUTH] Server-side rendering, skipping refresh")
    return
  }

  const token = localStorage.getItem("adminToken")
  const userData = localStorage.getItem("adminUser")

  console.log("[AUTH REFRESH] Token exists:", !!token)
  console.log("[AUTH REFRESH] User data exists:", !!userData)

  if (!token || !userData) {
    console.log("[AUTH REFRESH] Missing token or user data")
    globalAuthState.isAuthenticated = false
    globalAuthState.isLoading = false
    globalAuthState.user = null
    notifyListeners()
    return
  }

  try {
    const response = await fetch('/api/admin/auth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const authData = await response.json()
      console.log("[AUTH REFRESH] Authentication successful for user:", authData.user?.username)
      globalAuthState.user = authData.user
      globalAuthState.isAuthenticated = true
      globalAuthState.isLoading = false
    } else {
      console.log("[AUTH REFRESH] Server rejected token, clearing storage")
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      globalAuthState.isAuthenticated = false
      globalAuthState.user = null
      globalAuthState.isLoading = false
    }
  } catch (error) {
    console.error('[AUTH REFRESH] Auth refresh failed:', error)
    globalAuthState.isAuthenticated = false
    globalAuthState.user = null
    globalAuthState.isLoading = false
  }
  
  notifyListeners()
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

    // Listen for storage changes (login in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminToken' || e.key === 'adminUser') {
        console.log("[AUTH] Storage change detected, refreshing auth state...")
        refreshAuthState()
      }
    }

    // Only run auth check if not already done
    if (globalAuthState.isLoading && !globalAuthState.isChecking) {
      checkAuth()
    }

    // Add storage event listener
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
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