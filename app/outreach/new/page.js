import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AppShell } from "@/components/layout/app-shell"
import { OutreachForm } from "@/components/outreach/outreach-form"

export default async function NewOutreachPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-teal-900">Create New Outreach Campaign</h1>
        <OutreachForm />
      </div>
    </AppShell>
  )
}
