import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { organizationService } from '@/services/organization.service'
import { CreditCard, Zap, CheckCircle2, Sparkles } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function BillingPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const activeOrgId = await organizationService.getActiveOrganizationId()
  if (!activeOrgId) redirect('/dashboard/organization')

  const org = await organizationService.getOrganizationDetails(activeOrgId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-on-surface text-xl font-bold tracking-tight">
          Billing & Subscription
        </h2>
        <p className="text-on-surface-variant text-xs">
          Manage your organization&apos;s subscription plan, team quotas, and
          payment receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Active Plan Card */}
        <Card className="border-outline-variant/30 bg-surface-container-low/80 shadow-xl backdrop-blur-xl md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-on-surface text-lg font-bold">
                    Pro Enterprise Plan
                  </CardTitle>
                  <CardDescription className="text-on-surface-variant text-xs">
                    Unlimited events, multi-tenant RBAC, and dedicated QR
                    check-in scanning.
                  </CardDescription>
                </div>
              </div>
              <Badge variant="live">ACTIVE PLAN</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              <div className="bg-surface-container/60 border-outline-variant/20 rounded-2xl border p-4">
                <span className="text-on-surface-variant block text-xs font-medium">
                  Team Seats
                </span>
                <span className="text-on-surface text-xl font-extrabold">
                  {org._count.members} / Unlimited
                </span>
              </div>
              <div className="bg-surface-container/60 border-outline-variant/20 rounded-2xl border p-4">
                <span className="text-on-surface-variant block text-xs font-medium">
                  Hosted Events
                </span>
                <span className="text-on-surface text-xl font-extrabold">
                  {org._count.events} / Unlimited
                </span>
              </div>
              <div className="bg-surface-container/60 border-outline-variant/20 rounded-2xl border p-4">
                <span className="text-on-surface-variant block text-xs font-medium">
                  Billing Cycle
                </span>
                <span className="text-on-surface text-xl font-extrabold">
                  Annual ($0.00 Dev)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-on-surface block text-xs font-bold tracking-wider uppercase">
                Included Features
              </span>
              <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="text-on-surface flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>5-Role Granular RBAC Permissions</span>
                </div>
                <div className="text-on-surface flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Immutable Audit Logging</span>
                </div>
                <div className="text-on-surface flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Unlimited Team Email Invitations</span>
                </div>
                <div className="text-on-surface flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Custom URL Slugs & Branding</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-outline-variant/20 flex justify-end border-t pt-4">
            <Button
              variant="outline"
              className="border-outline-variant/30 gap-2"
            >
              <CreditCard className="h-4 w-4" /> Update Payment Method
            </Button>
          </CardFooter>
        </Card>

        {/* Upgrade / Contact Panel */}
        <Card className="border-primary/30 from-primary/10 via-surface-container-low/80 to-secondary/10 flex flex-col justify-between bg-gradient-to-br shadow-xl backdrop-blur-xl">
          <CardHeader>
            <div className="text-primary flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <CardTitle className="text-lg font-bold">
                Custom Enterprise
              </CardTitle>
            </div>
            <CardDescription className="text-on-surface-variant text-xs">
              Need custom SLA guarantees, dedicated database instances, or
              custom SSO integrations?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-on-surface text-xs">
              Conveo Enterprise supports white-label branding, custom webhooks,
              and multi-region deployment options.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 w-full font-bold shadow-lg">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
