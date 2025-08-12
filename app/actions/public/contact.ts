'use server'

import { prisma } from '@/lib/config'
import { z } from 'zod'

export async function createContact(input: unknown) {
  const schema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    subject: z.string().min(1).max(100),
    message: z.string().min(10).max(1000),
    phone: z.string().optional(),
    company: z.string().optional(),
    website: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    source: z.string().optional()
  })
  const { name, email, subject, message, phone, company, website, budget, timeline, source } =
    schema.parse(input)

  const contact = await prisma.contact.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || '',
      message: message.trim(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      website: website?.trim() || null,
      budget: budget?.trim() || null,
      timeline: timeline?.trim() || null,
      source: source?.trim() || null,
      status: 'NEW',
      priority: 'MEDIUM'
    }
  })

  return { success: true as const, message: 'Contact saved successfully', contactId: contact.id }
}
