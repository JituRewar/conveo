'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import {
  Search,
  Calendar,
  Users,
  Ticket,
  Settings,
  ShieldCheck,
  Zap,
  PlusCircle,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-outline-variant/40 bg-surface-container-lowest max-w-2xl overflow-hidden p-0 shadow-2xl">
        <Command className="w-full bg-transparent">
          <div className="border-outline-variant/30 flex items-center border-b px-4">
            <Search className="text-on-surface-variant/70 mr-2 h-4 w-4 shrink-0" />
            <Command.Input
              placeholder="Type a command or search operational modules..."
              className="text-on-surface placeholder:text-on-surface-variant/60 flex h-12 w-full rounded-md bg-transparent text-sm outline-none"
            />
            <kbd className="border-outline-variant/40 bg-surface-container-low text-on-surface-variant hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[330px] overflow-y-auto p-2">
            <Command.Empty className="text-on-surface-variant py-6 text-center font-mono text-xs">
              No matching commands or telemetry logs found.
            </Command.Empty>

            <Command.Group
              heading="Quick Actions"
              className="text-on-surface-variant/70 px-2 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase [&_[cmdk-group-items]]:mt-1"
            >
              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="text-primary h-4 w-4" />
                  <span>Create New Live Event</span>
                </div>
                <kbd className="text-on-surface-variant/70 font-mono text-[10px]">
                  ⌘N
                </kbd>
              </Command.Item>

              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  <span>Launch QR Gate Scanner</span>
                </div>
                <kbd className="text-on-surface-variant/70 font-mono text-[10px]">
                  ⌘S
                </kbd>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Navigation Modules"
              className="text-on-surface-variant/70 border-outline-variant/20 mt-2 border-t px-2 py-1.5 pt-2 font-mono text-[11px] font-semibold tracking-wider uppercase [&_[cmdk-group-items]]:mt-1"
            >
              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <Calendar className="text-on-surface-variant/80 h-4 w-4" />
                <span>Events & Schedules</span>
              </Command.Item>

              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <Users className="text-on-surface-variant/80 h-4 w-4" />
                <span>Attendee Roster</span>
              </Command.Item>

              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <Ticket className="text-on-surface-variant/80 h-4 w-4" />
                <span>Ticketing & Tier Manager</span>
              </Command.Item>

              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <ShieldCheck className="text-on-surface-variant/80 h-4 w-4" />
                <span>Security & Audit Logs</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="System & Support"
              className="text-on-surface-variant/70 border-outline-variant/20 mt-2 border-t px-2 py-1.5 pt-2 font-mono text-[11px] font-semibold tracking-wider uppercase [&_[cmdk-group-items]]:mt-1"
            >
              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <Settings className="text-on-surface-variant/80 h-4 w-4" />
                <span>Global System Preferences</span>
              </Command.Item>
              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <FileText className="text-on-surface-variant/80 h-4 w-4" />
                <span>System Documentation</span>
              </Command.Item>
              <Command.Item
                onSelect={() => onOpenChange(false)}
                className="text-on-surface aria-selected:bg-surface-container aria-selected:text-primary flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none"
              >
                <HelpCircle className="text-on-surface-variant/80 h-4 w-4" />
                <span>Submit Operational Support Ticket</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-outline-variant/30 text-on-surface-variant/70 bg-surface-container-low/50 flex items-center justify-between border-t px-4 py-2 font-mono text-[11px]">
            <span>Use ↑ ↓ to navigate</span>
            <span>↵ to select</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
