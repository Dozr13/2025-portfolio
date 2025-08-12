export const HeroSkeleton = () => (
  <section
    id="hero"
    className="relative min-h-[60vh] flex items-center justify-center w-full pt-20"
  >
    <div className="max-w-7xl mx-auto px-6 animate-pulse">
      <div className="h-10 w-80 bg-muted rounded-lg mb-4" />
      <div className="h-6 w-64 bg-muted rounded mb-6" />
      <div className="h-20 w-full bg-muted rounded-xl" />
    </div>
  </section>
)
