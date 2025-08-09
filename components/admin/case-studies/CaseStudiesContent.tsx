"use client"

import { AdminHeader } from "@/components/admin/shared/AdminHeader"
import { Icon } from "@/components/ui/icon"
import { useCaseStudies } from "@/hooks/useCaseStudies"
import type { CaseStudy } from "@/lib/types"

export const CaseStudiesContent = ({ initialData }: { initialData?: { caseStudies: CaseStudy[]; pagination: { pages: number; total: number } } | null }) => {
  const { data, loading, error, fetchCaseStudies, deleteCaseStudy } = useCaseStudies({ initialData })

  if (loading && !initialData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading case studies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchCaseStudies()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const items: CaseStudy[] = data?.caseStudies || []

  return (
    <div className="space-y-6">
      <AdminHeader title="Case Studies" backHref="/admin/dashboard" />

      {items.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="book-open" size="lg" className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No case studies found</h3>
          <p className="text-muted-foreground mb-4">Create your first case study to showcase in-depth work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cs) => (
            <div key={cs.id} className="bg-card border border-border rounded-lg p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{cs.title}</h3>
                {cs.featured && <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">Featured</span>}
              </div>
              <p className="text-muted-foreground text-sm">{cs.company}</p>
              <p className="text-muted-foreground line-clamp-3 text-sm">{cs.overview}</p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => alert('Edit coming soon')}
                  className="px-3 py-1 text-sm bg-card border border-border rounded hover:bg-muted/50"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCaseStudy()}
                  className="px-3 py-1 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


