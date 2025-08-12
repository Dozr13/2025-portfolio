import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function AdminIndex() {
  const headersList = await headers()
  const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null
  const valid = token ? await isValidToken(token) : false
  if (valid) redirect('/admin/dashboard')
  redirect('/admin/login')
}
