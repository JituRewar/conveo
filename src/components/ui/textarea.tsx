'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  maxLength?: number
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, error, maxLength, showCount, value, onChange, ...props },
    ref,
  ) => {
    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0,
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      if (onChange) onChange(e)
    }

    return (
      <div className="w-full">
        <textarea
          className={cn(
            'border-outline-variant/50 bg-surface text-on-surface placeholder:text-on-surface-variant/60 focus-visible:ring-primary flex min-h-[90px] w-full rounded-lg border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-error focus-visible:ring-error',
            className,
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div className="mt-1 flex items-center justify-between">
          {error ? (
            <p className="text-error text-xs font-medium">{error}</p>
          ) : (
            <span />
          )}
          {showCount && maxLength ? (
            <span className="text-on-surface-variant/70 font-mono text-[11px]">
              {charCount}/{maxLength}
            </span>
          ) : null}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
