import React from 'react'
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function EventsPlaceholderPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
              Events Management
            </h1>
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary font-mono text-[10px]"
            >
              MILESTONE 7 PREVIEW
            </Badge>
          </div>
          <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
            Create, schedule, and manage virtual and in-person events across
            your active organization.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-bold shadow-md">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-12 text-center shadow-xl backdrop-blur-xl">
        <div className="bg-primary/15 text-primary border-primary/30 mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border shadow-lg">
          <Calendar className="h-8 w-8" />
        </div>
        <h2 className="text-on-surface text-xl font-bold">
          Event Operations Hub
        </h2>
        <p className="text-on-surface-variant mx-auto max-w-md text-xs">
          This feature module will be unlocked in Milestone 7. You will be able
          to manage event details, venues, agendas, and category taxonomies.
        </p>
      </div>
    </div>
  )
}
