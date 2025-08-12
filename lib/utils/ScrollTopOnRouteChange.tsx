'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function ScrollTopOnRouteChange({
  enabled = true,
  top = 0
}: {
  enabled?: boolean
  top?: number
}) {
  const pathname = usePathname()

  // On mount, disable automatic restoration and scroll to top
  useEffect(() => {
    if (!enabled) return
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top, left: 0, behavior: 'auto' })
    return () => {
      if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [enabled, top])

  // On pathname change, ensure we’re at the top
  useEffect(() => {
    if (!enabled) return
    window.scrollTo({ top, left: 0, behavior: 'auto' })
  }, [pathname, enabled, top])

  return null
}
