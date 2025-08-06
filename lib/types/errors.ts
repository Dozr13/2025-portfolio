// ============================================================================
// ERROR & VALIDATION TYPES
// ============================================================================

export interface AppError {
  code: string
  message: string
  details?: unknown
}

export interface ValidationError extends AppError {
  field: string
  value: unknown
}

export interface ApiError extends AppError {
  status: number
  endpoint: string
}

export interface DatabaseError extends AppError {
  query?: string
  table?: string
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface ErrorLog {
  id: string
  error: AppError
  severity: ErrorSeverity
  timestamp: Date
  userId?: string
  context?: Record<string, unknown>
}