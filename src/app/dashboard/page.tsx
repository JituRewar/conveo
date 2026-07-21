import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Shield,
  User,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react'
import { getCurrentUserSession } from '@/features/auth/services/auth.service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getCurrentUserSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] space-y-8 p-4 sm:p-6 lg:p-10">
      {/* Top Welcome Banner */}
      <div className="border-outline-variant/30 from-surface-container-low via-surface-container/80 to-surface-container-low relative overflow-hidden rounded-3xl border bg-gradient-to-r p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="bg-primary/10 pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[90px]" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/40 bg-primary/10 text-primary px-3 py-0.5 font-semibold"
              >
                <Sparkles className="mr-1.5 h-3 w-3" />
                AUTHENTICATED SESSION
              </Badge>
              <Badge variant="live">LIVE</Badge>
            </div>

            <h1 className="text-on-surface text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {session.firstName || 'User'}!
            </h1>
            <p className="text-on-surface-variant max-w-xl text-sm">
              You are securely signed in to Conveo. Your current active RBAC
              role grants you access to system features based on the privilege
              matrix below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 rounded-xl font-medium shadow-lg"
            >
              <Link href="/profile" className="gap-2">
                <User className="h-4 w-4" />
                Manage Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: User Identity */}
        <div className="card-3d-glow border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
              <User className="h-5 w-5" />
            </div>
            <Badge
              variant="outline"
              className="border-outline-variant/30 text-on-surface-variant text-xs"
            >
              CLERK IDENTITY
            </Badge>
          </div>

          <div>
            <h3 className="text-on-surface-variant text-sm font-medium">
              Authenticated User
            </h3>
            <p className="text-on-surface mt-0.5 text-lg font-bold">
              {session.firstName} {session.lastName}
            </p>
            <p className="text-on-surface-variant/80 mt-1 truncate font-mono text-xs">
              {session.email}
            </p>
          </div>

          <div className="border-outline-variant/20 text-on-surface-variant flex items-center justify-between border-t pt-2 text-xs">
            <span>User ID</span>
            <code className="text-on-surface font-mono">
              {session.userId.slice(0, 12)}...
            </code>
          </div>
        </div>

        {/* Card 2: RBAC Role */}
        <div className="card-3d-glow border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="bg-secondary/15 text-secondary flex h-10 w-10 items-center justify-center rounded-2xl">
              <Shield className="h-5 w-5" />
            </div>
            <Badge
              variant="outline"
              className="border-secondary/40 bg-secondary/10 text-secondary text-xs"
            >
              ROLE ASSIGNED
            </Badge>
          </div>

          <div>
            <h3 className="text-on-surface-variant text-sm font-medium">
              RBAC Security Level
            </h3>
            <p className="text-on-surface mt-0.5 text-2xl font-extrabold tracking-tight">
              {session.role}
            </p>
            <p className="text-on-surface-variant mt-1 text-xs">
              Role permissions are enforced server-side via Clerk claims.
            </p>
          </div>

          <div className="border-outline-variant/20 text-on-surface-variant flex items-center justify-between border-t pt-2 text-xs">
            <span>Org Membership</span>
            <span className="text-on-surface font-medium">
              {session.orgId ? 'Active' : 'Personal Context'}
            </span>
          </div>
        </div>

        {/* Card 3: System Status */}
        <div className="card-3d-glow border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="bg-status-live/15 text-status-live flex h-10 w-10 items-center justify-center rounded-2xl">
              <Lock className="h-5 w-5" />
            </div>
            <Badge variant="live">VERIFIED</Badge>
          </div>

          <div>
            <h3 className="text-on-surface-variant text-sm font-medium">
              Session Security
            </h3>
            <p className="text-on-surface mt-0.5 text-lg font-bold">
              Encrypted JWT
            </p>
            <p className="text-on-surface-variant mt-1 text-xs">
              Protected by Next.js 15 Middleware & Clerk Server Components.
            </p>
          </div>

          <div className="border-outline-variant/20 text-on-surface-variant flex items-center justify-between border-t pt-2 text-xs">
            <span>Token Status</span>
            <span className="text-status-live font-semibold">
              Active & Valid
            </span>
          </div>
        </div>
      </div>

      {/* Permissions Matrix Overview */}
      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="text-primary h-5 w-5" />
            <h2 className="text-on-surface text-lg font-bold">
              Granted Permissions Matrix
            </h2>
          </div>
          <span className="text-on-surface-variant text-xs">
            {session.permissions.length} Active Grants
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-3">
          {session.permissions.map((perm) => (
            <div
              key={perm}
              className="bg-surface-container/60 border-outline-variant/20 text-on-surface flex items-center gap-2.5 rounded-2xl border p-3 font-mono text-xs"
            >
              <CheckCircle2 className="text-secondary h-4 w-4 shrink-0" />
              <span>{perm}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
