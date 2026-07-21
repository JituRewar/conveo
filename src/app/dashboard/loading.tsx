import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6 p-4 sm:p-6 lg:p-10">
      {/* Top Banner Skeleton */}
      <Skeleton className="bg-surface-container-low/80 h-44 w-full rounded-3xl" />

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="bg-surface-container-low/80 h-32 rounded-3xl" />
        <Skeleton className="bg-surface-container-low/80 h-32 rounded-3xl" />
        <Skeleton className="bg-surface-container-low/80 h-32 rounded-3xl" />
        <Skeleton className="bg-surface-container-low/80 h-32 rounded-3xl" />
      </div>

      {/* Main Table Skeleton */}
      <Skeleton className="bg-surface-container-low/80 h-72 w-full rounded-3xl" />
    </div>
  )
}
