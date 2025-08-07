"use client"

import { AdminSuspense } from "@/components/admin/shared/AdminSuspense"
import type { Contact } from "@/lib/types"
import { ContactsContent } from "./ContactsContent"
import { ContactsSkeleton } from "./ContactsSkeleton"

interface ContactsData {
  contacts: Contact[]
  pagination: {
    total: number
    pages: number
  }
}

interface ContactsStreamingProps {
  initialData?: ContactsData | null
}

export function ContactsStreaming({ initialData }: ContactsStreamingProps) {
  return (
    <AdminSuspense fallback={<ContactsSkeleton />} message="Loading contacts data...">
      <ContactsContent initialData={initialData} />
    </AdminSuspense>
  )
}
