"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export function TeamSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sample team members - in a real app, this would come from the database
  const [teamMembers, setTeamMembers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Member" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Member" },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Member",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMember((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setNewMember((prev) => ({ ...prev, role: value }))
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint
      // await fetch('/api/settings/team', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newMember),
      // })

      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new member to the list
      setTeamMembers((prev) => [...prev, { id: Date.now().toString(), ...newMember }])

      // Reset the form and close the dialog
      setNewMember({
        name: "",
        email: "",
        role: "Member",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error adding team member:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMember = async (id) => {
    try {
      // In a real app, this would call an API endpoint
      // await fetch(`/api/settings/team/${id}`, {
      //   method: 'DELETE',
      // })

      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove the member from the list
      setTeamMembers((prev) => prev.filter((member) => member.id !== id))
    } catch (error) {
      console.error("Error removing team member:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. They will receive an email invitation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newMember.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newMember.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMember.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-700 hover:bg-teal-800" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Member"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff`}
                  />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{member.role}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
