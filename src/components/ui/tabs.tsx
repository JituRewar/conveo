'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: 'pills' | 'underline'
  }
>(({ className, variant = 'pills', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'text-on-surface-variant inline-flex items-center',
      variant === 'pills' && 'bg-surface-container-low h-10 rounded-xl p-1',
      variant === 'underline' &&
        'border-outline-variant/30 w-full gap-6 border-b',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'pills' | 'underline'
  }
>(({ className, variant = 'pills', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'focus-visible:ring-primary inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      variant === 'pills' &&
        'data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface rounded-lg data-[state=active]:shadow-sm',
      variant === 'underline' &&
        'text-on-surface-variant hover:text-on-surface data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:ring-primary mt-3 focus-visible:ring-2 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
