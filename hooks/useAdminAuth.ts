// hooks/useAdminAuth.ts
import { getAdminAuth, logoutAdmin } from '@/app/actions/admin/auth'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface AdminUser {
  username: string
  role: string
}

// SINGLETON AUTH STATE - Prevents multiple auth checks
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
  if (typeof window === 'undefined') return
  try {
    const data = await getAdminAuth()
    if (data.authenticated) {
      globalAuthState.user = data.user
      globalAuthState.isAuthenticated = true
    } else {
      globalAuthState.isAuthenticated = false
      globalAuthState.user = null
    }
  } catch (error) {
    console.error('[AUTH REFRESH] Auth refresh failed:', error)
    globalAuthState.isAuthenticated = false
    globalAuthState.user = null
  } finally {
    globalAuthState.isLoading = false
    notifyListeners()
  }
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
      // Prevent multiple simultaneous auth checks
      if (globalAuthState.isChecking) {        
        return
      }

      globalAuthState.isChecking = true
            
      // Add small delay to ensure localStorage is available
      await new Promise(resolve => setTimeout(resolve, 100))
      
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          
          return
        }

        const data = await getAdminAuth()
        if (data.authenticated) {
          globalAuthState.user = data.user
          globalAuthState.isAuthenticated = true
        } else {
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
    logoutAdmin().finally(() => {
      globalAuthState.user = null
      globalAuthState.isAuthenticated = false
      globalAuthState.isLoading = false
      notifyListeners()
      router.push("/admin/login")
    })
  }

  const redirectToLogin = useCallback(() => {    
    router.push("/admin/login")
  }, [router])

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    redirectToLogin
  }
}