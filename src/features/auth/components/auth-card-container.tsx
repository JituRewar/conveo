'use client'

import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import { AuthAnimeBg } from './auth-anime-bg'

interface AuthCardContainerProps {
  children: React.ReactNode
  className?: string
}

export function AuthCardContainer({
  children,
  className = '',
}: AuthCardContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Anime.js entrance timeline
    anime({
      targets: cardRef.current,
      translateY: [35, 0],
      opacity: [0, 1],
      scale: [0.96, 1],
      rotateX: [6, 0],
      duration: 700,
      easing: 'easeOutElastic(1, 0.75)',
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    anime({
      targets: card,
      rotateY: x * 0.035,
      rotateX: -y * 0.035,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    anime({
      targets: cardRef.current,
      rotateY: 0,
      rotateX: 0,
      duration: 500,
      easing: 'easeOutQuad',
    })
  }

  return (
    <div className="bg-background relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Anime.js Interactive Background Canvas */}
      <AuthAnimeBg />

      {/* Ambient Radial Lighting Overlay */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      <div className="bg-secondary/10 pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full blur-[130px]" />

      {/* 3D Interactive Card Wrapper */}
      <div className="perspective-1000 z-10 w-full max-w-md">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`card-3d-glow border-outline-variant/30 bg-surface-container-low/85 relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl transition-shadow duration-300 sm:p-8 ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Animated SVGator-style Gradient Top Accent */}
          <div className="via-primary absolute top-0 right-0 left-0 h-[2px] animate-pulse bg-gradient-to-r from-transparent to-transparent" />

          {children}
        </div>
      </div>
    </div>
  )
}
