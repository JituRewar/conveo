'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-on-primary shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80',
        destructive:
          'border-transparent bg-destructive text-on-error shadow hover:bg-destructive/80',
        outline: 'text-on-surface border-outline-variant/60 bg-surface',
        live: 'border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono tracking-wide',
        tag: 'rounded-sm border-outline-variant/40 bg-surface-container-low text-on-surface-variant font-mono text-[11px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showLivePulse?: boolean
}

function Badge({
  className,
  variant,
  showLivePulse = false,
  children,
  ...props
}: BadgeProps) {
  const isLive = variant === 'live' || showLivePulse

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {isLive && (
        <span className="relative mr-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
