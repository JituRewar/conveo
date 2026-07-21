import { db } from '@/lib/db'
import { Role } from '@/generated/prisma'

export class MembershipRepository {
  /**
   * Finds a membership by user ID and organization ID.
   */
  async findByUserAndOrg(userId: string, organizationId: string) {
    return db.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
      include: {
        user: true,
        organization: true,
      },
    })
  }

  /**
   * Lists all members in an organization with user details.
   */
  async findOrgMembers(organizationId: string) {
    return db.membership.findMany({
      where: {
        organizationId,
        user: {
          deletedAt: null,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
            bio: true,
            createdAt: true,
          },
        },
      },
      orderBy: [
        { role: 'asc' }, // OWNER first, then ADMIN, ORGANIZER, etc.
        { createdAt: 'asc' },
      ],
    })
  }

  /**
   * Counts total owners in an organization (for 1-owner protection).
   */
  async countOwners(organizationId: string) {
    return db.membership.count({
      where: {
        organizationId,
        role: 'OWNER',
      },
    })
  }

  /**
   * Creates a new membership record.
   */
  async createMembership(userId: string, organizationId: string, role: Role) {
    return db.membership.create({
      data: {
        userId,
        organizationId,
        role,
      },
      include: {
        user: true,
      },
    })
  }

  /**
   * Updates member role.
   */
  async updateRole(membershipId: string, role: Role) {
    return db.membership.update({
      where: { id: membershipId },
      data: { role },
      include: {
        user: true,
      },
    })
  }

  /**
   * Deletes a membership record.
   */
  async deleteMembership(membershipId: string) {
    return db.membership.delete({
      where: { id: membershipId },
    })
  }
}

export const membershipRepository = new MembershipRepository()
