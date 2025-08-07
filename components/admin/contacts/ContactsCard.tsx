import { Icon } from "@/components/ui/icon"
import type { Contact } from "@/lib/types"
import { useState } from "react"

interface ContactsCardProps {
  contact: Contact
  onUpdateStatus: (id: string, status: string, notes?: string) => void
  updating: string | null
}

export const ContactsCard = ({ contact, onUpdateStatus, updating }: ContactsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [notes, setNotes] = useState(contact.notes || "")
  const isUpdating = updating === contact.id

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
      case "MEDIUM": return "bg-yellow-500/10 text-yellow-500"
      case "LOW": return "bg-green-500/10 text-green-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    onUpdateStatus(contact.id, newStatus, notes)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{contact.name}</h3>
            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(contact.priority)}`}>
              {contact.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{contact.email}</p>
          {contact.subject && (
            <p className="text-sm text-foreground font-medium">{contact.subject}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(contact.status)}`}>
              {contact.status.replace(/_/g, " ")}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size="sm" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t border-border pt-4">
          {/* Message */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Message</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contact.message}</p>
          </div>

          {/* Additional Info */}
          {(contact.phone || contact.company || contact.website || contact.budget || contact.timeline || contact.source) && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {contact.phone && (
                  <div>
                    <span className="text-muted-foreground">Phone:</span> {contact.phone}
                  </div>
                )}
                {contact.company && (
                  <div>
                    <span className="text-muted-foreground">Company:</span> {contact.company}
                  </div>
                )}
                {contact.website && (
                  <div>
                    <span className="text-muted-foreground">Website:</span> {contact.website}
                  </div>
                )}
                {contact.budget && (
                  <div>
                    <span className="text-muted-foreground">Budget:</span> {contact.budget}
                  </div>
                )}
                {contact.timeline && (
                  <div>
                    <span className="text-muted-foreground">Timeline:</span> {contact.timeline}
                  </div>
                )}
                {contact.source && (
                  <div>
                    <span className="text-muted-foreground">Source:</span> {contact.source}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Add internal notes..."
            />
          </div>

          {/* Status Actions */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {["NEW", "IN_PROGRESS", "RESPONDED", "CLOSED", "SPAM"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={isUpdating || contact.status === status}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${contact.status === status
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-muted"
                    } disabled:opacity-50`}
                >
                  {isUpdating && contact.status !== status ? "Updating..." : status.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
