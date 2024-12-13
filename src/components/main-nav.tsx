"use client"
import Link from "next/link"
import { useUser } from "@/context/UserContext" 
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { user } = useUser();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/records"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Records
      </Link>
      <Link
        href="/statistics"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Statistics
      </Link>
      <Link
        href="/reports"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Reports
      </Link>

      {user?.role === "ADMIN" && (
        <Link
          href="/admin/users"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Users
        </Link>
      )}
    </nav>
  )
}
