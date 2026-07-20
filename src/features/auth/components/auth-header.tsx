'use client'

import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import { Badge } from '@/components/ui/badge'
import {
  AnimatedSecurityShield,
  AnimatedConveoLogo,
} from '@/components/ui/animated-svgs'

interface AuthHeaderProps {
  title: string
  subtitle: string
  badgeText?: string
  iconType?: 'shield' | 'logo'
}

export function AuthHeader({
  title,
  subtitle,
  badgeText = 'SECURE AUTH',
  iconType = 'shield',
}: AuthHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    anime
      .timeline({ easing: 'easeOutExpo' })
      .add({
        targets: headerRef.current.querySelectorAll('.header-badge'),
        scale: [0.6, 1],
        opacity: [0, 1],
        duration: 500,
      })
      .add(
        {
          targets: headerRef.current.querySelectorAll('.header-title'),
          translateY: [15, 0],
          opacity: [0, 1],
          duration: 600,
        },
        '-=300',
      )
      .add(
        {
          targets: headerRef.current.querySelectorAll('.header-sub'),
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 500,
        },
        '-=400',
      )
  }, [])

  return (
    <div
      ref={headerRef}
      className="mb-6 flex flex-col items-center text-center"
    >
      <div className="mb-3 flex items-center gap-2">
        {iconType === 'shield' ? (
          <AnimatedSecurityShield className="h-14 w-14" />
        ) : (
          <AnimatedConveoLogo className="h-14 w-14" />
        )}
      </div>

      <div className="header-badge mb-2 flex items-center gap-1.5 opacity-0">
        <Badge
          variant="outline"
          className="text-primary border-primary/40 bg-primary/10 shadow-primary/20 px-3 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-sm"
        >
          {badgeText}
        </Badge>
      </div>

      <h1 className="header-title text-on-surface text-2xl font-bold tracking-tight opacity-0 sm:text-3xl">
        {title}
      </h1>
      <p className="header-sub text-on-surface-variant mt-1 max-w-xs text-sm opacity-0">
        {subtitle}
      </p>
    </div>
  )
}
