import { headers } from 'next/headers'
import { envConfig } from '../config'
import { analyticsConfig } from '../integrations/analytics'
import type { AnalyticsResponse } from '../types/admin/analytics'
import { isValidToken } from '../utils/auth'

// Server-side analytics data fetcher for admin dashboard
export const getServerAnalyticsData = async () => {
  try {
    const headersList = await headers()
    const cookieHeader = headersList.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/adminToken=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null

    if (!token || !(await isValidToken(token))) {
      console.log('Token validation failed')
      return null
    }

    // Get analytics data directly from service (will use mock data in development)
    const analyticsData = await getAnalyticsData('7d')
    console.log('Analytics data fetched successfully from service')

    // Return in the format expected by the client
    return {
      contacts: { total: 0, new: 0, thisWeek: 0 }, // Will be filled by API route
      blog: { published: 0, drafts: 0, totalViews: 0 }, // Will be filled by API route
      analytics: {
        ...analyticsData.analytics,
        environment: analyticsData.environment,
        enabled: analyticsData.enabled
      },
      database: {
        skills: 0,
        projects: 0,
        experiences: 0,
        contacts: 0,
        testimonials: 0,
        environment: analyticsData.environment,
        database: envConfig.NODE_ENV
      }
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return null
  }
}

// Mock data for development mode
const getMockAnalyticsData = (timeRange: string): AnalyticsResponse => ({
  timeRange,
  analytics: {
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
      ]
    },
    topPages: [
      { path: '/', views: 450, change: 8.2 },
      { path: '/projects', views: 320, change: 15.1 },
      { path: '/about', views: 180, change: -2.3 },
      { path: '/contact', views: 150, change: 22.1 },
      { path: '/blog', views: 100, change: 5.7 }
    ],
    referrers: [
      { source: 'Direct', visits: 420, percentage: 33.6 },
      { source: 'GitHub', visits: 280, percentage: 22.4 },
      { source: 'LinkedIn', visits: 210, percentage: 16.8 },
      { source: 'Google', visits: 180, percentage: 14.4 },
      { source: 'Twitter', visits: 160, percentage: 12.8 }
    ],
    countries: [
      { country: 'United States', visits: 650, percentage: 52.0 },
      { country: 'Canada', visits: 180, percentage: 14.4 },
      { country: 'United Kingdom', visits: 120, percentage: 9.6 },
      { country: 'Germany', visits: 100, percentage: 8.0 },
      { country: 'Other', visits: 200, percentage: 16.0 }
    ],
    events: [
      { event: 'contact_form_submission', count: 25, change: 45.2 },
      { event: 'project_view', count: 180, change: 12.8 },
      { event: 'admin_action', count: 65, change: -5.1 }
    ]
  },
  environment: envConfig.NODE_ENV,
  enabled: analyticsConfig.enabled
})

// Analytics data fetcher for admin dashboard
export const getAnalyticsData = async (timeRange = '7d'): Promise<AnalyticsResponse> => {
  try {
    // In development mode or when analytics is disabled, use mock data
    if (envConfig.NODE_ENV === 'development' || !analyticsConfig.enabled) {
      console.log('[Analytics] Using mock data for development mode')
      return getMockAnalyticsData(timeRange)
    }

    // In production with analytics enabled, fetch from Vercel Analytics API
    // TODO: Implement real Vercel Analytics API integration
    console.log('[Analytics] Production mode - would fetch from Vercel Analytics API')
    
    // For now, return mock data even in production until real API is implemented
    return getMockAnalyticsData(timeRange)
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    // Fallback to mock data on error
    return getMockAnalyticsData(timeRange)
  }
}
