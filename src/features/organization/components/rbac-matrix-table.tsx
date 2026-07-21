'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Crown,
  ShieldAlert,
  UserCog,
  UserCheck,
  Eye,
} from 'lucide-react'
import { Role } from '@/generated/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const ROLES_ORDER: Role[] = [
  'OWNER',
  'ADMIN',
  'ORGANIZER',
  'VOLUNTEER',
  'VIEWER',
]

const ROLE_INFO: Record<
  Role,
  { label: string; description: string; color: string; icon: React.ElementType }
> = {
  OWNER: {
    label: 'Owner',
    description:
      'Full administrative control, ownership transfer, and workspace deletion.',
    color:
      'border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-amber-500/10',
    icon: Crown,
  },
  ADMIN: {
    label: 'Admin',
    description:
      'Full team management, organization settings, and event operations.',
    color:
      'border-purple-500/40 bg-purple-500/10 text-purple-400 shadow-purple-500/10',
    icon: ShieldAlert,
  },
  ORGANIZER: {
    label: 'Organizer',
    description:
      'Create and manage assigned events, ticket types, and view team lists.',
    color: 'border-primary/40 bg-primary/10 text-primary shadow-primary/10',
    icon: UserCog,
  },
  VOLUNTEER: {
    label: 'Volunteer',
    description:
      'On-site check-in capabilities, attendee lookup, and read-only event access.',
    color:
      'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/10',
    icon: UserCheck,
  },
  VIEWER: {
    label: 'Viewer',
    description:
      'Read-only access to organization profile and published events.',
    color:
      'border-outline-variant/40 bg-surface-container text-on-surface-variant shadow-none',
    icon: Eye,
  },
}

const PERMISSIONS_LIST = [
  {
    key: 'org:manage',
    label: 'Manage Org Profile & Branding',
    category: 'Organization',
  },
  {
    key: 'org:delete',
    label: 'Delete / Soft-Archive Organization',
    category: 'Organization',
  },
  {
    key: 'member:manage',
    label: 'Manage Members & Update Roles',
    category: 'Team & Security',
  },
  {
    key: 'invitation:manage',
    label: 'Send & Revoke Team Invitations',
    category: 'Team & Security',
  },
  {
    key: 'audit:read',
    label: 'View Immutable Audit Logs',
    category: 'Team & Security',
  },
  {
    key: 'event:create',
    label: 'Create New Events & Ticket Types',
    category: 'Events',
  },
  {
    key: 'event:manage',
    label: 'Edit & Archive Existing Events',
    category: 'Events',
  },
  {
    key: 'ticket:checkin',
    label: 'QR Scanner & Attendee Check-In',
    category: 'Ticketing',
  },
  { key: 'org:read', label: 'View Organization Profile', category: 'General' },
  { key: 'member:read', label: 'View Team Roster', category: 'General' },
  { key: 'event:read', label: 'View Published Events', category: 'General' },
]

const MATRIX: Record<Role, string[]> = {
  OWNER: [
    'org:manage',
    'org:delete',
    'member:manage',
    'invitation:manage',
    'audit:read',
    'event:create',
    'event:manage',
    'ticket:checkin',
    'org:read',
    'member:read',
    'event:read',
  ],
  ADMIN: [
    'org:manage',
    'member:manage',
    'invitation:manage',
    'audit:read',
    'event:create',
    'event:manage',
    'ticket:checkin',
    'org:read',
    'member:read',
    'event:read',
  ],
  ORGANIZER: [
    'event:create',
    'event:manage',
    'ticket:checkin',
    'org:read',
    'member:read',
    'event:read',
  ],
  VOLUNTEER: ['ticket:checkin', 'org:read', 'member:read', 'event:read'],
  VIEWER: ['org:read', 'member:read', 'event:read'],
}

export function RbacMatrixTable() {
  return (
    <div className="space-y-6">
      {/* Role Cards Summary */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-5">
        {ROLES_ORDER.map((role) => {
          const info = ROLE_INFO[role]
          const Icon = info.icon

          return (
            <motion.div
              key={role}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="border-outline-variant/30 bg-surface-container-low/80 hover:border-primary/40 flex flex-col justify-between space-y-2 rounded-2xl border p-4 shadow-lg backdrop-blur-xl"
            >
              <div className="space-y-1.5">
                <Badge
                  variant="outline"
                  className={`gap-1.5 text-xs font-bold shadow-md ${info.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {info.label}
                </Badge>
                <p className="text-on-surface-variant pt-1 text-[11px] leading-relaxed font-medium">
                  {info.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Permissions Matrix Grid */}
      <div className="border-outline-variant/30 bg-surface-container-low/80 overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl">
        <Table>
          <TableHeader className="bg-surface-container/50">
            <TableRow className="border-outline-variant/20">
              <TableHead className="text-on-surface w-1/3 text-sm font-extrabold">
                Permission Capability
              </TableHead>
              {ROLES_ORDER.map((role) => (
                <TableHead
                  key={role}
                  className="text-on-surface text-center text-xs font-extrabold"
                >
                  {ROLE_INFO[role].label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {PERMISSIONS_LIST.map((perm) => (
              <TableRow
                key={perm.key}
                className="border-outline-variant/20 hover:bg-surface-container/40 transition-colors"
              >
                <TableCell className="text-on-surface py-3.5 text-xs font-medium">
                  <div className="flex flex-col">
                    <span className="text-on-surface font-bold">
                      {perm.label}
                    </span>
                    <span className="text-on-surface-variant/70 font-mono text-[10px]">
                      {perm.key}
                    </span>
                  </div>
                </TableCell>

                {ROLES_ORDER.map((role) => {
                  const isGranted = MATRIX[role].includes(perm.key)

                  return (
                    <TableCell key={role} className="text-center">
                      {isGranted ? (
                        <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/20">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="bg-surface-container/60 text-on-surface-variant/30 mx-auto flex h-6 w-6 items-center justify-center rounded-full">
                          <X className="h-3.5 w-3.5 stroke-[2]" />
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
