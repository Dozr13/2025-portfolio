import { track } from '@vercel/analytics'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { envConfig, getAnalyticsConfig } from '../config'

// Analytics configuration
export const analyticsConfig = getAnalyticsConfig()

// Track admin actions
export function trackAdminAction(action: string, details?: Record<string, string | number | boolean>) {
  if (!analyticsConfig.enabled || !analyticsConfig.trackingEnabled) {
    console.log(`[Analytics - ${envConfig.NODE_ENV}] Event: admin_action`, { action, ...details })
    return
  }

  // Use Vercel Analytics track function
  if (typeof window !== 'undefined') {
    track('admin_action', { action, ...details })
  }
}

// Analytics component with environment-aware setup
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  // Only load analytics in production with proper configuration
  if (!analyticsConfig.enabled) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

