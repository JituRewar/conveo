import { auth } from '@clerk/nextjs/server'
import { Role } from '@/generated/prisma'
import { membershipRepository } from '@/repositories/membership.repository'
import { db } from '@/lib/db'

export type OrgPermission =
  | 'org:manage'
  | 'org:read'
  | 'org:delete'
  | 'member:manage'
  | 'member:read'
  | 'invitation:manage'
  | 'event:create'
  | 'event:manage'
  | 'event:read'
  | 'ticket:checkin'
  | 'audit:read'

/**
 * Role Permission Matrix for Conveo.
 */
export const ROLE_PERMISSIONS: Record<Role, OrgPermission[]> = {
  OWNER: [
    'org:manage',
    'org:read',
    'org:delete',
    'member:manage',
    'member:read',
    'invitation:manage',
    'event:create',
    'event:manage',
    'event:read',
    'ticket:checkin',
    'audit:read',
  ],
  ADMIN: [
    'org:manage',
    'org:read',
    'member:manage',
    'member:read',
    'invitation:manage',
    'event:create',
    'event:manage',
    'event:read',
    'ticket:checkin',
    'audit:read',
  ],
  ORGANIZER: [
    'org:read',
    'member:read',
    'event:create',
    'event:manage',
    'event:read',
    'ticket:checkin',
  ],
  VOLUNTEER: ['org:read', 'member:read', 'event:read', 'ticket:checkin'],
  VIEWER: ['org:read', 'member:read', 'event:read'],
}

/**
 * Role hierarchy numeric values for comparison.
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 100,
  ADMIN: 80,
  ORGANIZER: 60,
  VOLUNTEER: 40,
  VIEWER: 20,
}

export class RbacService {
  /**
   * Syncs current Clerk user with local User table if not existing.
   */
  async syncUserWithDatabase(
    clerkUserId: string,
    email?: string | null,
    name?: string | null,
    imageUrl?: string | null,
  ) {
    const existingUser = await db.user.findUnique({
      where: { id: clerkUserId },
    })

    if (!existingUser && email) {
      return db.user.create({
        data: {
          id: clerkUserId,
          email,
          firstName: name?.split(' ')[0] ?? 'User',
          lastName: name?.split(' ').slice(1).join(' ') ?? '',
          imageUrl: imageUrl ?? null,
        },
      })
    }

    return existingUser
  }

  /**
   * Retrieves member role for a given user in an organization.
   */
  async getMemberRole(
    userId: string,
    organizationId: string,
  ): Promise<Role | null> {
    const membership = await membershipRepository.findByUserAndOrg(
      userId,
      organizationId,
    )
    return membership ? membership.role : null
  }

  /**
   * Checks if user has specific permission in an organization.
   */
  async hasPermission(
    userId: string,
    organizationId: string,
    permission: OrgPermission,
  ): Promise<boolean> {
    const role = await this.getMemberRole(userId, organizationId)
    if (!role) return false
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
  }

  /**
   * Enforces that current user is authenticated and is a member of the organization with optional minimum role.
   */
  async requireOrgMembership(organizationId: string, minRole?: Role) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('UNAUTHENTICATED: Authentication required.')
    }

    const membership = await membershipRepository.findByUserAndOrg(
      userId,
      organizationId,
    )
    if (!membership) {
      throw new Error('FORBIDDEN: You are not a member of this organization.')
    }

    if (minRole) {
      const userLevel = ROLE_HIERARCHY[membership.role]
      const minLevel = ROLE_HIERARCHY[minRole]
      if (userLevel < minLevel) {
        throw new Error(
          `FORBIDDEN: Requires minimum role of ${minRole}. Current role: ${membership.role}`,
        )
      }
    }

    return { userId, membership, role: membership.role }
  }

  /**
   * Enforces that current user has a specific permission in the organization.
   */
  async requireOrgPermission(
    organizationId: string,
    permission: OrgPermission,
  ) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('UNAUTHENTICATED: Authentication required.')
    }

    const hasPerm = await this.hasPermission(userId, organizationId, permission)
    if (!hasPerm) {
      throw new Error(`FORBIDDEN: Required permission '${permission}' denied.`)
    }

    const membership = await membershipRepository.findByUserAndOrg(
      userId,
      organizationId,
    )
    return { userId, membership, role: membership!.role }
  }
}

export const rbacService = new RbacService()
