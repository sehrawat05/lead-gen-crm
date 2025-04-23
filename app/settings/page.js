import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AppShell } from "@/components/layout/app-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-teal-900">Settings</h1>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="team">
            <TeamSettings />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
