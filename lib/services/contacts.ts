import { prisma } from '@/lib/config'
import type { Contact } from '@/lib/types'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

interface ContactsData {
  contacts: Contact[]
  pagination: {
    pages: number
    total: number
  }
}

export const getServerContactsData = async (): Promise<ContactsData | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Contacts Service] Invalid or missing token')
      return null
    }

    console.log('[Contacts Service] Fetching contacts directly from database...')
    
    // Fetch contacts directly from Prisma
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.contact.count()
    const pages = Math.ceil(total / 10) // Assuming 10 per page

    const contactsData = {
      contacts: contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        website: contact.website,
        budget: contact.budget,
        timeline: contact.timeline,
        source: contact.source,
        status: contact.status,
        priority: contact.priority,
        notes: contact.notes,
        createdAt: contact.createdAt.toISOString(),
        updatedAt: contact.updatedAt.toISOString(),
        respondedAt: contact.respondedAt?.toISOString() || null
      })),
      pagination: {
        pages,
        total
      }
    }

    console.log('[Contacts Service] Contacts fetched successfully:', contacts.length, 'contacts')
    return contactsData
  } catch (error) {
    console.error('[Contacts Service] Error fetching contacts:', error)
    return null
  }
}

export const getServerContactData = async (id: string): Promise<Contact | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Contacts Service] Invalid or missing token')
      return null
    }

    console.log('[Contacts Service] Fetching contact directly from database:', id)
    
    // Fetch contact directly from Prisma
    const contact = await prisma.contact.findUnique({
      where: { id }
    })

    if (!contact) {
      console.log('[Contacts Service] Contact not found:', id)
      return null
    }

    const contactData = {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      phone: contact.phone,
      company: contact.company,
      website: contact.website,
      budget: contact.budget,
      timeline: contact.timeline,
      source: contact.source,
      status: contact.status,
      priority: contact.priority,
      notes: contact.notes,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
      respondedAt: contact.respondedAt?.toISOString() || null
    }

    console.log('[Contacts Service] Contact fetched successfully:', contact.name)
    return contactData
  } catch (error) {
    console.error('[Contacts Service] Error fetching contact:', error)
    return null
  }
}
