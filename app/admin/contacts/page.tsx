"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Contact {
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
  createdAt: string
  updatedAt: string
  respondedAt: string | null
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filters, setFilters] = useState({
    status: "",
    search: ""
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchContacts()
  }, [filters])

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    try {
      const response = await fetch("/api/admin/auth", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (!response.ok) {
        localStorage.removeItem("adminToken")
        router.push("/admin")
      }
    } catch (error) {
      router.push("/admin")
    }
  }

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const params = new URLSearchParams()
      if (filters.status) params.append("status", filters.status)
      if (filters.search) params.append("search", filters.search)

      const response = await fetch(`/api/admin/contacts?${params.toString()}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (contactId: string, status: string, priority?: string, notes?: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: contactId,
          status,
          ...(priority && { priority }),
          ...(notes !== undefined && { notes })
        })
      })

      if (response.ok) {
        fetchContacts()
        if (selectedContact?.id === contactId) {
          setSelectedContact(prev => prev ? { ...prev, status, ...(priority && { priority }), ...(notes !== undefined && { notes }) } : null)
        }
      }
    } catch (error) {
      console.error("Failed to update contact:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-red-500/10 text-red-500 border-red-500/20"
      case "IN_PROGRESS": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "RESPONDED": return "bg-green-500/10 text-green-500 border-green-500/20"
      case "CLOSED": return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "SPAM": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT": return "bg-red-500/10 text-red-500"
      case "HIGH": return "bg-orange-500/10 text-orange-500"
      case "MEDIUM": return "bg-blue-500/10 text-blue-500"
      case "LOW": return "bg-gray-500/10 text-gray-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Icon name="arrow-left" size="md" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Contact Management</h1>
                <p className="text-muted-foreground">{contacts.length} total contacts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search contacts..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESPONDED">Responded</option>
              <option value="CLOSED">Closed</option>
              <option value="SPAM">Spam</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`bg-card border border-border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:border-primary/50 ${selectedContact?.id === contact.id ? "ring-2 ring-primary border-primary" : ""
                      }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">{contact.name}</h3>
                        <p className="text-muted-foreground">{contact.email}</p>
                        {contact.company && (
                          <p className="text-sm text-muted-foreground">{contact.company}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                          {contact.priority}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium text-foreground mb-2">{contact.subject || "No Subject"}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{contact.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                      {contact.source && <span>via {contact.source}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <Icon name="inbox" size="xl" className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No contacts found</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="sticky top-8"
            >
              {selectedContact ? (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Contact Details</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-foreground">{selectedContact.name}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{selectedContact.email}</p>
                    </div>

                    {selectedContact.phone && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-foreground">{selectedContact.phone}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Subject</label>
                      <p className="text-foreground">{selectedContact.subject || "No subject"}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Message</label>
                      <p className="text-foreground text-sm bg-muted/30 p-3 rounded-lg">{selectedContact.message}</p>
                    </div>

                    {selectedContact.notes && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Notes</label>
                        <p className="text-foreground text-sm">{selectedContact.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Quick Actions</h4>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateContactStatus(selectedContact.id, "IN_PROGRESS")}
                        className="px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors text-sm"
                      >
                        Mark In Progress
                      </button>
                      <button
                        onClick={() => updateContactStatus(selectedContact.id, "RESPONDED")}
                        className="px-3 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors text-sm"
                      >
                        Mark Responded
                      </button>
                      <button
                        onClick={() => updateContactStatus(selectedContact.id, "CLOSED")}
                        className="px-3 py-2 bg-gray-500/10 text-gray-500 rounded-lg hover:bg-gray-500/20 transition-colors text-sm"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => updateContactStatus(selectedContact.id, "SPAM")}
                        className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                      >
                        Mark Spam
                      </button>
                    </div>

                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || "Your inquiry"}&body=Hi ${selectedContact.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center inline-block"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <Icon name="user" size="xl" className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Select a contact to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}