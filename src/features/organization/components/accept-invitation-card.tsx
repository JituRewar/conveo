'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Building2,
  Mail,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { acceptInvitationAction } from '@/actions/invitation.actions'
import { InvitationDTO, OrganizationDTO } from '../types/organization.types'

interface AcceptInvitationCardProps {
  invitation: InvitationDTO & { organization: OrganizationDTO }
  isSignedIn: boolean
}

export function AcceptInvitationCard({
  invitation,
  isSignedIn,
}: AcceptInvitationCardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const isExpired =
    new Date() > new Date(invitation.expiresAt) ||
    invitation.status === 'EXPIRED'
  const isUsed = invitation.status === 'ACCEPTED'

  const handleAccept = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/invitations/${invitation.token}`)
      return
    }

    setLoading(true)
    try {
      const res = await acceptInvitationAction(invitation.token)
      if (res.success) {
        toast.success(res.message)
        router.push('/dashboard/organization')
      } else {
        toast.error(res.error || 'Failed to accept invitation.')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-lg"
    >
      <Card className="group border-outline-variant/30 bg-surface-container-low/95 hover:border-primary/40 relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all">
        {/* Ambient Glows */}
        <div className="bg-primary/20 pointer-events-none absolute -top-16 -right-16 h-60 w-60 rounded-full blur-[90px]" />
        <div className="bg-secondary/20 pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full blur-[90px]" />

        <div className="border-outline-variant/20 from-primary/15 via-secondary/15 to-primary/10 relative border-b bg-gradient-to-r p-8 text-center backdrop-blur-md">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            className="border-primary/40 from-primary/30 to-primary/10 text-primary shadow-primary/20 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border bg-gradient-to-br shadow-xl"
          >
            <Building2 className="h-10 w-10" />
          </motion.div>

          <Badge
            variant="outline"
            className="border-primary/40 bg-primary/10 text-primary mb-2.5 text-[10px] font-extrabold tracking-widest uppercase"
          >
            WORKSPACE INVITATION
          </Badge>

          <h2 className="from-on-surface via-on-surface to-on-surface-variant bg-gradient-to-r bg-clip-text text-3xl font-black tracking-tight text-transparent">
            Join {invitation.organization.name}
          </h2>
          <p className="text-on-surface-variant mx-auto mt-1.5 max-w-xs text-xs font-medium">
            {invitation.organization.description ||
              'Collaborate with team members and host world-class events.'}
          </p>
        </div>

        <CardContent className="space-y-4 p-7">
          <div className="border-outline-variant/20 bg-surface-container/50 space-y-3 rounded-2xl border p-4 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-semibold">
                Recipient Email
              </span>
              <span className="text-on-surface font-mono font-bold">
                {invitation.email}
              </span>
            </div>

            <div className="border-outline-variant/20 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-on-surface-variant font-semibold">
                Assigned Privilege
              </span>
              <Badge
                variant="outline"
                className="border-primary/40 bg-primary/15 text-primary px-3 py-0.5 text-xs font-bold shadow-sm"
              >
                {invitation.role}
              </Badge>
            </div>

            <div className="border-outline-variant/20 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-on-surface-variant font-semibold">
                Invited By
              </span>
              <span className="text-on-surface font-bold">
                {invitation.inviter?.firstName ||
                  invitation.inviter?.email ||
                  'Workspace Lead'}
              </span>
            </div>
          </div>

          {isExpired && (
            <div className="border-error/30 bg-error/10 text-error flex items-center gap-3 rounded-2xl border p-3.5 text-xs font-semibold">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span>
                This invitation token has expired. Please contact the
                organization admin for a new invite link.
              </span>
            </div>
          )}

          {isUsed && (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>This invitation has already been accepted.</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 p-7 pt-0">
          {!isExpired && !isUsed && (
            <Button
              onClick={handleAccept}
              disabled={loading}
              className="from-primary via-primary-container to-primary text-on-primary shadow-primary/30 w-full gap-2 rounded-2xl bg-gradient-to-r py-6 text-base font-bold shadow-xl transition-all hover:opacity-95 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Accepting Invitation...
                </>
              ) : isSignedIn ? (
                <>
                  <Sparkles className="h-5 w-5" />
                  Accept & Join Workspace
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Sign In to Accept
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
