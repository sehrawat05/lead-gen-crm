import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AppShell } from "@/components/layout/app-shell"
import { LeadForm } from "@/components/leads/lead-form"

export default async function NewLeadPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-teal-900">Add New Lead</h1>
        <LeadForm />
      </div>
    </AppShell>
  )
}
