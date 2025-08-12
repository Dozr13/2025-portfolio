'use client'

export const AboutSkeleton = () => (
  <section id="about" className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted rounded-lg mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="h-80 bg-muted rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 w-56 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="grid grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)
