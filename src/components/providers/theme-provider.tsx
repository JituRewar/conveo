'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved && saved.includes(' ')) {
        localStorage.removeItem('theme')
      }
    } catch {
      // ignore SSR/storage error
    }
  }, [])

  return (
    <NextThemesProvider {...props} value={{ light: 'light', dark: 'dark' }}>
      {children}
    </NextThemesProvider>
  )
}
