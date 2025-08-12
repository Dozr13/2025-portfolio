'use client'

import { Icon } from '@/components/ui/Icon'

interface AdminErrorProps {
  error?: string | null
  onRetry?: () => void
  title?: string
}

export const AdminError = ({ error, onRetry, title = 'Something went wrong' }: AdminErrorProps) => {
  if (!error) return null

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md">
        <Icon name="alert-circle" size="xl" className="mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

interface AdminLoadingProps {
  message?: string
}

export function AdminLoading({ message = 'Loading...' }: AdminLoadingProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
