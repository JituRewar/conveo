'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  BarChart3,
  Building2,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ShieldCheck,
  X,
} from 'lucide-react'
import { ConveoLogo } from '@/components/ui/animated-svgs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
  exact?: boolean
}

const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: 'Events',
    href: '/dashboard/events',
    icon: Calendar,
  },
  {
    title: 'Tickets',
    href: '/dashboard/tickets',
    icon: Ticket,
  },
  {
    title: 'Attendees',
    href: '/dashboard/attendees',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Team Roster',
    href: '/dashboard/organization/team',
    icon: ShieldCheck,
  },
  {
    title: 'Organization',
    href: '/dashboard/organization',
    icon: Building2,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname()

  const navContent = (
    <div className="flex h-full flex-col justify-between py-4">
      {/* Top Brand Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <ConveoLogo className="h-9 w-9 shrink-0" width={36} height={36} />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="from-on-surface via-primary to-primary-container bg-gradient-to-r bg-clip-text text-xl font-black tracking-tight text-transparent"
              >
                Conveo
              </motion.span>
            )}
          </Link>

          {/* Desktop Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-on-surface-variant hover:text-on-surface hidden h-8 w-8 rounded-xl lg:flex"
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="text-on-surface-variant hover:text-on-surface h-8 w-8 rounded-xl lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 px-3">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && item.href !== '/dashboard'
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  'group relative flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-xs font-bold transition-all duration-200',
                  isActive
                    ? 'from-primary via-primary-container to-primary text-on-primary shadow-primary/25 bg-gradient-to-r shadow-lg'
                    : 'text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface',
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110',
                    isActive ? 'text-on-primary' : 'text-primary',
                  )}
                />
                {!collapsed && (
                  <span className="flex-1 truncate">{item.title}</span>
                )}

                {!collapsed && item.badge && (
                  <Badge variant="live" className="px-1.5 py-0 text-[9px]">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Workspace Card */}
      {!collapsed && (
        <div className="px-3">
          <div className="border-primary/20 from-primary/10 via-surface-container/40 space-y-2 rounded-2xl border bg-gradient-to-br to-transparent p-3.5 text-xs backdrop-blur-md">
            <div className="text-primary flex items-center gap-1.5 font-bold">
              <Sparkles className="h-4 w-4 animate-pulse" /> Conveo v1.0 Live
            </div>
            <p className="text-on-surface-variant/80 text-[11px] leading-normal">
              Press{' '}
              <kbd className="bg-surface-container-high rounded px-1 font-mono">
                Ctrl + K
              </kbd>{' '}
              anytime to open the Command Palette.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={cn(
          'border-outline-variant/30 bg-surface-container-low/90 sticky top-0 z-30 hidden h-screen flex-col border-r backdrop-blur-2xl transition-all duration-300 lg:flex',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="bg-background/80 fixed inset-0 z-50 backdrop-blur-md lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="border-outline-variant/30 bg-surface-container-low/95 fixed inset-y-0 left-0 z-50 w-72 border-r shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
