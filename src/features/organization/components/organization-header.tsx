'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  Mail,
  ShieldCheck,
  Settings,
  CreditCard,
  FileText,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { OrganizationDTO } from '../types/organization.types'
import { cn } from '@/lib/utils'

interface OrganizationHeaderProps {
  organizations: OrganizationDTO[]
  activeOrg: OrganizationDTO | null
  currentRole?: string
}

export function OrganizationHeader({
  organizations,
  activeOrg,
  currentRole,
}: OrganizationHeaderProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Overview',
      href: '/dashboard/organization',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Team Members',
      href: '/dashboard/organization/team',
      icon: Users,
    },
    {
      label: 'Invitations',
      href: '/dashboard/organization/invitations',
      icon: Mail,
    },
    {
      label: 'Roles & RBAC',
      href: '/dashboard/organization/roles',
      icon: ShieldCheck,
    },
    {
      label: 'Settings',
      href: '/dashboard/organization/settings',
      icon: Settings,
    },
    {
      label: 'Billing',
      href: '/dashboard/organization/billing',
      icon: CreditCard,
    },
    {
      label: 'Audit Log',
      href: '/dashboard/organization/audit-log',
      icon: FileText,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Premium Hero Banner */}
      <div className="group border-outline-variant/30 from-surface-container-low/95 via-surface-container/90 to-surface-container-low/95 hover:border-primary/40 relative overflow-hidden rounded-3xl border bg-gradient-to-r p-6 shadow-2xl backdrop-blur-2xl transition-all duration-500 sm:p-8">
        {/* Ambient Gradient Glow Blobs */}
        <div className="bg-primary/20 group-hover:bg-primary/30 pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full blur-[100px] transition-all duration-700" />
        <div className="bg-secondary/15 pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-[90px]" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            {/* Logo Container with 3D Ring */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="from-primary/30 via-primary/15 shadow-primary/10 border-primary/30 relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br to-transparent p-0.5 shadow-xl"
            >
              <div className="bg-surface-container-lowest/80 text-primary flex h-full w-full items-center justify-center rounded-[14px] text-2xl font-black backdrop-blur-md">
                {activeOrg?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeOrg.logoUrl}
                    alt={activeOrg.name}
                    className="h-full w-full rounded-[14px] object-cover"
                  />
                ) : (
                  activeOrg?.name.charAt(0) || 'C'
                )}
              </div>
            </motion.div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="from-on-surface via-on-surface to-on-surface-variant bg-gradient-to-r bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                  {activeOrg ? activeOrg.name : 'No Active Organization'}
                </h1>

                {currentRole && (
                  <span className="border-primary/40 from-primary/20 to-primary/10 text-primary shadow-primary/10 flex items-center gap-1 rounded-full border bg-gradient-to-r px-3 py-0.5 text-[11px] font-extrabold tracking-widest uppercase shadow-sm backdrop-blur-md">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    {currentRole}
                  </span>
                )}
              </div>
              <p className="text-on-surface-variant max-w-xl text-xs font-medium sm:text-sm">
                {activeOrg?.description ||
                  'Multi-tenant workspace operations, team permissions, and governance.'}
              </p>
            </div>
          </div>

          {/* Switcher Component */}
          <div className="w-full md:w-auto">
            <OrganizationSwitcher
              organizations={organizations}
              activeOrgId={activeOrg?.id || null}
            />
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs with Active Animated Indicator */}
      <div className="border-outline-variant/20 bg-surface-container-low/70 relative flex scrollbar-none items-center gap-1 overflow-x-auto rounded-2xl border p-1.5 shadow-lg backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative z-10 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="from-primary via-primary-container to-primary shadow-primary/30 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
