'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Send, Loader2, UserCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Role } from '@/generated/prisma'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendInvitationAction } from '@/actions/invitation.actions'

interface SendInvitationDialogProps {
  organizationId: string
  children?: React.ReactNode
}

export function SendInvitationDialog({
  organizationId,
  children,
}: SendInvitationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('VOLUNTEER')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email is required.')
      return
    }

    setLoading(true)
    try {
      const res = await sendInvitationAction({
        organizationId,
        email,
        role,
      })

      if (res.success) {
        toast.success(res.message)
        setOpen(false)
        setEmail('')
        setRole('VOLUNTEER')
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to send invitation.')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-medium shadow-md">
            <Mail className="h-4 w-4" />
            Invite Team Member
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-outline-variant/30 bg-surface-container-low/95 backdrop-blur-2xl sm:max-w-[460px]">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
              <Mail className="h-5 w-5" />
            </div>
            <DialogTitle className="text-on-surface text-xl font-bold">
              Invite Team Member
            </DialogTitle>
          </div>
          <DialogDescription className="text-on-surface-variant text-sm">
            Send an email invitation link to join your organization with
            assigned permissions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Recipient Email Address *
            </label>
            <Input
              type="email"
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-surface-container/60 border-outline-variant/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Assigned Role *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['ADMIN', 'ORGANIZER', 'VOLUNTEER', 'VIEWER'] as Role[]).map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                      role === r
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-outline-variant/20 bg-surface-container/40 text-on-surface-variant hover:bg-surface-container/80'
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <UserCheck className="h-3.5 w-3.5" />}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 gap-2 rounded-xl font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
