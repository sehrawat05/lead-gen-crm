"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function IntegrationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [integrations, setIntegrations] = useState({
    email: {
      enabled: true,
      apiKey: "sk_test_*****************************",
    },
    calendar: {
      enabled: false,
      apiKey: "",
    },
    crm: {
      enabled: true,
      apiKey: "api_*****************************",
    },
  })

  const handleToggle = (integration) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        enabled: !prev[integration].enabled,
      },
    }))
  }

  const handleApiKeyChange = (integration, value) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        apiKey: value,
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint
      // await fetch('/api/settings/integrations', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(integrations),
      // })

      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Integrations updated",
        description: "Your integration settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating integrations:", error)
      toast({
        title: "Error",
        description: "Failed to update integrations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect your account with third-party services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Email Service</h3>
              <p className="text-sm text-gray-500">Connect with your email provider for outreach campaigns</p>
            </div>
            <Switch checked={integrations.email.enabled} onCheckedChange={() => handleToggle("email")} />
          </div>

          {integrations.email.enabled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="emailApiKey">API Key</Label>
              <Input
                id="emailApiKey"
                value={integrations.email.apiKey}
                onChange={(e) => handleApiKeyChange("email", e.target.value)}
                type="password"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Calendar Integration</h3>
              <p className="text-sm text-gray-500">Connect with your calendar for scheduling meetings</p>
            </div>
            <Switch checked={integrations.calendar.enabled} onCheckedChange={() => handleToggle("calendar")} />
          </div>

          {integrations.calendar.enabled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="calendarApiKey">API Key</Label>
              <Input
                id="calendarApiKey"
                value={integrations.calendar.apiKey}
                onChange={(e) => handleApiKeyChange("calendar", e.target.value)}
                type="password"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">CRM Integration</h3>
              <p className="text-sm text-gray-500">Connect with your CRM system for lead synchronization</p>
            </div>
            <Switch checked={integrations.crm.enabled} onCheckedChange={() => handleToggle("crm")} />
          </div>

          {integrations.crm.enabled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="crmApiKey">API Key</Label>
              <Input
                id="crmApiKey"
                value={integrations.crm.apiKey}
                onChange={(e) => handleApiKeyChange("crm", e.target.value)}
                type="password"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-teal-700 hover:bg-teal-800" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
