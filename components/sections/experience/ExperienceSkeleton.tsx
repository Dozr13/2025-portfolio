export const ExperienceSkeleton = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg w-80 mx-auto mb-6" />
            <div className="h-6 bg-muted rounded-lg w-96 mx-auto" />
          </div>
        </div>
        {/* skeleton timeline rows */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 animate-pulse h-32"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
