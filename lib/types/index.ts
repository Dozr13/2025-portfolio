// ============================================================================
// TYPES INDEX - CLEAN IMPORT BARREL
// ============================================================================

// API & HTTP Types
export type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  SearchFilters,
  SortConfig
} from './api'

// UI & Component Types
export type {
  DropdownOption, LoadingState,
  ModalState, TabConfig, ToastNotification
} from './ui'

// Admin & Authentication Types
export type {
  AdminActivity, AdminAuthState,
  AdminPermissions, AdminSession, AdminUser
} from './admin'

// Analytics & Tracking Types
export type {
  AnalyticsData, AnalyticsEvent,
  PageViewData, TrackingConfig,
  VisitorInfo
} from './analytics'

// Date & Time Types
export type {
  CalendarEvent,
  DateFormat, DateRange,
  FormattedPeriod, TimeFormat, TimeFrame
} from './date'

// Error & Validation Types
export type {
  ApiError, AppError, DatabaseError, ErrorLog, ErrorSeverity, ValidationError
} from './errors'
