// ============================================================================
// UI & COMPONENT TYPES
// ============================================================================

export interface LoadingState {
  loading: boolean
  error?: string | null
}

export interface ModalState {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
}

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface TabConfig {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface DropdownOption {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}