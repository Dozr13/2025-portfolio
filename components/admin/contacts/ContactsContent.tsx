"use client"

import { Icon } from "@/components/ui/icon"
import { useContacts } from "@/hooks/useContacts"
import type { Contact } from "@/lib/types"
import { useState } from "react"
import { ContactsCard } from "./ContactsCard"

interface ContactsData {
  contacts: Contact[]
  pagination: {
    total: number
    pages: number
  }
}

interface ContactsContentProps {
  initialData?: ContactsData | null
}

export function ContactsContent({ initialData }: ContactsContentProps) {
  const { data, loading, error, updating, fetchContacts, updateContactStatus } = useContacts({
    initialData
  })

  const [searchInput, setSearchInput] = useState("")
  const [filters, setFilters] = useState({
    status: ""
  })

  const contacts = data?.contacts || []

  const handleSearch = (value: string) => {
    setSearchInput(value)
    fetchContacts({ ...filters, search: value })
  }

  const handleFilterChange = (filter: string, value: string) => {
    const newFilters = { ...filters, [filter]: value }
    setFilters(newFilters)
    fetchContacts({ ...newFilters, search: searchInput })
  }

  const handleUpdateStatus = (id: string, status: string, notes?: string) => {
    updateContactStatus(id, status, notes)
  }

  if (loading && !initialData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchContacts()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESPONDED">Responded</option>
          <option value="CLOSED">Closed</option>
          <option value="SPAM">Spam</option>
        </select>
      </div>

      {/* Contacts Grid */}
      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="mail" size="lg" className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No contacts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchInput || filters.status
              ? "Try adjusting your search or filters"
              : "No contact messages yet"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactsCard
              key={contact.id}
              contact={contact}
              onUpdateStatus={handleUpdateStatus}
              updating={updating}
            />
          ))}
        </div>
      )}

      {/* Summary */}
      {contacts.length > 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Showing {contacts.length} of {data?.pagination?.total || 0} contacts
        </div>
      )}
    </div>
  )
}
