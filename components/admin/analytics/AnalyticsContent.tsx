"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalytics } from '@/hooks/useAnalytics'
import { trackAdminAction } from '@/lib/integrations'
import { StatsData } from '@/lib/types'
import { formatNumber, formatPercentage } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useEffect, useState } from 'react'
import { Icon } from '../../ui/icon'
import { AnalyticsCard } from './AnalyticsCard'
import { AnalyticsSkeleton } from './AnalyticsSkeleton'

export const AnalyticsContent = ({ initialData }: { initialData?: StatsData }) => {
  const [timeRange, setTimeRange] = useState('7d')
  const [autoRefresh, setAutoRefresh] = useState(false)

  const { stats, loading, error, lastUpdated, refresh } = useAnalytics({
    timeRange,
    autoRefresh,
    refreshInterval: 30000,
    initialData
  })

  useEffect(() => {
    trackAdminAction('view_analytics', { timeRange })
  }, [timeRange])

  // Show loading state if no initial data and still loading
  if (loading && !initialData) {
    return <AnalyticsSkeleton />
  }

  if (error || !stats) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icon name="alert-circle" className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics Unavailable</h3>
            <p className="text-muted-foreground">
              {error || "Please try refreshing the page or check your connection"}
            </p>
          </div>
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
            {lastUpdated && (
              <span className="ml-4 text-xs">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${autoRefresh
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
          >
            <Icon name="refresh" className="h-4 w-4 mr-2" />
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </button>

          <button
            onClick={refresh}
            disabled={loading}
            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Icon name="zap" className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

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
            <AnalyticsCard
              title="Page Views"
              value={formatNumber(stats.analytics.pageViews.total)}
              icon="👁️"
              trend={{
                value: stats.analytics.pageViews.change,
                isPositive: stats.analytics.pageViews.change > 0
              }}
            />

            <AnalyticsCard
              title="Total Contacts"
              value={formatNumber(stats.contacts.total)}
              subtitle={`${stats.contacts.new} new, ${stats.contacts.thisWeek} this week`}
              icon="📧"
            />

            <AnalyticsCard
              title="Blog Posts"
              value={formatNumber(stats.blog.published)}
              subtitle={`${stats.blog.drafts} drafts, ${formatNumber(stats.blog.totalViews)} total views`}
              icon="📝"
            />

            <AnalyticsCard
              title="Events Tracked"
              value={formatNumber(stats.analytics.events.reduce((sum, event) => sum + event.count, 0))}
              subtitle={`${stats.analytics.events.length} event types`}
              icon="📊"
            />
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

        {/* Other tabs content... */}
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