"use client"

import { AdminError, AdminLoading } from "@/components/admin/AdminErrorBoundary"
import { Icon } from "@/components/ui/icon"
import { useAdminData } from "@/hooks/useAdminData"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCallback } from "react"

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

interface DashboardData {
  stats: DashboardStats
  recentContacts: RecentContact[]
}

export default function AdminDashboard() {
  const fetchDashboardData = useCallback(async () => {
    const token = localStorage.getItem("adminToken")

    const [statsRes, contactsRes] = await Promise.all([
      fetch("/api/admin/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      }),
      fetch("/api/admin/contacts", {
        headers: { "Authorization": `Bearer ${token}` }
      })
    ])

    const [statsData, contactsData] = await Promise.all([
      statsRes.ok ? statsRes.json() : null,
      contactsRes.ok ? contactsRes.json() : null
    ])

    return {
      stats: statsData,
      recentContacts: contactsData?.contacts?.slice(0, 5) || []
    }
  }, [])

  const { data, loading, error, invalidateData } = useAdminData<DashboardData>({
    fetchFn: fetchDashboardData
  })

  // Clean error/loading states
  if (loading) return <AdminLoading message="Loading dashboard..." />
  if (error) return <AdminError error={error} onRetry={invalidateData} title="Dashboard Error" />

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quick Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="mail" size="md" className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{data?.stats?.contacts.total || 0}</p>
              <p className="text-sm text-muted-foreground">Total Contacts</p>
              <p className="text-xs text-green-500">+{data?.stats?.contacts.new || 0} new</p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="file-text" size="md" className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{data?.stats?.blog.published || 0}</p>
              <p className="text-sm text-muted-foreground">Published Posts</p>
              <p className="text-xs text-muted-foreground">{data?.stats?.blog.drafts || 0} drafts</p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Icon name="eye" size="md" className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{data?.stats?.blog.totalViews || 0}</p>
              <p className="text-sm text-muted-foreground">Blog Views</p>
              <p className="text-xs text-green-500">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Icon name="users" size="md" className="text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{data?.stats?.analytics.visitors || 0}</p>
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
              href="/admin/projects"
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Icon name="folder" size="md" className="text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Manage Projects</p>
                  <p className="text-sm text-muted-foreground">Edit portfolio</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/skills"
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Icon name="code" size="md" className="text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Manage Skills</p>
                  <p className="text-sm text-muted-foreground">Edit abilities</p>
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
            {data?.recentContacts && data.recentContacts.length > 0 ? (
              <div className="divide-y divide-border">
                {data.recentContacts.map((contact) => (
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
    </div>
  )
}