import { z } from 'zod'
import { Role } from '@/generated/prisma'

export const sendInvitationSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  email: z.string().email('Please enter a valid email address'),
  role: z.nativeEnum(Role),
})

export const revokeInvitationSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  invitationId: z.string().min(1, 'Invitation ID is required'),
})

export const acceptInvitationSchema = z.object({
  token: z.string().min(1, 'Invitation token is required'),
})

export type SendInvitationInput = z.infer<typeof sendInvitationSchema>
export type RevokeInvitationInput = z.infer<typeof revokeInvitationSchema>
export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>
