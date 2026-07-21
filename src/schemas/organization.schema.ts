import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(50, 'Organization name cannot exceed 50 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50, 'Slug cannot exceed 50 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    ),
  description: z
    .string()
    .max(250, 'Description cannot exceed 250 characters')
    .optional(),
  logoUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  website: z.string().url('Invalid URL format').optional().or(z.literal('')),
})

export const updateOrganizationSchema = createOrganizationSchema.partial()

export const switchOrganizationSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
})

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>
export type SwitchOrganizationInput = z.infer<typeof switchOrganizationSchema>
