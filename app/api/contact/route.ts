import { Contact } from '@/generated/client'
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, phone, company, website, budget, timeline, source } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Create contact record in database
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        website: website?.trim() || null,
        budget: budget?.trim() || null,
        timeline: timeline?.trim() || null,
        source: source?.trim() || null,
        status: "NEW",
        priority: "MEDIUM"
      }
    })

    return NextResponse.json({
      success: true,
      message: "Contact saved successfully",
      contactId: contact.id
    })

  } catch (error) {
    console.error("Error saving contact:", error)
    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 10 // Limit for public endpoint
    })

    return NextResponse.json({
      contacts: contacts.map((contact: Contact) => ({
        id: contact.id,
        name: contact.name,
        createdAt: contact.createdAt,
        status: contact.status
      }))
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}