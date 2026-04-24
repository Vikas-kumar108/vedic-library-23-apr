"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Menu,
  Heart,
  Users,
  Eye,
  Info,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/donate", label: "Donate", icon: Heart },
  { href: "/membership", label: "Membership", icon: Users },
  { href: "/transparency", label: "Transparency", icon: Eye },
  { href: "/about", label: "About", icon: Info },
]

export function MobileNav() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left text-primary font-bold">
            VedicSkills
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
            >
              <item.icon className="size-4 text-muted-foreground" />
              {item.label}
            </Link>
          ))}
        </nav>

        <Separator className="my-4" />

        {status === "loading" ? (
          <div className="h-10 animate-pulse rounded-md bg-muted" />
        ) : session?.user ? (
          <div className="space-y-4">
            <div className="px-3 py-2">
              <p className="font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {session.user.role?.replace("_", " ")}
              </p>
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                <LayoutDashboard className="size-4 text-muted-foreground" />
                Dashboard
              </Link>

              {session.user.canAccessAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Admin Panel
                </Link>
              )}

              <button
                onClick={() => {
                  setOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </nav>
          </div>
        ) : (
          <div className="space-y-2 px-3">
            <Button className="w-full" asChild onClick={() => setOpen(false)}>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
