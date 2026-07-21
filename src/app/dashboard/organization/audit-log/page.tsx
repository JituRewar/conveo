import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { auditLogRepository } from '@/repositories/audit-log.repository'
import { rbacService } from '@/services/rbac.service'
import { AuditLogTable } from '@/features/organization/components/audit-log-table'
import { FileText } from 'lucide-react'

import { AuditLogDTO } from '@/features/organization/types/organization.types'

export default async function AuditLogPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  await rbacService.requireOrgPermission(activeOrgId, 'audit:read')

  const { items: logs, total } = await auditLogRepository.findByOrg(
    activeOrgId,
    50,
    0,
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-on-surface flex items-center gap-2 text-xl font-bold tracking-tight">
          <FileText className="text-primary h-5 w-5" /> Immutable Audit Log (
          {total})
        </h2>
        <p className="text-on-surface-variant mt-1 text-xs">
          Historical record of administrative operations, role modifications,
          member invitations, and organization setting updates.
        </p>
      </div>

      <AuditLogTable logs={logs as unknown as AuditLogDTO[]} />
    </div>
  )
}
