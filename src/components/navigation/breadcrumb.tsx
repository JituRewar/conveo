'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  events: 'Events',
  tickets: 'Tickets',
  attendees: 'Attendees',
  analytics: 'Analytics',
  organization: 'Organization',
  team: 'Team Members',
  invitations: 'Invitations',
  roles: 'Roles & RBAC',
  settings: 'Settings',
  billing: 'Billing',
  'audit-log': 'Audit Log',
  profile: 'Profile',
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname()

  // Auto generate breadcrumbs if items are not passed
  const autoItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items

    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) {
      return [{ label: 'Home', href: '/' }]
    }

    let currentPath = ''
    return segments.map((seg, index) => {
      currentPath += `/${seg}`
      const isLast = index === segments.length - 1
      const label =
        ROUTE_LABELS[seg] ||
        seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')

      return {
        label,
        href: isLast ? undefined : currentPath,
        active: isLast,
      }
    })
  }, [pathname, items])

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1.5 text-xs', className)}
    >
      <Link
        href="/dashboard"
        className="text-on-surface-variant/70 hover:text-primary flex items-center gap-1 font-medium transition-colors"
      >
        <LayoutDashboard className="h-3.5 w-3.5" />
      </Link>

      {autoItems.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="text-on-surface-variant/40 h-3.5 w-3.5 shrink-0" />
          {item.active || !item.href ? (
            <span className="text-on-surface max-w-[150px] truncate font-bold">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-on-surface-variant/80 hover:text-primary max-w-[150px] truncate font-medium transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
