"use client"

import { useAdminAuth } from '@/hooks/useAdminAuth'
import { createContext, ReactNode, useContext } from 'react'

interface AdminUser {
  username: string
  role: string
}

interface AdminAuthContextType {
  user: AdminUser | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  redirectToLogin: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

interface AdminAuthProviderProps {
  children: ReactNode
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const authData = useAdminAuth()

  return (
    <AdminAuthContext.Provider value={authData}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuthContext() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuthContext must be used within an AdminAuthProvider')
  }
  return context
}