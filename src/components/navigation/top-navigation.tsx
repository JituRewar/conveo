'use client'

import React from 'react'
import { Search, Command, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { NotificationPanel } from '@/components/navigation/notification-panel'
import { UserMenu } from '@/components/navigation/user-menu'
import { OrganizationSwitcher } from '@/features/organization/components/organization-switcher'
import { OrganizationDTO } from '@/features/organization/types/organization.types'
import { cn } from '@/lib/utils'

export interface TopNavigationProps {
  onOpenCommandPalette?: () => void
  onToggleMobileSidebar?: () => void
  organizations?: OrganizationDTO[]
  activeOrgId?: string | null
  className?: string
}

export function TopNavigation({
  onOpenCommandPalette,
  onToggleMobileSidebar,
  organizations = [],
  activeOrgId = null,
  className,
}: TopNavigationProps) {
  return (
    <header
      className={cn(
        'border-outline-variant/30 bg-surface-container-low/85 sticky top-0 z-40 w-full border-b px-4 shadow-sm backdrop-blur-2xl transition-all lg:px-8',
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Toggle & Dynamic Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMobileSidebar}
            className="text-on-surface h-9 w-9 rounded-xl lg:hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Breadcrumb className="hidden min-w-0 sm:flex" />
        </div>

        {/* Center: Global Search / Command Palette Trigger */}
        <div className="hidden max-w-sm flex-1 md:block">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="border-outline-variant/30 bg-surface-container/60 text-on-surface-variant/70 hover:bg-surface-container hover:text-on-surface focus-visible:ring-primary flex h-10 w-full items-center justify-between rounded-2xl border px-4 text-xs shadow-inner transition-all focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="flex items-center gap-2">
              <Search className="text-primary h-4 w-4" />
              <span>Search actions, events, members...</span>
            </span>
            <kbd className="border-outline-variant/40 bg-surface-container-low text-on-surface-variant inline-flex h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-bold">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right Side: Org Switcher, Notifications, Theme Toggle & User Menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {organizations.length > 0 && (
            <div className="hidden xl:block">
              <OrganizationSwitcher
                organizations={organizations}
                activeOrgId={activeOrgId}
              />
            </div>
          )}

          {/* Command Palette Mobile Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCommandPalette}
            className="text-on-surface h-9 w-9 rounded-full md:hidden"
            aria-label="Open Command Palette"
          >
            <Search className="text-primary h-4 w-4" />
          </Button>

          <NotificationPanel />

          <ThemeToggle />

          <UserMenu />
        </div>
      </div>
    </header>
  )
}
