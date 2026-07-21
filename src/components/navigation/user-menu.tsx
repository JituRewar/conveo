'use client'

import React from 'react'
import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'
import { User, Building2, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function UserMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { theme, setTheme } = useTheme()

  if (!user) return null

  const email = user.primaryEmailAddress?.emailAddress

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group focus-visible:ring-primary relative flex items-center gap-2 rounded-full p-0.5 focus:outline-none focus-visible:ring-2"
        >
          <Avatar className="border-primary/30 h-9 w-9 border shadow-md transition-transform group-hover:scale-105">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {user.firstName?.charAt(0) ||
                email?.charAt(0).toUpperCase() ||
                'U'}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-outline-variant/30 bg-surface-container-low/95 w-64 p-2 shadow-2xl backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="flex items-center gap-3 p-2">
          <Avatar className="border-primary/30 h-10 w-10 border">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {user.firstName?.charAt(0) || email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-on-surface truncate text-sm font-bold">
              {user.fullName || user.firstName || 'User'}
            </span>
            <span className="text-on-surface-variant/80 truncate font-mono text-[11px]">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-outline-variant/20 my-1" />

        <DropdownMenuGroup className="space-y-0.5">
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl p-2.5 text-xs font-semibold"
          >
            <Link href="/profile" className="flex items-center gap-2.5">
              <User className="text-primary h-4 w-4" />
              <span>User Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl p-2.5 text-xs font-semibold"
          >
            <Link
              href="/dashboard/organization"
              className="flex items-center gap-2.5"
            >
              <Building2 className="text-secondary h-4 w-4" />
              <span>Active Workspace</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl p-2.5 text-xs font-semibold"
          >
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2.5"
            >
              <Settings className="text-on-surface-variant h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 text-xs font-semibold"
          >
            <div className="flex items-center gap-2.5">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-amber-400" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500" />
              )}
              <span>Toggle Mode</span>
            </div>
            <Badge
              variant="outline"
              className="border-outline-variant/30 font-mono text-[10px] uppercase"
            >
              {theme}
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-outline-variant/20 my-1" />

        <DropdownMenuItem
          onClick={() => signOut({ redirectUrl: '/sign-in' })}
          className="text-error hover:text-error hover:bg-error/10 flex cursor-pointer items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
