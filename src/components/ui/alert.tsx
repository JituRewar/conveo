'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-on-surface',
  {
    variants: {
      variant: {
        default:
          'bg-surface-container-low text-on-surface border-outline-variant/40',
        info: 'bg-primary-container/10 text-on-surface border-primary-container/30 [&>svg]:text-primary',
        success:
          'bg-emerald-500/10 text-on-surface border-emerald-500/30 [&>svg]:text-emerald-500',
        warning:
          'bg-amber-500/10 text-on-surface border-amber-500/30 [&>svg]:text-amber-500',
        destructive:
          'border-error/40 text-on-surface bg-error-container/20 [&>svg]:text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
  const Icon =
    variant === 'success'
      ? CheckCircle2
      : variant === 'warning'
        ? AlertTriangle
        : variant === 'destructive'
          ? AlertCircle
          : Info

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {children}
    </div>
  )
})
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'text-on-surface mb-1 leading-none font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-on-surface-variant/80 text-sm [&_p]:leading-relaxed',
      className,
    )}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
