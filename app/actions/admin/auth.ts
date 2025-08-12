'use server'

import { envConfig } from '@/lib/config'
import { JWT_SECRET } from '@/lib/utils/jwt'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { z } from 'zod'

type AdminPayload = { username: string; role: 'admin' }

const ADMIN_CREDENTIALS = {
  username: envConfig.ADMIN_USERNAME,
  password: envConfig.ADMIN_PASSWORD
} as const

export async function loginAdmin(credentials: { username: string; password: string }) {
  const schema = z.object({
    username: z.string().min(1, 'Username required'),
    password: z.string().min(1, 'Password required')
  })
  const { username, password } = schema.parse(credentials)
  if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
    throw new Error('Invalid credentials')
  }

  const token = await new SignJWT({
    username,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000)
  } satisfies AdminPayload & {
    iat: number
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60,
    path: '/'
  })

  return { success: true, token, user: { username, role: 'admin' as const } }
}

export async function getAdminAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('adminToken')?.value
  if (!token) return { authenticated: false as const }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      authenticated: true as const,
      user: { username: payload.username as string, role: (payload.role as 'admin') || 'admin' }
    }
  } catch {
    return { authenticated: false as const }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.set('adminToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/'
  })
  return { success: true }
}

export async function ensureAdmin(): Promise<AdminPayload> {
  const cookieStore = await cookies()
  const token = cookieStore.get('adminToken')?.value
  if (!token) throw new Error('Unauthorized')
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return { username: payload.username as string, role: 'admin' }
}
