import { JWT_SECRET } from '@/lib/utils/jwt'
import { jwtVerify } from 'jose'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'

export async function requireAdmin() {
  const cookieHeader = (await headers()).get('cookie') || ''
  const match = cookieHeader.match(/adminToken=([^;]+)/)
  const token = match ? match[1] : null

  if (!token) redirect('/admin/login')

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload // { username, role, ... }
  } catch {
    redirect('/admin/login')
  }
}
