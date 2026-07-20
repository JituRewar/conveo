'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'pill' | 'inset'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  shortcutHint?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      leftIcon,
      rightIcon,
      shortcutHint,
      error,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isPill = variant === 'pill'
    const isInset = variant === 'inset' || isPill

    return (
      <div className="w-full">
        <div className="relative flex w-full items-center">
          {leftIcon ? (
            <div className="text-on-surface-variant/70 pointer-events-none absolute left-3.5 flex items-center">
              {leftIcon}
            </div>
          ) : isPill ? (
            <div className="text-on-surface-variant/70 pointer-events-none absolute left-3.5 flex items-center">
              <Search className="h-4 w-4" />
            </div>
          ) : null}

          <input
            type={type}
            className={cn(
              'border-outline-variant/50 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus-visible:ring-primary flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              isInset &&
                'bg-surface-container focus-visible:bg-surface border-transparent',
              isPill && 'rounded-full px-4 text-sm',
              (leftIcon || isPill) && 'pl-10',
              (rightIcon || shortcutHint) && 'pr-12',
              error && 'border-error focus-visible:ring-error',
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {shortcutHint ? (
            <div className="pointer-events-none absolute right-3 flex items-center">
              <kbd className="border-outline-variant/40 bg-surface-container-low text-on-surface-variant inline-flex h-5 items-center rounded border px-1.5 font-mono text-[10px] font-medium opacity-80">
                {shortcutHint}
              </kbd>
            </div>
          ) : rightIcon ? (
            <div className="text-on-surface-variant/70 absolute right-3 flex items-center">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error && (
          <p className="text-error mt-1 text-xs font-medium">{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
