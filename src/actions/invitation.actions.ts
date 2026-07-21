'use server'

import { revalidatePath } from 'next/cache'
import { invitationService } from '@/services/invitation.service'
import {
  sendInvitationSchema,
  revokeInvitationSchema,
  acceptInvitationSchema,
  SendInvitationInput,
  RevokeInvitationInput,
} from '@/schemas/invitation.schema'

export async function sendInvitationAction(input: SendInvitationInput) {
  try {
    const validated = sendInvitationSchema.parse(input)
    const invitation = await invitationService.sendInvitation(
      validated.organizationId,
      validated.email,
      validated.role,
    )
    revalidatePath('/dashboard/organization/invitations')
    return {
      success: true,
      data: invitation,
      message: `Invitation sent to ${validated.email}!`,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to send invitation.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function revokeInvitationAction(input: RevokeInvitationInput) {
  try {
    const validated = revokeInvitationSchema.parse(input)
    await invitationService.revokeInvitation(
      validated.organizationId,
      validated.invitationId,
    )
    revalidatePath('/dashboard/organization/invitations')
    return {
      success: true,
      data: null,
      message: 'Invitation revoked.',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to revoke invitation.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function acceptInvitationAction(token: string) {
  try {
    const validated = acceptInvitationSchema.parse({ token })
    const result = await invitationService.acceptInvitation(validated.token)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/organization')
    return {
      success: true,
      data: result,
      message: 'Invitation accepted successfully!',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to accept invitation.'
    return {
      success: false,
      error: message,
    }
  }
}
