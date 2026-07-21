'use client'

import React, { useEffect } from 'react'
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard Error:', error)
  }, [error])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-6">
      <div className="border-error/30 bg-surface-container-low/95 w-full max-w-md space-y-4 rounded-3xl border p-8 text-center shadow-2xl backdrop-blur-2xl">
        <div className="bg-error/15 text-error border-error/30 mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border shadow-lg">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-on-surface text-xl font-bold">
            Something went wrong
          </h2>
          <p className="text-on-surface-variant font-mono text-xs">
            {error.message || 'An unexpected error occurred in the dashboard.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-bold"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-outline-variant/30 rounded-xl"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
