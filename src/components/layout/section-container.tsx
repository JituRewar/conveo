'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  stackGap?: 'sm' | 'md' | 'lg'
}

export function SectionContainer({
  title,
  subtitle,
  action,
  stackGap = 'md',
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        'w-full',
        stackGap === 'sm' && 'space-y-2',
        stackGap === 'md' && 'space-y-4',
        stackGap === 'lg' && 'space-y-6',
        className,
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-on-surface text-lg font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-on-surface-variant text-xs">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
