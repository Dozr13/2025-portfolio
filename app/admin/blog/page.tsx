import { BlogStreaming } from "@/components/admin/blog/BlogStreaming"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerBlogData } from "@/lib/services"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function BlogAdminPage() {
  const initialBlogData = await getServerBlogData()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialBlogData ? "Failed to load blog posts" : null}
      errorTitle="Blog Posts Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <BlogStreaming initialData={initialBlogData} />
    </AdminPageWrapper>
  )
}