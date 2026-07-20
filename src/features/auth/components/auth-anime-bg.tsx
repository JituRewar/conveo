'use client'

import React, { useEffect, useRef } from 'react'
import anime from 'animejs'

export function AuthAnimeBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const ctx = context

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate 3D tech particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    // Anime.js target object for pulsing opacity and color shift
    const bgPulse = { strokeAlpha: 0.15, blurGlow: 20 }
    const animeInstance = anime({
      targets: bgPulse,
      strokeAlpha: [0.1, 0.35],
      blurGlow: [15, 35],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    })

    function render() {
      ctx.clearRect(0, 0, width, height)

      // Connect nearby particles with glowing lines
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i]
        p1.x += p1.vx
        p1.y += p1.vy

        if (p1.x < 0 || p1.x > width) p1.vx *= -1
        if (p1.y < 0 || p1.y > height) p1.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 193, 255, ${p1.alpha})`
        ctx.shadowColor = '#8083ff'
        ctx.shadowBlur = bgPulse.blurGlow
        ctx.fill()

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(128, 131, 255, ${(1 - dist / 140) * bgPulse.strokeAlpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      animeInstance.pause()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  )
}
