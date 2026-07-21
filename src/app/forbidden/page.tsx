import React from 'react'
import Link from 'next/link'
import { ShieldAlert, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ForbiddenPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6 text-center">
      <div className="border-error/30 bg-surface-container-low/95 w-full max-w-md space-y-5 rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl">
        <div className="bg-error/15 text-error border-error/30 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border shadow-xl">
          <ShieldAlert className="h-10 w-10" />
        </div>

        <div className="space-y-1">
          <span className="text-error font-mono text-xs font-black tracking-widest uppercase">
            403 FORBIDDEN
          </span>
          <h1 className="text-on-surface text-3xl font-extrabold tracking-tight">
            Access Denied
          </h1>
          <p className="text-on-surface-variant mx-auto max-w-xs pt-1 text-xs">
            Your assigned role does not grant permission to perform this action
            or view this resource.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            asChild
            className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-bold"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" /> Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
