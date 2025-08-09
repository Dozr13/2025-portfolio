import { listContacts } from "@/app/actions/admin/contacts"
import { ContactsStreaming } from "@/components/admin/contacts/ContactsStreaming"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { requireAdmin } from "@/lib/auth"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function ContactsAdminPage() {
  await requireAdmin()

  const initialContacts = await listContacts({ page: 1, limit: 20, status: null, search: null })

  return (
    <AdminPageWrapper
      loading={false}
      loadingMessage=""
      error={!initialContacts ? "Failed to load contacts" : null}
      errorTitle="Contacts Unavailable"
      errorMessage="Please try refreshing the page or check your connection"
      backHref="/admin/dashboard"
      backLabel="Back to Dashboard"
    >
      <ContactsStreaming initialData={initialContacts} />
    </AdminPageWrapper>
  )
}
