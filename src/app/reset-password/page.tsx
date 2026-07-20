'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import anime from 'animejs'
import { Lock, KeyRound, ArrowRight, Loader2 } from 'lucide-react'
import { AuthCardContainer } from '@/features/auth/components/auth-card-container'
import { AuthHeader } from '@/features/auth/components/auth-header'
import { AuthErrorAlert } from '@/features/auth/components/auth-error-alert'
import { AnimatedKeyLock } from '@/components/ui/animated-svgs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ResetPasswordPage() {
  const { isLoaded } = useAuth()
  const { client, setActive } = useClerk()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') || ''

  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      delay: anime.stagger(100, { start: 200 }),
      duration: 600,
      easing: 'easeOutCubic',
    })
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !client?.signIn) return

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const result = await client.signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        setError('Reset incomplete. Please verify your code.')
      }
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: Array<{ longMessage?: string; message?: string }>
      }
      setError(
        clerkError.errors?.[0]?.longMessage ||
          clerkError.errors?.[0]?.message ||
          'Failed to reset password. Please check your verification code.',
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
        title="Reset Password"
        subtitle={
          emailParam
            ? `Enter code sent to ${emailParam}`
            : 'Enter your reset code and new password'
        }
        badgeText="NEW PASSWORD"
        iconType="shield"
      />

      <AuthErrorAlert message={error} />

      <form ref={formRef} onSubmit={handleReset} className="space-y-4">
        <div className="space-y-1 text-left">
          <label className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
            <KeyRound className="text-primary h-3.5 w-3.5" />
            6-Digit Reset Code
          </label>
          <Input
            type="text"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-surface-container/70 border-outline-variant/40 focus:border-primary text-on-surface h-11 rounded-xl text-center font-mono text-lg tracking-widest transition-all"
            required
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
            <Lock className="text-primary h-3.5 w-3.5" />
            New Password
          </label>
          <Input
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-surface-container/70 border-outline-variant/40 focus:border-primary text-on-surface h-11 rounded-xl transition-all"
            required
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="text-on-surface-variant flex items-center gap-1.5 text-xs font-medium">
            <Lock className="text-primary h-3.5 w-3.5" />
            Confirm New Password
          </label>
          <Input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-surface-container/70 border-outline-variant/40 focus:border-primary text-on-surface h-11 rounded-xl transition-all"
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
              Update Password
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="border-outline-variant/20 mt-6 border-t pt-4 text-center">
        <Link
          href="/sign-in"
          className="text-on-surface-variant hover:text-primary text-xs font-medium transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </AuthCardContainer>
  )
}
