'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GridSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
  bentoPattern?: 'default' | 'metrics3' | 'bentoMain' | 'split2'
}

export function GridSystem({
  cols = 12,
  gap = 'lg',
  bentoPattern = 'default',
  className,
  children,
  ...props
}: GridSystemProps) {
  return (
    <div
      className={cn(
        'grid w-full',
        gap === 'sm' && 'gap-3',
        gap === 'md' && 'gap-4',
        gap === 'lg' && 'gap-6',

        bentoPattern === 'default' && [
          cols === 1 && 'grid-cols-1',
          cols === 2 && 'grid-cols-1 md:grid-cols-2',
          cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          cols === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          cols === 6 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
          cols === 12 && 'grid-cols-1 md:grid-cols-6 lg:grid-cols-12',
        ],

        bentoPattern === 'metrics3' &&
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        bentoPattern === 'bentoMain' && 'grid-cols-1 md:grid-cols-12',
        bentoPattern === 'split2' && 'grid-cols-1 lg:grid-cols-2',

        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export function GridItem({
  span = 12,
  className,
  children,
  ...props
}: GridItemProps) {
  return (
    <div
      className={cn(
        span === 1 && 'col-span-1',
        span === 2 && 'col-span-1 sm:col-span-2',
        span === 3 && 'col-span-1 sm:col-span-2 lg:col-span-3',
        span === 4 && 'col-span-1 md:col-span-4',
        span === 5 && 'col-span-1 md:col-span-5',
        span === 6 && 'col-span-1 md:col-span-6',
        span === 7 && 'col-span-1 md:col-span-7',
        span === 8 && 'col-span-1 md:col-span-8',
        span === 9 && 'col-span-1 md:col-span-9',
        span === 10 && 'col-span-1 md:col-span-10',
        span === 11 && 'col-span-1 md:col-span-11',
        span === 12 && 'col-span-12',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
