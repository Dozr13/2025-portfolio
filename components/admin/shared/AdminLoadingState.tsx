'use client'

import { Icon } from '../../ui/Icon'

interface AdminLoadingStateProps {
  message?: string
}

export const AdminLoadingState = ({ message = 'Loading...' }: AdminLoadingStateProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Icon name="loader" className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>{message}</p>
      </div>
    </div>
  )
}
