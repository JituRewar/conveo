'use client'

import * as React from 'react'
import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-outline-variant/50 bg-surface-container-low/30 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center',
        className,
      )}
      {...props}
    >
      <div className="bg-surface-container text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-on-surface text-base font-semibold">{title}</h3>
      {description && (
        <p className="text-on-surface-variant mt-1 max-w-sm text-sm">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
