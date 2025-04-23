"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OutreachForm({ campaign }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues = campaign || {
    name: "",
    subject: "",
    content: "",
    status: "draft",
    targetAudience: "",
  }

  const [formData, setFormData] = useState(defaultValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint
      // await fetch('/api/outreach', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/outreach")
      router.refresh()
    } catch (error) {
      console.error("Error creating outreach campaign:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Select
              value={formData.targetAudience}
              onValueChange={(value) => handleSelectChange("targetAudience", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New Leads</SelectItem>
                <SelectItem value="contacted">Contacted Leads</SelectItem>
                <SelectItem value="engaged">Engaged Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Email Content</Label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/outreach")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-700 hover:bg-teal-800" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Campaign"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
