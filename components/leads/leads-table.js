"use client"

import Link from "next/link"
import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export function LeadsTable({ leads }) {
  // Sample data if leads is empty
  const sampleLeads = [
    { _id: "1", name: "John Doe", status: "Contacted", dateAcquired: new Date("2024-04-20") },
    { _id: "2", name: "Jane Smith", status: "New", dateAcquired: new Date("2024-04-18") },
    { _id: "3", name: "Acme Corp", status: "Engaged", dateAcquired: new Date("2024-04-15") },
    { _id: "4", name: "Bob Johnson", status: "Contacted", dateAcquired: new Date("2024-04-10") },
  ]

  const displayLeads = leads.length > 0 ? leads : sampleLeads

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-cyan-100 text-cyan-800"
      case "Contacted":
        return "bg-yellow-100 text-yellow-800"
      case "Engaged":
        return "bg-green-100 text-green-800"
      case "Converted":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-cyan-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Acquired
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayLeads.map((lead) => (
            <tr key={lead._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusClass(lead.status)}`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(lead.dateAcquired)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/leads/${lead._id}`}>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-800 hover:bg-teal-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
