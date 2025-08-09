"use client"

import { useAdminAuthContext } from "@/components/admin/AdminAuthProvider"
import { Icon, IconName } from "@/components/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const AdminNavigation = () => {
  const { logout } = useAdminAuthContext()
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { href: '/admin/contacts', label: 'Contacts', icon: 'mail' },
    { href: '/admin/projects', label: 'Projects', icon: 'folder' },
    { href: '/admin/blog', label: 'Blog', icon: 'file-text' },
    { href: '/admin/skills', label: 'Skills', icon: 'code' },
    { href: '/admin/case-studies', label: 'Case Studies', icon: 'book-open' },
    { href: '/admin/analytics', label: 'Analytics', icon: 'chart-bar' },
  ]

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Portfolio Admin</h1>
              <p className="text-xs text-muted-foreground">Welcome back!</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center justify-around gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={item.icon as IconName} size="sm" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="external-link" size="sm" />
              View Site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <Icon name="log-out" size="sm" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}