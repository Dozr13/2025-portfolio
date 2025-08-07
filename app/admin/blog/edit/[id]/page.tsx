import { EditBlogClient } from "@/components/admin/blog/EditBlogClient"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerBlogPostData } from "@/lib/services"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const initialPost = await getServerBlogPostData(resolvedParams.id)

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialPost ? "Blog post not found" : null}
      errorTitle="Blog post not found"
      errorMessage="The blog post you're looking for doesn't exist"
      backHref="/admin/blog"
      backLabel="Back to Blog"
    >
      <EditBlogClient initialData={initialPost} />
    </AdminPageWrapper>
  )
}