import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsReportChart } from "@/components/reports/leads-report-chart"
import { OutreachReportChart } from "@/components/reports/outreach-report-chart"
import { ConversionReportChart } from "@/components/reports/conversion-report-chart"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-teal-900">Reports</h1>

        <Tabs defaultValue="leads">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="outreach">Outreach</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Leads Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <LeadsReportChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outreach">
            <Card>
              <CardHeader>
                <CardTitle>Outreach Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <OutreachReportChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionReportChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
