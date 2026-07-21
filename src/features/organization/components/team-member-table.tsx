'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Shield,
  UserCheck,
  MoreVertical,
  UserX,
  Loader2,
  Crown,
  ShieldAlert,
  Eye,
  UserCog,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Role } from '@/generated/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  updateMemberRoleAction,
  removeMemberAction,
} from '@/actions/membership.actions'
import { MemberDTO } from '../types/organization.types'

interface TeamMemberTableProps {
  members: MemberDTO[]
  organizationId: string
  currentUserId: string
  currentUserRole: Role
}

const ROLE_BADGE_STYLES: Record<
  Role,
  {
    label: string
    color: string
    bgGradient: string
    icon: React.ElementType
    desc: string
  }
> = {
  OWNER: {
    label: 'Owner',
    color:
      'border-amber-500/40 text-amber-400 bg-amber-500/10 shadow-amber-500/10',
    bgGradient: 'from-amber-500/20 to-amber-500/5',
    icon: Crown,
    desc: 'Full administrative control and workspace ownership.',
  },
  ADMIN: {
    label: 'Admin',
    color:
      'border-purple-500/40 text-purple-400 bg-purple-500/10 shadow-purple-500/10',
    bgGradient: 'from-purple-500/20 to-purple-500/5',
    icon: ShieldAlert,
    desc: 'Team member management and workspace operations.',
  },
  ORGANIZER: {
    label: 'Organizer',
    color: 'border-primary/40 text-primary bg-primary/10 shadow-primary/10',
    bgGradient: 'from-primary/20 to-primary/5',
    icon: UserCog,
    desc: 'Create events, manage tickets, and inspect rosters.',
  },
  VOLUNTEER: {
    label: 'Volunteer',
    color:
      'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-emerald-500/10',
    bgGradient: 'from-emerald-500/20 to-emerald-500/5',
    icon: UserCheck,
    desc: 'On-site QR code scanner & attendee check-in.',
  },
  VIEWER: {
    label: 'Viewer',
    color:
      'border-outline-variant/40 text-on-surface-variant bg-surface-container shadow-none',
    bgGradient: 'from-surface-container to-transparent',
    icon: Eye,
    desc: 'Read-only access to events and organization profile.',
  },
}

export function TeamMemberTable({
  members,
  organizationId,
  currentUserId,
  currentUserRole,
}: TeamMemberTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedMember, setSelectedMember] = useState<MemberDTO | null>(null)
  const [newRole, setNewRole] = useState<Role>('VOLUNTEER')
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)

  const canManageMembers =
    currentUserRole === 'OWNER' || currentUserRole === 'ADMIN'

  const handleUpdateRole = () => {
    if (!selectedMember) return

    startTransition(async () => {
      const res = await updateMemberRoleAction({
        organizationId,
        membershipId: selectedMember.id,
        role: newRole,
      })

      if (res.success) {
        toast.success(res.message)
        setRoleDialogOpen(false)
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to update role.')
      }
    })
  }

  const handleRemoveMember = (membershipId: string, memberName: string) => {
    if (
      !confirm(
        `Are you sure you want to remove ${memberName} from this organization?`,
      )
    )
      return

    startTransition(async () => {
      const res = await removeMemberAction({
        organizationId,
        membershipId,
      })

      if (res.success) {
        toast.success(res.message)
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to remove member.')
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="border-outline-variant/30 bg-surface-container-low/80 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl">
        <Table>
          <TableHeader className="bg-surface-container/50">
            <TableRow className="border-outline-variant/20">
              <TableHead className="text-on-surface font-bold">
                Member
              </TableHead>
              <TableHead className="text-on-surface font-bold">
                Assigned Role
              </TableHead>
              <TableHead className="text-on-surface font-bold">
                Joined Date
              </TableHead>
              <TableHead className="text-on-surface text-right font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-on-surface-variant h-32 text-center font-medium"
                >
                  No members found in this organization.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => {
                const isSelf = member.userId === currentUserId
                const badgeInfo = ROLE_BADGE_STYLES[member.role]
                const Icon = badgeInfo.icon

                return (
                  <TableRow
                    key={member.id}
                    className="border-outline-variant/20 hover:bg-surface-container/40 transition-colors"
                  >
                    {/* User Info */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3.5">
                        <Avatar className="border-primary/30 h-10 w-10 border shadow-md">
                          <AvatarImage
                            src={member.user.imageUrl || undefined}
                          />
                          <AvatarFallback className="from-primary/30 to-primary/10 text-primary bg-gradient-to-br text-sm font-black">
                            {member.user.firstName?.charAt(0) ||
                              member.user.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-on-surface flex items-center gap-2 text-sm font-bold">
                            {member.user.firstName
                              ? `${member.user.firstName} ${member.user.lastName || ''}`
                              : member.user.email}
                            {isSelf && (
                              <span className="bg-primary/15 text-primary border-primary/30 rounded-full border px-2 py-0.5 font-mono text-[10px] font-extrabold">
                                You
                              </span>
                            )}
                          </span>
                          <span className="text-on-surface-variant/80 font-mono text-xs">
                            {member.user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role Badge */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`gap-1.5 px-3 py-1 text-xs font-bold shadow-md backdrop-blur-md ${badgeInfo.color}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {badgeInfo.label}
                      </Badge>
                    </TableCell>

                    {/* Joined Date */}
                    <TableCell className="text-on-surface-variant font-mono text-xs">
                      {new Date(member.createdAt).toLocaleDateString(
                        undefined,
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        },
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      {canManageMembers && !isSelf ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-on-surface-variant hover:bg-surface-container hover:text-on-surface h-8 w-8 rounded-xl"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="border-outline-variant/30 bg-surface-container-low/95 w-44 p-1.5 shadow-xl backdrop-blur-2xl"
                          >
                            <DropdownMenuLabel className="text-on-surface-variant px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
                              Manage Member
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-outline-variant/20" />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedMember(member)
                                setNewRole(member.role)
                                setRoleDialogOpen(true)
                              }}
                              className="hover:bg-surface-container cursor-pointer gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold"
                            >
                              <Shield className="text-primary h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleRemoveMember(
                                  member.id,
                                  member.user.firstName || member.user.email,
                                )
                              }
                              className="text-error hover:bg-error/10 hover:text-error cursor-pointer gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold"
                            >
                              <UserX className="h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <span className="text-on-surface-variant/40 font-mono text-xs">
                          —
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Role Change Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="border-outline-variant/30 bg-surface-container-low/95 p-6 shadow-2xl backdrop-blur-2xl sm:max-w-[440px]">
          <DialogHeader className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <Shield className="h-5 w-5" />
              </div>
              <DialogTitle className="text-on-surface text-lg font-bold">
                Change Member Role
              </DialogTitle>
            </div>
            <DialogDescription className="text-on-surface-variant text-xs">
              Updating privilege level for{' '}
              <strong className="text-on-surface">
                {selectedMember?.user.firstName || selectedMember?.user.email}
              </strong>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 py-3">
            <label className="text-on-surface-variant text-[10px] font-bold tracking-wider uppercase">
              Select New Role
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(
                ['OWNER', 'ADMIN', 'ORGANIZER', 'VOLUNTEER', 'VIEWER'] as Role[]
              ).map((r) => {
                const isSelected = newRole === r
                const badge = ROLE_BADGE_STYLES[r]
                const Icon = badge.icon

                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setNewRole(r)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-primary from-primary/15 via-primary/5 shadow-primary/10 bg-gradient-to-r to-transparent shadow-md'
                        : 'border-outline-variant/20 bg-surface-container/40 hover:bg-surface-container/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl border ${badge.color}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-on-surface block text-xs font-extrabold">
                          {badge.label}
                        </span>
                        <span className="text-on-surface-variant/80 text-[10px]">
                          {badge.desc}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => setRoleDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRole}
              disabled={isPending}
              className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 gap-2 font-bold shadow-lg"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save Role Update'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
