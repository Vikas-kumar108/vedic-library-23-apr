import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Receipt, Heart, BarChart3 } from "lucide-react"

const adminNavItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/donations",
    label: "Donations",
    icon: Heart,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r bg-card p-4">
          <nav className="space-y-2">
            {adminNavItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="size-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden border-b p-2 flex gap-2 overflow-x-auto">
          {adminNavItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>
                <item.icon className="size-4 mr-2" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
