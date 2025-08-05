"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface DashboardStats {
  contacts: {
    total: number
    new: number
    thisWeek: number
  }
  blog: {
    published: number
    drafts: number
    totalViews: number
  }
  analytics: {
    visitors: number
    pageViews: number
    avgTimeOnSite: number
  }
}

interface RecentContact {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchDashboardData()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        router.push("/admin")
        return
      }

      const response = await fetch("/api/admin/auth", {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem("adminToken")
        router.push("/admin")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/admin")
    }
  }

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken")

      // Fetch dashboard stats
      const [statsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch("/api/admin/contacts", {
          headers: { "Authorization": `Bearer ${token}` }
        })
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setRecentContacts(contactsData.contacts.slice(0, 5))
      }

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center">
                <Icon name="shield-check" size="md" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Portfolio Admin</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="external-link" size="sm" />
                View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <Icon name="log-out" size="sm" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Icon name="mail" size="md" className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.contacts.total || 0}</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-xs text-green-500">+{stats?.contacts.new || 0} new</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Icon name="file-text" size="md" className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.blog.published || 0}</p>
                <p className="text-sm text-muted-foreground">Published Posts</p>
                <p className="text-xs text-muted-foreground">{stats?.blog.drafts || 0} drafts</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Icon name="eye" size="md" className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.blog.totalViews || 0}</p>
                <p className="text-sm text-muted-foreground">Blog Views</p>
                <p className="text-xs text-green-500">This month</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Icon name="users" size="md" className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.analytics.visitors || 0}</p>
                <p className="text-sm text-muted-foreground">Visitors</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/admin/blog/new"
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="plus" size="md" className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">New Blog Post</p>
                    <p className="text-sm text-muted-foreground">Create content</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/contacts"
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icon name="inbox" size="md" className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Manage Contacts</p>
                    <p className="text-sm text-muted-foreground">View messages</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/blog"
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <Icon name="square-pen" size="md" className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Manage Blog</p>
                    <p className="text-sm text-muted-foreground">Edit posts</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/analytics"
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Icon name="chart-bar" size="md" className="text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Analytics</p>
                    <p className="text-sm text-muted-foreground">View insights</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Recent Contacts */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Recent Contacts</h2>
              <Link
                href="/admin/contacts"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {recentContacts.length > 0 ? (
                <div className="divide-y divide-border">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          <p className="text-sm text-foreground mt-1">{contact.subject}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${contact.status === 'NEW'
                            ? 'bg-red-500/10 text-red-500'
                            : contact.status === 'IN_PROGRESS'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-green-500/10 text-green-500'
                            }`}>
                            {contact.status}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Icon name="inbox" size="lg" className="mx-auto mb-2 opacity-50" />
                  <p>No recent contacts</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}