// ============================================================================
// ADMIN & AUTHENTICATION TYPES
// ============================================================================

export interface AdminUser {
  username: string
  role: string
}

export interface AdminSession {
  token: string
  user: AdminUser
  expiresAt: Date
}

export interface AdminAuthState {
  isAuthenticated: boolean
  user: AdminUser | null
  loading: boolean
}

export interface AdminPermissions {
  canCreate: boolean
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}

export interface AdminActivity {
  id: string
  action: string
  resource: string
  userId: string
  timestamp: Date
  details?: Record<string, unknown>
}