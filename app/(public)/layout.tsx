import { Footer, Navigation } from '@/components/layout'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <div className="w-full">{children}</div>
      <Footer />
    </div>
  )
}
