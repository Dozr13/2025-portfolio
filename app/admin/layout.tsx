"use client"

import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard'
import { AdminAuthProvider } from '@/components/admin/AdminAuthProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminAuthGuard>
        {children}
      </AdminAuthGuard>
    </AdminAuthProvider>
  )
}