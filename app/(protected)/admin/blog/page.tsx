import { listAdminBlogPosts } from '@/app/actions/admin/blog'
import { BlogStreaming } from '@/components/admin/blog/BlogStreaming'
import { AdminPageWrapper } from '@/components/admin/shared/AdminPageWrapper'
import { requireAdmin } from '@/lib/auth'
import type { BlogPost } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function BlogAdminPage() {
  await requireAdmin()

  const resp = await listAdminBlogPosts({ page: 1, limit: 20, status: null, search: null })
  const initialBlogData =
    resp && 'posts' in resp
      ? {
          posts: (resp.posts as (BlogPost & { _count?: { comments: number } })[]).map(
            (p) =>
              ({
                ...p,
                metaTitle: p.metaTitle ?? undefined,
                metaDescription: p.metaDescription ?? undefined
              }) as BlogPost
          ),
          pagination: resp.pagination
        }
      : null

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialBlogData ? 'Failed to load blog posts' : null}
      errorTitle="Blog Posts Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <BlogStreaming initialData={initialBlogData} />
    </AdminPageWrapper>
  )
}
