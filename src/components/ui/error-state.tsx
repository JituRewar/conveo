'use client'

import * as React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  errorDetails?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'System Operational Error',
  description = 'Failed to execute operation. Please check network connection or retry.',
  errorDetails,
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <div
      className={cn(
        'border-error/30 bg-error-container/10 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border p-8 text-center',
        className,
      )}
      {...props}
    >
      <div className="bg-error-container text-error mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-on-surface text-base font-semibold">{title}</h3>
      <p className="text-on-surface-variant mt-1 max-w-md text-sm">
        {description}
      </p>

      {errorDetails && (
        <div className="mt-3 w-full max-w-md">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-error font-mono text-xs hover:underline"
          >
            {showDetails ? 'Hide Technical Stack' : 'View Technical Stack'}
          </button>
          {showDetails && (
            <pre className="bg-surface-container text-on-surface border-outline-variant/30 mt-2 overflow-x-auto rounded-lg border p-3 text-left font-mono text-[11px]">
              {errorDetails}
            </pre>
          )}
        </div>
      )}

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="border-error/40 text-error hover:bg-error-container/20 mt-5"
          leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Retry Connection
        </Button>
      )}
    </div>
  )
}
