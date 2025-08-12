'use client'

import { Icon } from '@/components/ui/Icon'
import { useDashboard, type DashboardData } from '@/hooks/useDashboard'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface DashboardContentProps {
  initialData?: DashboardData | null
}

export const DashboardContent = ({ initialData }: DashboardContentProps) => {
  const { data, loading, error, fetchDashboardData } = useDashboard({
    initialData
  })

  if (loading && !initialData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const stats = data?.stats
  const visitors =
    typeof stats?.analytics?.pageViews?.total === 'number' ? stats.analytics.pageViews.total : 0
  const pageViews = visitors
  const avgTimeOnSiteSeconds = 0
  const recentContacts = data?.recentContacts || []

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="mail" size="md" className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {typeof stats?.contacts?.total === 'number' ? stats.contacts.total : 0}
              </p>
              <p className="text-sm text-muted-foreground">Total Contacts</p>
              <p className="text-xs text-green-500">
                +{typeof stats?.contacts?.new === 'number' ? stats.contacts.new : 0} new
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="file-text" size="md" className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {typeof stats?.blog?.published === 'number' ? stats.blog.published : 0}
              </p>
              <p className="text-sm text-muted-foreground">Published Posts</p>
              <p className="text-xs text-muted-foreground">
                {typeof stats?.blog?.drafts === 'number' ? stats.blog.drafts : 0} drafts
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Icon name="eye" size="md" className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{visitors}</p>
              <p className="text-sm text-muted-foreground">Visitors</p>
              <p className="text-xs text-muted-foreground">{pageViews} page views</p>
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Icon name="clock" size="md" className="text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(avgTimeOnSiteSeconds / 60)}m
              </p>
              <p className="text-sm text-muted-foreground">Avg. Time</p>
              <p className="text-xs text-muted-foreground">on site</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Link
          href="/admin/contacts"
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Icon name="mail" size="sm" className="text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Contacts</p>
              <p className="text-sm text-muted-foreground">View and respond to messages</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/blog"
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Icon name="file-text" size="sm" className="text-green-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Blog Posts</p>
              <p className="text-sm text-muted-foreground">Create and manage content</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/projects"
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Icon name="briefcase" size="sm" className="text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Projects</p>
              <p className="text-sm text-muted-foreground">Manage portfolio projects</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <Icon name="chart-bar" size="sm" className="text-orange-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Analytics</p>
              <p className="text-sm text-muted-foreground">View detailed insights</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Recent Contacts */}
      {recentContacts.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Contacts</h2>
            <Link
              href="/admin/contacts"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-foreground">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  {contact.subject && (
                    <p className="text-sm text-muted-foreground">{contact.subject}</p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      contact.status === 'NEW'
                        ? 'bg-red-500/10 text-red-500'
                        : contact.status === 'IN_PROGRESS'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : contact.status === 'RESPONDED'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-gray-500/10 text-gray-500'
                    }`}
                  >
                    {contact.status.replace(/_/g, ' ')}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
