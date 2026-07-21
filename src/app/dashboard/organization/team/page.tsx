import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { membershipService } from '@/services/membership.service'
import { rbacService } from '@/services/rbac.service'
import { TeamMemberTable } from '@/features/organization/components/team-member-table'
import { SendInvitationDialog } from '@/features/organization/components/send-invitation-dialog'

export default async function TeamPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  const members = await membershipService.getOrgMembers(activeOrgId)
  const currentRole =
    (await rbacService.getMemberRole(userId, activeOrgId)) || 'VIEWER'

  const canInvite = currentRole === 'OWNER' || currentRole === 'ADMIN'

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-on-surface text-xl font-bold tracking-tight">
            Team Members ({members.length})
          </h2>
          <p className="text-on-surface-variant text-xs">
            Manage your team members and their role permissions across the
            organization.
          </p>
        </div>

        {canInvite && <SendInvitationDialog organizationId={activeOrgId} />}
      </div>

      <TeamMemberTable
        members={members}
        organizationId={activeOrgId}
        currentUserId={userId}
        currentUserRole={currentRole}
      />
    </div>
  )
}
