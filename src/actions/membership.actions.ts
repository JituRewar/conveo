'use server'

import { revalidatePath } from 'next/cache'
import { membershipService } from '@/services/membership.service'
import {
  updateMemberRoleSchema,
  removeMemberSchema,
  UpdateMemberRoleInput,
  RemoveMemberInput,
} from '@/schemas/membership.schema'

export async function updateMemberRoleAction(input: UpdateMemberRoleInput) {
  try {
    const validated = updateMemberRoleSchema.parse(input)
    const updated = await membershipService.updateMemberRole(
      validated.organizationId,
      validated.membershipId,
      validated.role,
    )
    revalidatePath('/dashboard/organization/team')
    return {
      success: true,
      data: updated,
      message: `Member role updated to ${validated.role}.`,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to update member role.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function removeMemberAction(input: RemoveMemberInput) {
  try {
    const validated = removeMemberSchema.parse(input)
    await membershipService.removeMember(
      validated.organizationId,
      validated.membershipId,
    )
    revalidatePath('/dashboard/organization/team')
    return {
      success: true,
      data: null,
      message: 'Member removed from organization.',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to remove member.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function leaveOrganizationAction(organizationId: string) {
  try {
    await membershipService.leaveOrganization(organizationId)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/organization')
    return {
      success: true,
      data: null,
      message: 'You have left the organization.',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to leave organization.'
    return {
      success: false,
      error: message,
    }
  }
}
