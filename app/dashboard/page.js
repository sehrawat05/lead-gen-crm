import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getDashboardStats } from "@/lib/db"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { LeadsChart } from "@/components/dashboard/leads-chart"
import { StatusDonut } from "@/components/dashboard/status-donut"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  const stats = await getDashboardStats()

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-teal-900">Dashboard</h1>

        <DashboardMetrics
          totalLeads={stats.totalLeads}
          contactedLeads={stats.contactedLeads}
          meetings={stats.meetings}
        />

        <Card>
          <CardHeader>
            <CardTitle>Leads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsChart data={stats.leadsOverTime} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusDonut />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
