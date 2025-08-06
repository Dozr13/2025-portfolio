"use client"

import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard'
import { AdminAuthProvider } from '@/components/admin/AdminAuthProvider'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin'

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <AdminAuthGuard>
          <AdminNavigation />
          <div className="w-full">
            {children}
          </div>
        </AdminAuthGuard>
      )}
    </AdminAuthProvider>
  )
}