import { db } from '@/lib/db'
import { Role, InvitationStatus } from '@/generated/prisma'

export class InvitationRepository {
  /**
   * Finds an invitation by unique token.
   */
  async findByToken(token: string) {
    return db.invitation.findUnique({
      where: { token },
      include: {
        organization: true,
        inviter: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
      },
    })
  }

  /**
   * Lists invitations for an organization.
   */
  async findByOrg(organizationId: string) {
    return db.invitation.findMany({
      where: { organizationId },
      include: {
        inviter: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Checks if an active pending invitation exists for email and org.
   */
  async findPendingByEmailAndOrg(email: string, organizationId: string) {
    return db.invitation.findFirst({
      where: {
        email,
        organizationId,
        status: 'PENDING',
        expiresAt: {
          gt: new Date(),
        },
      },
    })
  }

  /**
   * Creates a new invitation record.
   */
  async createInvitation(data: {
    email: string
    organizationId: string
    inviterId: string
    role: Role
    token: string
    expiresAt: Date
  }) {
    return db.invitation.create({
      data: {
        email: data.email,
        organizationId: data.organizationId,
        inviterId: data.inviterId,
        role: data.role,
        token: data.token,
        expiresAt: data.expiresAt,
        status: 'PENDING',
      },
      include: {
        organization: true,
        inviter: true,
      },
    })
  }

  /**
   * Updates invitation status (e.g. ACCEPTED, DECLINED, EXPIRED).
   */
  async updateStatus(id: string, status: InvitationStatus) {
    return db.invitation.update({
      where: { id },
      data: { status },
    })
  }

  /**
   * Deletes an invitation.
   */
  async deleteInvitation(id: string) {
    return db.invitation.delete({
      where: { id },
    })
  }
}

export const invitationRepository = new InvitationRepository()
