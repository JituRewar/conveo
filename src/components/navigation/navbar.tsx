'use client'

import * as React from 'react'
import { Search, Command, Layers, Bell, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ConveoLogo } from '@/components/ui/animated-svgs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import Link from 'next/link'
import { Show, UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  onOpenCommandPalette?: () => void
  onToggleSidebar?: () => void
}

export function Navbar({
  onOpenCommandPalette,
  onToggleSidebar,
  className,
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(
        'glass-header border-outline-variant/30 sticky top-0 z-40 w-full border-b px-4 transition-all lg:px-8',
        className,
      )}
      {...props}
    >
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left Side: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-on-surface h-9 w-9 lg:hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <ConveoLogo className="h-9 w-9" width={36} height={36} />
            <span className="text-on-surface text-xl font-bold tracking-tight">
              Conveo
            </span>
          </Link>

          <div className="border-outline-variant/40 ml-6 hidden border-l pl-6 md:block">
            <Breadcrumb
              items={[
                { label: 'Conveo', href: '#' },
                { label: 'Enterprise Workspace', active: true },
              ]}
            />
          </div>
        </div>

        {/* Center: Search / Command Palette Trigger */}
        <div className="hidden max-w-md flex-1 sm:block">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="bg-surface-container border-outline-variant/30 text-on-surface-variant/70 hover:bg-surface-container-high focus-visible:ring-primary flex h-10 w-full items-center justify-between rounded-full border px-4 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="flex items-center gap-2">
              <Search className="text-on-surface-variant/70 h-4 w-4" />
              <span>Search actions, events, logs...</span>
            </span>
            <kbd className="border-outline-variant/40 bg-surface-container-low text-on-surface-variant inline-flex h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right Side: Operational Status, Theme Toggle & User */}
        <div className="flex items-center gap-3">
          <Badge variant="live" className="hidden xl:inline-flex">
            SYSTEM ONLINE
          </Badge>

          <Button
            variant="ghost"
            size="icon"
            className="text-on-surface hover:bg-surface-container-high relative h-9 w-9 rounded-full"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="bg-destructive border-surface absolute top-1.5 right-1.5 h-2 w-2 rounded-full border" />
          </Button>

          <ThemeToggle />

          <Show when="signed-out">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-outline-variant/30 text-on-surface hover:bg-surface-container-high rounded-xl"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary text-on-primary hover:bg-primary-container shadow-primary/20 rounded-xl shadow-md"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-on-surface hover:bg-surface-container-high hidden rounded-xl text-xs font-semibold sm:inline-flex"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'h-9 w-9 ring-2 ring-primary/20 hover:scale-105 transition-transform',
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  )
}
