'use client'

import * as React from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({
  label = 'Loading operational data...',
  size = 'md',
  className,
  ...props
}: LoadingStateProps) {
  const spinnerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotate: 360,
        duration: 1.2,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <div
      className={cn(
        'flex min-h-[180px] flex-col items-center justify-center p-8 text-center',
        className,
      )}
      {...props}
    >
      <div className="relative mb-3 flex items-center justify-center">
        <div
          ref={spinnerRef}
          className={cn(
            'border-primary/20 border-t-primary rounded-full border-2 shadow-sm',
            size === 'sm' && 'h-6 w-6 border-2',
            size === 'md' && 'h-10 w-10 border-[3px]',
            size === 'lg' && 'h-14 w-14 border-4',
          )}
        />
        <div className="bg-primary absolute h-2 w-2 animate-ping rounded-full" />
      </div>
      {label && (
        <p className="text-on-surface-variant font-mono text-xs font-medium tracking-wider uppercase">
          {label}
        </p>
      )}
    </div>
  )
}
