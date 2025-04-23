export function RecentActivity() {
  // Sample data - in a real app, this would come from props
  const activities = [
    { id: 1, text: "New lead added: John Smith", time: "2 hours ago" },
    { id: 2, text: 'Email campaign "Q2 Promotion" sent', time: "3 hours ago" },
    { id: 3, text: "Lead status updated: Acme Corp → Engaged", time: "5 hours ago" },
    { id: 4, text: "Meeting scheduled with Jane Doe", time: "1 day ago" },
    { id: 5, text: "New lead added: Tech Solutions Inc", time: "1 day ago" },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="pb-3 border-b border-gray-100 last:border-0">
          <p className="text-sm">{activity.text}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
      ))}
    </div>
  )
}
