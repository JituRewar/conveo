import { z } from 'zod'
import { Role } from '@/generated/prisma'

export const updateMemberRoleSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  membershipId: z.string().min(1, 'Membership ID is required'),
  role: z.nativeEnum(Role),
})

export const removeMemberSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  membershipId: z.string().min(1, 'Membership ID is required'),
})

export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>
export type RemoveMemberInput = z.infer<typeof removeMemberSchema>
