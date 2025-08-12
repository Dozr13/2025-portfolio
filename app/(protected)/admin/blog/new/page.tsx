import { NewBlogClient } from '@/components/admin/blog/NewBlogClient'
import { requireAdmin } from '@/lib/auth'

export default async function NewBlogPostPage() {
  await requireAdmin()

  return <NewBlogClient />
}
