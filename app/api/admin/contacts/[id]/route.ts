import { prisma } from "@/lib/config"
import { verifyAdminToken } from "@/lib/utils/auth"
import { handleCors } from "@/lib/utils/cors"
import { NextResponse } from "next/server"

export async function OPTIONS() {
  return handleCors()
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const isAuthenticated = await verifyAdminToken(request)
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, notes } = body

    const updatedContact = await prisma.contact.update({
      where: { id: resolvedParams.id },
      data: {
        status,
        notes,
        respondedAt: status === "RESPONDED" ? new Date() : undefined
      }
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const isAuthenticated = await verifyAdminToken(request)
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contact = await prisma.contact.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    )
  }
}
