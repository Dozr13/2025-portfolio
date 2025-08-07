import { prisma } from '@/lib/config'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

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

export const getServerDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Dashboard Service] Invalid or missing token')
      return null
    }

    console.log('[Dashboard Service] Fetching dashboard data directly from database...')
    
    // Get current date for "this week" calculations
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    // Fetch data directly from Prisma
    const [contacts, blogPosts, recentContacts] = await Promise.all([
      // Contacts stats
      prisma.contact.groupBy({
        by: ['status'],
        _count: true
      }),
      // Blog posts stats
      prisma.blogPost.groupBy({
        by: ['status'],
        _count: true
      }),
      // Recent contacts
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          status: true,
          createdAt: true
        }
      })
    ])

    // Calculate stats
    const totalContacts = contacts.reduce((sum, c) => sum + c._count, 0)
    const newContacts = contacts.find(c => c.status === 'NEW')?._count || 0
    const thisWeekContacts = await prisma.contact.count({
      where: {
        createdAt: {
          gte: startOfWeek
        }
      }
    })

    const publishedPosts = blogPosts.find(p => p.status === 'PUBLISHED')?._count || 0
    const draftPosts = blogPosts.find(p => p.status === 'DRAFT')?._count || 0

    const dashboardData = {
      stats: {
        contacts: {
          total: totalContacts,
          new: newContacts,
          thisWeek: thisWeekContacts
        },
        blog: {
          published: publishedPosts,
          drafts: draftPosts,
          totalViews: 0 // Not implemented yet
        },
        analytics: {
          visitors: 0, // Not implemented yet
          pageViews: 0, // Not implemented yet
          avgTimeOnSite: 0 // Not implemented yet
        }
      },
      recentContacts: recentContacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject || '',
        status: contact.status,
        createdAt: contact.createdAt.toISOString()
      }))
    }

    console.log('[Dashboard Service] Dashboard data fetched successfully')
    return dashboardData
  } catch (error) {
    console.error('[Dashboard Service] Error fetching dashboard data:', error)
    return null
  }
}
