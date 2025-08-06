import { getAnalyticsData } from "@/lib/analytics"
import { getDatabaseInfo } from "@/lib/db"
import { envConfig } from "@/lib/envConfig"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { verifyAdminToken } from "../auth/route"

export async function GET(request: Request) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken(request)
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get contact stats
    const [totalContacts, newContacts, weekContacts] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: { status: "NEW" }
      }),
      prisma.contact.count({
        where: {
          createdAt: { gte: oneWeekAgo }
        }
      })
    ])

    // Get blog stats
    const [publishedPosts, draftPosts, totalBlogViews] = await Promise.all([
      prisma.blogPost.count({
        where: { status: "PUBLISHED" }
      }),
      prisma.blogPost.count({
        where: { status: "DRAFT" }
      }),
      prisma.blogPost.aggregate({
        _sum: { views: true },
        where: { status: "PUBLISHED" }
      })
    ])

    // Get analytics stats (if tables exist)
    let visitors = 0
    let pageViews = 0
    let avgTimeOnSite = 0

    try {
      const [visitorsCount, pageViewsCount, avgTime] = await Promise.all([
        prisma.visitor.count({
          where: {
            firstVisit: { gte: oneWeekAgo }
          }
        }),
        prisma.pageView.count({
          where: {
            timestamp: { gte: oneWeekAgo }
          }
        }),
        prisma.visitor.aggregate({
          _avg: { timeOnSite: true },
          where: {
            timeOnSite: { not: null },
            firstVisit: { gte: oneMonthAgo }
          }
        })
      ])

      visitors = visitorsCount
      pageViews = pageViewsCount
      avgTimeOnSite = avgTime._avg.timeOnSite || 0
    } catch (error) {
      console.error("Analytics tables not available or empty:", error)
    }

    // Get analytics data and database info
    const [analyticsData, databaseInfo] = await Promise.all([
      getAnalyticsData('7d').catch(() => null),
      getDatabaseInfo().catch(() => null)
    ])

    return NextResponse.json({
      contacts: {
        total: totalContacts,
        new: newContacts,
        thisWeek: weekContacts
      },
      blog: {
        published: publishedPosts,
        drafts: draftPosts,
        totalViews: totalBlogViews._sum.views || 0
      },
      analytics: analyticsData ? {
        ...analyticsData.analytics,
        environment: envConfig.NODE_ENV,
        enabled: analyticsData.enabled
      } : {
        visitors,
        pageViews,
        avgTimeOnSite: Math.round(avgTimeOnSite / 60),
        environment: envConfig.NODE_ENV,
        enabled: false
      },
      database: databaseInfo
    })

  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}