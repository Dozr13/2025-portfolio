"use client"

import { AdminSuspense } from "@/components/admin/shared/AdminSuspense"
import type { BlogPost } from "@/lib/types"
import { BlogContent } from "./BlogContent"
import { BlogSkeleton } from "./BlogSkeleton"

interface BlogData {
  posts: BlogPost[]
  pagination: {
    pages: number
    total: number
  }
}

interface BlogStreamingProps {
  initialData?: BlogData | null
}

export const BlogStreaming = ({ initialData }: BlogStreamingProps) => {
  return (
    <AdminSuspense fallback={<BlogSkeleton />} message="Loading blog posts...">
      <BlogContent initialData={initialData} />
    </AdminSuspense>
  )
}
