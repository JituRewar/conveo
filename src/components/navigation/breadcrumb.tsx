'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface BreadcrumbProps extends React.ComponentProps<'nav'> {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm', className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isActive = item.active || isLast

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="text-on-surface-variant/40 mx-1.5 h-4 w-4 shrink-0" />
              )}
              {isActive ? (
                <span className="text-on-surface font-semibold tracking-tight">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-on-surface-variant/80 hover:text-primary font-normal transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-on-surface-variant/70 font-normal">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
