import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'
import { organizationRepository } from '@/repositories/organization.repository'
import { auditLogRepository } from '@/repositories/audit-log.repository'
import { rbacService } from './rbac.service'
import { db } from '@/lib/db'

export const ACTIVE_ORG_COOKIE_KEY = 'conveo_active_org_id'

export interface CreateOrganizationDTO {
  name: string
  slug: string
  description?: string
  logoUrl?: string
  website?: string
}

export interface UpdateOrganizationDTO {
  name?: string
  slug?: string
  description?: string
  logoUrl?: string
  website?: string
}

export class OrganizationService {
  /**
   * Resolves active organization ID for the current authenticated user.
   */
  async getActiveOrganizationId(): Promise<string | null> {
    const { userId } = await auth()
    if (!userId) return null

    const cookieStore = await cookies()
    const cookieOrgId = cookieStore.get(ACTIVE_ORG_COOKIE_KEY)?.value

    // If cookie org ID exists, verify user is still a valid member of non-deleted org
    if (cookieOrgId) {
      const membership = await db.membership.findFirst({
        where: {
          userId,
          organizationId: cookieOrgId,
          organization: { deletedAt: null },
        },
      })
      if (membership) {
        return cookieOrgId
      }
    }

    // Fallback to user's first available organization
    const orgs = await organizationRepository.findUserOrganizations(userId)
    if (orgs.length > 0) {
      const firstOrgId = orgs[0].id
      await this.setActiveOrganizationId(firstOrgId)
      return firstOrgId
    }

    return null
  }

  /**
   * Sets active organization cookie.
   */
  async setActiveOrganizationId(organizationId: string) {
    const cookieStore = await cookies()
    cookieStore.set(ACTIVE_ORG_COOKIE_KEY, organizationId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  /**
   * Lists all organizations joined by current user.
   */
  async getUserOrganizations() {
    const { userId } = await auth()
    if (!userId) return []
    return organizationRepository.findUserOrganizations(userId)
  }

  /**
   * Retrieves active organization details with members and event counts.
   */
  async getOrganizationDetails(organizationId: string) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('UNAUTHENTICATED: Authentication required.')
    }

    await rbacService.requireOrgMembership(organizationId, 'VIEWER')
    const org = await organizationRepository.findById(organizationId)
    if (!org) {
      throw new Error('NOT_FOUND: Organization not found.')
    }

    return org
  }

  /**
   * Creates a new organization and assigns creator as OWNER.
   */
  async createOrganization(data: CreateOrganizationDTO) {
    const { userId } = await auth()
    if (!userId) {
      throw new Error('UNAUTHENTICATED: Authentication required.')
    }

    const clerkUser = await currentUser()
    await rbacService.syncUserWithDatabase(
      userId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}` : 'User',
      clerkUser?.imageUrl,
    )

    // Check slug uniqueness
    const existing = await organizationRepository.findBySlug(data.slug)
    if (existing) {
      throw new Error(
        'CONFLICT: An organization with this slug already exists.',
      )
    }

    const result = await organizationRepository.createWithOwner(data, userId)

    // Set as active org
    await this.setActiveOrganizationId(result.organization.id)

    // Audit log
    await auditLogRepository.createLog({
      userId,
      organizationId: result.organization.id,
      action: 'ORGANIZATION_CREATE',
      entityType: 'Organization',
      entityId: result.organization.id,
      details: { name: data.name, slug: data.slug },
    })

    return result.organization
  }

  /**
   * Updates organization settings. Requires ADMIN or OWNER role.
   */
  async updateOrganization(
    organizationId: string,
    data: UpdateOrganizationDTO,
  ) {
    const { userId } = await rbacService.requireOrgPermission(
      organizationId,
      'org:manage',
    )

    if (data.slug) {
      const existing = await organizationRepository.findBySlug(data.slug)
      if (existing && existing.id !== organizationId) {
        throw new Error(
          'CONFLICT: An organization with this slug already exists.',
        )
      }
    }

    const updated = await organizationRepository.update(organizationId, data)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'ORGANIZATION_UPDATE',
      entityType: 'Organization',
      entityId: organizationId,
      details: JSON.parse(JSON.stringify(data)),
    })

    return updated
  }

  /**
   * Soft deletes an organization. Requires OWNER role.
   */
  async deleteOrganization(organizationId: string) {
    const { userId } = await rbacService.requireOrgPermission(
      organizationId,
      'org:delete',
    )

    const softDeleted = await organizationRepository.softDelete(organizationId)

    await auditLogRepository.createLog({
      userId,
      organizationId,
      action: 'ORGANIZATION_DELETE',
      entityType: 'Organization',
      entityId: organizationId,
    })

    return softDeleted
  }
}

export const organizationService = new OrganizationService()
