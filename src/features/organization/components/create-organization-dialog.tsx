'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Plus, Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createOrganizationAction } from '@/actions/organization.actions'

interface CreateOrganizationDialogProps {
  children?: React.ReactNode
}

export function CreateOrganizationDialog({
  children,
}: CreateOrganizationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const router = useRouter()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    // Auto generate slug from name
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      toast.error('Organization name and slug are required.')
      return
    }

    setLoading(true)
    try {
      const res = await createOrganizationAction({
        name,
        slug,
        description,
        website: website || undefined,
      })

      if (res.success && res.data) {
        toast.success(res.message)
        setOpen(false)
        setName('')
        setSlug('')
        setDescription('')
        setWebsite('')
        router.refresh()
        router.push('/dashboard/organization')
      } else {
        toast.error(res.error || 'Failed to create organization.')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-primary-container text-on-primary gap-2 rounded-xl font-medium shadow-md">
            <Plus className="h-4 w-4" />
            Create Organization
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-outline-variant/30 bg-surface-container-low/95 backdrop-blur-2xl sm:max-w-[500px]">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
              <Building2 className="h-5 w-5" />
            </div>
            <DialogTitle className="text-on-surface text-xl font-bold">
              Create New Organization
            </DialogTitle>
          </div>
          <DialogDescription className="text-on-surface-variant text-sm">
            Organizations allow teams to manage events, ticket types, and
            members under one unified workspace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Organization Name *
            </label>
            <Input
              placeholder="e.g. Acme Tech Global"
              value={name}
              onChange={handleNameChange}
              required
              className="bg-surface-container/60 border-outline-variant/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-on-surface-variant/70 font-mono text-xs">
                conveo.io/
              </span>
              <Input
                placeholder="acme-tech-global"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
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
              placeholder="Brief summary of your company or organization..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-surface-container/60 border-outline-variant/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">
              Website URL
            </label>
            <Input
              placeholder="https://example.com"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-surface-container/60 border-outline-variant/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-container text-on-primary shadow-primary/20 gap-2 rounded-xl font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Create Organization
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
