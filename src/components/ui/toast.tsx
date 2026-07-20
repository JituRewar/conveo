'use client'

import { Toaster as Sonner, toast } from 'sonner'
import { useTheme } from 'next-themes'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-surface-container-lowest group-[.toaster]:text-on-surface group-[.toaster]:border-outline-variant/40 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl font-sans',
          description: 'group-[.toast]:text-on-surface-variant/80 text-xs',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-on-primary rounded-lg text-xs font-medium',
          cancelButton:
            'group-[.toast]:bg-surface-container group-[.toast]:text-on-surface rounded-lg text-xs font-medium',
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
