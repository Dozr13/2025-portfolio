import { NextResponse } from 'next/server'

/**
 * Reusable CORS handler for API routes
 * Handles OPTIONS preflight requests with proper CORS headers
 */
export function handleCors() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
