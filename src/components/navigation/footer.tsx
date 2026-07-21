'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export function Footer() {
  return (
    <footer className="border-outline-variant/20 bg-surface-container-low/40 text-on-surface-variant border-t px-4 py-6 text-xs backdrop-blur-md lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <Badge variant="live" className="text-[10px]">
            SYSTEM ONLINE
          </Badge>
          <span className="font-mono text-[11px]">Conveo v1.0 Enterprise</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium">
          <Link
            href="/dashboard/organization/roles"
            className="hover:text-primary transition-colors"
          >
            Security & RBAC
          </Link>
          <span>•</span>
          <Link
            href="/dashboard/organization/audit-log"
            className="hover:text-primary transition-colors"
          >
            Audit Log
          </Link>
          <span>•</span>
          <Link
            href="/dashboard/organization/settings"
            className="hover:text-primary transition-colors"
          >
            Workspace Settings
          </Link>
        </div>

        <div className="text-on-surface-variant/70 text-[11px]">
          © {new Date().getFullYear()} Conveo Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
