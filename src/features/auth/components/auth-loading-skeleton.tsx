import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function AuthLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4 p-2">
      <div className="mb-6 flex flex-col items-center gap-2">
        <Skeleton className="bg-surface-container-high h-10 w-10 rounded-2xl" />
        <Skeleton className="bg-surface-container-high h-4 w-24 rounded-full" />
        <Skeleton className="bg-surface-container-high h-7 w-48 rounded-lg" />
        <Skeleton className="bg-surface-container-high h-4 w-64 rounded-md" />
      </div>

      <div className="space-y-3">
        <Skeleton className="bg-surface-container-high h-10 w-full rounded-xl" />
        <Skeleton className="bg-surface-container-high h-10 w-full rounded-xl" />
        <Skeleton className="bg-surface-container-high h-10 w-full rounded-xl" />
      </div>

      <Skeleton className="bg-primary/20 h-11 w-full rounded-xl" />
    </div>
  )
}
