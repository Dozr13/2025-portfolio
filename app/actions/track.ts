"use server"

import { prisma } from "@/lib/config"

export async function recordPageView(input: { path: string; userAgent?: string | null; ipAddress?: string | null; referrer?: string | null }) {
  const { path, userAgent, ipAddress, referrer } = input
  if (!path || typeof path !== "string") throw new Error("Invalid payload")

  if (userAgent && /(bot|crawler|spider|crawling|preview|facebookexternalhit|discordbot|twitterbot|slackbot)/i.test(userAgent)) {
    return { ok: true }
  }

  await prisma.pageView.create({
    data: { page: path, userAgent: userAgent || null, ipAddress: typeof ipAddress === "string" ? ipAddress : null, referrer: typeof referrer === "string" ? referrer : null },
  })

  return { ok: true }
}


