"use client"

import { useImmediateHash } from "@/hooks/useImmediateHash"
import { BlogSuspenseProps } from "@/lib/types/sections"
import { Suspense } from "react"
import { BlogClient } from "./BlogClient"
import { BlogSkeleton } from "./BlogSkeleton"

export const BlogSuspense = ({ posts }: BlogSuspenseProps) => {
  const immediate = useImmediateHash('#blog')

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogClient posts={posts} immediate={immediate} />
    </Suspense>
  )
}
