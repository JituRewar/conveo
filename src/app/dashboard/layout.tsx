import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { DashboardShellClient } from './dashboard-shell-client'

export default async function DashboardLayout({
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

  return (
    <DashboardShellClient organizations={userOrgs} activeOrgId={activeOrgId}>
      {children}
    </DashboardShellClient>
  )
}
