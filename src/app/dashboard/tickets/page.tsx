import React from 'react'
import { Ticket, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TicketsPlaceholderPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
              Tickets & Passes
            </h1>
            <Badge
              variant="outline"
              className="border-secondary/40 bg-secondary/10 text-secondary font-mono text-[10px]"
            >
              MILESTONE 8 PREVIEW
            </Badge>
          </div>
          <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
            Configure free and paid ticket tiers, capacity limits, and pricing.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-bold shadow-md">
          <Plus className="h-4 w-4" /> Add Ticket Type
        </Button>
      </div>

      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-12 text-center shadow-xl backdrop-blur-xl">
        <div className="bg-secondary/15 text-secondary border-secondary/30 mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border shadow-lg">
          <Ticket className="h-8 w-8" />
        </div>
        <h2 className="text-on-surface text-xl font-bold">
          Ticketing & Pricing Module
        </h2>
        <p className="text-on-surface-variant mx-auto max-w-md text-xs">
          This feature module will be unlocked in Milestone 8. You will be able
          to configure ticket tiers, sales start/end windows, and capacity
          allocations.
        </p>
      </div>
    </div>
  )
}
