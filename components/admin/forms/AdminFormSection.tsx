'use client'

import { ReactNode } from 'react'

interface AdminFormSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export const AdminFormSection = ({ title, children, className = '' }: AdminFormSectionProps) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}
