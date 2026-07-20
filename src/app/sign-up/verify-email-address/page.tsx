'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import anime from 'animejs'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'
import { AuthCardContainer } from '@/features/auth/components/auth-card-container'
import { AuthHeader } from '@/features/auth/components/auth-header'
import { AuthErrorAlert } from '@/features/auth/components/auth-error-alert'
import { AnimatedSecurityShield } from '@/components/ui/animated-svgs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function VerifyEmailPage() {
  const { isLoaded } = useAuth()
  const { client, setActive } = useClerk()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!formRef.current) return
    anime({
      targets: formRef.current.children,
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(120, { start: 200 }),
      duration: 600,
      easing: 'easeOutCubic',
    })
  }, [])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !client?.signUp) return

    setError(null)
    setIsSubmitting(true)

    try {
      const completeSignUp =
        await client.signUp.attemptEmailAddressVerification({
          code,
        })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push('/dashboard')
      } else {
        setError(
          'Verification incomplete. Please check your code and try again.',
        )
      }
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: Array<{ longMessage?: string; message?: string }>
      }
      setError(
        clerkError.errors?.[0]?.longMessage ||
          clerkError.errors?.[0]?.message ||
          'Failed to verify code. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCardContainer>
      <div className="mb-2 flex justify-center">
        <AnimatedSecurityShield className="h-14 w-14" />
      </div>

      <AuthHeader
        title="Check your email"
        subtitle="We sent a 6-digit verification code to your email address"
        badgeText="EMAIL VERIFICATION"
        iconType="shield"
      />

      <AuthErrorAlert message={error} />

      <form ref={formRef} onSubmit={handleVerify} className="space-y-4">
        <div className="space-y-1">
          <label className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
            <Mail className="text-primary h-3.5 w-3.5" />
            Verification Code
          </label>
          <Input
            type="text"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-surface-container/70 border-outline-variant/40 focus:border-primary text-on-surface h-12 rounded-xl text-center font-mono text-lg tracking-widest transition-all"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={!isLoaded || isSubmitting || code.length < 6}
          className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/25 h-11 w-full gap-2 rounded-xl font-semibold shadow-lg transition-all active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Verify & Continue
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </AuthCardContainer>
  )
}
