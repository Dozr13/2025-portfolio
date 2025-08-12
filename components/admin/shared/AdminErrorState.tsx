'use client'

import Link from 'next/link'
import { Icon } from '../../ui/Icon'

interface AdminErrorStateProps {
  title: string
  message?: string
  backHref: string
  backLabel: string
}

export function AdminErrorState({
  title,
  message = 'Something went wrong',
  backHref,
  backLabel
}: AdminErrorStateProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Icon name="alert-circle" className="h-12 w-12 mx-auto mb-4 text-red-500" />
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Link href={backHref} className="text-primary hover:underline">
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
