"use client"

import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BackToBlogLink() {
  const pathname = usePathname()
  const isSlugPage = pathname?.startsWith("/blog/") && pathname !== "/blog"
  if (!isSlugPage) return null

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Link
          href="/blog"
          className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label="Back to blog"
        >
          <Icon name="arrow-left" size="sm" />
          <span>Back to blog</span>
        </Link>
      </div>
    </div>
  )
}
