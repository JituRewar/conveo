'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import gsap from 'gsap'

const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    const nextTheme =
      theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { rotate: 0, scale: 0.9 },
        { rotate: 360, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
      )
    }

    setTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <div className="bg-surface-container-low border-outline-variant/30 h-9 w-9 animate-pulse rounded-full border" />
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      type="button"
      className="bg-surface-container border-outline-variant/40 text-on-surface hover:bg-surface-container-high focus-visible:ring-primary relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme}`}
    >
      {theme === 'dark' && <Moon className="text-primary h-4 w-4" />}
      {theme === 'light' && <Sun className="h-4 w-4 text-amber-500" />}
      {theme === 'system' && <Monitor className="text-secondary h-4 w-4" />}
    </button>
  )
}
