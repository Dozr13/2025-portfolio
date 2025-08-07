import { ContactsStreaming } from "@/components/admin/contacts/ContactsStreaming"
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper"
import { getServerContactsData } from "@/lib/services"

// Force dynamic rendering since this page uses headers() for authentication
export const dynamic = 'force-dynamic'

export default async function ContactsAdminPage() {
  const initialContacts = await getServerContactsData()

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
