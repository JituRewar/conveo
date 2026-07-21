import { db } from '@/lib/db'
import { Prisma } from '@/generated/prisma'

export class OrganizationRepository {
  /**
   * Finds an organization by ID excluding soft-deleted ones.
   */
  async findById(id: string) {
    return db.organization.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            members: true,
            events: true,
          },
        },
      },
    })
  }

  /**
   * Finds an organization by slug excluding soft-deleted ones.
   */
  async findBySlug(slug: string) {
    return db.organization.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    })
  }

  /**
   * Returns all organizations a user belongs to.
   */
  async findUserOrganizations(userId: string) {
    const memberships = await db.membership.findMany({
      where: {
        userId,
        organization: {
          deletedAt: null,
        },
      },
      include: {
        organization: {
          include: {
            _count: {
              select: {
                members: true,
                events: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return memberships.map((m) => ({
      ...m.organization,
      role: m.role,
      joinedAt: m.createdAt,
    }))
  }

  /**
   * Creates a new organization with initial owner membership in a single transaction.
   */
  async createWithOwner(
    orgData: Omit<Prisma.OrganizationUncheckedCreateInput, 'id'>,
    ownerUserId: string,
  ) {
    return db.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: orgData,
      })

      const membership = await tx.membership.create({
        data: {
          userId: ownerUserId,
          organizationId: organization.id,
          role: 'OWNER',
        },
      })

      return { organization, membership }
    })
  }

  /**
   * Updates organization details.
   */
  async update(id: string, data: Prisma.OrganizationUpdateInput) {
    return db.organization.update({
      where: { id },
      data,
    })
  }

  /**
   * Soft deletes an organization by setting deletedAt.
   */
  async softDelete(id: string) {
    return db.organization.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}

export const organizationRepository = new OrganizationRepository()
