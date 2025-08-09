import { NewProjectClient } from "@/components/admin/projects/NewProjectClient"
import { requireAdmin } from "@/lib/auth"

export default async function NewProjectPage() {
  await requireAdmin()

  return <NewProjectClient />
}
