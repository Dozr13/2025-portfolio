"use client"

import { Icon } from "@/components/ui/icon"
import Link from "next/link"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  actions?: React.ReactNode
}

export const AdminHeader = ({ title, subtitle, backHref, actions }: AdminHeaderProps) => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {backHref && (
              <Link
                href={backHref}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" className="h-5 w-5" />
              </Link>
            )}
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      </div>
    </header>
  )
}


