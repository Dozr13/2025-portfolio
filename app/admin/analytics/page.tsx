"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

interface AnalyticsData {
  pageViews: { today: number; total: number; trend: number }
  visitors: { today: number; total: number; trend: number }
  avgTimeOnSite: number
  topPages: Array<{ page: string; views: number }>
  recentContacts: Array<{
    id: string
    name: string
    email: string
    subject: string
    createdAt: string
    status: string
  }>
  blogStats: {
    totalPosts: number
    publishedPosts: number
    totalViews: number
    avgReadingTime: number
  }
}

export default function Analytics() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken")
      const userData = localStorage.getItem("adminUser")

      if (!token || !userData) {
        window.location.href = "/admin"
        return
      }

      setUser(JSON.parse(userData))
      setAuthChecked(true)
    }

    checkAuth()
  }, [])

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/stats?timeRange=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })

      if (response.ok) {
        const data = await response.json()

        // Transform the stats data into analytics format
        setAnalytics({
          pageViews: {
            today: data.pageViews?.today || 0,
            total: data.pageViews?.total || 0,
            trend: 5.2 // Mock trend data
          },
          visitors: {
            today: data.visitors?.today || 0,
            total: data.visitors?.total || 0,
            trend: 3.1 // Mock trend data
          },
          avgTimeOnSite: data.avgTimeOnSite || 0,
          topPages: [
            { page: "/", views: Math.floor(Math.random() * 1000) + 500 },
            { page: "/blog", views: Math.floor(Math.random() * 500) + 200 },
            { page: "/projects", views: Math.floor(Math.random() * 300) + 100 },
            { page: "/contact", views: Math.floor(Math.random() * 200) + 50 }
          ],
          recentContacts: data.recentContacts || [],
          blogStats: {
            totalPosts: data.blogPosts?.total || 0,
            publishedPosts: data.blogPosts?.published || 0,
            totalViews: data.blogPosts?.totalViews || 0,
            avgReadingTime: 6 // Mock data
          }
        })
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    if (authChecked) {
      fetchAnalytics()
    }
  }, [authChecked, timeRange, fetchAnalytics])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "/admin"
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Dashboard
              </Link>
              <div className="w-px h-6 bg-border"></div>
              <h1 className="text-2xl font-bold">Analytics</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 text-sm bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{analytics?.pageViews.total.toLocaleString()}</p>
                <p className="text-sm text-green-500">+{analytics?.pageViews.trend}% vs last period</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Icon name="eye" size="md" className="text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Visitors</p>
                <p className="text-2xl font-bold">{analytics?.visitors.total.toLocaleString()}</p>
                <p className="text-sm text-green-500">+{analytics?.visitors.trend}% vs last period</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Icon name="users" size="md" className="text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time on Site</p>
                <p className="text-2xl font-bold">
                  {Math.floor((analytics?.avgTimeOnSite || 0) / 60)}:{((analytics?.avgTimeOnSite || 0) % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-muted-foreground">minutes</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Icon name="clock" size="md" className="text-purple-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blog Views</p>
                <p className="text-2xl font-bold">{analytics?.blogStats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{analytics?.blogStats.publishedPosts} published posts</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Icon name="square-pen" size="md" className="text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
            <div className="space-y-4">
              {analytics?.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-4">#{index + 1}</span>
                    <span className="font-medium">{page.page}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Contacts</h3>
              <Link
                href="/admin/contacts"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {analytics?.recentContacts.slice(0, 5).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${contact.status === "NEW"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      : contact.status === "RESPONDED"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}>
                      {contact.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}