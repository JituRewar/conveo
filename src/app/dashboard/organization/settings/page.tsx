import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { rbacService } from '@/services/rbac.service'
import { OrganizationSettingsForm } from '@/features/organization/components/organization-settings-form'

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  const org = await organizationService.getOrganizationDetails(activeOrgId)
  const role =
    (await rbacService.getMemberRole(userId, activeOrgId)) || 'VIEWER'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-on-surface text-xl font-bold tracking-tight">
          Organization Settings
        </h2>
        <p className="text-on-surface-variant text-xs">
          Manage workspace branding, custom URL slugs, and danger zone actions.
        </p>
      </div>

      <OrganizationSettingsForm organization={org} userRole={role} />
    </div>
  )
}
