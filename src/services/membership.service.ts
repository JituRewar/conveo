import { Role } from '@/generated/prisma'
import { membershipRepository } from '@/repositories/membership.repository'
import { auditLogRepository } from '@/repositories/audit-log.repository'
import { rbacService, ROLE_HIERARCHY } from './rbac.service'
import { auth } from '@clerk/nextjs/server'

export class MembershipService {
  /**
   * Retrieves all members of an organization. Requires VIEWER or higher.
   */
  async getOrgMembers(organizationId: string) {
    await rbacService.requireOrgPermission(organizationId, 'member:read')
    return membershipRepository.findOrgMembers(organizationId)
  }

  /**
   * Updates a member's role.
   */
  async updateMemberRole(
    organizationId: string,
    membershipId: string,
    newRole: Role,
  ) {
    const { userId, role: actorRole } = await rbacService.requireOrgPermission(
      organizationId,
      'member:manage',
    )

    const targetMembership = await membershipRepository.findByUserAndOrg(
      (await membershipRepository.findOrgMembers(organizationId)).find(
        (m) => m.id === membershipId,
      )?.userId ?? '',
      organizationId,
    )

    if (!targetMembership) {
      throw new Error('NOT_FOUND: Member not found in organization.')
    }

    // Role hierarchy check: Actor cannot grant a role higher than or equal to their own unless OWNER
    if (
      actorRole !== 'OWNER' &&
      ROLE_HIERARCHY[newRole] >= ROLE_HIERARCHY[actorRole]
    ) {
      throw new Error(
        'FORBIDDEN: You cannot assign a role equal to or higher than your own.',
      )
    }

    // 1-Owner protection: If demoting an OWNER, ensure at least one other OWNER exists
    if (targetMembership.role === 'OWNER' && newRole !== 'OWNER') {
      const ownerCount = await membershipRepository.countOwners(organizationId)
      if (ownerCount <= 1) {
        throw new Error(
          'FORBIDDEN: An organization must have at least one Owner.',
        )
      }
    }

    const updated = await membershipRepository.updateRole(membershipId, newRole)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'MEMBER_ROLE_UPDATE',
      entityType: 'Membership',
      entityId: membershipId,
      details: {
        targetUserId: targetMembership.userId,
        oldRole: targetMembership.role,
        newRole,
      },
    })

    return updated
  }

  /**
   * Removes a member from an organization.
   */
  async removeMember(organizationId: string, membershipId: string) {
    const { userId, role: actorRole } = await rbacService.requireOrgPermission(
      organizationId,
      'member:manage',
    )

    const members = await membershipRepository.findOrgMembers(organizationId)
    const target = members.find((m) => m.id === membershipId)
    if (!target) {
      throw new Error('NOT_FOUND: Member not found.')
    }

    // Protection: Cannot remove an Owner if they are the last Owner
    if (target.role === 'OWNER') {
      const ownerCount = await membershipRepository.countOwners(organizationId)
      if (ownerCount <= 1) {
        throw new Error(
          'FORBIDDEN: Cannot remove the sole Owner of an organization.',
        )
      }
    }

    // Role hierarchy check
    if (
      actorRole !== 'OWNER' &&
      ROLE_HIERARCHY[target.role] >= ROLE_HIERARCHY[actorRole]
    ) {
      throw new Error(
        'FORBIDDEN: You cannot remove a member with equal or higher role.',
      )
    }

    await membershipRepository.deleteMembership(membershipId)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'MEMBER_REMOVE',
      entityType: 'Membership',
      entityId: membershipId,
      details: {
        removedUserId: target.userId,
        removedRole: target.role,
      },
    })

    return { success: true }
  }

  /**
   * Allows current authenticated user to leave an organization.
   */
  async leaveOrganization(organizationId: string) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('UNAUTHENTICATED: Authentication required.')
    }

    const membership = await membershipRepository.findByUserAndOrg(
      userId,
      organizationId,
    )
    if (!membership) {
      throw new Error('NOT_FOUND: You are not a member of this organization.')
    }

    if (membership.role === 'OWNER') {
      const ownerCount = await membershipRepository.countOwners(organizationId)
      if (ownerCount <= 1) {
        throw new Error(
          'FORBIDDEN: As the sole Owner, you must transfer ownership or delete the organization before leaving.',
        )
      }
    }

    await membershipRepository.deleteMembership(membership.id)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'MEMBER_LEAVE',
      entityType: 'Membership',
      entityId: membership.id,
    })

    return { success: true }
  }
}

export const membershipService = new MembershipService()
