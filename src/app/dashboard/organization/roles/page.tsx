import React from 'react'
import { RbacMatrixTable } from '@/features/organization/components/rbac-matrix-table'
import { ShieldCheck } from 'lucide-react'

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-on-surface flex items-center gap-2 text-xl font-bold tracking-tight">
          <ShieldCheck className="text-primary h-5 w-5" /> Role-Based Access
          Control (RBAC) Matrix
        </h2>
        <p className="text-on-surface-variant mt-1 text-xs">
          Detailed overview of permissions granted across Owner, Admin,
          Organizer, Volunteer, and Viewer roles.
        </p>
      </div>

      <RbacMatrixTable />
    </div>
  )
}
