'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ResponsiveWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

export function ResponsiveWrapper({
  hideOnMobile = false,
  hideOnDesktop = false,
  className,
  children,
  ...props
}: ResponsiveWrapperProps) {
  return (
    <div
      className={cn(
        hideOnMobile && 'hidden md:block',
        hideOnDesktop && 'block md:hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
