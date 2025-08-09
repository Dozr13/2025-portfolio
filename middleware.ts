import { JWT_SECRET } from '@/lib/utils/jwt'
import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply auth to admin routes except public admin pages
  const isAdminRoute = pathname.startsWith('/admin')
  const isPublicAdmin = pathname === '/admin' || pathname === '/admin/login'
  if (isAdminRoute && !isPublicAdmin) {
    const token = request.cookies.get('adminToken')?.value

    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify the token
      await jwtVerify(token, JWT_SECRET)
      
      // Token is valid, allow the request to proceed
      return NextResponse.next()
    } catch {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
