import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { invitationService } from '@/services/invitation.service'
import { rbacService } from '@/services/rbac.service'
import { InvitationTable } from '@/features/organization/components/invitation-table'
import { SendInvitationDialog } from '@/features/organization/components/send-invitation-dialog'

export default async function InvitationsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  const invitations = await invitationService.getOrgInvitations(activeOrgId)
  const currentRole =
    (await rbacService.getMemberRole(userId, activeOrgId)) || 'VIEWER'

  const canManage = currentRole === 'OWNER' || currentRole === 'ADMIN'

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-on-surface text-xl font-bold tracking-tight">
            Pending & Past Invitations ({invitations.length})
          </h2>
          <p className="text-on-surface-variant text-xs">
            Monitor email invitations sent to prospective team members and
            manage pending tokens.
          </p>
        </div>

        {canManage && <SendInvitationDialog organizationId={activeOrgId} />}
      </div>

      <InvitationTable
        invitations={invitations}
        organizationId={activeOrgId}
        canManage={canManage}
      />
    </div>
  )
}
