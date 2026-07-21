import crypto from 'crypto'
import { auth, currentUser } from '@clerk/nextjs/server'
import { Role } from '@/generated/prisma'
import { invitationRepository } from '@/repositories/invitation.repository'
import { membershipRepository } from '@/repositories/membership.repository'
import { auditLogRepository } from '@/repositories/audit-log.repository'
import { rbacService } from './rbac.service'
import { db } from '@/lib/db'

export class InvitationService {
  /**
   * Retrieves active invitations for an organization.
   */
  async getOrgInvitations(organizationId: string) {
    await rbacService.requireOrgPermission(organizationId, 'invitation:manage')
    return invitationRepository.findByOrg(organizationId)
  }

  /**
   * Fetches invitation details by token for public accept page.
   */
  async getInvitationByToken(token: string) {
    const invitation = await invitationRepository.findByToken(token)
    if (!invitation) {
      throw new Error('NOT_FOUND: Invitation not found or invalid token.')
    }
    return invitation
  }

  /**
   * Sends an email invitation to join the organization.
   */
  async sendInvitation(organizationId: string, email: string, role: Role) {
    const { userId } = await rbacService.requireOrgPermission(
      organizationId,
      'invitation:manage',
    )

    const cleanEmail = email.toLowerCase().trim()

    // 1. Check if user is already a member
    const existingUser = await db.user.findUnique({
      where: { email: cleanEmail },
    })
    if (existingUser) {
      const existingMember = await membershipRepository.findByUserAndOrg(
        existingUser.id,
        organizationId,
      )
      if (existingMember) {
        throw new Error(
          'CONFLICT: User is already a member of this organization.',
        )
      }
    }

    // 2. Check if active pending invitation already exists
    const existingPending = await invitationRepository.findPendingByEmailAndOrg(
      cleanEmail,
      organizationId,
    )
    if (existingPending) {
      throw new Error(
        'CONFLICT: A pending invitation has already been sent to this email.',
      )
    }

    // 3. Generate unique token and set expiration (7 days)
    const token = `inv_${crypto.randomBytes(24).toString('hex')}`
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const invitation = await invitationRepository.createInvitation({
      email: cleanEmail,
      organizationId,
      inviterId: userId,
      role,
      token,
      expiresAt,
    })

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'INVITATION_SEND',
      entityType: 'Invitation',
      entityId: invitation.id,
      details: { email: cleanEmail, role },
    })

    return invitation
  }

  /**
   * Revokes a pending invitation.
   */
  async revokeInvitation(organizationId: string, invitationId: string) {
    const { userId } = await rbacService.requireOrgPermission(
      organizationId,
      'invitation:manage',
    )

    const invitation = await db.invitation.findUnique({
      where: { id: invitationId },
    })

    if (!invitation || invitation.organizationId !== organizationId) {
      throw new Error('NOT_FOUND: Invitation not found.')
    }

    await invitationRepository.deleteInvitation(invitationId)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'INVITATION_REVOKE',
      entityType: 'Invitation',
      entityId: invitationId,
      details: { email: invitation.email },
    })

    return { success: true }
  }

  /**
   * Accepts an invitation using a valid token.
   */
  async acceptInvitation(token: string) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error(
        'UNAUTHENTICATED: Please sign in to accept this invitation.',
      )
    }

    const clerkUser = await currentUser()
    await rbacService.syncUserWithDatabase(
      userId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}` : 'User',
      clerkUser?.imageUrl,
    )

    const invitation = await invitationRepository.findByToken(token)
    if (!invitation) {
      throw new Error('NOT_FOUND: Invalid invitation token.')
    }

    if (invitation.status !== 'PENDING') {
      throw new Error(
        `BAD_REQUEST: Invitation has already been ${invitation.status.toLowerCase()}.`,
      )
    }

    if (new Date() > invitation.expiresAt) {
      await invitationRepository.updateStatus(invitation.id, 'EXPIRED')
      throw new Error('BAD_REQUEST: Invitation token has expired.')
    }

    // Check if user is already a member
    const existingMember = await membershipRepository.findByUserAndOrg(
      userId,
      invitation.organizationId,
    )
    if (existingMember) {
      await invitationRepository.updateStatus(invitation.id, 'ACCEPTED')
      return {
        membership: existingMember,
        organizationId: invitation.organizationId,
      }
    }

    // Create membership and mark invitation accepted
    const membership = await membershipRepository.createMembership(
      userId,
      invitation.organizationId,
      invitation.role,
    )

    await invitationRepository.updateStatus(invitation.id, 'ACCEPTED')

    await auditLogRepository.createLog({
      userId,
      organizationId: invitation.organizationId,
      action: 'INVITATION_ACCEPT',
      entityType: 'Invitation',
      entityId: invitation.id,
      details: { role: invitation.role },
    })

    return { membership, organizationId: invitation.organizationId }
  }
}

export const invitationService = new InvitationService()
