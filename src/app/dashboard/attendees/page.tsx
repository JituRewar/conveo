import React from 'react'
import { QrCode } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AttendeesPlaceholderPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-10">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
            Attendees & QR Check-In
          </h1>
          <Badge
            variant="outline"
            className="border-emerald-500/40 bg-emerald-500/10 font-mono text-[10px] text-emerald-400"
          >
            MILESTONE 9 PREVIEW
          </Badge>
        </div>
        <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
          Monitor event registrations, verify digital QR passes, and check in
          attendees.
        </p>
      </div>

      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-12 text-center shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-lg">
          <QrCode className="h-8 w-8" />
        </div>
        <h2 className="text-on-surface text-xl font-bold">
          Attendee Operations & QR Scanner
        </h2>
        <p className="text-on-surface-variant mx-auto max-w-md text-xs">
          This feature module will be unlocked in Milestone 9. You will be able
          to perform on-site QR scanner check-in and track attendance records in
          real time.
        </p>
      </div>
    </div>
  )
}
