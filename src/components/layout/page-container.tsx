'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
  maxWidth?: 'fluid' | '7xl' | '6xl' | '5xl'
}

export function PageContainer({
  title,
  description,
  actions,
  maxWidth = 'fluid',
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'bg-background text-on-background min-h-[calc(100vh-4rem)] w-full p-4 transition-colors sm:p-6 lg:p-[40px]',
        maxWidth === '7xl' && 'mx-auto max-w-7xl',
        maxWidth === '6xl' && 'mx-auto max-w-6xl',
        maxWidth === '5xl' && 'mx-auto max-w-5xl',
        className,
      )}
      {...props}
    >
      {(title || description || actions) && (
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            {title && (
              <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-on-surface-variant mt-1 max-w-2xl text-sm sm:text-base">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-3">{actions}</div>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
