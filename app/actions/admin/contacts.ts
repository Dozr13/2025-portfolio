"use server"

import type { Prisma } from "@/generated/client"
import { prisma } from "@/lib/config"
import type { ContactStatus, Priority } from "@/lib/domain/enums"
import { ensureAdmin } from "./auth"

export async function listContacts(params: {
  page?: number
  limit?: number
  status?: string | null
  search?: string | null
}) {
  await ensureAdmin()

  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const offset = (page - 1) * limit

  const where: Prisma.ContactWhereInput = {}
  if (params.status) {
    where.status = params.status as Prisma.EnumContactStatusFilter
  }
  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
      { subject: { contains: params.search, mode: "insensitive" } },
      { message: { contains: params.search, mode: "insensitive" } },
    ]
  }

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({ where, orderBy: { createdAt: "desc" }, skip: offset, take: limit }),
    prisma.contact.count({ where }),
  ])

  return {
    contacts,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }
}

export async function updateContact(input: { id: string; status?: ContactStatus; priority?: Priority; notes?: string | null }) {
  await ensureAdmin()
  const { id, status, priority, notes } = input

  const contact = await prisma.contact.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(notes !== undefined && { notes }),
      ...(status === "RESPONDED" && { respondedAt: new Date() }),
    },
  })

  return { success: true as const, contact }
}

export async function getContact(id: string) {
  await ensureAdmin()
  const contact = await prisma.contact.findUnique({ where: { id } })
  if (!contact) throw new Error("Contact not found")
  return { contact }
}

export async function deleteContact(id: string) {
  await ensureAdmin()
  await prisma.contact.delete({ where: { id } })
  return { success: true as const }
}


