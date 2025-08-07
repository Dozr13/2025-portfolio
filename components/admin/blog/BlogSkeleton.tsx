export const BlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header Skeleton */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-px h-6 bg-border"></div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
