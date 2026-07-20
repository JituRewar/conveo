'use client'

import * as React from 'react'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Ticket,
  BarChart3,
  Settings,
  ShieldCheck,
  Zap,
  Activity,
  ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface SidebarNavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string
  active?: boolean
  children?: { id: string; label: string; active?: boolean }[]
}

export interface SidebarProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onSelect'
> {
  activeId?: string
  onSelect?: (id: string) => void
}

const defaultNavItems: SidebarNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    active: true,
  },
  {
    id: 'events',
    label: 'Events & Scanning',
    icon: <Calendar className="h-4 w-4" />,
    badge: 'LIVE',
  },
  {
    id: 'attendees',
    label: 'Attendees & Access',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 'ticketing',
    label: 'Ticketing & Orders',
    icon: <Ticket className="h-4 w-4" />,
  },
  {
    id: 'analytics',
    label: 'Analytics & Telemetry',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    id: 'operations',
    label: 'Operational Controls',
    icon: <ShieldCheck className="h-4 w-4" />,
    children: [
      { id: 'gate-control', label: 'Gate Access Control' },
      { id: 'scan-nodes', label: 'Scanner Nodes' },
      { id: 'audit-logs', label: 'Audit Telemetry' },
    ],
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: <Settings className="h-4 w-4" />,
  },
]

export function Sidebar({
  activeId = 'dashboard',
  onSelect,
  className,
  ...props
}: SidebarProps) {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    operations: true,
  })

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside
      className={cn(
        'border-outline-variant/30 bg-surface-sidebar sticky top-16 flex h-[calc(100vh-4rem)] w-[280px] shrink-0 flex-col border-r transition-all',
        className,
      )}
      {...props}
    >
      {/* Sidebar Header Section */}
      <div className="border-outline-variant/30 border-b p-4">
        <div className="bg-surface-container-low border-outline-variant/30 flex items-center justify-between rounded-xl border px-3 py-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-on-surface truncate font-mono text-xs font-semibold tracking-wider">
              CLUSTER-ALPHA-01
            </span>
          </div>
          <Zap className="text-primary h-3.5 w-3.5 shrink-0" />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="text-on-surface-variant/70 px-3 py-2 font-mono text-[11px] font-semibold tracking-wider uppercase">
          Main Navigation
        </p>

        {defaultNavItems.map((item) => {
          const isActive = item.id === activeId
          const hasChildren = item.children && item.children.length > 0
          const isOpen = openGroups[item.id]

          return (
            <div key={item.id} className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  if (hasChildren) {
                    toggleGroup(item.id)
                  } else if (onSelect) {
                    onSelect(item.id)
                  }
                }}
                className={cn(
                  'group relative flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary before:bg-primary font-semibold before:absolute before:top-2 before:bottom-2 before:left-0 before:w-1 before:rounded-r'
                    : 'text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface',
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-on-surface-variant/80 group-hover:text-on-surface',
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge
                      variant="live"
                      className="px-1.5 py-0 font-mono text-[10px]"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 opacity-60 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  )}
                </div>
              </button>

              {/* Sub items */}
              {hasChildren && isOpen && (
                <div className="space-y-1 py-1 pr-2 pl-9">
                  {item.children?.map((sub) => {
                    const isSubActive = sub.id === activeId
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => onSelect && onSelect(sub.id)}
                        className={cn(
                          'h-8 w-full rounded-md px-3 text-left text-xs font-medium transition-colors',
                          isSubActive
                            ? 'bg-primary/15 text-primary font-semibold'
                            : 'text-on-surface-variant/80 hover:bg-surface-container/60 hover:text-on-surface',
                        )}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer Info Box */}
      <div className="bg-surface-container-low border-outline-variant/40 m-3 rounded-xl border p-3">
        <div className="mb-1 flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <span className="text-on-surface text-xs font-semibold">
            Operational Health
          </span>
        </div>
        <p className="text-on-surface-variant/80 text-[11px]">
          Latency:{' '}
          <span className="font-mono font-medium text-emerald-500">14ms</span> |
          Uptime: <span className="font-mono">99.98%</span>
        </p>
      </div>
    </aside>
  )
}
