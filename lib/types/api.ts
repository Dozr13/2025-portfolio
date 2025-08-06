// ============================================================================
// API & HTTP TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
}

export interface SearchFilters {
  query?: string
  category?: string
  status?: string
  featured?: boolean
  limit?: number
  offset?: number
}

export interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}