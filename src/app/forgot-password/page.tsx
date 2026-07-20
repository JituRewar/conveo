'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import anime from 'animejs'
import { Mail, KeyRound, Loader2 } from 'lucide-react'
import { AuthCardContainer } from '@/features/auth/components/auth-card-container'
import { AuthHeader } from '@/features/auth/components/auth-header'
import { AuthErrorAlert } from '@/features/auth/components/auth-error-alert'
import { AnimatedKeyLock } from '@/components/ui/animated-svgs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const { isLoaded } = useAuth()
  const { client } = useClerk()
  const [email, setEmail] = useState('')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !client?.signIn) return

    setError(null)
    setIsSubmitting(true)

    try {
      const signInObj = await client.signIn.create({
        identifier: email,
      })

      const firstFactor = signInObj.supportedFirstFactors?.find(
        (f) => f.strategy === 'reset_password_email_code',
      ) as { emailAddressId?: string } | undefined

      if (firstFactor?.emailAddressId) {
        await signInObj.prepareFirstFactor({
          strategy: 'reset_password_email_code',
          emailAddressId: firstFactor.emailAddressId,
        })
      }
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: Array<{ longMessage?: string; message?: string }>
      }
      setError(
        clerkError.errors?.[0]?.longMessage ||
          clerkError.errors?.[0]?.message ||
          'Failed to send reset code. Please check your email.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCardContainer>
      <div className="mb-2 flex justify-center">
        <AnimatedKeyLock className="h-14 w-14" />
      </div>

      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email to receive a password reset verification code"
        badgeText="ACCOUNT RECOVERY"
        iconType="shield"
      />

      <AuthErrorAlert message={error} />

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 text-left">
          <label className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
            <Mail className="text-primary h-3.5 w-3.5" />
            Email Address
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface-container/70 border-outline-variant/40 focus:border-primary text-on-surface h-11 rounded-xl transition-all"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={!isLoaded || isSubmitting}
          className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/25 h-11 w-full gap-2 rounded-xl font-semibold shadow-lg transition-all active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Send Reset Code
              <KeyRound className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="border-outline-variant/20 mt-6 border-t pt-4 text-center">
        <Link
          href="/sign-in"
          className="text-on-surface-variant hover:text-primary inline-flex items-center gap-1 text-xs font-medium transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </AuthCardContainer>
  )
}
