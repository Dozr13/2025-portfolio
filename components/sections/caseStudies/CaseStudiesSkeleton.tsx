export const CaseStudiesSkeleton = () => (
  <section id="case-studies" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 animate-pulse">
        <div className="h-10 w-72 bg-muted rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted rounded-lg mx-auto" />
      </div>
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  </section>
)
