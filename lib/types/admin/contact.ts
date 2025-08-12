export interface Contact {
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
