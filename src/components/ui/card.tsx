'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bento' | 'glass' | 'interactive' | 'actionHub'
  elevation?: 0 | 1 | 2
  is3D?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      elevation = 1,
      is3D = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border-outline-variant/40 bg-surface text-on-surface rounded-xl border transition-all',
          elevation === 0 && 'bg-surface-container-lowest border-transparent',
          elevation === 1 && 'bg-surface border-outline-variant/40 shadow-sm',
          elevation === 2 &&
            'bg-surface-container-low border-outline-variant/60 shadow-md',
          variant === 'bento' &&
            'bg-surface border-outline-variant/30 hover:border-outline-variant/60 rounded-2xl p-6',
          variant === 'glass' &&
            'bg-surface/80 border-outline-variant/30 shadow-sm backdrop-blur-md',
          variant === 'actionHub' &&
            'bg-surface-container-low hover:bg-surface-container cursor-pointer rounded-xl border-transparent p-5 transition-transform hover:-translate-y-0.5',
          variant === 'interactive' &&
            'hover:border-primary/40 cursor-pointer hover:-translate-y-1 hover:shadow-md',
          is3D && 'card-3d-glow perspective-1000',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-on-surface text-lg leading-none font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-on-surface-variant/80 text-sm', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
