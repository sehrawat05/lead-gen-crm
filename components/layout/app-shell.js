import { Navbar } from "./navbar"

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-teal-900">
      <Navbar />
      <main className="container mx-auto p-4 bg-white rounded-lg my-4">{children}</main>
    </div>
  )
}
