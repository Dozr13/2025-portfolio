import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AdminUser {
  username: string
  role: string
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
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
          setIsAuthenticated(false)
          setIsLoading(false)
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
          setUser(authData.user)
          setIsAuthenticated(true)
        } else {
          console.log("[AUTH] Server rejected token, clearing storage")
          // Token invalid, clear storage
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminUser")
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('[AUTH] Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
        // Note: log after state update since state is async
      }
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/admin")
  }

  const redirectToLogin = () => {
    console.log("[AUTH] Redirecting to login...")
    router.push("/admin")
  }

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