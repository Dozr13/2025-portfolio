export const ContactSkeleton = () => (
  <section id="contact" className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted rounded-lg mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="h-80 bg-muted rounded-2xl" />
      </div>
    </div>
  </section>
)
