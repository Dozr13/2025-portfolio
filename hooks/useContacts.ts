"use client"

import { adminService } from "@/lib/services/admin"
import type { Contact } from "@/lib/types"
import { useCallback, useEffect, useState } from "react"

interface ContactsData {
  contacts: Contact[]
  pagination: {
    total: number
    pages: number
  }
}

interface ContactFilters {
  status?: string
  search?: string
}

interface UseContactsOptions {
  initialData?: ContactsData | null
}

export function useContacts(options: UseContactsOptions = {}) {
  const [data, setData] = useState<ContactsData | null>(options.initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchContacts = useCallback(async (filters: ContactFilters = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params: Record<string, string> = {}

      if (filters.status) params.status = filters.status
      if (filters.search) params.search = filters.search

      const result = await adminService.contacts.fetchContacts(params)
      setData(result)
    } catch (err) {
      console.error('[useContacts] Error fetching contacts:', err)
      setError('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateContactStatus = useCallback(async (contactId: string, status: string, notes?: string) => {
    setUpdating(contactId)
    try {
      await adminService.contacts.updateContactStatus(contactId, status, notes)
      // Refresh the data after update
      await fetchContacts()
    } catch (err) {
      console.error('[useContacts] Error updating contact:', err)
      setError('Failed to update contact')
    } finally {
      setUpdating(null)
    }
  }, [fetchContacts])

  // Initial fetch if no initial data
  useEffect(() => {
    if (!options.initialData) {
      fetchContacts()
    }
  }, [fetchContacts, options.initialData])

  return {
    data,
    loading,
    error,
    updating,
    fetchContacts,
    updateContactStatus
  }
}
