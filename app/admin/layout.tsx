'use client'

import { AdminAuthProvider } from '@/components/admin/AdminAuthProvider'

export default function AdminPublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-5xl sm:px-2 lg:px-[15%] min-h-screen bg-background">
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </div>
  )
}
