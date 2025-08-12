'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Simple bot detection based on user agent
function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  const botRegex =
    /(bot|crawler|spider|crawling|preview|facebookexternalhit|discordbot|twitterbot|slackbot)/i
  return botRegex.test(userAgent)
}

// Deduplicate tracking per path within a short TTL to reduce noise
function shouldTrackPath(pathWithQuery: string, ttlMs = 30000): boolean {
  try {
    const key = `pv:${pathWithQuery}`
    const now = Date.now()
    const last = sessionStorage.getItem(key)
    if (last && now - parseInt(last, 10) < ttlMs) {
      return false
    }
    sessionStorage.setItem(key, String(now))
    return true
  } catch {
    return true
  }
}

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasMounted = useRef(false)

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    const pathWithQuery = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`

    // Avoid tracking on first mount re-execution glitch
    if (!hasMounted.current) {
      hasMounted.current = true
    }

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
    if (isLikelyBot(userAgent)) return

    if (!shouldTrackPath(pathWithQuery))
      return // Fire-and-forget; use Server Action to record page view
    ;(async () => {
      const { recordPageView } = await import('@/app/actions/track')
      await recordPageView({
        path: pathname,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        ipAddress: null
      })
    })().catch(() => {})
  }, [pathname, searchParams])

  return null
}
