'use client'

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
import { AuditLogDTO } from '../types/organization.types'

interface AuditLogTableProps {
  logs: AuditLogDTO[]
}

const ACTION_COLORS: Record<string, string> = {
  ORGANIZATION_CREATE:
    'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  ORGANIZATION_UPDATE: 'border-primary/40 bg-primary/10 text-primary',
  ORGANIZATION_DELETE: 'border-error/40 bg-error/10 text-error',
  MEMBER_ROLE_UPDATE: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
  MEMBER_REMOVE: 'border-error/40 bg-error/10 text-error',
  MEMBER_LEAVE: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  INVITATION_SEND: 'border-primary/40 bg-primary/10 text-primary',
  INVITATION_REVOKE: 'border-error/40 bg-error/10 text-error',
  INVITATION_ACCEPT: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="border-outline-variant/30 bg-surface-container-low/80 overflow-hidden rounded-3xl border shadow-xl backdrop-blur-xl">
      <Table>
        <TableHeader className="bg-surface-container/40">
          <TableRow className="border-outline-variant/20">
            <TableHead className="text-on-surface-variant font-semibold">
              Action
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              Performed By
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              Details
            </TableHead>
            <TableHead className="text-on-surface-variant font-semibold">
              IP Address
            </TableHead>
            <TableHead className="text-on-surface-variant text-right font-semibold">
              Timestamp
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-on-surface-variant h-32 text-center"
              >
                No audit log records found for this organization.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => {
              const colorClass =
                ACTION_COLORS[log.action] ||
                'border-outline-variant/40 bg-surface-container text-on-surface-variant'

              return (
                <TableRow
                  key={log.id}
                  className="border-outline-variant/20 hover:bg-surface-container/30"
                >
                  {/* Action Badge */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-mono text-xs ${colorClass}`}
                    >
                      {log.action}
                    </Badge>
                  </TableCell>

                  {/* Performed By User */}
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="border-outline-variant/30 h-7 w-7 border">
                        <AvatarImage src={log.user?.imageUrl || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                          {log.user?.firstName?.charAt(0) ||
                            log.user?.email?.charAt(0).toUpperCase() ||
                            'S'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-on-surface text-xs font-medium">
                        {log.user?.firstName
                          ? `${log.user.firstName} ${log.user.lastName || ''}`
                          : log.user?.email || 'System'}
                      </span>
                    </div>
                  </TableCell>

                  {/* Details JSON */}
                  <TableCell className="text-on-surface-variant/80 max-w-xs truncate font-mono text-[11px]">
                    {log.details ? JSON.stringify(log.details) : '—'}
                  </TableCell>

                  {/* IP Address */}
                  <TableCell className="text-on-surface-variant font-mono text-xs">
                    {log.ipAddress || '127.0.0.1'}
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell className="text-on-surface-variant text-right font-mono text-xs">
                    {new Date(log.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
