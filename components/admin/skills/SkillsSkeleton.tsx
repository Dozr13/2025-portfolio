export const SkillsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header Skeleton */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 bg-muted rounded animate-pulse" />
              <div>
                <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded" />
                  <div>
                    <div className="h-5 w-24 bg-muted rounded mb-2" />
                    <div className="flex gap-2">
                      <div className="h-4 w-16 bg-muted rounded" />
                      <div className="h-4 w-20 bg-muted rounded" />
                    </div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-muted rounded" />
              </div>
              <div className="h-4 w-full bg-muted rounded mb-4" />
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-muted rounded" />
                  <div className="w-4 h-4 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
