import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getOutreachCampaigns } from "@/lib/db"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { OutreachMetrics } from "@/components/outreach/outreach-metrics"
import { EmailPerformanceChart } from "@/components/outreach/email-performance-chart"
import { OutreachCampaignsList } from "@/components/outreach/outreach-campaigns-list"
import { Plus } from "lucide-react"

export default async function OutreachPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  const campaigns = await getOutreachCampaigns()

  // Sample metrics - in a real app, these would come from the database
  const metrics = {
    emailsSent: 200,
    emailsOpened: 80,
    replies: 20,
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-teal-900">Outreach</h1>

        <OutreachMetrics
          emailsSent={metrics.emailsSent}
          emailsOpened={metrics.emailsOpened}
          replies={metrics.replies}
        />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-teal-900">Email Performance</h2>
          <EmailPerformanceChart />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-teal-900">Email Outreach</h2>
            <OutreachCampaignsList campaigns={campaigns} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-teal-900">Email Outreach</h2>
            <OutreachCampaignsList campaigns={campaigns} variant="compact" />
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/outreach/new">
            <Button className="bg-teal-700 hover:bg-teal-800 px-8 py-6 text-lg">
              <Plus className="mr-2 h-5 w-5" />
              New Outreach
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  )
}
