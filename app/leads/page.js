import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getLeads } from "@/lib/db"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { LeadsTable } from "@/components/leads/leads-table"
import { Plus } from "lucide-react"

export default async function LeadsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  const leads = await getLeads()

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-teal-900">Leads</h1>

          <Link href="/leads/new">
            <Button className="bg-teal-700 hover:bg-teal-800">
              <Plus className="mr-2 h-4 w-4" />
              New Lead
            </Button>
          </Link>
        </div>

        <LeadsTable leads={leads} />
      </div>
    </AppShell>
  )
}
