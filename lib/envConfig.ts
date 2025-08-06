// Load environment variables from .env files (server-side only)
// This is conditionally loaded to avoid webpack issues in client-side builds
let envLoaded = false
if (typeof window === 'undefined' && !envLoaded) {
  try {
    // Dynamic import to avoid bundling in client
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { loadEnvConfig } = require('@next/env')
    const projectDir = process.cwd()
    loadEnvConfig(projectDir)
    envLoaded = true
  } catch (error) {
    console.warn('Failed to load environment config:', error)
  }
}

// Environment configuration with validation
export const envConfig = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  
  // Admin Authentication
  ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
  JWT_SECRET: process.env.JWT_SECRET!,
  
  // Analytics & Monitoring
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
  VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  
  // App Configuration
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Feature Flags
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_SAMPLE_DATA: process.env.NODE_ENV !== 'production',
  
  // Contact Form
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  
  // Rate Limiting
  RATE_LIMIT_MAX: process.env.NODE_ENV === 'production' ? 100 : 1000,
  
} as const

// Validation function
export function validateEnvConfig() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'ADMIN_USERNAME', 
    'ADMIN_PASSWORD',
    'JWT_SECRET'
  ] as const

  const missing = requiredEnvVars.filter(key => !envConfig[key])
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env files and ensure all required variables are set.'
    )
  }
}

// Database configuration helper
export function getDatabaseConfig() {
  if (envConfig.NODE_ENV === 'test') {
    // Use test database URL if available, otherwise append _test suffix
    return process.env.DATABASE_URL_TEST || `${envConfig.DATABASE_URL}_test`
  }
  
  return envConfig.DATABASE_URL
}

// Analytics configuration helper
export function getAnalyticsConfig() {
  return {
    enabled: envConfig.ENABLE_ANALYTICS,
    vercelAnalyticsId: envConfig.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    trackingEnabled: envConfig.NODE_ENV === 'production'
  }
}

// Logging helper
export function isDevelopment() {
  return envConfig.NODE_ENV === 'development'
}

export function isProduction() {
  return envConfig.NODE_ENV === 'production'
}

export function isTest() {
  return envConfig.NODE_ENV === 'test'
}

// Initialize and validate on import
if (typeof window === 'undefined') {
  // Only validate on server side
  try {
    validateEnvConfig()
    console.log(`Environment: ${envConfig.NODE_ENV}`)
    console.log(`Analytics: ${envConfig.ENABLE_ANALYTICS ? 'Enabled' : 'Disabled'}`)
    console.log(`Sample Data: ${envConfig.ENABLE_SAMPLE_DATA ? 'Enabled' : 'Disabled'}`)
  } catch (error) {
    console.error('Environment configuration error:', error)
    if (envConfig.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}