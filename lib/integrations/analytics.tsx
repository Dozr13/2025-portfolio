import { track } from '@vercel/analytics'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { envConfig, getAnalyticsConfig } from '../config'

// Analytics configuration
export const analyticsConfig = getAnalyticsConfig()

// Track custom events
export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  if (!analyticsConfig.enabled || !analyticsConfig.trackingEnabled) {
    console.log(`[Analytics - ${envConfig.NODE_ENV}] Event:`, eventName, properties)
    return
  }

  // Use Vercel Analytics track function
  if (typeof window !== 'undefined') {
    track(eventName, properties)
  }
}

// Track page views
export function trackPageView(url: string) {
  trackEvent('page_view', { url })
}

// Track contact form submissions
export function trackContactForm(formData: { subject: string; source: string }) {
  trackEvent('contact_form_submission', formData)
}

// Track admin actions
export function trackAdminAction(action: string, details?: Record<string, string | number | boolean>) {
  trackEvent('admin_action', { action, ...details })
}

// Track project views
export function trackProjectView(projectSlug: string) {
  trackEvent('project_view', { projectSlug })
}

// Analytics component with environment-aware setup
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  // Only load analytics in production with proper configuration
  if (!analyticsConfig.enabled || !analyticsConfig.vercelAnalyticsId) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

// Types for analytics data
interface AnalyticsTimeSeriesData {
  date: string
  views: number
}

interface AnalyticsPageData {
  path: string
  views: number
  change: number
}

interface AnalyticsReferrerData {
  source: string
  visits: number
  percentage: number
}

interface AnalyticsCountryData {
  country: string
  visits: number
  percentage: number
}

interface AnalyticsEventData {
  event: string
  count: number
  change: number
}

// Analytics data fetcher for admin dashboard
export async function getAnalyticsData(timeRange = '7d') {
  try {
    // In a real implementation, you would fetch from Vercel Analytics API
    // For now, return mock data structure
    const mockData = {
      pageViews: {
        total: 1250,
        change: 12.5,
        data: [
          { date: '2024-01-01', views: 45 },
          { date: '2024-01-02', views: 52 },
          { date: '2024-01-03', views: 38 },
          { date: '2024-01-04', views: 65 },
          { date: '2024-01-05', views: 72 },
          { date: '2024-01-06', views: 48 },
          { date: '2024-01-07', views: 55 }
        ] as AnalyticsTimeSeriesData[]
      },
      topPages: [
        { path: '/', views: 450, change: 8.2 },
        { path: '/projects', views: 320, change: 15.1 },
        { path: '/about', views: 180, change: -2.3 },
        { path: '/contact', views: 150, change: 22.1 },
        { path: '/blog', views: 100, change: 5.7 }
      ] as AnalyticsPageData[],
      referrers: [
        { source: 'Direct', visits: 420, percentage: 33.6 },
        { source: 'GitHub', visits: 280, percentage: 22.4 },
        { source: 'LinkedIn', visits: 210, percentage: 16.8 },
        { source: 'Google', visits: 180, percentage: 14.4 },
        { source: 'Twitter', visits: 160, percentage: 12.8 }
      ] as AnalyticsReferrerData[],
      countries: [
        { country: 'United States', visits: 650, percentage: 52.0 },
        { country: 'Canada', visits: 180, percentage: 14.4 },
        { country: 'United Kingdom', visits: 120, percentage: 9.6 },
        { country: 'Germany', visits: 100, percentage: 8.0 },
        { country: 'Other', visits: 200, percentage: 16.0 }
      ] as AnalyticsCountryData[],
      events: [
        { event: 'contact_form_submission', count: 25, change: 45.2 },
        { event: 'project_view', count: 180, change: 12.8 },
        { event: 'admin_action', count: 65, change: -5.1 }
      ] as AnalyticsEventData[]
    }

    return {
      timeRange,
      analytics: mockData,
      environment: envConfig.NODE_ENV,
      enabled: analyticsConfig.enabled
    }
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    throw error
  }
}