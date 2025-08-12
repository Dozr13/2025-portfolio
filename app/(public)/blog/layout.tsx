import { BackToBlogLink } from '@/components/sections/blog/BackToBlogLink'
import { ScrollTopOnRouteChange } from '@/lib/utils/ScrollTopOnRouteChange'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <ScrollTopOnRouteChange enabled top={0} />
      <div className="container mx-auto pt-24 lg:pt-28 xl:pt-32">
        <BackToBlogLink />
        {children}
      </div>
    </div>
  )
}
