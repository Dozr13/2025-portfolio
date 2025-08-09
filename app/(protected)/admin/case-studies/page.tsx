import { listCaseStudies } from "@/app/actions/admin/case-studies"
import { CaseStudiesContent } from "@/components/admin/case-studies/CaseStudiesContent"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { requireAdmin } from "@/lib/auth"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function AdminCaseStudiesPage() {
  await requireAdmin()

  const data = await listCaseStudies()

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!data ? "Failed to load case studies" : null}
      errorTitle="Case Studies Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <CaseStudiesContent initialData={data} />
    </AdminPageWrapper>
  )
}


