"use client"

import { listContacts, updateContact } from "@/app/actions/admin/contacts"
import type { ContactStatus } from '@/lib/domain/enums'
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

      const result = await listContacts({
        page: 1,
        limit: 20,
        status: params.status || null,
        search: params.search || null,
      })
      type ActionContact = {
        id: string
        name: string
        email: string
        subject: string | null
        message: string
        phone: string | null
        company: string | null
        website: string | null
        budget: string | null
        timeline: string | null
        source: string | null
        status: string
        priority: string
        notes: string | null
        createdAt: Date
        updatedAt: Date | null
        respondedAt: Date | null
      }
      const normalized: ContactsData = {
        contacts: (result.contacts as ActionContact[]).map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          subject: c.subject ?? "",
          message: c.message,
          phone: c.phone,
          company: c.company,
          website: c.website,
          budget: c.budget,
          timeline: c.timeline,
          source: c.source,
          status: c.status,
          priority: c.priority,
          notes: c.notes,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
          respondedAt: c.respondedAt,
        })),
        pagination: result.pagination,
      }
      setData(normalized)
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
      await updateContact({ id: contactId, status: status as ContactStatus, notes })
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
