import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <div className="w-full">div
        {children}
      </div>
      <Footer />
    </div>
  )
}