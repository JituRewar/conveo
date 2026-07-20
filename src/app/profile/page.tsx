import { UserProfile } from '@clerk/nextjs'
import { getCurrentUserSession } from '@/features/auth/services/auth.service'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, User as UserIcon, Calendar, Key } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function UserProfilePage() {
  const session = await getCurrentUserSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header & Role Banner */}
        <div className="border-outline-variant/30 bg-surface-container-low/80 flex flex-col justify-between gap-4 rounded-3xl border p-6 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="bg-primary/15 border-primary/30 text-primary flex h-14 w-14 items-center justify-center rounded-2xl border shadow-inner">
              <UserIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-on-surface text-2xl font-bold tracking-tight">
                  {session.firstName} {session.lastName}
                </h1>
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-primary font-semibold"
                >
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  {session.role}
                </Badge>
              </div>
              <p className="text-on-surface-variant mt-0.5 text-sm">
                {session.email}
              </p>
            </div>
          </div>

          <div className="text-on-surface-variant bg-surface-container/60 border-outline-variant/20 flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-xs">
            <Key className="text-primary h-4 w-4" />
            <span>
              ID:{' '}
              <code className="text-on-surface font-mono">
                {session.userId.slice(0, 14)}...
              </code>
            </span>
          </div>
        </div>

        {/* Clerk Embedded Profile Component with Dark Theme Styling */}
        <div className="border-outline-variant/30 bg-surface-container-low/50 flex justify-center overflow-hidden rounded-3xl border p-2 shadow-2xl sm:p-4">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: 'w-full shadow-none',
                cardBox: 'w-full shadow-none bg-transparent',
                card: 'bg-transparent shadow-none p-0 w-full border-none',
                navbar:
                  'bg-surface-container/60 border-r border-outline-variant/20 rounded-2xl p-2',
                navbarButton:
                  'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-xl text-sm font-medium',
                navbarButtonActive:
                  'bg-primary/15 text-primary font-semibold rounded-xl',
                headerTitle: 'text-on-surface text-xl font-bold',
                headerSubtitle: 'text-on-surface-variant text-sm',
                profileSectionTitleText:
                  'text-on-surface font-semibold border-b border-outline-variant/20 pb-2',
                formButtonPrimary:
                  'bg-primary hover:bg-primary-container text-on-primary font-semibold rounded-xl px-4 py-2 shadow-md shadow-primary/20',
                formFieldInput:
                  'bg-surface-container border border-outline-variant/40 text-on-surface rounded-xl',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
