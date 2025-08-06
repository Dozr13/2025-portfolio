"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackAdminAction } from "@/lib/integrations"
import { formatNumber, formatPercentage } from "@/lib/utils"
import { useEffect, useState } from "react"

interface AnalyticsData {
  pageViews: {
    total: number
    change: number
    data: Array<{ date: string; views: number }>
  }
  topPages: Array<{ path: string; views: number; change: number }>
  referrers: Array<{ source: string; visits: number; percentage: number }>
  countries: Array<{ country: string; visits: number; percentage: number }>
  events: Array<{ event: string; count: number; change: number }>
}

interface StatsData {
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

export default function AdminAnalytics() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchStats()
    // Track page view
    trackAdminAction('view_analytics', { timeRange })
  }, [timeRange])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Failed to load analytics</h1>
          <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Environment: <span className="font-medium">{stats.analytics.environment}</span> |
            Analytics: <span className={`font-medium ${stats.analytics.enabled ? 'text-green-500' : 'text-yellow-500'}`}>
              {stats.analytics.enabled ? 'Enabled' : 'Development Mode'}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {!stats.analytics.enabled && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Analytics is disabled in development mode. Deploy to production to see real analytics data.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <span className="text-2xl">👁️</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.analytics.pageViews.total)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stats.analytics.pageViews.change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatPercentage(stats.analytics.pageViews.change)}
                  </span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                <span className="text-2xl">📧</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.contacts.total)}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.contacts.new} new, {stats.contacts.thisWeek} this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <span className="text-2xl">📝</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.blog.published)}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.blog.drafts} drafts, {formatNumber(stats.blog.totalViews)} total views
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Tracked</CardTitle>
                <span className="text-2xl">📊</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(stats.analytics.events.reduce((sum, event) => sum + event.count, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.analytics.events.length} event types
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Views Trend</CardTitle>
              <CardDescription>Daily page views over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-sm">
                {stats.analytics.pageViews.data.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="bg-primary/10 rounded px-2 py-1 font-medium">
                      {day.views}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.analytics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{page.path}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(page.views)} views
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${page.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatPercentage(page.change)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.analytics.referrers.map((referrer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{referrer.source}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatNumber(referrer.visits)}</div>
                        <div className="text-sm text-muted-foreground">{referrer.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Geographic distribution of visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.analytics.countries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="font-medium">{country.country}</div>
                      <div className="text-right">
                        <div className="font-medium">{formatNumber(country.visits)}</div>
                        <div className="text-sm text-muted-foreground">{country.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Overview</CardTitle>
              <CardDescription>
                Current database statistics | Environment: {stats.database?.environment} |
                Database: {stats.database?.database}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">{stats.database?.skills || 0}</div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{stats.database?.projects || 0}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">{stats.database?.experiences || 0}</div>
                  <div className="text-sm text-muted-foreground">Experiences</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">{stats.database?.contacts || 0}</div>
                  <div className="text-sm text-muted-foreground">Contacts</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-pink-500">{stats.database?.testimonials || 0}</div>
                  <div className="text-sm text-muted-foreground">Testimonials</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}