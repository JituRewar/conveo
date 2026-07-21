import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import {
  Users,
  Shield,
  Calendar,
  Globe,
  Mail,
  Settings,
  Sparkles,
  Crown,
  Zap,
  Building2,
} from 'lucide-react'
import { organizationService } from '@/services/organization.service'
import { rbacService } from '@/services/rbac.service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SendInvitationDialog } from '@/features/organization/components/send-invitation-dialog'

export default async function OrganizationOverviewPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  const org = await organizationService.getOrganizationDetails(activeOrgId)
  const role = await rbacService.getMemberRole(userId, activeOrgId)

  const ownerMember = org.members.find((m) => m.role === 'OWNER')

  return (
    <div className="space-y-8">
      {/* Stat Cards Grid with Glowing Glass Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Members */}
        <div className="group border-outline-variant/30 bg-surface-container-low/80 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="bg-primary/15 group-hover:bg-primary/25 pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl transition-all" />
          <div className="flex items-center justify-between">
            <div className="from-primary/25 to-primary/5 text-primary border-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-inner">
              <Users className="h-6 w-6" />
            </div>
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase"
            >
              TEAM ROSTER
            </Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Total Team Members
            </h3>
            <p className="text-on-surface from-on-surface via-primary to-primary-container mt-1 bg-gradient-to-r bg-clip-text text-4xl font-black tracking-tight text-transparent">
              {org._count.members}
            </p>
          </div>
        </div>

        {/* User Role */}
        <div className="group border-outline-variant/30 bg-surface-container-low/80 hover:border-secondary/50 hover:shadow-secondary/10 relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="bg-secondary/15 group-hover:bg-secondary/25 pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl transition-all" />
          <div className="flex items-center justify-between">
            <div className="from-secondary/25 to-secondary/5 text-secondary border-secondary/20 flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-inner">
              <Shield className="h-6 w-6" />
            </div>
            <Badge variant="live">VERIFIED</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Your RBAC Privilege
            </h3>
            <p className="text-on-surface from-on-surface via-secondary to-status-live mt-1 bg-gradient-to-r bg-clip-text text-4xl font-black tracking-tight text-transparent">
              {role || 'VIEWER'}
            </p>
          </div>
        </div>

        {/* Event Count */}
        <div className="group border-outline-variant/30 bg-surface-container-low/80 relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10">
          <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-500/15 blur-2xl transition-all group-hover:bg-amber-500/25" />
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/25 to-amber-500/5 text-amber-400 shadow-inner">
              <Calendar className="h-6 w-6" />
            </div>
            <Badge
              variant="outline"
              className="border-amber-500/40 bg-amber-500/10 text-[10px] font-bold tracking-wider text-amber-400 uppercase"
            >
              EVENTS
            </Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Hosted Events
            </h3>
            <p className="text-on-surface from-on-surface mt-1 bg-gradient-to-r via-amber-400 to-amber-500 bg-clip-text text-4xl font-black tracking-tight text-transparent">
              {org._count.events}
            </p>
          </div>
        </div>

        {/* Owner Info */}
        <div className="group border-outline-variant/30 bg-surface-container-low/80 relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
          <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/15 blur-2xl transition-all group-hover:bg-emerald-500/25" />
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/25 to-emerald-500/5 text-emerald-400 shadow-inner">
              <Crown className="h-6 w-6" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/10 text-[10px] font-bold tracking-wider text-emerald-400 uppercase"
            >
              PRIMARY OWNER
            </Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Workspace Lead
            </h3>
            <p className="text-on-surface mt-1 truncate text-lg font-extrabold">
              {ownerMember?.user.firstName
                ? `${ownerMember.user.firstName} ${ownerMember.user.lastName || ''}`
                : ownerMember?.user.email || 'Owner'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Metadata Grid & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Workspace Metadata Glass Card */}
        <div className="border-outline-variant/30 bg-surface-container-low/80 relative space-y-5 overflow-hidden rounded-3xl border p-7 shadow-xl backdrop-blur-xl lg:col-span-2">
          <div className="border-outline-variant/20 flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-on-surface text-lg font-bold">
                Workspace Profile
              </h2>
            </div>
            <Link
              href="/dashboard/organization/settings"
              className="group text-primary hover:text-primary-container flex items-center gap-1.5 text-xs font-bold transition-colors"
            >
              <Settings className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />{' '}
              Edit Settings
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-surface-container/40 border-outline-variant/20 flex items-center justify-between rounded-2xl border p-3.5">
              <span className="text-on-surface-variant font-semibold">
                URL Slug
              </span>
              <code className="bg-surface-container-highest/60 text-on-surface border-outline-variant/30 rounded-lg border px-2.5 py-1 font-mono text-xs font-bold">
                conveo.io/{org.slug}
              </code>
            </div>

            <div className="bg-surface-container/40 border-outline-variant/20 flex items-center justify-between rounded-2xl border p-3.5">
              <span className="text-on-surface-variant font-semibold">
                Official Website
              </span>
              <a
                href={org.website || '#'}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-container flex items-center gap-1 font-bold transition-colors"
              >
                {org.website || 'Not configured'}{' '}
                <Globe className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="bg-surface-container/40 border-outline-variant/20 flex items-center justify-between rounded-2xl border p-3.5">
              <span className="text-on-surface-variant font-semibold">
                Created On
              </span>
              <span className="text-on-surface font-mono font-semibold">
                {new Date(org.createdAt).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-on-surface-variant block font-semibold">
                Description
              </span>
              <div className="bg-surface-container/50 border-outline-variant/20 text-on-surface rounded-2xl border p-4 text-xs leading-relaxed font-medium">
                {org.description ||
                  'No description provided for this organization.'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel with Vibrant Buttons */}
        <div className="border-outline-variant/30 bg-surface-container-low/80 relative flex flex-col justify-between space-y-6 overflow-hidden rounded-3xl border p-7 shadow-xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="border-outline-variant/20 flex items-center gap-2.5 border-b pb-4">
              <div className="bg-secondary/15 text-secondary flex h-9 w-9 items-center justify-center rounded-xl">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-on-surface text-lg font-bold">
                Quick Actions
              </h2>
            </div>

            <div className="space-y-3">
              <SendInvitationDialog organizationId={org.id}>
                <Button className="from-primary via-primary-container to-primary text-on-primary shadow-primary/25 w-full justify-start gap-3 rounded-2xl bg-gradient-to-r py-6 font-bold shadow-xl transition-all hover:opacity-95 active:scale-[0.98]">
                  <Mail className="h-5 w-5" /> Invite Team Member
                </Button>
              </SendInvitationDialog>

              <Button
                asChild
                variant="outline"
                className="border-outline-variant/40 bg-surface-container/50 hover:bg-surface-container/90 text-on-surface w-full justify-start gap-3 rounded-2xl py-6 font-bold transition-all active:scale-[0.98]"
              >
                <Link href="/dashboard/organization/team">
                  <Users className="text-primary h-5 w-5" /> Manage Team Roster
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-outline-variant/40 bg-surface-container/50 hover:bg-surface-container/90 text-on-surface w-full justify-start gap-3 rounded-2xl py-6 font-bold transition-all active:scale-[0.98]"
              >
                <Link href="/dashboard/organization/roles">
                  <Shield className="text-secondary h-5 w-5" /> View RBAC Matrix
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-primary/20 from-primary/10 via-surface-container/40 space-y-1.5 rounded-2xl border bg-gradient-to-br to-transparent p-4 text-xs">
            <div className="text-primary flex items-center gap-1.5 font-bold">
              <Sparkles className="h-4 w-4" /> Multi-Tenant Workspace
            </div>
            <p className="text-on-surface-variant leading-normal">
              Switch between workspaces seamlessly using the dropdown selector
              in the top banner.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
