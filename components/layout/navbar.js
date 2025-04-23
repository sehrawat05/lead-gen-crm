"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leads", path: "/leads" },
    { name: "Outreach", path: "/outreach" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ]

  return (
    <nav className="bg-teal-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-2xl font-bold">
            LOGO
          </Link>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg ${pathname === item.path ? "font-semibold" : "text-gray-200 hover:text-white"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-white hover:text-white hover:bg-teal-800"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  )
}
