import { jwtVerify } from 'jose'
import { JWT_SECRET } from './jwt'

/**
 * Utility function to verify admin token (for API routes)
 * Supports both Authorization header and cookie-based tokens
 */
export const verifyAdminToken = async (request: Request): Promise<boolean> => {
  try {
    const authHeader = request.headers.get('authorization')
    const token =
      authHeader?.replace('Bearer ', '') ||
      request.headers.get('cookie')?.split('adminToken=')[1]?.split(';')[0]

    if (!token) return false

    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

/**
 * Extract token from request (Authorization header or cookie)
 */
export const extractToken = (request: Request): string | null => {
  const authHeader = request.headers.get('authorization')
  return (
    authHeader?.replace('Bearer ', '') ||
    request.headers.get('cookie')?.split('adminToken=')[1]?.split(';')[0] ||
    null
  )
}

/**
 * Verify if a token is valid without throwing
 */
export const isValidToken = async (token: string): Promise<boolean> => {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}
