import { Footer, Navigation } from "@/components/layout"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <div className="w-full pt-24 lg:pt-28 xl:pt-32">
        {children}
      </div>
      <Footer />
    </div>
  )
}
