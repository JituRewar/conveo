import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { rbacService } from '@/services/rbac.service'
import { OrganizationHeader } from '@/features/organization/components/organization-header'
import { CreateOrganizationDialog } from '@/features/organization/components/create-organization-dialog'
import { Building2 } from 'lucide-react'

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const userOrgs = await organizationService.getUserOrganizations()
  const activeOrgId = await organizationService.getActiveOrganizationId()

  const activeOrg = activeOrgId
    ? await organizationService
        .getOrganizationDetails(activeOrgId)
        .catch(() => null)
    : null

  const currentRole = activeOrgId
    ? await rbacService.getMemberRole(userId, activeOrgId)
    : undefined

  if (!activeOrg && userOrgs.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center p-4">
        <div className="border-outline-variant/30 bg-surface-container-low/90 w-full max-w-md space-y-4 rounded-3xl border p-8 text-center shadow-2xl backdrop-blur-2xl">
          <div className="bg-primary/15 text-primary border-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="text-on-surface text-2xl font-bold">
            No Organization Joined
          </h2>
          <p className="text-on-surface-variant text-sm">
            You are not currently a member of any organization. Create your
            first organization to get started.
          </p>
          <div className="flex justify-center pt-2">
            <CreateOrganizationDialog />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-10">
      <OrganizationHeader
        organizations={userOrgs}
        activeOrg={activeOrg}
        currentRole={currentRole || undefined}
      />
      <main>{children}</main>
    </div>
  )
}
