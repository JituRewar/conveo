import React from 'react'
import { BarChart3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AnalyticsPlaceholderPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-10">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
            Analytics & Revenue Reports
          </h1>
          <Badge
            variant="outline"
            className="border-amber-500/40 bg-amber-500/10 font-mono text-[10px] text-amber-400"
          >
            MILESTONE 10 PREVIEW
          </Badge>
        </div>
        <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
          Revenue charts, conversion metrics, attendance rates, and registration
          analytics.
        </p>
      </div>

      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-12 text-center shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-lg">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h2 className="text-on-surface text-xl font-bold">
          Analytics & Intelligence Dashboard
        </h2>
        <p className="text-on-surface-variant mx-auto max-w-md text-xs">
          This feature module will be unlocked in Milestone 10. You will be able
          to inspect ticket revenue trends, conversion funnels, and attendance
          metrics.
        </p>
      </div>
    </div>
  )
}
