'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Check, ChevronsUpDown, Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { switchOrganizationAction } from '@/actions/organization.actions'
import { CreateOrganizationDialog } from './create-organization-dialog'
import { OrganizationDTO } from '../types/organization.types'

interface OrganizationSwitcherProps {
  organizations: OrganizationDTO[]
  activeOrgId: string | null
}

export function OrganizationSwitcher({
  organizations,
  activeOrgId,
}: OrganizationSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const activeOrg =
    organizations.find((o) => o.id === activeOrgId) || organizations[0]

  const handleSwitch = (orgId: string) => {
    if (orgId === activeOrgId) return

    startTransition(async () => {
      const res = await switchOrganizationAction(orgId)
      if (res.success) {
        toast.success(
          `Switched workspace to ${organizations.find((o) => o.id === orgId)?.name}`,
        )
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to switch organization.')
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="border-outline-variant/30 bg-surface-container-low/80 hover:bg-surface-container flex items-center gap-3 rounded-2xl px-3.5 py-5 text-left shadow-sm backdrop-blur-xl transition-all"
        >
          <div className="bg-primary/15 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold">
            {activeOrg?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeOrg.logoUrl}
                alt={activeOrg.name}
                className="h-8 w-8 rounded-xl object-cover"
              />
            ) : (
              <Building2 className="h-4 w-4" />
            )}
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="text-on-surface truncate text-sm font-bold">
              {activeOrg ? activeOrg.name : 'Select Workspace'}
            </span>
            {activeOrg?.role && (
              <span className="text-on-surface-variant/80 text-[10px] font-semibold tracking-wider uppercase">
                {activeOrg.role}
              </span>
            )}
          </div>

          <ChevronsUpDown className="text-on-surface-variant/60 ml-auto h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="border-outline-variant/30 bg-surface-container-low/95 w-72 p-2 backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="text-on-surface-variant px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
          Workspaces ({organizations.length})
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-outline-variant/20" />

        <DropdownMenuGroup className="max-h-60 space-y-1 overflow-y-auto">
          {organizations.length === 0 ? (
            <div className="text-on-surface-variant p-3 text-center text-xs">
              No organizations found.
            </div>
          ) : (
            organizations.map((org) => {
              const isActive = org.id === activeOrgId
              return (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => handleSwitch(org.id)}
                  className="focus:bg-surface-container/80 flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="bg-surface-container text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                      {org.name.charAt(0)}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-on-surface truncate text-xs font-semibold">
                        {org.name}
                      </span>
                      {org.role && (
                        <span className="text-on-surface-variant/70 text-[10px]">
                          {org.role}
                        </span>
                      )}
                    </div>
                  </div>

                  {isActive && (
                    <Check className="text-primary h-4 w-4 shrink-0" />
                  )}
                </DropdownMenuItem>
              )
            })
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-outline-variant/20 my-1" />

        <CreateOrganizationDialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-primary hover:text-primary-container flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Workspace</span>
          </DropdownMenuItem>
        </CreateOrganizationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
