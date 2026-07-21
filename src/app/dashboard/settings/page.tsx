import { Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GeneralSettingsPlaceholderPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-10">
      <div>
        <h1 className="text-on-surface text-2xl font-bold tracking-tight sm:text-3xl">
          General Dashboard Settings
        </h1>
        <p className="text-on-surface-variant mt-1 text-xs sm:text-sm">
          Personal account preferences, security options, and theme controls.
        </p>
      </div>

      <div className="border-outline-variant/30 bg-surface-container-low/80 space-y-4 rounded-3xl border p-8 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-on-surface text-base font-bold">
              Account & Security Preferences
            </h2>
            <p className="text-on-surface-variant text-xs">
              To manage active organization profile or RBAC roles, use
              Organization Settings.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            className="bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold"
          >
            <Link href="/profile">Manage Clerk Security Profile</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-outline-variant/30 rounded-xl text-xs"
          >
            <Link href="/dashboard/organization/settings">
              Organization Settings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
