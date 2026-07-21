'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Command,
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  BarChart3,
  Building2,
  Settings,
  ShieldCheck,
  Mail,
  CreditCard,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export interface CommandItem {
  id: string
  title: string
  description: string
  href: string
  category: 'Navigation' | 'Organization' | 'Account'
  icon: React.ElementType
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: 'nav-dashboard',
    title: 'Dashboard Overview',
    description: 'Main application operational dashboard',
    href: '/dashboard',
    category: 'Navigation',
    icon: LayoutDashboard,
  },
  {
    id: 'nav-events',
    title: 'Events Management',
    description: 'Browse, create, and configure events',
    href: '/dashboard/events',
    category: 'Navigation',
    icon: Calendar,
  },
  {
    id: 'nav-tickets',
    title: 'Tickets & Passes',
    description: 'Configure ticket types and digital passes',
    href: '/dashboard/tickets',
    category: 'Navigation',
    icon: Ticket,
  },
  {
    id: 'nav-attendees',
    title: 'Attendees & Check-In',
    description: 'Lookup attendees and inspect check-in status',
    href: '/dashboard/attendees',
    category: 'Navigation',
    icon: Users,
  },
  {
    id: 'nav-analytics',
    title: 'Analytics & Reports',
    description: 'View attendance analytics and revenue charts',
    href: '/dashboard/analytics',
    category: 'Navigation',
    icon: BarChart3,
  },
  {
    id: 'org-overview',
    title: 'Organization Overview',
    description: 'Workspace details and tenant metadata',
    href: '/dashboard/organization',
    category: 'Organization',
    icon: Building2,
  },
  {
    id: 'org-team',
    title: 'Team Members',
    description: 'Manage team roster and role privileges',
    href: '/dashboard/organization/team',
    category: 'Organization',
    icon: Users,
  },
  {
    id: 'org-invitations',
    title: 'Team Invitations',
    description: 'Send and revoke email invitations',
    href: '/dashboard/organization/invitations',
    category: 'Organization',
    icon: Mail,
  },
  {
    id: 'org-roles',
    title: 'RBAC Roles Matrix',
    description: 'Inspect 5-role permission matrix',
    href: '/dashboard/organization/roles',
    category: 'Organization',
    icon: ShieldCheck,
  },
  {
    id: 'org-settings',
    title: 'Organization Settings',
    description: 'Edit branding, slug, and danger zone',
    href: '/dashboard/organization/settings',
    category: 'Organization',
    icon: Settings,
  },
  {
    id: 'org-billing',
    title: 'Billing & Subscription',
    description: 'Manage seats and enterprise tier',
    href: '/dashboard/organization/billing',
    category: 'Organization',
    icon: CreditCard,
  },
  {
    id: 'org-audit',
    title: 'Audit Log History',
    description: 'Immutable record of security events',
    href: '/dashboard/organization/audit-log',
    category: 'Organization',
    icon: FileText,
  },
  {
    id: 'account-profile',
    title: 'User Profile',
    description: 'Manage personal profile and Clerk security',
    href: '/profile',
    category: 'Account',
    icon: User,
  },
]

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({
  open: externalOpen,
  onOpenChange: setExternalOpen,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen
  const setIsOpen = useCallback(
    (val: boolean) => {
      if (setExternalOpen) setExternalOpen(val)
      setInternalOpen(val)
    },
    [setExternalOpen],
  )

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  // Filter items
  const filteredItems = COMMAND_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  )

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(0)
  }

  const handleSelect = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(
        (prev) =>
          (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length),
      )
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex].href)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onKeyDown={handleKeyDown}
        className="border-outline-variant/30 bg-surface-container-low/95 overflow-hidden p-0 shadow-2xl backdrop-blur-2xl sm:max-w-[620px]"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Command Palette Search</DialogTitle>
        </DialogHeader>

        {/* Search Header */}
        <div className="border-outline-variant/20 flex items-center gap-3 border-b px-4 py-3">
          <Search className="text-primary h-5 w-5 shrink-0" />
          <Input
            placeholder="Type a command or search sections... (e.g. Team, Settings, Events)"
            value={query}
            onChange={handleQueryChange}
            className="text-on-surface placeholder:text-on-surface-variant/60 border-none bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <Badge
            variant="outline"
            className="border-outline-variant/30 text-on-surface-variant shrink-0 font-mono text-[10px]"
          >
            ESC to close
          </Badge>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] scrollbar-none space-y-1 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="text-on-surface-variant space-y-1 py-12 text-center text-xs">
              <Command className="text-on-surface-variant/40 mx-auto mb-2 h-8 w-8" />
              <p className="font-bold">No matching commands found.</p>
              <p className="text-[11px]">
                Try searching for &quot;Events&quot;, &quot;Team&quot;, or
                &quot;Settings&quot;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${
                    isSelected
                      ? 'bg-primary/15 text-primary border-primary/30 shadow-primary/10 border shadow-md'
                      : 'text-on-surface hover:bg-surface-container/60'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isSelected
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-primary'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-xs font-bold">
                        {item.title}
                      </span>
                      <span className="text-on-surface-variant/70 truncate text-[11px]">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-outline-variant/30 font-mono text-[10px]"
                    >
                      {item.category}
                    </Badge>
                    <ArrowRight
                      className={`h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-outline-variant/20 bg-surface-container/40 text-on-surface-variant flex items-center justify-between border-t px-4 py-2.5 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-surface-container-high rounded px-1.5 py-0.5 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="bg-surface-container-high rounded px-1.5 py-0.5 font-mono text-[10px]">
                ↓
              </kbd>{' '}
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-surface-container-high rounded px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>{' '}
              select
            </span>
          </div>
          <span className="font-mono">
            {filteredItems.length} commands available
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
