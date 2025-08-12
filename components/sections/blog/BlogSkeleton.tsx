export const BlogSkeleton = () => {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg w-80 mx-auto mb-6"></div>
            <div className="h-6 bg-muted rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl border border-border overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded w-20 mb-3"></div>
                  <div className="h-6 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="h-12 bg-muted rounded-lg w-32 mx-auto"></div>
        </div>
      </div>
    </section>
  )
}
