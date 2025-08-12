export interface AnalyticsTimeSeriesData {
  date: string
  views: number
}

export interface AnalyticsPageData {
  path: string
  views: number
  change: number
}

export interface AnalyticsReferrerData {
  source: string
  visits: number
  percentage: number
}

export interface AnalyticsCountryData {
  country: string
  visits: number
  percentage: number
}

export interface AnalyticsEventData {
  event: string
  count: number
  change: number
}

export interface AnalyticsData {
  pageViews: {
    total: number
    change: number
    data: AnalyticsTimeSeriesData[]
  }
  topPages: AnalyticsPageData[]
  referrers: AnalyticsReferrerData[]
  countries: AnalyticsCountryData[]
  events: AnalyticsEventData[]
}

export interface StatsData {
  contacts: { total: number; new: number; thisWeek: number }
  blog: { published: number; drafts: number; totalViews: number }
  analytics: AnalyticsData & { environment: string; enabled: boolean }
  database: {
    skills: number
    projects: number
    experiences: number
    contacts: number
    testimonials: number
    environment: string
    database: string
  }
}

export interface UseAnalyticsOptions {
  autoRefresh?: boolean
  refreshInterval?: number
  timeRange?: string
  initialData?: StatsData
}

export interface AnalyticsResponse {
  timeRange: string
  analytics: AnalyticsData
  environment: string
  enabled: boolean
}