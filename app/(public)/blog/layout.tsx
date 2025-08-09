import { Footer, Navigation } from "@/components/layout"
import { ScrollTopOnRouteChange } from "@/components/util/ScrollTopOnRouteChange"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <ScrollTopOnRouteChange enabled top={0} />
      <div className="w-full pt-24 lg:pt-28 xl:pt-32">
        {children}
      </div>
      <Footer />
    </div>
  )
}
