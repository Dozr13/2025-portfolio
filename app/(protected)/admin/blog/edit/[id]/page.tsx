import { getAdminBlogPost } from "@/app/actions/admin/blog"
import { EditBlogClient } from "@/components/admin/blog/EditBlogClient"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { requireAdmin } from "@/lib/auth"
import type { BlogPost } from "@/lib/types"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const resolvedParams = await params
  const result = await getAdminBlogPost(resolvedParams.id)
  const initialPost = result?.post
    ? ({
      ...result.post,
      metaTitle: result.post.metaTitle ?? undefined,
      metaDescription: result.post.metaDescription ?? undefined,
    } as BlogPost)
    : null

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