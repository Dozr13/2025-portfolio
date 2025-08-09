"use client"

import { AdminAuthProvider } from '@/components/admin/AdminAuthProvider'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <div className="admin-page min-h-screen bg-background w-full">
          <AdminNavigation />
          <div className="admin-content container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-10">
              {children}
            </div>
          </div>
        </div>
      )}
    </AdminAuthProvider>
  )
}
