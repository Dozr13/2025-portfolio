import { prisma } from "@/lib/config"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { path, referrer } = await request.json().catch(() => ({ path: null, referrer: null }))
    if (!path || typeof path !== 'string') {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const headers = Object.fromEntries(new Headers(request.headers).entries())
    const ip = headers["x-forwarded-for"]?.split(",")[0]?.trim() || headers["x-real-ip"] || null
    const ua = headers["user-agent"] || null

    // Basic bot guard (server-side duplicate of client)
    if (ua && /(bot|crawler|spider|crawling|preview|facebookexternalhit|discordbot|twitterbot|slackbot)/i.test(ua)) {
      return NextResponse.json({ ok: true })
    }

    // Persist page view
    await prisma.pageView.create({
      data: {
        page: path,
        userAgent: ua,
        ipAddress: typeof ip === 'string' ? ip : null,
        referrer: typeof referrer === 'string' ? referrer : null
      }
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to record page view", error)
    return NextResponse.json({ error: "Failed to record" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 })
}


