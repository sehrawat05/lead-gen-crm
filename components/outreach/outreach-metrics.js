import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OutreachMetrics({ emailsSent, emailsOpened, replies }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-cyan-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Emails Sent</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold text-teal-900">{emailsSent}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Emails Opened</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold text-teal-900">{emailsOpened}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Replies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold text-teal-900">{replies}</p>
        </CardContent>
      </Card>
    </div>
  )
}
