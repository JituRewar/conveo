'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Save, Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Role } from '@/generated/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  updateOrganizationAction,
  deleteOrganizationAction,
} from '@/actions/organization.actions'
import { OrganizationDTO } from '../types/organization.types'

interface OrganizationSettingsFormProps {
  organization: OrganizationDTO
  userRole: Role
}

export function OrganizationSettingsForm({
  organization,
  userRole,
}: OrganizationSettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [confirmName, setConfirmName] = useState('')

  const [name, setName] = useState(organization.name)
  const [slug, setSlug] = useState(organization.slug)
  const [description, setDescription] = useState(organization.description || '')
  const [website, setWebsite] = useState(organization.website || '')
  const [logoUrl, setLogoUrl] = useState(organization.logoUrl || '')

  const canEdit = userRole === 'OWNER' || userRole === 'ADMIN'
  const canDelete = userRole === 'OWNER'

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canEdit) return

    setLoading(true)
    try {
      const res = await updateOrganizationAction(organization.id, {
        name,
        slug,
        description,
        website: website || undefined,
        logoUrl: logoUrl || undefined,
      })

      if (res.success) {
        toast.success(res.message)
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to update settings.')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirmName !== organization.name) {
      toast.error('Organization name confirmation does not match.')
      return
    }

    setDeleteLoading(true)
    try {
      const res = await deleteOrganizationAction(organization.id)
      if (res.success) {
        toast.success(res.message)
        setDeleteDialogOpen(false)
        router.push('/dashboard')
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to delete organization.')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred.')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* General Settings Card */}
      <Card className="border-outline-variant/30 bg-surface-container-low/80 shadow-xl backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="text-primary h-5 w-5" />
            <CardTitle className="text-on-surface text-lg font-bold">
              General Organization Profile
            </CardTitle>
          </div>
          <CardDescription className="text-on-surface-variant text-xs">
            Update your organization display details, URL slug, and public
            branding links.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                  Organization Name *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!canEdit || loading}
                  required
                  className="bg-surface-container/60 border-outline-variant/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                  URL Slug *
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  disabled={!canEdit || loading}
                  required
                  className="bg-surface-container/60 border-outline-variant/30 font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!canEdit || loading}
                rows={3}
                className="bg-surface-container/60 border-outline-variant/30"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                  Logo Image URL
                </label>
                <Input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  disabled={!canEdit || loading}
                  className="bg-surface-container/60 border-outline-variant/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
                  Official Website
                </label>
                <Input
                  type="url"
                  placeholder="https://acme.org"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={!canEdit || loading}
                  className="bg-surface-container/60 border-outline-variant/30"
                />
              </div>
            </div>

            {canEdit && (
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 gap-2 rounded-xl font-semibold shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {canDelete && (
        <Card className="border-error/30 bg-error/5 shadow-xl backdrop-blur-xl">
          <CardHeader>
            <div className="text-error flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle className="text-lg font-bold">Danger Zone</CardTitle>
            </div>
            <CardDescription className="text-on-surface-variant text-xs">
              Soft-deleting your organization archives all data and revokes
              access for members. This action requires Owner confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-error/40 text-error hover:bg-error/10 gap-2 font-bold"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Organization
                </Button>
              </DialogTrigger>
              <DialogContent className="border-error/30 bg-surface-container-low/95 backdrop-blur-2xl sm:max-w-[450px]">
                <DialogHeader className="space-y-2">
                  <div className="text-error flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    <DialogTitle className="text-xl font-bold">
                      Confirm Deletion
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-on-surface-variant text-sm">
                    This will soft delete{' '}
                    <strong className="text-on-surface">
                      {organization.name}
                    </strong>
                    . Please type the exact organization name to confirm.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-3">
                  <Input
                    placeholder={organization.name}
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    className="bg-surface-container/60 border-outline-variant/30 font-bold"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={
                      deleteLoading || confirmName !== organization.name
                    }
                    className="bg-error hover:bg-error/80 text-on-error font-bold"
                  >
                    {deleteLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Permanently Delete'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
