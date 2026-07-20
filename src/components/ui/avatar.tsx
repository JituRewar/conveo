'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    status?: 'online' | 'offline' | 'busy' | 'away'
  }
>(({ className, status, children, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'border-outline-variant/30 bg-surface-container-high relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border',
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
    {status && (
      <span
        className={cn(
          'border-surface absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 shadow-sm',
          status === 'online' && 'bg-emerald-500',
          status === 'offline' && 'bg-slate-400',
          status === 'busy' && 'bg-rose-500',
          status === 'away' && 'bg-amber-500',
        )}
      />
    )}
  </div>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'bg-surface-container-high text-on-surface-variant flex h-full w-full items-center justify-center rounded-full text-sm font-semibold',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
