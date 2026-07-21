'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Copy,
  Check,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { InvitationStatus } from '@/generated/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { revokeInvitationAction } from '@/actions/invitation.actions'
import { InvitationDTO } from '../types/organization.types'

interface InvitationTableProps {
  invitations: InvitationDTO[]
  organizationId: string
  canManage: boolean
}

const STATUS_BADGES: Record<
  InvitationStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  PENDING: {
    label: 'Pending',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    icon: Clock,
  },
  ACCEPTED: {
    label: 'Accepted',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    icon: CheckCircle2,
  },
  DECLINED: {
    label: 'Declined',
    color: 'border-error/40 bg-error/10 text-error',
    icon: XCircle,
  },
  EXPIRED: {
    label: 'Expired',
    color:
      'border-outline-variant/40 bg-surface-container text-on-surface-variant',
    icon: AlertCircle,
  },
}

export function InvitationTable({
  invitations,
  organizationId,
  canManage,
}: InvitationTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null)

  const handleCopyLink = (token: string) => {
    const inviteUrl = `${window.location.origin}/invitations/${token}`
    navigator.clipboard.writeText(inviteUrl)
    setCopiedToken(token)
    toast.success('Invitation link copied to clipboard!')
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const handleRevoke = (invitationId: string, email: string) => {
    if (!confirm(`Are you sure you want to revoke invitation for ${email}?`))
      return

    startTransition(async () => {
      const res = await revokeInvitationAction({
        organizationId,
        invitationId,
      })

      if (res.success) {
        toast.success(res.message)
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to revoke invitation.')
      }
    })
  }

  return (
    <div className="border-outline-variant/30 bg-surface-container-low/80 overflow-hidden rounded-3xl border shadow-xl backdrop-blur-xl">
      <Table>
        <TableHeader className="bg-surface-container/40">
          <TableRow className="border-outline-variant/20">
            <TableHead className="text-on-surface-variant font-semibold">
              Recipient
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              Role
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              Status
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              Expires At
            </TableHead>
            <TableHead className="text-on-surface-variant text-right font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-on-surface-variant h-32 text-center"
              >
                No active or pending invitations.
              </TableCell>
            </TableRow>
          ) : (
            invitations.map((inv) => {
              const statusInfo = STATUS_BADGES[inv.status]
              const StatusIcon = statusInfo.icon
              const isExpired =
                new Date() > new Date(inv.expiresAt) && inv.status === 'PENDING'

              return (
                <TableRow
                  key={inv.id}
                  className="border-outline-variant/20 hover:bg-surface-container/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-on-surface text-sm font-semibold">
                          {inv.email}
                        </span>
                        <span className="text-on-surface-variant/70 text-[10px]">
                          Invited by{' '}
                          {inv.inviter?.firstName ||
                            inv.inviter?.email ||
                            'Admin'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-primary/30 bg-primary/10 text-primary font-mono text-xs"
                    >
                      {inv.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`gap-1 px-2.5 py-0.5 text-xs font-semibold ${isExpired ? STATUS_BADGES.EXPIRED.color : statusInfo.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {isExpired ? 'Expired' : statusInfo.label}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-on-surface-variant font-mono text-xs">
                    {new Date(inv.expiresAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status === 'PENDING' && !isExpired && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyLink(inv.token)}
                          className="text-on-surface-variant hover:text-on-surface h-8 gap-1.5 text-xs"
                        >
                          {copiedToken === inv.token ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span>
                            {copiedToken === inv.token ? 'Copied' : 'Copy Link'}
                          </span>
                        </Button>
                      )}

                      {canManage && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isPending}
                          onClick={() => handleRevoke(inv.id, inv.email)}
                          className="text-error hover:bg-error/10 hover:text-error h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
