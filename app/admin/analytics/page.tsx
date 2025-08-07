import { AnalyticsStreaming } from '@/components/admin/analytics/AnalyticsStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

async function getAnalyticsData() {
  try {
    const headersList = await headers()

    // Try to get token from cookie first (httpOnly cookie set during login)
    const cookieHeader = headersList.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/adminToken=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null

    if (!token) {
      console.log('No token found in cookies')
      return null
    }

    // Verify token is valid
    const isValid = await isValidToken(token)
    if (!isValid) {
      console.log('Token validation failed')
      return null
    }

    // Use relative URL for internal server-side fetch
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Don't cache for real-time analytics
    })

    if (!response.ok) {
      console.log('API response not ok:', response.status)
      return null
    }

    const data = await response.json()
    console.log('Analytics data fetched successfully')
    return data
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return null
  }
}

export default async function AdminAnalytics() {
  const initialStats = await getAnalyticsData()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={null} // Let client handle errors
      errorTitle=""
      errorMessage=""
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <AnalyticsStreaming initialData={initialStats} />
    </AdminPageWrapper>
  )
}