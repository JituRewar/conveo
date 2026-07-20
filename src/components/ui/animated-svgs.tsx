'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import anime from 'animejs'

export function ConveoLogo({
  className = 'w-10 h-10',
  width = 40,
  height = 40,
}: {
  className?: string
  width?: number
  height?: number
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Conveo Logo"
        width={width}
        height={height}
        className="h-full w-full object-contain drop-shadow-md"
        priority
      />
    </div>
  )
}

export function AnimatedConveoLogo({
  className = 'w-12 h-12',
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const animation = anime({
      targets: containerRef.current.querySelectorAll('.logo-ring'),
      rotate: '1turn',
      duration: 10000,
      easing: 'linear',
      loop: true,
    })

    const pulse = anime({
      targets: containerRef.current.querySelectorAll('.logo-glow'),
      scale: [0.95, 1.08],
      opacity: [0.4, 0.9],
      duration: 2500,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
    })

    return () => {
      animation.pause()
      pulse.pause()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Animated Ambient Glow Ring */}
      <div className="logo-glow bg-primary/20 pointer-events-none absolute inset-0 rounded-full blur-md" />

      {/* SVG Tech Ring around PNG Logo */}
      <svg
        viewBox="0 0 100 100"
        className="logo-ring pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#8083ff"
          strokeWidth="2"
          strokeDasharray="12 12"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* PNG Logo Image */}
      <Image
        src="/logo.png"
        alt="Conveo Logo"
        width={48}
        height={48}
        className="relative z-10 object-contain p-1"
        priority
      />
    </div>
  )
}

export function AnimatedSecurityShield({
  className = 'w-12 h-12',
}: {
  className?: string
}) {
  const shieldRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!shieldRef.current) return

    const animation = anime.timeline({
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    })

    animation
      .add({
        targets: shieldRef.current.querySelectorAll('.shield-stroke'),
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1800,
        delay: anime.stagger(200),
      })
      .add(
        {
          targets: shieldRef.current.querySelectorAll('.shield-glow'),
          scale: [0.8, 1.1],
          opacity: [0.3, 0.9],
          duration: 1200,
        },
        '-=1000',
      )

    return () => {
      animation.pause()
    }
  }, [])

  return (
    <svg
      ref={shieldRef}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c0c1ff" />
          <stop offset="50%" stopColor="#8083ff" />
          <stop offset="100%" stopColor="#4648d4" />
        </linearGradient>
        <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <path
        d="M50 10 L85 25 V60 C85 85 50 105 50 105 C50 105 15 85 15 60 V25 L50 10 Z"
        stroke="url(#shieldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shield-stroke shield-glow"
        filter="url(#glowFilter)"
      />

      <path
        d="M50 25 V90 M30 45 H70 M25 65 H75"
        stroke="#8083ff"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.6"
        className="shield-stroke"
      />

      <path
        d="M38 58 L46 66 L62 48"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shield-stroke"
      />
    </svg>
  )
}

export function AnimatedKeyLock({
  className = 'w-10 h-10',
}: {
  className?: string
}) {
  const lockRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!lockRef.current) return

    const animation = anime({
      targets: lockRef.current.querySelectorAll('.lock-shackle'),
      translateY: [0, -4, 0],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true,
    })

    const ringAnim = anime({
      targets: lockRef.current.querySelectorAll('.lock-ring'),
      rotate: '1turn',
      duration: 8000,
      easing: 'linear',
      loop: true,
    })

    return () => {
      animation.pause()
      ringAnim.pause()
    }
  }, [])

  return (
    <svg
      ref={lockRef}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8083ff" />
          <stop offset="100%" stopColor="#2c2abc" />
        </linearGradient>
      </defs>

      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="#8083ff"
        strokeWidth="1.5"
        strokeDasharray="8 8"
        className="lock-ringOrigin-center lock-ring"
        opacity="0.5"
      />

      <path
        d="M26 36 V24 C26 16.2 32.2 10 40 10 C47.8 10 54 16.2 54 24 V36"
        stroke="url(#lockGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        className="lock-shackle"
      />

      <rect
        x="20"
        y="34"
        width="40"
        height="32"
        rx="8"
        fill="#1c1b1b"
        stroke="url(#lockGrad)"
        strokeWidth="3"
      />

      <circle cx="40" cy="46" r="4" fill="#8083ff" />
      <path d="M38 48 L42 48 L43 56 L37 56 Z" fill="#8083ff" />
    </svg>
  )
}
