"use client"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { ReactNode } from "react"

interface AdminFormLayoutProps {
  title: string
  subtitle: string
  backHref: string
  backLabel?: string
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  loadingText: string
  submitText: string
  children: ReactNode
  preview?: ReactNode
  actionButtons?: ReactNode
  disabled?: boolean
}

export function AdminFormLayout({
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  onSubmit,
  loading,
  loadingText,
  submitText,
  children,
  preview,
  actionButtons,
  disabled = false
}: AdminFormLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={backHref} className="text-muted-foreground hover:text-foreground">
              <Icon name="arrow-left" className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {children}

          {/* Preview */}
          {preview && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              {preview}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || disabled}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="loader" className="h-4 w-4 animate-spin" />
                  {loadingText}
                </>
              ) : (
                <>
                  <Icon name="plus" className="h-4 w-4" />
                  {submitText}
                </>
              )}
            </button>
            <Link
              href={backHref}
              className="text-muted-foreground hover:text-foreground px-4 py-2"
            >
              Cancel
            </Link>
            {actionButtons}
          </div>
        </form>
      </div>
    </div>
  )
}