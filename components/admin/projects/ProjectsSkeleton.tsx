export const ProjectsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
      </div>

      {/* Projects grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 bg-muted rounded w-32 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-16 animate-pulse" />
                </div>
                <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 mb-3 animate-pulse" />
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-muted rounded w-20 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-24 animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="h-3 bg-muted rounded w-12 animate-pulse" />
                <div className="h-3 bg-muted rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
