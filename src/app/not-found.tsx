import React from 'react'
import Link from 'next/link'
import { FileQuestion, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6 text-center">
      <div className="border-outline-variant/30 bg-surface-container-low/95 w-full max-w-md space-y-5 rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl">
        <div className="bg-primary/15 text-primary border-primary/30 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border shadow-xl">
          <FileQuestion className="h-10 w-10" />
        </div>

        <div className="space-y-1">
          <span className="text-primary font-mono text-xs font-black tracking-widest uppercase">
            404 ERROR
          </span>
          <h1 className="text-on-surface text-3xl font-extrabold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-on-surface-variant mx-auto max-w-xs pt-1 text-xs">
            The page or resource you are looking for does not exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 pt-2 sm:flex-row">
          <Button
            asChild
            className="bg-primary hover:bg-primary-container text-on-primary w-full gap-2 rounded-xl font-bold sm:w-auto"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
