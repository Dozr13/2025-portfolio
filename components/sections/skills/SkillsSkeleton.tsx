export const SkillsSkeleton = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg w-80 mx-auto mb-6"></div>
            <div className="h-6 bg-muted rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-4">
              <div className="animate-pulse">
                <div className="h-8 w-8 bg-muted rounded-lg mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
