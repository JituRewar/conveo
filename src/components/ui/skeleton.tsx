'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-surface-container-high/60 animate-pulse rounded-lg',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
