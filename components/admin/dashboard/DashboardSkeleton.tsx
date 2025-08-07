export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-muted rounded w-16 mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-24 mb-1 animate-pulse" />
                <div className="h-3 bg-muted rounded w-12 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-24 mb-1 animate-pulse" />
                <div className="h-3 bg-muted rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent contacts skeleton */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse" />
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-24 mb-1 animate-pulse" />
                <div className="h-3 bg-muted rounded w-32 mb-1 animate-pulse" />
                <div className="h-3 bg-muted rounded w-40 animate-pulse" />
              </div>
              <div className="text-right">
                <div className="h-4 bg-muted rounded w-16 mb-1 animate-pulse" />
                <div className="h-3 bg-muted rounded w-20 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
