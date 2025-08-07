import { Prisma } from '@/generated/client'
import { prisma } from "@/lib/config"
import { verifyAdminToken } from "@/lib/utils/auth"
import { handleCors } from "@/lib/utils/cors"
import { NextResponse } from "next/server"

export async function OPTIONS() {
  return handleCors()
}

export async function GET(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    // Build where clause
    const where: Prisma.ContactWhereInput = {}
    if (status) {
      where.status = status as Prisma.EnumContactStatusFilter
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } }
      ]
    }

    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit
      }),
      prisma.contact.count({ where })
    ])

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, status, priority, notes } = await request.json()

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(notes !== undefined && { notes }),
        ...(status === "RESPONDED" && { respondedAt: new Date() })
      }
    })

    return NextResponse.json({
      success: true,
      contact: updatedContact
    })

  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    )
  }
}