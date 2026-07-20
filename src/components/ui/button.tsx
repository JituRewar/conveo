'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-on-primary shadow-sm hover:bg-primary/90 hover:shadow-md active:bg-primary/95',
        primaryPill:
          'bg-primary text-on-primary rounded-full shadow-sm hover:bg-primary/90 hover:shadow-md',
        secondary:
          'bg-secondary text-on-secondary hover:bg-secondary/80 border border-outline-variant/30',
        destructive:
          'bg-destructive text-on-error hover:bg-destructive/90 shadow-sm',
        outline:
          'border border-outline/40 bg-surface text-on-surface hover:bg-surface-container-low hover:border-outline',
        ghost:
          'text-on-surface hover:bg-surface-container hover:text-on-surface',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2 rounded-lg',
        sm: 'h-8 px-3 rounded-md text-xs',
        lg: 'h-12 px-6 rounded-xl text-base',
        xl: 'h-14 px-8 rounded-2xl text-lg font-semibold',
        pill: 'h-11 px-5 rounded-full text-sm',
        icon: 'h-10 w-10 rounded-lg p-0',
        touchMin: 'min-h-[48px] min-w-[48px] px-5 py-3 rounded-lg text-base', // Stitch Operational spec 48px
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLButtonElement>(null)
    const combinedRef = (ref ||
      internalRef) as React.RefObject<HTMLButtonElement>

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (combinedRef.current) {
        gsap.to(combinedRef.current, {
          scale: 0.96,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power1.out',
        })
      }
      if (onClick) onClick(e)
    }

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={combinedRef}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon ? (
          <span className="ml-2 inline-flex items-center">{rightIcon}</span>
        ) : null}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
