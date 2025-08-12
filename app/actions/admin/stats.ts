'use server'

import { envConfig, getDatabaseInfo, prisma } from '@/lib/config'
import { analyticsConfig } from '@/lib/integrations/analytics'
import type { AnalyticsData } from '@/lib/types'
import { ensureAdmin } from './auth'

export async function getAdminStats() {
  await ensureAdmin()

  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [totalContacts, newContacts, weekContacts] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: 'NEW' } }),
    prisma.contact.count({ where: { createdAt: { gte: oneWeekAgo } } })
  ])

  const [publishedPosts, draftPosts, totalBlogViews] = await Promise.all([
    prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
    prisma.blogPost.count({ where: { status: 'DRAFT' } }),
    prisma.blogPost.aggregate({ _sum: { views: true }, where: { status: 'PUBLISHED' } })
  ])

  let pageViews = 0
  try {
    const [, /* visitorsCount */ pageViewsCount /*, avgTime */] = await Promise.all([
      prisma.visitor.count({ where: { firstVisit: { gte: oneWeekAgo } } }),
      prisma.pageView.count({ where: { timestamp: { gte: oneWeekAgo } } }),
      prisma.visitor.aggregate({
        _avg: { timeOnSite: true },
        where: { timeOnSite: { not: null }, firstVisit: { gte: oneMonthAgo } }
      })
    ])
    pageViews = pageViewsCount
  } catch {
    // ignore
  }

  // Minimal analytics fetcher (mocked in dev or when disabled)
  async function getAnalyticsData(timeRange: string) {
    try {
      if (envConfig.NODE_ENV === 'development' || !analyticsConfig.enabled) {
        const today = new Date()
        const days = timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 7
        const data = Array.from({ length: Math.min(days, 7) }).map((_, i) => {
          const d = new Date(today)
          d.setDate(d.getDate() - (6 - i))
          return { date: d.toISOString().slice(0, 10), views: 50 + i * 5 }
        })
        return {
          analytics: {
            pageViews: { total: data.reduce((s, d) => s + d.views, 0), change: 0, data },
            topPages: [],
            referrers: [],
            countries: [],
            events: []
          },
          environment: envConfig.NODE_ENV,
          enabled: analyticsConfig.enabled
        }
      }
      // TODO: Implement real analytics provider fetch
      return {
        analytics: {
          pageViews: { total: 0, change: 0, data: [] },
          topPages: [],
          referrers: [],
          countries: [],
          events: []
        },
        environment: envConfig.NODE_ENV,
        enabled: analyticsConfig.enabled
      }
    } catch {
      return null
    }
  }

  const [analyticsData, databaseInfo] = await Promise.all([
    getAnalyticsData('7d').catch(() => null),
    getDatabaseInfo().catch(() => null)
  ])

  let analyticsFromDb: AnalyticsData | null = null
  if (!analyticsData) {
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const [last7Count, prev7Count, last7Views, topPagesRaw, referrersRaw] = await Promise.all([
      prisma.pageView.count({ where: { timestamp: { gte: oneWeekAgo } } }),
      prisma.pageView.count({ where: { timestamp: { gte: twoWeeksAgo, lt: oneWeekAgo } } }),
      prisma.pageView.findMany({
        where: { timestamp: { gte: oneWeekAgo } },
        select: { timestamp: true }
      }),
      prisma.pageView.groupBy({
        by: ['page'],
        _count: { page: true },
        orderBy: { _count: { page: 'desc' } },
        take: 5
      }),
      prisma.pageView.groupBy({
        by: ['referrer'],
        where: { referrer: { not: null } },
        _count: { referrer: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 5
      })
    ])

    const byDate = new Map<string, number>()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      byDate.set(key, 0)
    }
    last7Views.forEach((v) => {
      const key = new Date(v.timestamp).toISOString().slice(0, 10)
      if (byDate.has(key)) byDate.set(key, (byDate.get(key) || 0) + 1)
    })
    const series = Array.from(byDate.entries()).map(([date, views]) => ({ date, views }))
    const change =
      prev7Count === 0
        ? last7Count > 0
          ? 100
          : 0
        : Math.round(((last7Count - prev7Count) / prev7Count) * 100)

    const totalLast7 = last7Count
    const topPages = topPagesRaw.map((p) => ({
      path: p.page,
      views: (p._count as { page: number }).page,
      change: 0
    }))
    const refTotal =
      referrersRaw.reduce((sum, r) => sum + (r._count as { referrer: number }).referrer, 0) || 1
    const referrers = referrersRaw
      .filter((r) => r.referrer)
      .map((r) => ({
        source: (r.referrer as unknown as string) || 'Direct',
        visits: (r._count as { referrer: number }).referrer,
        percentage: Math.round(((r._count as { referrer: number }).referrer / refTotal) * 100)
      }))

    analyticsFromDb = {
      pageViews: { total: totalLast7, change, data: series },
      topPages,
      referrers,
      countries: [],
      events: []
    }
  }

  const database = databaseInfo ?? {
    skills: 0,
    projects: 0,
    experiences: 0,
    contacts: 0,
    testimonials: 0,
    environment: envConfig.NODE_ENV,
    database: envConfig.NODE_ENV
  }

  return {
    contacts: { total: totalContacts, new: newContacts, thisWeek: weekContacts },
    blog: {
      published: publishedPosts,
      drafts: draftPosts,
      totalViews: totalBlogViews._sum.views || 0
    },
    analytics: analyticsData
      ? {
          ...analyticsData.analytics,
          environment: envConfig.NODE_ENV,
          enabled: analyticsData.enabled
        }
      : analyticsFromDb
        ? { ...analyticsFromDb, environment: envConfig.NODE_ENV, enabled: true }
        : {
            pageViews: { total: pageViews, change: 0, data: [] },
            topPages: [],
            referrers: [],
            countries: [],
            events: [],
            environment: envConfig.NODE_ENV,
            enabled: false
          },
    database
  }
}
