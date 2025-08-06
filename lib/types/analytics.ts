// ============================================================================
// ANALYTICS & TRACKING TYPES
// ============================================================================

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: Date
}

export interface PageViewData {
  page: string
  views: number
  uniqueVisitors: number
  bounceRate: number
}

export interface AnalyticsData {
  pageViews: {
    total: number
    change: number
  }
  uniqueVisitors: {
    total: number
    change: number
  }
  bounceRate: {
    rate: number
    change: number
  }
  topPages: PageViewData[]
  timeRange: string
}

export interface TrackingConfig {
  enabled: boolean
  debug: boolean
  anonymizeIp: boolean
  cookieConsent: boolean
}

export interface VisitorInfo {
  sessionId: string
  userAgent: string
  ipAddress?: string
  country?: string
  city?: string
  device?: string
  browser?: string
  os?: string
}